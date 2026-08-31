"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";

export default function SplashPageRoute() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("agrivani_is_logged_in") === "true";
      const userRole = localStorage.getItem("agrivani_user_role");
      if (isLoggedIn) {
        if (userRole === "officer" || userRole === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/home");
        }
      }
    }
  }, [router]);

  return (
    <div className="w-full min-h-[100dvh] h-[100dvh] bg-[#F5F4EE] flex items-center justify-center overflow-hidden">
      <div className="w-full h-full max-w-none md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-between overflow-hidden relative">
        <SplashScreen onComplete={() => router.push("/onboarding")} durationMs={2800} />
      </div>
    </div>
  );
}
