"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bot,
  Send,
  Mic,
  MicOff,
  ImagePlus,
  X,
  RotateCcw,
  Sparkles,
  Check,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  image?: string;
  timestamp: string;
  isDiagnosticReport?: boolean;
}

// Custom Markdown Renderer for Normal, Bold (**...**), and Italic (*...* / _..._) support
function FormattedMessageText({ text, isUser }: { text: string; isUser: boolean }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, lineIdx) => {
        const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
        const cleanLine = isBullet ? line.trim().replace(/^[•-]\s*/, "") : line;

        // Tokenize for bold (**...**), italic (*...* or _..._), code (`...`)
        const regex = /(\*\*.*?\*\*|\*.*?\*|_.*?_|`.*?`)/g;
        const elements: React.ReactNode[] = [];
        let lastIdx = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(cleanLine)) !== null) {
          if (match.index > lastIdx) {
            elements.push(cleanLine.slice(lastIdx, match.index));
          }
          const matchText = match[0];
          if (matchText.startsWith("**") && matchText.endsWith("**")) {
            elements.push(
              <strong
                key={`${lineIdx}-${match.index}`}
                className={`font-semibold ${isUser ? "text-white" : "text-gray-900"}`}
              >
                {matchText.slice(2, -2)}
              </strong>
            );
          } else if (
            (matchText.startsWith("*") && matchText.endsWith("*")) ||
            (matchText.startsWith("_") && matchText.endsWith("_"))
          ) {
            elements.push(
              <em
                key={`${lineIdx}-${match.index}`}
                className={`italic ${isUser ? "text-white/90" : "text-gray-800"}`}
              >
                {matchText.slice(1, -1)}
              </em>
            );
          } else if (matchText.startsWith("`") && matchText.endsWith("`")) {
            elements.push(
              <code
                key={`${lineIdx}-${match.index}`}
                className={`px-1 py-0.5 rounded text-[11px] font-mono ${
                  isUser ? "bg-white/20 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                {matchText.slice(1, -1)}
              </code>
            );
          }
          lastIdx = regex.lastIndex;
        }

        if (lastIdx < cleanLine.length) {
          elements.push(cleanLine.slice(lastIdx));
        }

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 py-0.5 text-xs">
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                  isUser ? "bg-white" : "bg-[#144733]"
                }`}
              />
              <div className="flex-1 leading-relaxed">
                {elements.length > 0 ? elements : cleanLine}
              </div>
            </div>
          );
        }

        return (
          <p key={lineIdx} className={line.trim() === "" ? "h-2" : "py-0.5 text-xs leading-relaxed font-normal"}>
            {elements.length > 0 ? elements : line}
          </p>
        );
      })}
    </div>
  );
}

function ChatContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const router = useRouter();
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Quick suggestion prompts
  const quickSuggestions = [
    t.quickQueryPest,
    t.quickQueryWater,
    t.quickQueryYellowing,
    t.quickQueryFertilizer,
  ];

  // Check auth & initialize Chat (Check if coming from Detection or fresh)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("agrivani_is_logged_in") === "true";
      if (!isLoggedIn) {
        router.replace("/auth");
        return;
      }
    }

    const fromDetection = searchParams?.get("from") === "detection";
    const savedDetection = typeof window !== "undefined" ? localStorage.getItem("agrivani_detection_context") : null;

    if (fromDetection && savedDetection) {
      try {
        const data = JSON.parse(savedDetection);
        const initialThread: ChatMessage[] = [
          {
            id: "user-init",
            sender: "user",
            text: "I scanned my crop leaf for disease diagnostics. Please provide the identified disease and remedies.",
            image: data.image,
            timestamp: data.timestamp || "Just now",
          },
          {
            id: "bot-init",
            sender: "bot",
            text: `Here is your crop diagnosis report:\n\n**Disease Identified:** ${data.diseaseName || "Rice Leaf Blast (Jhuka Rog)"}\n\n**Description:** ${data.description || "Fungal infection creating diamond-shaped lesions with grey centers."}\n\n**Prescribed Remedies:**\n${
              Array.isArray(data.remedies) && data.remedies.length > 0
                ? data.remedies.map((r: string) => `• ${r}`).join("\n")
                : "• **1. Chemical Spray:** Mix 120g *Tricyclazole 75% WP* in 200L water per acre. Spray early morning (6:00 AM - 9:00 AM).\n• **2. Organic Remedy:** Mix 5ml pure *Neem oil* + 1ml mild soap per liter water. Spray every 7 days.\n• **3. Field Management:** Stop excess Urea immediately and maintain shallow field water."
            }\n\nAsk me any questions about dosage, pesticide brands, or upload another leaf image below.`,
            timestamp: data.timestamp || "Just now",
            isDiagnosticReport: true,
          },
        ];
        setMessages(initialThread);
        return;
      } catch (err) {
        console.warn("Failed to parse detection payload", err);
      }
    }

    // Default Welcome Thread
    setMessages([
      {
        id: "bot-welcome",
        sender: "bot",
        text: "Namaste! 🙏 I am your **AgriVani AI Farming Assistant**.\n\nYou can ask questions in *Hindi* or *English*, upload crop photos, or use the **voice microphone** below to ask about remedies and spray timings.",
        timestamp: "Just now",
      },
    ]);
  }, [searchParams]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, inputQuery]);

  // Timer counter when recording
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingSeconds(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Start Voice Recording
  const startRecording = async () => {
    setIsRecording(true);
    setInputQuery("");
    audioChunksRef.current = [];

    // 1. Start MediaRecorder
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true },
        });
        streamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.start(250);
      }
    } catch (e) {
      console.warn("Microphone stream notice:", e);
    }

    // 2. Start SpeechRecognition
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = navigator.language || "en-IN";

          recognition.onresult = (event: any) => {
            let finalTranscript = "";
            let interimTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
              const text = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                finalTranscript += text + " ";
              } else {
                interimTranscript += text;
              }
            }

            const current = (finalTranscript + interimTranscript).trim();
            if (current) {
              setInputQuery(current);
            }
          };

          recognition.onerror = (err: any) => {
            console.warn("Speech recognition notice:", err);
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch (err) {
          console.warn("Recognition start notice:", err);
        }
      }
    }
  };

  // Stop Voice Recording & Convert to Text into input field
  const stopRecording = async () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }

    // Stop MediaRecorder and wait for final audio chunk flush
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      await new Promise<void>((resolve) => {
        if (!mediaRecorderRef.current) return resolve();
        mediaRecorderRef.current.onstop = () => resolve();
        mediaRecorderRef.current.stop();
      });
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // If inputQuery was already filled by speech recognition, focus input and finish!
    if (inputQuery.trim()) {
      return;
    }

    // If speech recognition didn't yield text (e.g. in Brave), transcribe via API
    if (audioChunksRef.current.length > 0) {
      setIsTranscribing(true);
      try {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob, "speech.webm");

        const res = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.text) {
            setInputQuery(data.text);
          }
        }
      } catch (err) {
        console.warn("Transcription API error:", err);
      } finally {
        setIsTranscribing(false);
      }
    }
  };

  // Toggle Mic
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Image File Upload
  const handleImageAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear Attached Image
  const removeAttachedImage = () => {
    setAttachedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Send Message
  const handleSendMessage = (customText?: string) => {
    const query = customText || inputQuery;
    if (!query.trim() && !attachedImage) return;

    if (isRecording) {
      stopRecording();
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query.trim() || (attachedImage ? "Uploaded image for review" : ""),
      image: attachedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setAttachedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    setIsTyping(true);

    setTimeout(() => {
      let botResponse =
        "For optimal disease control, ensure your spray covers both the *upper* and *lower* surfaces of the leaves.\n\nAvoid spraying during hot midday hours (**11:00 AM - 3:00 PM**) to prevent leaf scorching.";

      const lower = query.toLowerCase();
      if (userMsg.image && !query.trim()) {
        botResponse =
          "I have analyzed your new leaf photo.\n\nThe foliage shows *mild fungal spotting*. We recommend spraying **5ml Neem oil per liter of water** as a preventive measure before the spots expand.";
      } else if (lower.includes("mix") || lower.includes("insecticide") || lower.includes("urea")) {
        botResponse =
          "**Tank-Mix Compatibility Advisory:**\n\n• **Do NOT** mix *Tricyclazole* directly with high-nitrogen *Urea* in the same spray tank.\n• Always do a small **Jar Test** (mix small quantity in a bottle). If there is curdling or cloudiness, spray them separately with a **4-day gap**.";
      } else if (lower.includes("rain") || lower.includes("weather")) {
        botResponse =
          "**Rainfastness Advisory:**\n\n• *Tricyclazole* is systemically absorbed by leaves within **2 hours**.\n• If rain is expected within 3 hours, add a **non-ionic sticker agent** (like *Agrowet* @ 0.5ml/L) so the medicine is not washed away.";
      } else if (lower.includes("buy") || lower.includes("mandi") || lower.includes("store") || lower.includes("price")) {
        botResponse =
          "**Available Mandi Brands:**\n\n• *Tricyclazole 75% WP* is sold under brand names like **Beam (Corteva)**, **Baan**, and **Bim**.\n• Expected rate: **₹280 to ₹350** per 120g packet at your local *Krishi Seva Kendra* or agro-store.";
      } else if (lower.includes("harvest") || lower.includes("days") || lower.includes("stop")) {
        botResponse =
          "**Pre-Harvest Interval (PHI):**\n\nThe safe waiting period for *Tricyclazole* in Paddy is **14 days**. Do not spray within *14 days of harvest* to ensure zero chemical residue in grains.";
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      <main className="w-full max-w-md md:max-w-xl bg-[#FDFFF1] h-screen sm:h-[90vh] flex flex-col relative shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top Header */}
        <header className="px-4 py-3.5 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/detection"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#144733] text-[#95CF3A] flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-900 leading-tight">
                  {t.chatTitle}
                </h1>
                <p className="text-[10px] text-emerald-700 font-medium">
                  ● {t.onlineSync.split("-")[0].trim()}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Messages Container */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 space-y-2 text-xs leading-relaxed ${
                    isUser
                      ? "bg-[#144733] text-white rounded-tr-none shadow-sm"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-200/90 shadow-xs"
                  }`}
                >
                  {/* Attached or Captured Image Preview */}
                  {msg.image && (
                    <div className="relative w-full h-44 rounded-xl overflow-hidden bg-black/10 border border-white/20">
                      <Image
                        src={msg.image}
                        alt="Crop Leaf Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Formatted Message Content (Supports Bold, Italic, Normal, Bullets) */}
                  <FormattedMessageText text={msg.text} isUser={isUser} />

                  {/* Timestamp */}
                  <div
                    className={`text-[9px] text-right ${
                      isUser ? "text-white/60" : "text-gray-400"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-gray-200 w-24 text-gray-500 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#144733] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#144733] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#144733] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-white/70 border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickSuggestions.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="text-[11px] font-medium bg-white hover:bg-gray-50 text-gray-800 px-3 py-1.5 rounded-full whitespace-nowrap transition active:scale-95 border border-gray-200 shadow-xs cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Attached Image Preview Pill (Before Sending) */}
        {attachedImage && (
          <div className="px-4 py-2 bg-emerald-50 border-t border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-emerald-300">
                <Image
                  src={attachedImage}
                  alt="Attached leaf thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-[#144733]">
                Photo attached ready to send
              </span>
            </div>
            <button
              onClick={removeAttachedImage}
              className="w-7 h-7 rounded-full bg-white hover:bg-red-50 text-gray-500 hover:text-red-600 flex items-center justify-center border border-gray-200 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Active Recording State Banner */}
        {(isRecording || isTranscribing) && (
          <div className="px-4 py-3 bg-red-50 border-t border-red-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center animate-pulse">
                {isTranscribing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
              </div>

              {/* Dynamic Soundwaves */}
              {isRecording && (
                <div className="flex items-center gap-1">
                  <span className="w-1 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="w-1 h-6 bg-red-600 rounded-full animate-bounce [animation-delay:0.3s]" />
                  <span className="w-1 h-4 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-7 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="w-1 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                </div>
              )}

              <div>
                <span className="text-xs font-semibold text-red-900 block leading-tight">
                  {isTranscribing ? "Converting speech to text..." : `Listening (${recordingSeconds}s)`}
                </span>
                <span className="text-[10px] text-red-700 font-normal">
                  {inputQuery ? `"${inputQuery}"` : "Speak into microphone"}
                </span>
              </div>
            </div>

            {isRecording && (
              <button
                onClick={stopRecording}
                className="text-xs font-semibold text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-xl transition active:scale-95 cursor-pointer shadow-xs flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Done</span>
              </button>
            )}
          </div>
        )}

        {/* Bottom ChatGPT-style Input Deck */}
        <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
          
          {/* 1. Upload Another Image Button */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageAttachment}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              aria-label="Attach Photo"
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center active:scale-95 transition border border-gray-200 cursor-pointer"
            >
              <ImagePlus className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* 2. Voice Input (Mic) Button */}
          <button
            onClick={toggleRecording}
            aria-label="Voice Input"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition active:scale-95 cursor-pointer border ${
              isRecording
                ? "bg-red-600 text-white border-red-700 shadow-md animate-pulse"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200"
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* 3. Text Message Input Box */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            placeholder={isRecording ? t.voiceListening : t.chatInputPlaceholder}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#144733]"
          />

          {/* 4. Send Message Button */}
          <button
            onClick={() => handleSendMessage()}
            aria-label="Send Message"
            disabled={!inputQuery.trim() && !attachedImage}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition active:scale-95 shrink-0 ${
              inputQuery.trim() || attachedImage
                ? "bg-[#144733] hover:bg-[#0f3627] text-white shadow-xs cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4 text-[#95CF3A]" />
          </button>
        </div>

      </main>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFFF1] flex items-center justify-center text-xs text-gray-500">
          Loading AgriVani Assistant...
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
