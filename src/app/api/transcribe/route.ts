import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as Blob | null;

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const groqKey = process.env.GROQ_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (groqKey) {
      try {
        const whisperForm = new FormData();
        whisperForm.append("file", audioFile, "audio.webm");
        whisperForm.append("model", "whisper-large-v3");

        const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
          method: "POST",
          headers: { Authorization: `Bearer ${groqKey}` },
          body: whisperForm,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.text) {
            return NextResponse.json({ text: data.text.trim(), success: true });
          }
        }
      } catch (err) {
        console.warn("Groq transcription error:", err);
      }
    }

    if (openaiKey) {
      try {
        const whisperForm = new FormData();
        whisperForm.append("file", audioFile, "audio.webm");
        whisperForm.append("model", "whisper-1");

        const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
          method: "POST",
          headers: { Authorization: `Bearer ${openaiKey}` },
          body: whisperForm,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.text) {
            return NextResponse.json({ text: data.text.trim(), success: true });
          }
        }
      } catch (err) {
        console.warn("OpenAI transcription error:", err);
      }
    }

    // No hardcoded or predefined text fallback
    return NextResponse.json({
      text: "",
      success: true,
    });
  } catch (error: any) {
    console.error("Transcribe error:", error);
    return NextResponse.json({ error: "Failed to transcribe audio", text: "" }, { status: 500 });
  }
}
