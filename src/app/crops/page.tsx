"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Sprout, Droplets, ShieldCheck, ChevronRight } from "lucide-react";
import { CropDetail, getCropVisual } from "@/components/HomeCropTracker";
import { useLanguage } from "@/context/LanguageContext";

const DEFAULT_CROPS: CropDetail[] = [
  {
    id: "crop-1",
    name: "Rice (Paddy)",
    variety: "Pusa Basmati 1121",
    area: "2.5",
    unit: "Acres",
    sowingDate: "2026-07-12",
    daysPlanted: 48,
    stage: "Active Tillering Phase",
    stageProgress: 45,
    healthStatus: "Healthy",
    irrigation: "Canal & Borewell",
  },
  {
    id: "crop-2",
    name: "Wheat",
    variety: "HD-2967 (Kundan)",
    area: "2.0",
    unit: "Acres",
    sowingDate: "2026-08-01",
    daysPlanted: 28,
    stage: "Seedling & Crown Root",
    stageProgress: 25,
    healthStatus: "Healthy",
    irrigation: "Tube Well",
  },
];

export default function CropsOverviewPage() {
  const { t } = useLanguage();
  const [crops, setCrops] = useState<CropDetail[]>(DEFAULT_CROPS);
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("agrivani_farmer_crops_detailed");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCrops(parsed);
          }
        } catch {}
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      <main className="w-full max-w-md md:max-w-xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top Header */}
        <header className="px-4 py-3.5 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-tight">
                {t.myCropsTitle}
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                {crops.length} {t.activeCrops}
              </p>
            </div>
          </div>

          <Link
            href="/crops/add"
            className="flex items-center gap-1 bg-[#144733] hover:bg-[#1B4D2E] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5] text-[#95CF3A]" />
            <span>{t.addNewCrop}</span>
          </Link>
        </header>

        {/* Content */}
        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
          
          {/* Tabs */}
          <div className="bg-gray-200/70 p-1 rounded-xl grid grid-cols-2 gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("current")}
              className={`py-2 rounded-lg transition-all ${
                activeTab === "current"
                  ? "bg-white text-[#144733] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.currentCropsTab} ({crops.length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`py-2 rounded-lg transition-all ${
                activeTab === "past"
                  ? "bg-white text-[#144733] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.pastCropsTab}
            </button>
          </div>

          {activeTab === "current" ? (
            <div className="space-y-2.5 pt-1">
              {crops.map((crop) => {
                const visual = getCropVisual(crop.name);
                const CropSvg = visual.Icon;

                return (
                  <Link
                    key={crop.id}
                    href={`/crops/details?id=${crop.id}`}
                    className="block bg-white rounded-2xl p-3.5 border border-gray-200 shadow-xs hover:border-[#144733]/40 transition active:scale-[0.99] cursor-pointer group space-y-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-2xs ${visual.bg}`}
                        >
                          <CropSvg className="w-7 h-7 drop-shadow-xs" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-xs font-bold text-gray-900 leading-tight">
                              {crop.name}
                            </h3>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${visual.pillBg}`}>
                              {crop.area} {crop.unit}
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500 font-normal mt-0.5">
                            Variety: <span className="font-medium text-gray-700">{crop.variety}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>{crop.healthStatus}</span>
                      </div>
                    </div>

                    <div className="space-y-1 bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between text-[10px] text-gray-600 font-medium">
                        <span className="text-gray-800 font-semibold">{crop.stage}</span>
                        <span className="font-semibold text-gray-700">{crop.daysPlanted} {t.daysSown}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#144733] to-[#95CF3A] rounded-full"
                          style={{ width: `${crop.stageProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-0.5 border-t border-gray-100">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Droplets className="w-3 h-3 text-sky-500" />
                        {crop.irrigation}
                      </span>
                      <span className="text-[#144733] font-semibold flex items-center gap-0.5 group-hover:underline">
                        {t.viewAlertDetails} →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold text-gray-700">{t.pastCropsTab}</h3>
              <p className="text-[11px] text-gray-400">
                Completed crop seasons will be archived here.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
