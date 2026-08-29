"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Bug,
  Leaf,
  FlaskConical,
} from "lucide-react";

interface OnboardingPestScreenProps {
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  nextHref?: string;
  backHref?: string;
  className?: string;
}

export default function OnboardingPestScreen({
  onNext,
  onBack,
  onSkip,
  nextHref = "/onboarding/weather",
  backHref = "/onboarding/voice",
  className = "",
}: OnboardingPestScreenProps) {
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

        @keyframes shieldPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 14px rgba(74,222,128,0.4)); }
          50% { transform: scale(1.04); filter: drop-shadow(0 0 24px rgba(74,222,128,0.75)); }
        }
        @keyframes rippleOut {
          0% { transform: scale(0.85); opacity: 0.8; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        @keyframes raySweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .shield-pulse { animation: shieldPulse 3s ease-in-out infinite; }
        .ripple-1 { animation: rippleOut 2.4s cubic-bezier(0.2, 0.8, 0.4, 1) infinite; }
        .ray-sweep { animation: raySweep 12s linear infinite; }
      `}</style>

      {/* Subtle Ambient Background Light */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-72 md:w-96 h-72 md:h-96 bg-[#EAEFE2] rounded-full blur-3xl opacity-50" />
      </div>

      {/* ================================================================ */}
      {/* 1. TOP HEADER (Logo, Skip) - Responsive Height                    */}
      {/* ================================================================ */}
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
              href={nextHref}
              className="font-assistant-title font-bold text-base sm:text-lg md:text-xl tracking-tight text-[#1B4D2E] hover:opacity-80 transition-opacity px-2 py-1 rounded-lg"
            >
              Skip
            </Link>
          )}
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. MIDDLE HERO: 50% TEXT ON LEFT + 55% PEEKING LEAF ON RIGHT     */}
      {/* ================================================================ */}
      <main className="flex-1 w-full relative flex items-center justify-between min-h-0 my-auto">

        {/* -------------------------------------------------------------- */}
        {/* LEFT COLUMN: EDITORIAL TYPOGRAPHY & CHIPS (50% WIDTH)          */}
        {/* -------------------------------------------------------------- */}
        <div className="w-[52%] sm:w-[50%] md:w-[48%] z-20 flex flex-col items-start gap-1.5 sm:gap-3.5 md:gap-5 pr-1 sm:pr-4 select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1 sm:space-y-1.5 md:space-y-2"
          >
            {/* Feature pill chip */}
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-0.5 md:px-3 md:py-1 rounded-full bg-[#E2EBD9] border border-[#CBDCC0] text-[#1B4D2E] text-[9px] sm:text-[11px] md:text-[13px] font-semibold tracking-wide font-assistant-title shadow-xs">
              <Bug className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 text-[#2D7A4D]" />
              <span>PEST MANAGEMENT</span>
            </div>

            <h1 className="leading-[1.04] tracking-tight text-[#111111]">
              <span className="font-assistant-title font-extrabold text-[22px] xs:text-[26px] sm:text-[34px] md:text-[44px] lg:text-[50px] text-[#111111] block">
                Integrated
              </span>
              <span className="font-assistant-title font-extrabold text-[22px] xs:text-[26px] sm:text-[34px] md:text-[44px] lg:text-[50px] text-[#111111] block -mt-0.5">
                Pest
              </span>
              <span className="font-editorial italic font-normal text-[20px] xs:text-[24px] sm:text-[32px] md:text-[40px] lg:text-[46px] text-[#1B4D2E] block -mt-0.5 md:-mt-1">
                Management.
              </span>
            </h1>
          </motion.div>

          {/* Feature tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col gap-1 sm:gap-1.5 md:gap-2"
          >
            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] md:text-[13px] font-medium text-neutral-600 bg-black/5 px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 rounded-md font-assistant-title w-fit">
              <Leaf className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 text-[#2D7A4D]" /> Biological First
            </span>
            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] md:text-[13px] font-medium text-neutral-600 bg-black/5 px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 rounded-md font-assistant-title w-fit">
              <FlaskConical className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 text-amber-600" /> Low Chemical
            </span>
          </motion.div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* RIGHT COLUMN: 55% PEEKING LEAF + PROTECTIVE SHIELD (MAX 60VH)  */}
        {/* -------------------------------------------------------------- */}
        <div
          className="w-[52%] sm:w-[55%] h-full max-h-[58vh] absolute right-0 flex items-center justify-end pointer-events-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Backdrop Container */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[340px] sm:w-[460px] md:w-[580px] lg:w-[660px] h-[380px] sm:h-[540px] md:h-[660px] lg:h-[740px] pointer-events-none flex items-center justify-center">

            {/* Grand Organic Shape */}
            <div
              className="absolute w-[360px] sm:w-[480px] md:w-[600px] lg:w-[680px] h-[380px] sm:h-[500px] md:h-[620px] lg:h-[700px] rounded-[34%_66%_42%_58%/52%_38%_62%_48%] bg-[#D6E6CC] shadow-inner transition-transform duration-700 ease-out pointer-events-none"
              style={{
                transform: `rotate(${isHovered ? "-2deg" : "-7deg"}) scale(${isHovered ? "1.03" : "1"})`,
              }}
            />
            <div className="absolute w-[280px] sm:w-[370px] md:w-[460px] h-[280px] sm:h-[370px] md:h-[460px] rounded-[40%_60%_48%_52%/54%_42%_58%_46%] bg-[#C5DCB9]/50 blur-xl md:blur-2xl pointer-events-none" />

            {/* Leaf Layer with max-h-[40vh] / md:max-h-[54vh] */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -7, 0],
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                y: { repeat: Infinity, duration: 5.5, ease: "easeInOut" },
              }}
              className="relative w-full h-full flex items-center justify-center z-10"
            >
              <Image
                src="/images/onboarding_leaf.png"
                alt="Leaf with caterpillar pest"
                width={896}
                height={1200}
                priority
                className="max-h-[40vh] sm:max-h-[48vh] md:max-h-[54vh] w-auto object-contain drop-shadow-2xl select-none"
              />
            </motion.div>
          </div>

          {/* Protective Shield Badge (Enlarged with bold white tick inside) */}
          <div className="absolute left-[10px] xs:left-[20px] sm:left-[38px] md:left-[55px] top-[48%] -translate-y-1/2 z-30" style={{ opacity: 0.96 }}>
            <div
              className="ray-sweep absolute pointer-events-none"
              style={{
                width: "290px",
                height: "240px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(ellipse, rgba(74,222,128,0.24) 0%, rgba(74,222,128,0.08) 55%, transparent 100%)",
                borderRadius: "50%",
              }}
            />
            <div
              className="ripple-1 absolute pointer-events-none border border-emerald-400/40 rounded-full"
              style={{
                width: "145px",
                height: "145px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              className="ripple-2 absolute pointer-events-none border border-emerald-300/30 rounded-full"
              style={{
                width: "145px",
                height: "145px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            <div
              className="relative flex items-center justify-center cursor-pointer transition-all duration-300 shield-pulse"
              style={{ width: "100px", height: "120px" }}
            >
              <svg
                viewBox="0 0 100 120"
                className="w-full h-full drop-shadow-2xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="shieldGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#15803d" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#166534" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#14532d" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="shieldBorder4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#86efac" />
                    <stop offset="50%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                  <filter id="whiteTickShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
                  </filter>
                </defs>

                {/* Outer Shield Base */}
                <path
                  d="M50 4 L88 20 C88 68 50 108 50 114 C50 108 12 68 12 20 Z"
                  fill="url(#shieldGrad4)"
                  stroke="url(#shieldBorder4)"
                  strokeWidth="2.8"
                />

                {/* Soft Halo & Grid Accent */}
                <circle cx="50" cy="56" r="25" fill="rgba(255,255,255,0.08)" stroke="rgba(134,239,172,0.3)" strokeWidth="1" strokeDasharray="3 2" />

                {/* Bold White Tick Mark */}
                <path
                  d="M34 56 L45 67 L67 43"
                  stroke="#FFFFFF"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#whiteTickShadow)"
                />
              </svg>

              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-950/95 border border-emerald-500/50 text-[7.5px] sm:text-[8.5px] font-mono font-medium text-emerald-300 whitespace-nowrap shadow-sm">
                PROTECTED
              </span>
            </div>
          </div>

        </div>
      </main>

      {/* ================================================================ */}
      {/* 3. PERSISTENT FOOTER BAR                                         */}
      {/* ================================================================ */}
      <footer className="w-full shrink-0 flex flex-col pt-1.5 sm:pt-2 md:pt-4 pb-safe border-t border-neutral-300/40 relative z-30">
        <div className="w-full flex items-center justify-between gap-2 sm:gap-3">

          {/* Bottom Left: Back + Subtitle */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            {onBack ? (
              <button
                onClick={onBack}
                aria-label="Previous step"
                className="group relative inline-flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 md:px-4 md:py-3 rounded-full bg-white/90 hover:bg-white active:scale-95 text-neutral-800 border border-neutral-300/80 text-[11px] sm:text-[13px] md:text-[14px] font-semibold tracking-wide font-assistant-title shadow-sm transition-all duration-200 cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 stroke-[2.2] transition-transform duration-200 group-hover:-translate-x-1 text-neutral-600" />
                <span>Back</span>
              </button>
            ) : backHref ? (
              <Link
                href={backHref}
                aria-label="Previous step"
                className="group relative inline-flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 md:px-4 md:py-3 rounded-full bg-white/90 hover:bg-white active:scale-95 text-neutral-800 border border-neutral-300/80 text-[11px] sm:text-[13px] md:text-[14px] font-semibold tracking-wide font-assistant-title shadow-sm transition-all duration-200 cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 stroke-[2.2] transition-transform duration-200 group-hover:-translate-x-1 text-neutral-600" />
                <span>Back</span>
              </Link>
            ) : null}

            <div className="max-w-[140px] xs:max-w-[170px] sm:max-w-xs md:max-w-md space-y-0.5 md:space-y-1">
              <p className="text-[10.5px] sm:text-[13px] md:text-[15px] leading-snug font-medium text-neutral-700 font-assistant-title line-clamp-2">
                Biological control first. Low chemical, high yield.
              </p>
              <div className="text-[8.5px] sm:text-[10px] md:text-[12px] text-neutral-500 font-mono">
                Target: <strong className="text-neutral-900">Eco IPM</strong> | 0 Residue
              </div>
            </div>
          </div>

          {/* Right: Next button */}
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
                href={nextHref}
                className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full bg-[#111111] hover:bg-[#222222] active:scale-95 text-[#F4F3ED] text-[12px] sm:text-[14px] md:text-[16px] font-semibold tracking-wide font-assistant-title shadow-lg shadow-black/15 transition-all duration-200 cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 stroke-[2.2] transition-transform duration-200 group-hover:translate-x-1 text-[#95CF3A]" />
              </Link>
            )}
          </div>
        </div>

        {/* Indicator dots (3rd active) */}
        <div className="mt-1.5 sm:mt-2 md:mt-3 flex items-center justify-between text-[9px] sm:text-[10px] md:text-[12px] text-neutral-400 font-mono">
          <span>AgriVani IPM Protection Core</span>

          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-neutral-300" />
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-neutral-300" />
            <span className="w-3.5 sm:w-4 md:w-6 h-1.5 md:h-2 rounded-full bg-[#2D7A4D]" />
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-neutral-300" />
          </div>

          <span className="flex items-center gap-1 md:gap-1.5">
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#22C55E]" />
            Shield Active
          </span>
        </div>
      </footer>
    </div>

  );
}
