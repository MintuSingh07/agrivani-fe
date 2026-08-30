"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Upload,
  RotateCcw,
  Play,
  MessageSquare,
  X,
  RefreshCw,
  Sun,
  Focus,
  Leaf,
  ShieldAlert,
  Info,
  Lightbulb,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DetectionPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraFacing, setCameraFacing] = useState<"environment" | "user">("environment");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Turn off camera and release hardware sensor
  const stopCamera = () => {
    if (typeof window !== "undefined") {
      (window as any).__agrivani_camera_stream = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      streamRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      try {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => {
          try {
            track.stop();
          } catch {}
        });
      } catch {}
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Start camera when entering the live viewfinder section
  const startCamera = async (facing = cameraFacing) => {
    stopCamera();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported on this browser.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (typeof window !== "undefined") {
        (window as any).__agrivani_camera_stream = stream;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.warn("Camera auto-start notice:", err);
      setCameraError("Camera permission needed. Tap below to retry or choose an image from your gallery.");
      setIsCameraActive(false);
    }
  };

  // Lifecycle & visibility listener: turn off camera when switching tabs/pages
  useEffect(() => {
    if (!capturedImage) {
      startCamera(cameraFacing);
    } else {
      stopCamera();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopCamera();
      } else if (document.visibilityState === "visible" && !capturedImage) {
        startCamera(cameraFacing);
      }
    };

    const handlePageHide = () => {
      stopCamera();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      stopCamera();
    };
  }, [capturedImage, cameraFacing]);

  // Capture Photo
  const handleCapture = () => {
    if (videoRef.current && isCameraActive) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setCapturedImage(dataUrl);
        stopCamera();
      }
    } else {
      // Fallback capture for demo/testing
      setCapturedImage("/images/farm_weather_scenic.jpg");
      stopCamera();
    }
  };

  // Retake or Reset -> Reactivates Camera
  const handleReset = () => {
    setCapturedImage(null);
    startCamera(cameraFacing);
  };

  // Toggle Camera Front/Back
  const toggleCamera = () => {
    const nextFacing = cameraFacing === "environment" ? "user" : "environment";
    setCameraFacing(nextFacing);
    startCamera(nextFacing);
  };

  // File Upload -> Stops Camera immediately
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  // Continue Chat: Stop camera, save diagnostic session and route to /chat
  const handleContinueChat = () => {
    stopCamera();
    const payload = {
      image: capturedImage || "/images/farm_weather_scenic.jpg",
      diseaseName: "Rice Leaf Blast (Jhuka Rog)",
      description: "This is a fungal disease that affects rice and grain crops, usually caused by warm temperatures and high humidity. It creates diamond-shaped brown spots with grey centers on the leaves. If left untreated, the spots spread and dry up the entire leaf, reducing crop yield.",
      remedies: [
        "1. Chemical Spray: Mix 120 grams of Tricyclazole 75% WP in 200 liters of water per acre. Spray early in the morning between 6:00 AM and 9:00 AM so the leaves absorb it before strong sunlight.",
        "2. Organic Solution: Mix 5 ml of pure Neem oil with 1 ml of mild liquid soap in 1 liter of water. Spray thoroughly over the top and bottom of the leaves every 7 days.",
        "3. Field Management: Stop applying excess Urea or nitrogen fertilizers immediately, as high nitrogen makes leaves softer and spreads the fungus faster. Maintain shallow water in the field."
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("agrivani_detection_context", JSON.stringify(payload));
    }
    router.push("/chat?from=detection");
  };

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      <main className="w-full max-w-md md:max-w-xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top App Header */}
        <header className="px-4 py-3.5 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-tight">
                {t.diseaseDetectionTitle}
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                {t.scanLeafPrompt}
              </p>
            </div>
          </div>

          {capturedImage && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#144733] bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 active:scale-95 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.retakeScanBtn}</span>
            </button>
          )}
        </header>

        {/* Main Body */}
        <div className="p-4 space-y-4 flex-1">
          
          {/* Native Camera Viewfinder Box */}
          <div className="bg-white rounded-3xl p-3 border border-gray-200/90 shadow-sm space-y-3">
            
            {/* Viewfinder Screen */}
            <div className="relative w-full h-80 rounded-2xl bg-gray-950 overflow-hidden flex flex-col items-center justify-center text-white">
              
              {/* 1. Live Video Stream */}
              <video
                ref={videoRef}
                playsInline
                muted
                className={`w-full h-full object-cover ${isCameraActive && !capturedImage ? "block" : "hidden"}`}
              />

              {/* 2. Frozen Picture upon capture */}
              {capturedImage && (
                <Image
                  src={capturedImage}
                  alt="Captured Crop Leaf"
                  fill
                  className="object-cover"
                />
              )}

              {/* 3. Fallback screen if camera access blocked */}
              {!isCameraActive && !capturedImage && (
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-2.5">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[#95CF3A]">
                    <Camera className="w-7 h-7" />
                  </div>
                  <p className="text-xs text-gray-300 font-normal max-w-xs">
                    {cameraError || "Initializing live camera..."}
                  </p>
                  <button
                    onClick={() => startCamera(cameraFacing)}
                    className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold active:scale-95 transition mt-1"
                  >
                    Allow Camera Access
                  </button>
                </div>
              )}

              {/* Viewfinder Target Framing Brackets */}
              <div className="absolute top-3.5 left-3.5 w-7 h-7 border-t-2 border-l-2 border-white/80 rounded-tl-md pointer-events-none" />
              <div className="absolute top-3.5 right-3.5 w-7 h-7 border-t-2 border-r-2 border-white/80 rounded-tr-md pointer-events-none" />
              <div className="absolute bottom-3.5 left-3.5 w-7 h-7 border-b-2 border-l-2 border-white/80 rounded-bl-md pointer-events-none" />
              <div className="absolute bottom-3.5 right-3.5 w-7 h-7 border-b-2 border-r-2 border-white/80 rounded-br-md pointer-events-none" />

              {/* Status Hint Pill on Viewfinder */}
              {!capturedImage && (
                <div className="absolute bottom-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] text-white/90 font-medium pointer-events-none">
                  Align single leaf inside frame
                </div>
              )}
            </div>

            {/* Bottom Camera Control Deck */}
            {!capturedImage ? (
              <div className="flex items-center justify-between px-3 pt-2 pb-1">
                
                {/* Left: Upload from Gallery */}
                <div className="w-16 flex flex-col items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Upload from gallery"
                    className="w-11 h-11 rounded-2xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition border border-gray-200"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                  <span className="text-[10px] text-gray-500 font-medium mt-1">
                    Upload
                  </span>
                </div>

                {/* Center: Large Tactile Camera Shutter Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleCapture}
                    aria-label="Capture Photo"
                    className="w-16 h-16 rounded-full border-4 border-[#144733] bg-[#FDFFF1] p-1 flex items-center justify-center active:scale-90 transition shadow-md cursor-pointer hover:bg-gray-50"
                  >
                    <div className="w-full h-full rounded-full bg-[#144733] flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-[#95CF3A]" />
                    </div>
                  </button>
                  <span className="text-[10px] text-gray-600 font-semibold mt-1">
                    Tap to Scan
                  </span>
                </div>

                {/* Right: Flip Camera */}
                <div className="w-16 flex flex-col items-center">
                  <button
                    onClick={toggleCamera}
                    aria-label="Flip Camera"
                    className="w-11 h-11 rounded-2xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 active:scale-95 transition border border-gray-200"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <span className="text-[10px] text-gray-500 font-medium mt-1">
                    Flip
                  </span>
                </div>

              </div>
            ) : (
              <div className="pt-1">
                <button
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center justify-center gap-2 active:scale-98 transition"
                >
                  <RotateCcw className="w-4 h-4 text-gray-600" />
                  <span>Scan Another Leaf</span>
                </button>
              </div>
            )}
          </div>

          {/* Tip Card (Shown when no picture has been captured yet) */}
          {!capturedImage && (
            <div className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#144733] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                <Lightbulb className="w-4 h-4 text-[#2D7A4D]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-semibold text-gray-900">
                  Tip
                </h3>
                <p className="text-xs text-gray-600 font-normal leading-relaxed">
                  This feature works offline. You can scan crop leaves and view remedies anytime without an internet connection.
                </p>
              </div>
            </div>
          )}

          {/* Details Section: Shown below the image after capture */}
          {capturedImage && (
            <div className="space-y-4">
              
              {/* Plain Disease Description & Remedies Card */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-xs space-y-4 text-gray-800">
                
                {/* 1. Disease Description */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-gray-900">
                      Disease Identified: Rice Leaf Blast
                    </h2>
                    <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                      Fungal Issue
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-normal pt-1">
                    This is a fungal disease that affects rice and grain crops, usually caused by warm temperatures and high humidity. It creates diamond-shaped brown spots with grey centers on the leaves. If left untreated, the spots spread and dry up the entire leaf, reducing crop yield.
                  </p>
                </div>

                <hr className="border-gray-200" />

                {/* 2. Remedies in Plain Text */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-semibold text-gray-900">
                    Recommended Remedies & Treatment:
                  </h3>
                  
                  <div className="space-y-2 text-xs text-gray-700 font-normal leading-relaxed">
                    <p>
                      <strong>1. Chemical Spray:</strong> Mix 120 grams of Tricyclazole 75% WP in 200 liters of water per acre. Spray early in the morning between 6:00 AM and 9:00 AM so the leaves absorb it before strong sunlight.
                    </p>
                    <p>
                      <strong>2. Organic Solution:</strong> If you prefer organic methods, mix 5 ml of pure Neem oil with 1 ml of mild liquid soap in 1 liter of water. Spray thoroughly over the top and bottom of the leaves every 7 days.
                    </p>
                    <p>
                      <strong>3. Field Management:</strong> Stop applying excess Urea or nitrogen fertilizers immediately, as high nitrogen makes leaves softer and spreads the fungus faster. Maintain shallow water in the field and avoid water stagnation.
                    </p>
                  </div>
                </div>

              </div>

              {/* 3. Assistive Video Guide */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-xs space-y-2.5">
                <h3 className="text-xs font-semibold text-gray-900">
                  Video Demonstration
                </h3>
                
                <Link
                  href="/learn"
                  className="block relative rounded-xl overflow-hidden bg-gray-900 group border border-gray-200"
                >
                  <div className="relative h-36 w-full">
                    <Image
                      src="/images/farm_weather_scenic.jpg"
                      alt="Remedy Demonstration Video"
                      fill
                      unoptimized
                      className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-102 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full bg-white/90 text-[#144733] flex items-center justify-center group-hover:scale-110 transition shadow-md">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white">
                    <h4 className="text-xs font-semibold text-gray-900 leading-snug">
                      How to mix and spray Tricyclazole for Leaf Blast
                    </h4>
                    <p className="text-[11px] text-gray-500 font-normal mt-0.5">
                      4 min guide • Hindi / Regional audio
                    </p>
                  </div>
                </Link>
              </div>

              {/* 4. Action Buttons: Continue Chat or No More */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleContinueChat}
                  className="w-full flex items-center justify-center gap-2 bg-[#144733] hover:bg-[#0f3627] text-white py-3.5 rounded-2xl text-xs font-semibold active:scale-98 transition shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#95CF3A]" />
                  <span>Continue Chat</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 py-3.5 rounded-2xl text-xs font-semibold active:scale-98 transition border border-gray-300 cursor-pointer"
                >
                  <X className="w-4 h-4 text-gray-600" />
                  <span>No More</span>
                </button>
              </div>

              {/* 5. Agricultural Advisory Disclaimer */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed font-normal flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Advisory Disclaimer:</strong> Dosages and recommendations follow standard agricultural extension practices. Perform a test spray on a few plants before full field application. For chronic infestations, consult your nearest Krishi Vigyan Kendra (KVK) officer.
                </p>
              </div>

            </div>
          )}

        </div>

      </main>
    </div>
  );
}
