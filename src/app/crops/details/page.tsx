"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Droplets,
  ShieldCheck,
  Sprout,
  Trash2,
  AlertCircle,
  Thermometer,
  CloudRain,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  CropDetail,
  getCropVisual,
} from "@/components/HomeCropTracker";

function CropDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const cropId = searchParams.get("id");

  const [crop, setCrop] = useState<CropDetail | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("agrivani_is_logged_in") === "true";
      if (!isLoggedIn) {
        router.replace("/auth");
        return;
      }
      const saved = localStorage.getItem("agrivani_farmer_crops_detailed");
      if (saved) {
        try {
          const list: CropDetail[] = JSON.parse(saved);
          if (cropId) {
            const found = list.find((c) => c.id === cropId);
            if (found) {
              setCrop(found);
              return;
            }
          }
          if (list.length > 0) {
            setCrop(list[0]);
          }
        } catch {}
      }
    }
  }, [cropId]);

  const handleDeleteCrop = () => {
    if (!crop) return;
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("agrivani_farmer_crops_detailed");
      if (saved) {
        try {
          const list: CropDetail[] = JSON.parse(saved);
          const updated = list.filter((c) => c.id !== crop.id);
          localStorage.setItem("agrivani_farmer_crops_detailed", JSON.stringify(updated));

          // Sync summary
          const cropNames = updated.map((c) => c.name);
          const totalArea = updated
            .reduce((sum, c) => sum + (parseFloat(c.area) || 0), 0)
            .toFixed(1);

          const existingProfileStr = localStorage.getItem("agrivani_farmer_profile");
          const profile = existingProfileStr ? JSON.parse(existingProfileStr) : {};
          profile.crops = cropNames;
          if (totalArea) profile.farmSize = totalArea;
          localStorage.setItem("agrivani_farmer_profile", JSON.stringify(profile));
        } catch {}
      }
    }
    router.push("/home");
  };

  if (!crop) {
    return (
      <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
        <main className="w-full max-w-md md:max-w-xl bg-[#FDFFF1] min-h-screen flex flex-col p-6 items-center justify-center text-center space-y-4 sm:rounded-3xl border-0 sm:border sm:border-gray-200">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#144733] flex items-center justify-center border border-emerald-200">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Crop Not Found</h2>
            <p className="text-xs text-gray-500 mt-1">Please select an existing crop or add a new one.</p>
          </div>
          <Link
            href="/home"
            className="bg-[#144733] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs"
          >
            Return to Dashboard
          </Link>
        </main>
      </div>
    );
  }

  const visual = getCropVisual(crop.name);
  const CropSvg = visual.Icon;

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      <main className="w-full max-w-md md:max-w-xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-16 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top Header */}
        <header className="px-4 py-3.5 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/home"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-tight">
                {crop.name} {t.cropDetailsTitle}
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                Variety: {crop.variety}
              </p>
            </div>
          </div>

          <button
            onClick={handleDeleteCrop}
            className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-700 flex items-center justify-center border border-red-200 transition active:scale-95 cursor-pointer"
            title="Remove Crop"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </header>

        {/* Details Content */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          
          {/* 1. Hero Crop Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs ${visual.bg}`}
                >
                  <CropSvg className="w-9 h-9" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 leading-tight">
                    {crop.name}
                  </h2>
                  <p className="text-xs text-gray-600 font-medium mt-0.5">
                    Variety: <span className="text-gray-900 font-bold">{crop.variety}</span>
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${visual.pillBg}`}>
                      {crop.area} {crop.unit} Sown
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {crop.healthStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Progress Bar */}
            <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-700 font-medium">
                <span className="font-bold text-[#144733]">{crop.stage}</span>
                <span className="font-semibold text-gray-900">{crop.daysPlanted} Days Sown</span>
              </div>
              <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#144733] to-[#95CF3A] rounded-full transition-all duration-500"
                  style={{ width: `${crop.stageProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-400 pt-0.5">
                <span>Planted: {crop.sowingDate}</span>
                <span>Expected Harvest: ~80-110 Days</span>
              </div>
            </div>
          </div>

          {/* 2. Key Field Attributes */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-1">
              <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-[#144733]" />
                <span>Sowing Date</span>
              </div>
              <span className="text-xs font-bold text-gray-900 block">
                {crop.sowingDate}
              </span>
              <span className="text-[10px] text-gray-400 block">
                {crop.daysPlanted} days of active care
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-1">
              <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                <Droplets className="w-3.5 h-3.5 text-sky-500" />
                <span>Irrigation Method</span>
              </div>
              <span className="text-xs font-bold text-gray-900 block">
                {crop.irrigation}
              </span>
              <span className="text-[10px] text-gray-400 block">
                Regular water supply active
              </span>
            </div>
          </div>

          {/* 3. Stage-Specific Agronomic Advisory */}
          <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#144733] text-[#95CF3A] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold text-[#144733]">
                Agronomic Recommendations for {crop.stage}
              </h3>
            </div>

            <ul className="text-xs text-emerald-950 space-y-2 pt-1">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Water Management:</strong> Keep field moisture steady. Avoid deep standing water during early tillering.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Nutrient Top-Dressing:</strong> Apply balanced nitrogen / urea supplement during peak vegetative tillers.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>
                  <strong>Pest Scouting:</strong> Inspect lower canopy and stem bases every 3 days for leaf blast or stem borer symptoms.
                </span>
              </li>
            </ul>
          </div>

          {/* 4. Action Buttons */}
          <div className="space-y-2 pt-2">
            <Link
              href="/detection"
              className="w-full bg-[#144733] hover:bg-[#1B4D2E] text-white py-3.5 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-[#144733]/20 active:scale-98 transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#95CF3A]" />
              <span>Scan Leaf for Crop Diseases</span>
            </Link>

            <Link
              href="/crops/add"
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 py-3 rounded-2xl text-xs font-semibold flex items-center justify-center transition active:scale-98 cursor-pointer"
            >
              + Add Another Crop
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function CropDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFFF1]" />}>
      <CropDetailsContent />
    </Suspense>
  );
}
