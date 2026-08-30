"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sprout,
  Wheat,
  Leaf,
  Plus,
  Droplets,
  ShieldCheck,
  ChevronRight,
  Flower2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  GiWheat,
  GiCorn,
  GiCottonFlower,
  GiTomato,
  GiPotato,
  GiSugarCane,
  GiChiliPepper,
  GiGarlic,
  GiPeas,
  GiFlowerEmblem,
} from "react-icons/gi";
import { FaWheatAwn } from "react-icons/fa6";
import { PiGrainsBold, PiPlantBold } from "react-icons/pi";

export interface CropDetail {
  id: string;
  name: string;
  variety: string;
  area: string;
  unit: string;
  sowingDate: string;
  daysPlanted: number;
  stage: string;
  stageProgress: number; // 0 - 100
  healthStatus: "Healthy" | "Attention" | "Water Due";
  irrigation: string;
}

/**
 * Returns professional React Icon / Lucide icon configuration based on crop name
 */
export function getCropVisual(cropName: string) {
  const normalized = (cropName || "").toLowerCase();

  if (normalized.includes("rice") || normalized.includes("paddy") || normalized.includes("dhan")) {
    return {
      Icon: PiGrainsBold,
      bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      pillBg: "bg-emerald-100/80 text-emerald-800",
      accent: "#15803D",
    };
  }
  if (normalized.includes("wheat") || normalized.includes("gehun") || normalized.includes("kanak")) {
    return {
      Icon: GiWheat,
      bg: "bg-amber-50 border-amber-200 text-amber-700",
      pillBg: "bg-amber-100/80 text-amber-900",
      accent: "#B45309",
    };
  }
  if (normalized.includes("cotton") || normalized.includes("kapas")) {
    return {
      Icon: GiCottonFlower,
      bg: "bg-sky-50 border-sky-200 text-sky-700",
      pillBg: "bg-sky-100/80 text-sky-900",
      accent: "#0369A1",
    };
  }
  if (normalized.includes("maize") || normalized.includes("corn") || normalized.includes("makka")) {
    return {
      Icon: GiCorn,
      bg: "bg-yellow-50 border-yellow-200 text-yellow-700",
      pillBg: "bg-yellow-100/80 text-yellow-900",
      accent: "#A16207",
    };
  }
  if (normalized.includes("mustard") || normalized.includes("sarson") || normalized.includes("rai")) {
    return {
      Icon: GiFlowerEmblem,
      bg: "bg-yellow-50 border-yellow-200 text-yellow-700",
      pillBg: "bg-yellow-100/80 text-yellow-900",
      accent: "#A16207",
    };
  }
  if (normalized.includes("tomato") || normalized.includes("tamatar")) {
    return {
      Icon: GiTomato,
      bg: "bg-rose-50 border-rose-200 text-rose-700",
      pillBg: "bg-rose-100/80 text-rose-900",
      accent: "#BE123C",
    };
  }
  if (normalized.includes("sugarcane") || normalized.includes("ganna")) {
    return {
      Icon: GiSugarCane,
      bg: "bg-lime-50 border-lime-200 text-lime-700",
      pillBg: "bg-lime-100/80 text-lime-900",
      accent: "#4D7C0F",
    };
  }
  if (normalized.includes("potato") || normalized.includes("aaloo") || normalized.includes("alu")) {
    return {
      Icon: GiPotato,
      bg: "bg-orange-50 border-orange-200 text-orange-800",
      pillBg: "bg-orange-100/80 text-orange-900",
      accent: "#C2410C",
    };
  }
  if (normalized.includes("soybean") || normalized.includes("gram") || normalized.includes("chana") || normalized.includes("pulse")) {
    return {
      Icon: GiPeas,
      bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      pillBg: "bg-emerald-100/80 text-emerald-900",
      accent: "#15803D",
    };
  }
  if (normalized.includes("onion") || normalized.includes("pyaz") || normalized.includes("garlic")) {
    return {
      Icon: GiGarlic,
      bg: "bg-purple-50 border-purple-200 text-purple-700",
      pillBg: "bg-purple-100/80 text-purple-900",
      accent: "#7E22CE",
    };
  }
  if (normalized.includes("chili") || normalized.includes("chilli") || normalized.includes("mirch") || normalized.includes("pepper")) {
    return {
      Icon: GiChiliPepper,
      bg: "bg-red-50 border-red-200 text-red-700",
      pillBg: "bg-red-100/80 text-red-900",
      accent: "#B91C1C",
    };
  }

  return {
    Icon: Sprout,
    bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
    pillBg: "bg-emerald-100/80 text-emerald-900",
    accent: "#15803D",
  };
}

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

export default function HomeCropTracker() {
  const { t } = useLanguage();
  const [crops, setCrops] = useState<CropDetail[]>(DEFAULT_CROPS);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("agrivani_farmer_crops_detailed");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCrops(parsed);
          } else if (Array.isArray(parsed) && parsed.length === 0) {
            setCrops([]);
          }
        } catch (e) {
          console.warn("Error parsing crops from storage:", e);
        }
      } else {
        localStorage.setItem(
          "agrivani_farmer_crops_detailed",
          JSON.stringify(DEFAULT_CROPS)
        );
      }
    }
  }, []);

  return (
    <section className="space-y-3">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-[#144733] text-[#95CF3A] flex items-center justify-center shadow-xs">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-gray-900 tracking-tight">
              {t.cropGrowthTracker}
            </h2>
            <p className="text-[10px] text-gray-500 font-normal">
              {crops.length} {t.activeCrops}
            </p>
          </div>
        </div>

        {/* Prominent + Add Crop Button */}
        <Link
          href="/crops/add"
          className="flex items-center gap-1 bg-[#144733] hover:bg-[#1B4D2E] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5] text-[#95CF3A]" />
          <span>{t.addNewCrop}</span>
        </Link>
      </div>

      {/* Crops Cards List */}
      <div className="space-y-2.5">
        {crops.map((crop) => {
          const visual = getCropVisual(crop.name);
          const CropIconComponent = visual.Icon;

          return (
            <Link
              key={crop.id}
              href={`/crops/details?id=${crop.id}`}
              className="block bg-white rounded-2xl p-3.5 border border-gray-200 shadow-xs hover:border-[#144733]/40 transition active:scale-[0.99] cursor-pointer group space-y-2.5"
            >
              {/* Top Info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Clean Professional Library Icon Box */}
                  <div
                    className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-2xs ${visual.bg}`}
                  >
                    <CropIconComponent className="w-6 h-6 stroke-[1.8]" />
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

                {/* Status Badge */}
                <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{crop.healthStatus}</span>
                </div>
              </div>

              {/* Growth Progress Bar */}
              <div className="space-y-1 bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between text-[10px] text-gray-600 font-medium">
                  <span className="text-gray-800 font-semibold">{crop.stage}</span>
                  <span className="font-semibold text-gray-700">{crop.daysPlanted} {t.daysSown}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#144733] to-[#95CF3A] rounded-full transition-all duration-500"
                    style={{ width: `${crop.stageProgress}%` }}
                  />
                </div>
              </div>

              {/* Bottom Meta */}
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

        {crops.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-6 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#144733] flex items-center justify-center mx-auto border border-emerald-200">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900">No crops registered yet</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Add your field crops to get tailored weather advisories &amp; disease alerts.
              </p>
            </div>
            <Link
              href="/crops/add"
              className="inline-flex items-center gap-1.5 bg-[#144733] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs active:scale-95 transition cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#95CF3A]" />
              <span>Add Your First Crop</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
