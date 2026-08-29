"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Play,
  Clock,
  Video,
  ChevronRight,
  ShieldCheck,
  Ban,
  Eye,
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

export default function LeafBlastAlertPage() {
  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      <main className="w-full max-w-md md:max-w-xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top Header */}
        <header className="px-4 py-3.5 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-tight">
                Crop Disease Alert
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                Rice / Paddy Crop
              </p>
            </div>
          </div>

          <span className="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            High Risk
          </span>
        </header>

        {/* Content Body */}
        <div className="p-4 space-y-4 flex-1">

          {/* Alert Highlight Banner */}
          <div className="bg-red-500 text-white rounded-2xl p-4 shadow-sm space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-base font-semibold">
                Rice Leaf Blast Spreading
              </h2>
            </div>
            <p className="text-xs text-red-50 font-normal leading-relaxed">
              Warm temperature and morning humidity are accelerating fungal spread in paddy crops. Check your field closely for early symptoms.
            </p>
          </div>

          {/* 1. Disease Description & Crop Appearance */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#2D7A4D]" />
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                1. Disease & How It Appears on Crops
              </h3>
            </div>

            {/* General Overview */}
            <p className="text-xs text-gray-700 font-normal leading-relaxed">
              <strong>Rice Blast</strong> is a fungal infection that travels rapidly through the air during cloudy, humid days. It attacks leaves, stems, and grain heads at all stages of growth.
            </p>

            {/* Visual Symptoms Breakdown */}
            <div className="space-y-2.5 pt-1 text-xs text-gray-700 font-normal">
              
              {/* On Leaves */}
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <h4 className="font-semibold text-gray-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  On Leaves (Spindle Spots)
                </h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Begins as small water-soaked spots that quickly enlarge into <strong>eye-shaped or diamond spots</strong> with ash-gray center and dark brown edges. In severe cases, spots join together and leaves look scorched or burnt.
                </p>
              </div>

              {/* On Stem & Nodes */}
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <h4 className="font-semibold text-gray-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  On Stems & Nodes (Black Rings)
                </h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Joints of the plant stem turn <strong>dark brown or black and rot</strong>. The stem becomes brittle and easily breaks or lodges in wind.
                </p>
              </div>

              {/* On Grain Heads */}
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <h4 className="font-semibold text-gray-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  On Grain Heads (Neck Rot & White Grains)
                </h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  A black rot attacks the base of the panicle head. Grain filling stops completely, resulting in <strong>erect, light, empty white grains</strong>.
                </p>
              </div>

            </div>
          </div>

          {/* 2. Simple & Practical Remedies */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
              2. Recommended Remedies
            </h3>

            {/* Chemical Spray */}
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1B4D2E]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Medicine Spray (Quick Relief)</span>
              </div>
              <p className="text-xs font-semibold text-gray-900">
                Tricyclazole 75% WP (Beam / Baan)
              </p>
              <p className="text-[11px] text-gray-600 font-normal">
                <strong>Dosage:</strong> 120 grams per acre (mix 1.5 grams in 1 Liter water). Spray evenly over leaves in the morning.
              </p>
            </div>

            {/* Organic Spray */}
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Natural / Organic Spray</span>
              </div>
              <p className="text-xs font-semibold text-gray-900">
                Neem Oil Solution
              </p>
              <p className="text-[11px] text-gray-600 font-normal">
                <strong>Dosage:</strong> Mix 30ml Neem Oil in 1 spray tank (15 Liters water) with a few drops of liquid soap.
              </p>
            </div>

            {/* Quick Farm Care Rules */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2 rounded-lg bg-red-50 border border-red-200 flex items-start gap-1.5 text-red-900">
                <Ban className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                <span>Stop applying extra Urea for 7 days.</span>
              </div>

              <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-1.5 text-emerald-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Drain standing field water for 2 days.</span>
              </div>
            </div>
          </div>

          {/* 3. Video Demonstration (Redirects to Learn) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-[#2D7A4D]">
                  <Video className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  3. Watch Remedy Video
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-[#2D7A4D] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Learn Section
              </span>
            </div>

            {/* Video Thumbnail Box */}
            <Link
              href="/learn"
              className="block relative w-full h-40 rounded-xl overflow-hidden shadow-sm group cursor-pointer border border-gray-200 active:scale-98 transition"
            >
              <Image
                src="/images/farm_weather_scenic.jpg"
                alt="Rice Blast Video"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white text-[#1B4D2E] flex items-center justify-center shadow-xl pl-0.5 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-[#1B4D2E]" />
                </div>
              </div>

              {/* Duration */}
              <div className="absolute bottom-2.5 right-2.5 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>5 mins</span>
              </div>

              <div className="absolute bottom-2.5 left-2.5 text-white text-xs font-semibold drop-shadow-sm pr-16 line-clamp-1">
                How to mix and spray blast medicine properly
              </div>
            </Link>

            {/* CTA Button linking to Learn Section */}
            <Link
              href="/learn"
              className="w-full flex items-center justify-center gap-2 bg-[#2D7A4D] hover:bg-[#236B3E] active:scale-98 text-white py-2.5 rounded-xl text-xs font-semibold transition shadow-sm"
            >
              <span>Watch in Learn Section</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
