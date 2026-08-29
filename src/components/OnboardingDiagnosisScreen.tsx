"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";

interface OnboardingDiagnosisScreenProps {
  onNext?: () => void;
  onSkip?: () => void;
  targetHref?: string;
  className?: string;
}

export default function OnboardingDiagnosisScreen({
  onNext,
  onSkip,
  targetHref = "/",
  className = "",
}: OnboardingDiagnosisScreenProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-full h-full min-h-[100dvh] sm:min-h-0 bg-[#F5F4EE] text-[#191919] flex flex-col justify-between overflow-hidden p-3.5 xs:p-4 sm:p-6 md:p-8 lg:p-10 select-none relative font-sans ${className}`}
    >
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,500;1,6..72,700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&display=swap');

        .font-assistant-title {
          font-family: var(--font-assistant), 'Assistant', sans-serif;
        }
        .font-editorial {
          font-family: 'Newsreader', 'Playfair Display', Georgia, serif;
        }
      `}</style>

      {/* Subtle Ambient Background Light */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-72 md:w-96 h-72 md:h-96 bg-[#EAEFE2] rounded-full blur-3xl opacity-50" />
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP HEADER (AgriVani Logo, Skip) - Responsive Height                    */}
      {/* ========================================================================= */}
      <header className="w-full flex items-center justify-between shrink-0 h-10 sm:h-12 md:h-14 relative z-30">
        {/* Top-Left Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 select-none">
          <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full shadow-xs border border-neutral-300/70 overflow-hidden bg-[#EFECE3] shrink-0">
            <Image
              src="/images/agrivani_logo.png"
              alt="AgriVani Logo"
              width={64}
              height={64}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-assistant-title font-bold text-base sm:text-lg md:text-xl tracking-tight text-[#1B4D2E]">
            AgriVani
          </span>
        </div>

        {/* Top-Right Actions */}
        <div className="flex items-center">
          {onSkip ? (
            <button
              onClick={onSkip}
              className="font-assistant-title font-bold text-base sm:text-lg md:text-xl tracking-tight text-[#1B4D2E] hover:opacity-80 transition-opacity px-2 py-1 rounded-lg cursor-pointer"
            >
              Skip
            </button>
          ) : (
            <Link
              href={targetHref}
              className="font-assistant-title font-bold text-base sm:text-lg md:text-xl tracking-tight text-[#1B4D2E] hover:opacity-80 transition-opacity px-2 py-1 rounded-lg"
            >
              Skip
            </Link>
          )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MIDDLE HERO AREA: 50% TEXT ON LEFT + 55% PEEKING ILLUSTRATION ON RIGHT */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full relative flex items-center justify-between min-h-0 my-auto">

        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN: EDITORIAL TYPOGRAPHY & CHIPS (50% WIDTH)                   */}
        {/* ----------------------------------------------------------------------- */}
        <div className="w-[52%] sm:w-[50%] md:w-[48%] z-20 flex flex-col items-start gap-1.5 sm:gap-3 md:gap-5 pr-1 sm:pr-4 select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1 sm:space-y-1.5 md:space-y-2.5"
          >
            {/* Feature Pill Chip */}
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-0.5 md:px-3 md:py-1 rounded-full bg-[#E2EBD9] border border-[#CBDCC0] text-[#1B4D2E] text-[9px] sm:text-[11px] md:text-[13px] font-semibold tracking-wide font-assistant-title shadow-xs">
              <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-[#2D7A4D] animate-pulse" />
              <span>VISION ENGINE v4.2</span>
            </div>

            {/* Headline */}
            <h1 className="tracking-[-0.03em] text-[#111111] leading-[1.02]">
              <span className="font-assistant-title font-extrabold text-[28px] sm:text-[38px] md:text-[48px] lg:text-[56px] text-[#111111] block">
                AI Photo
              </span>
              <span className="font-editorial italic font-normal text-[24px] sm:text-[34px] md:text-[44px] lg:text-[52px] text-[#1B4D2E] block -mt-1 md:-mt-2">
                Diagnosis.
              </span>
            </h1>
          </motion.div>

          {/* Metric Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex flex-col gap-1 sm:gap-1.5 md:gap-2.5"
          >
            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] md:text-[13px] font-medium text-neutral-600 bg-black/5 px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 rounded-md font-assistant-title w-fit">
              <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 text-[#2D7A4D]" /> &lt;1.2s Detection
            </span>
            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] md:text-[13px] font-medium text-neutral-600 bg-black/5 px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 rounded-md font-assistant-title w-fit">
              <ShieldCheck className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 text-[#2D7A4D]" /> 98.6% Accuracy
            </span>
          </motion.div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: 55% PEEKING ILLUSTRATION WITH AUTO-SCALING (MAX 60VH)     */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className="w-[52%] sm:w-[55%] h-full max-h-[58vh] absolute right-0 flex items-center justify-end pointer-events-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Organic Green Backdrop Container (Bleeds off right edge) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[340px] sm:w-[460px] md:w-[580px] lg:w-[660px] h-[380px] sm:h-[540px] md:h-[660px] lg:h-[740px] pointer-events-none flex items-center justify-center">

            {/* Organic Green Fluid Shape */}
            <div
              className="absolute w-[360px] sm:w-[480px] md:w-[600px] lg:w-[680px] h-[380px] sm:h-[500px] md:h-[620px] lg:h-[700px] rounded-[34%_66%_42%_58%/52%_38%_62%_48%] bg-[#D6E6CC] shadow-inner transition-transform duration-700 ease-out pointer-events-none"
              style={{
                transform: `rotate(${isHovered ? "-2deg" : "-7deg"}) scale(${isHovered ? "1.03" : "1"})`,
              }}
            />
            <div className="absolute w-[280px] sm:w-[370px] md:w-[460px] h-[280px] sm:h-[370px] md:h-[460px] rounded-[40%_60%_48%_52%/54%_42%_58%_46%] bg-[#C5DCB9]/50 blur-xl md:blur-2xl pointer-events-none" />

            {/* Plant Image: Auto-Scales smoothly with max-h-[42vh] / md:max-h-[54vh] */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center z-10"
            >
              <Image
                src="/images/onboarding_plant.png"
                alt="Lush Bird of Paradise Plant"
                width={896}
                height={1161}
                priority
                className="max-h-[40vh] sm:max-h-[48vh] md:max-h-[54vh] w-auto object-contain drop-shadow-2xl select-none"
              />
            </motion.div>
          </div>

          {/* Magnifying Glass Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, -18, -8, 10, -14, 6, 0],
              y: [0, 24, -12, 16, -20, 8, 0],
              rotate: [0, -5, 4, -3, 5, -2, 0]
            }}
            transition={{
              opacity: { duration: 0.7 },
              scale: { duration: 0.7 },
              x: { repeat: Infinity, duration: 8.5, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 8.5, ease: "easeInOut" },
              rotate: { repeat: Infinity, duration: 8.5, ease: "easeInOut" }
            }}
            className="absolute left-[-15px] sm:left-[0px] md:left-[20px] top-[14%] sm:top-[16%] md:top-[18%] w-[120px] sm:w-[170px] md:w-[220px] lg:w-[250px] h-[120px] sm:h-[170px] md:h-[220px] lg:h-[250px] z-30 pointer-events-none cursor-pointer"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/onboarding_lens.png"
                alt="Optical Magnifying Glass"
                width={810}
                height={866}
                priority
                className="w-full h-full object-contain filter drop-shadow-2xl select-none"
              />
              <div className="absolute top-[8%] right-[10%] w-[68%] h-[68%] rounded-full overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-black/10 rounded-full" />
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. PERSISTENT FOOTER BAR                                                  */}
      {/* ========================================================================= */}
      <footer className="w-full shrink-0 flex flex-col pt-1.5 sm:pt-2 md:pt-4 pb-safe border-t border-neutral-300/40 relative z-30">
        <div className="w-full flex items-center justify-between gap-2 sm:gap-3">

          {/* Subtitle Description */}
          <div className="max-w-[170px] sm:max-w-xs md:max-w-md space-y-0.5 md:space-y-1">
            <p className="text-[11px] sm:text-[13px] md:text-[15px] leading-snug font-medium text-neutral-700 font-assistant-title line-clamp-2">
              Instant leaf symptom analysis with high-accuracy AI diagnosis.
            </p>
            <div className="text-[9px] sm:text-[10px] md:text-[12px] text-neutral-500 font-mono">
              Speed: <strong className="text-neutral-900">0.8s</strong> | Offline Ready
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="shrink-0">
            {onNext ? (
              <button
                onClick={onNext}
                className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full bg-[#111111] hover:bg-[#222222] active:scale-95 text-[#F4F3ED] text-[12px] sm:text-[14px] md:text-[16px] font-semibold tracking-wide font-assistant-title shadow-lg shadow-black/15 transition-all duration-200 cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1 text-[#95CF3A]" />
              </button>
            ) : (
              <Link
                href={targetHref}
                className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full bg-[#111111] hover:bg-[#222222] active:scale-95 text-[#F4F3ED] text-[12px] sm:text-[14px] md:text-[16px] font-semibold tracking-wide font-assistant-title shadow-lg shadow-black/15 transition-all duration-200 cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1 text-[#95CF3A]" />
              </Link>
            )}
          </div>

        </div>

        {/* 4 Active Indicator Dots + Status Badge */}
        <div className="mt-1.5 sm:mt-2 md:mt-3 flex items-center justify-between text-[9px] sm:text-[10px] md:text-[12px] text-neutral-400 font-mono">
          <span>AgriVani Neural Core v4.2</span>

          {/* Indicator Dots (1st Active) */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            <span className="w-3.5 sm:w-4 md:w-6 h-1.5 md:h-2 rounded-full bg-[#2D7A4D]" />
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-neutral-300" />
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-neutral-300" />
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-neutral-300" />
          </div>

          <span className="flex items-center gap-1 md:gap-1.5">
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#22C55E]" />
            Camera Live
          </span>
        </div>
      </footer>
    </div>
  );
}
