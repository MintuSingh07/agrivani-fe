"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

export default function SplashScreen({
  onComplete,
  durationMs = 2800,
}: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, onComplete]);

  return (
    <div
      onClick={onComplete}
      className="relative w-full h-full flex-1 flex flex-col items-center justify-center bg-[#F4F3ED] select-none overflow-hidden cursor-pointer p-6 sm:p-8"
    >
      {/* 1. Ambient Background Organic Aura (Matching Onboarding Theme) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Organic Green Backdrop Blob */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-[58%_42%_62%_38%/48%_58%_42%_52%] bg-[#D6E6CC]/70 blur-2xl"
        />

        {/* Ambient Warm Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[320px] h-[260px] sm:h-[320px] rounded-full bg-[#E2EBD9]/60 blur-xl" />
      </div>

      {/* 2. Center Content: Silky Smooth Animated Logo + Tagline */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">

        {/* Subtle Ambient Pulse Wave */}
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              scale: [1, 1.15, 1.25],
              opacity: [0.35, 0.15, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.6,
            }}
            className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-[#2D7A4D]/25 pointer-events-none"
          />

          {/* Logo Circular Container with Silky Smooth Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1], // Ultra-smooth cubic bezier
            }}
            className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full shadow-[0_16px_40px_rgba(27,77,46,0.15)] border-[3px] border-white/80 bg-[#EFECE3] overflow-hidden"
          >
            <Image
              src="/images/agrivani_logo.png"
              alt="AgriVani Logo"
              width={1024}
              height={1024}
              priority
              className="w-full h-full object-cover select-none"
            />
          </motion.div>
        </div>

        {/* Tagline: "Smart Insights, Better Harvests" */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 sm:mt-7 flex flex-col items-center"
        >
          <p className="font-editorial italic font-normal text-[20px] sm:text-[23px] text-[#1B4D2E] tracking-wide">
            Smart Insights, Better Harvests.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
