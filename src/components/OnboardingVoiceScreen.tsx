"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Languages,
  Radio,
} from "lucide-react";

interface OnboardingVoiceScreenProps {
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  nextHref?: string;
  backHref?: string;
  className?: string;
}

const FLOATING_LETTERS = [
  {
    id: "letter-devanagari",
    char: "त",
    fontClass: "font-devanagari",
    charSize: "text-[20px] sm:text-[23px]",
    language: "हिन्दी",
    top: "top-[2%]",
    left: "left-[24%]",
    color: "#1B4D2E",
    yRange: [-5, 5, -5],
    xRange: [-2, 2, -2],
    rotateRange: [-4, 4, -4],
    duration: 3.8,
    delay: 0
  },
  {
    id: "letter-latin",
    char: "A",
    fontClass: "font-editorial",
    charSize: "text-[18px] sm:text-[21px]",
    language: "English",
    top: "top-[19%]",
    left: "left-[42%]",
    color: "#111111",
    yRange: [5, -6, 5],
    xRange: [2, -2, 2],
    rotateRange: [4, -4, 4],
    duration: 4.4,
    delay: 0.25
  },
  {
    id: "letter-gurmukhi",
    char: "ਣ",
    fontClass: "font-gurmukhi",
    charSize: "text-[18px] sm:text-[21px]",
    language: "ਪੰਜਾਬੀ",
    top: "top-[37%]",
    left: "left-[50%]",
    color: "#1E3A8A",
    yRange: [-4, 5, -4],
    xRange: [-2, 2, -2],
    rotateRange: [-4, 4, -4],
    duration: 4.0,
    delay: 0.45
  },
  {
    id: "letter-gujarati",
    char: "ટ",
    fontClass: "font-gujarati",
    charSize: "text-[18px] sm:text-[21px]",
    language: "ગુજરાતી",
    top: "top-[55%]",
    left: "left-[40%]",
    color: "#B45309",
    yRange: [4, -5, 4],
    xRange: [2, -2, 2],
    rotateRange: [4, -4, 4],
    duration: 4.6,
    delay: 0.65
  },
  {
    id: "letter-bengali",
    char: "২",
    fontClass: "font-bengali",
    charSize: "text-[20px] sm:text-[23px]",
    language: "বাংলা",
    top: "top-[73%]",
    left: "left-[24%]",
    color: "#7C2D12",
    yRange: [4, -5, 4],
    xRange: [-2, 2, -2],
    rotateRange: [-4, 4, -4],
    duration: 4.2,
    delay: 0.85
  },
  {
    id: "letter-tamil",
    char: "ஈ",
    fontClass: "font-tamil",
    charSize: "text-[16px] sm:text-[19px]",
    language: "தமிழ்",
    top: "top-[90%]",
    left: "left-[8%]",
    color: "#2D7A4D",
    yRange: [-4, 5, -4],
    xRange: [-2, 2, -2],
    rotateRange: [-4, 4, -4],
    duration: 5.0,
    delay: 1.05
  }
];

export default function OnboardingVoiceScreen({
  onNext,
  onBack,
  onSkip,
  nextHref = "/",
  backHref,
  className = "",
}: OnboardingVoiceScreenProps) {
  const [activeLetterId, setActiveLetterId] = useState<string>("letter-devanagari");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-full h-full min-h-[100dvh] sm:min-h-0 bg-[#F5F4EE] text-[#191919] flex flex-col justify-between overflow-hidden p-3.5 xs:p-4 sm:p-6 md:p-8 lg:p-10 select-none relative font-sans ${className}`}
    >
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,500;1,6..72,700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&family=Noto+Sans+Devanagari:wght@600;700&family=Noto+Sans+Tamil:wght@600;700&family=Noto+Sans+Gurmukhi:wght@600;700&family=Noto+Sans+Gujarati:wght@600;700&family=Noto+Sans+Bengali:wght@600;700&display=swap');

        .font-assistant-title {
          font-family: var(--font-assistant), 'Assistant', sans-serif;
        }
        .font-editorial {
          font-family: 'Newsreader', 'Playfair Display', Georgia, serif;
        }
        .font-devanagari { font-family: 'Noto Sans Devanagari', sans-serif; }
        .font-tamil { font-family: 'Noto Sans Tamil', sans-serif; }
        .font-gurmukhi { font-family: 'Noto Sans Gurmukhi', sans-serif; }
        .font-gujarati { font-family: 'Noto Sans Gujarati', sans-serif; }
        .font-bengali { font-family: 'Noto Sans Bengali', sans-serif; }
      `}</style>

      {/* Subtle Ambient Background Light */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 left-1/3 w-72 md:w-96 h-72 md:h-96 bg-[#EAEFE2] rounded-full blur-3xl opacity-50" />
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP HEADER (Logo, Skip) - Responsive Height                            */}
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
              href={nextHref}
              className="font-assistant-title font-bold text-base sm:text-lg md:text-xl tracking-tight text-[#1B4D2E] hover:opacity-80 transition-opacity px-2 py-1 rounded-lg"
            >
              Skip
            </Link>
          )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MIDDLE HERO: 55% PEEKING MIC ON LEFT + 50% TEXT ON RIGHT              */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full relative flex items-center justify-between min-h-0 my-auto">

        {/* ----------------------------------------------------------------------- */}
        {/* LEFT: 55% PEEKING MIC & 6 FLOATING ORBIT CARDS                          */}
        {/* ----------------------------------------------------------------------- */}
        <div
          className="w-[50%] sm:w-[55%] h-full max-h-[58vh] absolute left-0 flex items-center justify-start pointer-events-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Backdrop Container */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[48%] w-[340px] sm:w-[460px] md:w-[580px] lg:w-[660px] h-[380px] sm:h-[540px] md:h-[660px] lg:h-[740px] pointer-events-none flex items-center justify-center">

            {/* Grand Organic Shape */}
            <div
              className="absolute w-[360px] sm:w-[480px] md:w-[600px] lg:w-[680px] h-[380px] sm:h-[500px] md:h-[620px] lg:h-[700px] rounded-[66%_34%_58%_42%/38%_52%_48%_62%] bg-[#D6E6CC] shadow-inner transition-transform duration-700 ease-out pointer-events-none"
              style={{
                transform: `rotate(${isHovered ? "2deg" : "6deg"}) scale(${isHovered ? "1.03" : "1"})`,
              }}
            />
            <div className="absolute w-[280px] sm:w-[360px] md:w-[460px] h-[280px] sm:h-[360px] md:h-[460px] rounded-[50%_50%_48%_52%/48%_52%_48%_52%] bg-[#C5DCB9]/50 blur-xl md:blur-2xl pointer-events-none" />

            {/* Microphone with max-h-[40vh] / md:max-h-[54vh] */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{
                opacity: 1,
                scale: 0.84,
                y: [0, -6, 0]
              }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 0.8 },
                y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
              }}
              className="relative w-full h-full flex items-center justify-center z-10"
            >
              <Image
                src="/images/onboarding_mic.png"
                alt="Vintage Studio Microphone"
                width={574}
                height={1049}
                priority
                className="max-h-[40vh] sm:max-h-[48vh] md:max-h-[54vh] w-auto object-contain drop-shadow-2xl select-none"
              />
            </motion.div>
          </div>

          {/* Floating Multilingual Orbit Glyphs */}
          <div className="absolute left-[10%] sm:left-[15%] md:left-[18%] top-[2%] bottom-[2%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-auto">
            {FLOATING_LETTERS.map((letter) => {
              const isActive = activeLetterId === letter.id;

              return (
                <motion.div
                  key={letter.id}
                  animate={{
                    y: letter.yRange,
                    x: letter.xRange,
                    rotate: letter.rotateRange
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: letter.duration,
                    delay: letter.delay,
                    ease: "easeInOut"
                  }}
                  onClick={() => setActiveLetterId(letter.id)}
                  className={`absolute ${letter.top} ${letter.left} z-20 cursor-pointer group transition-all duration-300 ${isActive ? "scale-110" : "opacity-90 hover:opacity-100"
                    }`}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-md flex items-center justify-center group-hover:border-[#2D7A4D]/50 transition-colors">
                      <span
                        className={`${letter.fontClass} ${letter.charSize} font-bold leading-none select-none`}
                        style={{ color: letter.color }}
                      >
                        {letter.char}
                      </span>
                    </div>
                    <span className="mt-0.5 px-1 sm:px-1.5 py-0.5 rounded-full bg-black/80 backdrop-blur-sm text-white text-[6.5px] sm:text-[8px] md:text-[9.5px] font-mono font-medium shadow-xs whitespace-nowrap">
                      {letter.language}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT: 50% EDITORIAL TYPOGRAPHY                                         */}
        {/* ----------------------------------------------------------------------- */}
        <div className="w-[52%] sm:w-[50%] md:w-[48%] ml-auto z-20 flex flex-col items-start gap-1.5 sm:gap-3.5 md:gap-5 pl-2 sm:pl-4 md:pl-6 select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1 sm:space-y-1.5 md:space-y-2.5 max-w-full"
          >
            {/* Feature Pill Chip */}
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-0.5 md:px-3 md:py-1 rounded-full bg-[#E2EBD9] border border-[#CBDCC0] text-[#1B4D2E] text-[9px] sm:text-[11px] md:text-[13px] font-semibold tracking-wide font-assistant-title shadow-xs">
              <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-[#2D7A4D] animate-pulse" />
              <span>VOICE ASSISTANT v3.1</span>
            </div>

            {/* Headline */}
            <h1 className="leading-[1.04] tracking-tight text-[#111111] max-w-full">
              <span className="font-assistant-title font-extrabold text-[24px] xs:text-[28px] sm:text-[36px] md:text-[46px] lg:text-[52px] text-[#111111] block whitespace-nowrap">
                Multilingual
              </span>
              <span className="font-editorial italic font-normal text-[22px] xs:text-[25px] sm:text-[32px] md:text-[42px] lg:text-[48px] text-[#1B4D2E] block -mt-0.5 md:-mt-1 whitespace-nowrap">
                Voice Guidance.
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
            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] md:text-[13px] font-medium text-neutral-600 bg-black/5 px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 rounded-md font-assistant-title">
              <Languages className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 text-[#2D7A4D]" /> 12 Languages
            </span>
            <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] md:text-[13px] font-medium text-neutral-600 bg-black/5 px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 rounded-md font-assistant-title">
              <Radio className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 text-[#2D7A4D]" /> Real-time Speech
            </span>
          </motion.div>
        </div>

      </main>

      {/* ========================================================================= */}
      {/* 3. PERSISTENT FOOTER BAR                                                  */}
      {/* ========================================================================= */}
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
                Full advisory interactions in Hindi, Marathi, and regional languages.
              </p>
              <div className="text-[8.5px] sm:text-[10px] md:text-[12px] text-neutral-500 font-mono">
                Languages: <strong className="text-neutral-900">12 Regional</strong>
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

        {/* Indicator dots (2nd active) */}
        <div className="mt-1.5 sm:mt-2 md:mt-3 flex items-center justify-between text-[9px] sm:text-[10px] md:text-[12px] text-neutral-400 font-mono">
          <span>AgriVani Audio Neural Network</span>

          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-neutral-300" />
            <span className="w-3.5 sm:w-4 md:w-6 h-1.5 md:h-2 rounded-full bg-[#2D7A4D]" />
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-neutral-300" />
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-neutral-300" />
          </div>

          <span className="flex items-center gap-1 md:gap-1.5">
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#22C55E]" />
            Voice Core Active
          </span>
        </div>
      </footer>
    </div>

  );
}
