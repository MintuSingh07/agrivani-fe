"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";

export default function GetStartedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#2C302E] flex items-center justify-center p-0 sm:p-6 md:p-8">
      <div className="w-full max-w-[430px] h-[100dvh] sm:h-[880px] max-h-[920px] bg-[#F5F4EE] flex flex-col justify-between overflow-hidden sm:rounded-[36px] sm:shadow-2xl relative">
        <SplashScreen onComplete={() => router.push("/onboarding")} durationMs={2800} />
      </div>
    </div>
  );
}
