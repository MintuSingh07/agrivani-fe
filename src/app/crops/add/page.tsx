"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sprout,
  Plus,
  Sparkles,
  Check,
  Calendar,
  Layers,
  Droplets,
  Ruler,
  Search,
  CheckCircle2,
  Minus,
  Info,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  CropDetail,
  getCropVisual,
} from "@/components/HomeCropTracker";

interface CropCatalogItem {
  id: string;
  name: string;
  localName: string;
  category: "grains" | "vegetables" | "cash" | "pulses";
  season: string;
  varieties: string[];
}

const CROP_CATALOG: CropCatalogItem[] = [
  {
    id: "rice",
    name: "Rice (Paddy)",
    localName: "धान / Paddy",
    category: "grains",
    season: "Kharif Season",
    varieties: ["Pusa Basmati 1121", "PR-126", "Swarna (MTU 7029)", "PB-1509", "Pusa 44"],
  },
  {
    id: "wheat",
    name: "Wheat",
    localName: "गेहूं / Gehun",
    category: "grains",
    season: "Rabi Season",
    varieties: ["HD-2967 (Kundan)", "HD-3086 (Pusa Gautami)", "Shreeram 303", "PBW-343", "DBW-187"],
  },
  {
    id: "cotton",
    name: "Cotton",
    localName: "कपास / Kapas",
    category: "cash",
    season: "Kharif Season",
    varieties: ["Bt Cotton RCH-659", "Bollgard II", "Ankur 651", "Ajeet 155"],
  },
  {
    id: "maize",
    name: "Maize (Corn)",
    localName: "मक्का / Makka",
    category: "grains",
    season: "Kharif & Spring",
    varieties: ["DKC-9108", "Pioneer P3396", "HQPM-1", "Bio-9681"],
  },
  {
    id: "mustard",
    name: "Mustard",
    localName: "सरसों / Sarson",
    category: "pulses",
    season: "Rabi Season",
    varieties: ["Pusa Bold", "Pusa Jai Kisan (Bio-902)", "Pioneer 45S46", "Varuna"],
  },
  {
    id: "tomato",
    name: "Tomato",
    localName: "टमाटर / Tamatar",
    category: "vegetables",
    season: "All Seasons",
    varieties: ["Abhinav (Syngenta)", "Saaho-3251", "Arka Rakshak", "Pusa Ruby"],
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    localName: "गन्ना / Ganna",
    category: "cash",
    season: "Annual Crop",
    varieties: ["Co-0238 (Karan 4)", "Co-0118", "Co-86032", "Co-98014"],
  },
  {
    id: "potato",
    name: "Potato",
    localName: "आलू / Aaloo",
    category: "vegetables",
    season: "Rabi / Winter",
    varieties: ["Kufri Pukhraj", "Kufri Jyoti", "Kufri Bahar", "Chipsona-1"],
  },
  {
    id: "soybean",
    name: "Soybean",
    localName: "सोयाबीन / Soybean",
    category: "pulses",
    season: "Kharif Season",
    varieties: ["JS 20-34", "JS 95-60", "JS 335", "NRC 37"],
  },
  {
    id: "gram",
    name: "Gram (Chana)",
    localName: "चना / Chickpea",
    category: "pulses",
    season: "Rabi Season",
    varieties: ["JG 11", "JAKI 9218", "Pusa 362", "Kabuli Dollar"],
  },
  {
    id: "onion",
    name: "Onion",
    localName: "प्याज / Pyaz",
    category: "vegetables",
    season: "Rabi & Kharif",
    varieties: ["Bhima Super", "Agrifound Dark Red", "Pusa Red", "Nasik Red"],
  },
  {
    id: "chili",
    name: "Chili / Pepper",
    localName: "मिर्च / Mirchi",
    category: "vegetables",
    season: "Year Round",
    varieties: ["Guntur Sannam", "Teja S17", "Armour F1", "Pusa Jwala"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Crops" },
  { id: "grains", label: "🌾 Grains" },
  { id: "vegetables", label: "🍅 Vegetables" },
  { id: "cash", label: "🌿 Cash Crops" },
  { id: "pulses", label: "🌱 Pulses & Seeds" },
];

const GROWTH_STAGES = [
  {
    id: "Sowing / Seedling",
    name: "1. Sowing & Seedling",
    subtitle: "Germination & initial sprouting",
    days: "Day 1 - 20",
    progress: 20,
    icon: "🌱",
  },
  {
    id: "Active Tillering Phase",
    name: "2. Vegetative & Tillering",
    subtitle: "Rapid leafy branch development",
    days: "Day 20 - 55",
    progress: 45,
    icon: "🌿",
  },
  {
    id: "Panicle / Flowering",
    name: "3. Flowering & Grain Fill",
    subtitle: "Panicle emergence & pollination",
    days: "Day 55 - 90",
    progress: 75,
    icon: "🌾",
  },
  {
    id: "Maturity & Harvest Ready",
    name: "4. Maturity & Harvest",
    subtitle: "Crop golden & ready for reaping",
    days: "Day 90+",
    progress: 100,
    icon: "✨",
  },
];

const IRRIGATION_OPTIONS = [
  { id: "Canal & Borewell", label: "Canal & Borewell", icon: "🌊" },
  { id: "Drip Irrigation", label: "Drip System", icon: "💧" },
  { id: "Tube Well Only", label: "Tube Well", icon: "⚡" },
  { id: "Rainfed / Monsoon", label: "Rainfed (Monsoon)", icon: "🌧️" },
  { id: "Sprinkler System", label: "Sprinkler", icon: "🚿" },
];

const ACRE_PRESETS = ["1.0", "2.0", "3.0", "5.0", "10.0"];

export default function AddCropPage() {
  const router = useRouter();

  // Search & Filter State
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Crop Selection State
  const [selectedCropName, setSelectedCropName] = useState("Rice (Paddy)");
  const [customName, setCustomName] = useState("");
  const [variety, setVariety] = useState("Pusa Basmati 1121");

  // Land & Planting State
  const [area, setArea] = useState("2.5");
  const [unit, setUnit] = useState("Acres");
  const [sowingDate, setSowingDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] // default ~30 days ago
  );
  const [stage, setStage] = useState("Active Tillering Phase");
  const [irrigation, setIrrigation] = useState("Canal & Borewell");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter Catalog
  const filteredCatalog = useMemo(() => {
    return CROP_CATALOG.filter((item) => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const matchQuery =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.localName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeCategory, searchQuery]);

  // Current active crop metadata
  const currentCatalogItem = useMemo(() => {
    return CROP_CATALOG.find((c) => c.name === selectedCropName);
  }, [selectedCropName]);

  const handleCropSelect = (cropItem: CropCatalogItem) => {
    setSelectedCropName(cropItem.name);
    setCustomName("");
    if (cropItem.varieties && cropItem.varieties.length > 0) {
      setVariety(cropItem.varieties[0]);
    } else {
      setVariety("");
    }
  };

  const calculateDaysPlanted = (dateStr: string) => {
    if (!dateStr) return 0;
    const diffTime = Math.abs(new Date().getTime() - new Date(dateStr).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStageProgress = (selectedStage: string) => {
    const found = GROWTH_STAGES.find((s) => s.id === selectedStage);
    return found ? found.progress : 40;
  };

  const handleStepAcreage = (delta: number) => {
    const current = parseFloat(area) || 1.0;
    const nextVal = Math.max(0.5, current + delta);
    setArea(nextVal.toFixed(1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalName =
      selectedCropName === "Other (Custom)" && customName.trim()
        ? customName.trim()
        : selectedCropName;

    const days = calculateDaysPlanted(sowingDate);
    const progress = getStageProgress(stage);

    const newCrop: CropDetail = {
      id: `crop-${Date.now()}`,
      name: finalName,
      variety: variety.trim() || "Standard High Yield",
      area: area || "1.0",
      unit: unit,
      sowingDate: sowingDate,
      daysPlanted: days,
      stage: stage,
      stageProgress: progress,
      healthStatus: "Healthy",
      irrigation: irrigation,
    };

    if (typeof window !== "undefined") {
      let currentCrops: CropDetail[] = [];
      const saved = localStorage.getItem("agrivani_farmer_crops_detailed");
      if (saved) {
        try {
          currentCrops = JSON.parse(saved);
        } catch {}
      }

      const updated = [newCrop, ...currentCrops];
      localStorage.setItem("agrivani_farmer_crops_detailed", JSON.stringify(updated));

      // Sync summary with farmer profile
      const cropNames = updated.map((c) => c.name);
      const totalArea = updated
        .reduce((sum, c) => sum + (parseFloat(c.area) || 0), 0)
        .toFixed(1);

      const existingProfileStr = localStorage.getItem("agrivani_farmer_profile");
      const profile = existingProfileStr ? JSON.parse(existingProfileStr) : {};
      profile.crops = cropNames;
      if (totalArea && totalArea !== "0.0") {
        profile.farmSize = totalArea;
      }
      localStorage.setItem("agrivani_farmer_profile", JSON.stringify(profile));
    }

    setTimeout(() => {
      router.push("/");
    }, 250);
  };

  const selectedVisual = getCropVisual(
    selectedCropName === "Other (Custom)" && customName.trim()
      ? customName
      : selectedCropName
  );
  const SelectedSvg = selectedVisual.Icon;

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      <main className="w-full max-w-md md:max-w-xl bg-[#F8FAF3] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top Sticky Header */}
        <header className="px-4 py-3.5 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight">
                Add Crop &amp; Field Details
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                Step-by-step crop tracker setup
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-emerald-50 text-[#144733] px-2.5 py-1 rounded-full border border-emerald-200 text-[11px] font-semibold">
            <Sprout className="w-3.5 h-3.5" />
            <span>New Crop</span>
          </div>
        </header>

        {/* Main Step Flow Container */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 flex-1 overflow-y-auto">
          
          {/* =========================================================
              STEP 1: CHOOSE CROP
             ========================================================= */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3">
            
            {/* Step Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#144733] text-[#95CF3A] text-[11px] font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-xs font-bold text-gray-900 tracking-tight">
                  Choose Your Crop
                </h2>
              </div>
              <span className="text-[10px] text-gray-400 font-medium">
                Tap to select
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops (e.g. Wheat, Rice, Cotton, Tomato)..."
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#144733] rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 focus:outline-none placeholder-gray-400 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-[#144733] text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Crop Cards Grid (Clean, High-Contrast 2-Column Cards) */}
            <div className="grid grid-cols-2 gap-2 pt-1 max-h-64 overflow-y-auto pr-1">
              {filteredCatalog.map((crop) => {
                const visual = getCropVisual(crop.name);
                const CropIconComponent = visual.Icon;
                const isSelected = selectedCropName === crop.name;

                return (
                  <button
                    key={crop.id}
                    type="button"
                    onClick={() => handleCropSelect(crop)}
                    className={`p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left cursor-pointer border ${
                      isSelected
                        ? "bg-[#144733] text-white border-[#144733] shadow-sm ring-2 ring-[#95CF3A]/40 scale-[1.01]"
                        : "bg-gray-50/70 hover:bg-white text-gray-900 border-gray-200 hover:border-emerald-300"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? "bg-white/20 border-white/30 text-white"
                          : visual.bg
                      }`}
                    >
                      <CropIconComponent className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold leading-tight truncate">
                        {crop.name}
                      </h3>
                      <p
                        className={`text-[10px] font-normal truncate mt-0.5 ${
                          isSelected ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {crop.localName}
                      </p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#95CF3A] shrink-0" />
                    )}
                  </button>
                );
              })}

              {/* Custom Crop Button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCropName("Other (Custom)");
                  setVariety("");
                }}
                className={`p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left cursor-pointer border ${
                  selectedCropName === "Other (Custom)"
                    ? "bg-[#144733] text-white border-[#144733] shadow-sm ring-2 ring-[#95CF3A]/40"
                    : "bg-gray-50/70 hover:bg-white text-gray-900 border-dashed border-gray-300 hover:border-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    selectedCropName === "Other (Custom)"
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-bold leading-tight">
                    + Other Crop
                  </h3>
                  <p
                    className={`text-[10px] font-normal mt-0.5 ${
                      selectedCropName === "Other (Custom)"
                        ? "text-white/80"
                        : "text-gray-500"
                    }`}
                  >
                    Custom entry
                  </p>
                </div>
              </button>
            </div>

            {/* Custom Crop Text Input if 'Other' selected */}
            {selectedCropName === "Other (Custom)" && (
              <div className="pt-2 border-t border-gray-100 space-y-1">
                <label className="text-[11px] font-bold text-gray-700 block">
                  Enter Custom Crop Name
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Barley, Garlic, Ginger, Cumin, Turmeric..."
                  className="w-full bg-white border border-emerald-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#144733]/20"
                />
              </div>
            )}

            {/* Active Selection Context Card */}
            <div className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-emerald-200 flex items-center justify-center shrink-0">
                  <SelectedSvg className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                      Selected
                    </span>
                    <span className="text-xs font-bold text-gray-900">
                      {selectedCropName === "Other (Custom)" && customName
                        ? customName
                        : selectedCropName}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500">
                    {currentCatalogItem?.season || "Suitable for current weather"}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#144733] bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                Ready
              </span>
            </div>

          </div>

          {/* =========================================================
              STEP 2: LAND & VARIETY
             ========================================================= */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3.5">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#144733] text-[#95CF3A] text-[11px] font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-xs font-bold text-gray-900 tracking-tight">
                  Field Acreage &amp; Seed Variety
                </h2>
              </div>
            </div>

            {/* Acreage Stepper & Presets */}
            <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-gray-800">
                  Field Area Sown
                </label>
                <div className="flex items-center gap-1">
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-2 py-1 text-[11px] font-semibold text-gray-800 focus:outline-none"
                  >
                    <option value="Acres">Acres</option>
                    <option value="Bigha">Bigha</option>
                    <option value="Hectares">Hectares</option>
                    <option value="Guntha">Guntha</option>
                  </select>
                </div>
              </div>

              {/* Counter Input */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStepAcreage(-0.5)}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition cursor-pointer font-bold"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full h-10 bg-white border border-gray-300 rounded-xl text-center text-sm font-bold text-gray-900 focus:border-[#144733] focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 font-medium">
                    {unit}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleStepAcreage(0.5)}
                  className="w-10 h-10 rounded-xl bg-[#144733] text-white flex items-center justify-center hover:bg-[#1B4D2E] active:scale-95 transition cursor-pointer font-bold shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Acre Presets */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] text-gray-400 font-medium">Quick:</span>
                {ACRE_PRESETS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setArea(val)}
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold border transition cursor-pointer ${
                      area === val
                        ? "bg-[#144733] text-white border-[#144733]"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {val} {unit === "Acres" ? "Ac" : ""}
                  </button>
                ))}
              </div>
            </div>

            {/* Seed Variety & Suggestions */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-800 block">
                Seed Variety / Hybrid Name
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Pusa Basmati 1121, Shreeram 303..."
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#144733] rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none transition"
              />

              {/* Quick Variety Suggestion Chips */}
              {currentCatalogItem?.varieties && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-400 font-medium self-center">
                    Popular:
                  </span>
                  {currentCatalogItem.varieties.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVariety(v)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-medium border transition cursor-pointer ${
                        variety === v
                          ? "bg-emerald-100 text-emerald-900 border-emerald-300 font-bold"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* =========================================================
              STEP 3: GROWTH STAGE & IRRIGATION
             ========================================================= */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3.5">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#144733] text-[#95CF3A] text-[11px] font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="text-xs font-bold text-gray-900 tracking-tight">
                  Growth Stage &amp; Irrigation
                </h2>
              </div>
            </div>

            {/* Sowing Date Input */}
            <div className="space-y-1.5 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-gray-800">
                  Sowing / Planting Date
                </label>
                <span className="text-[11px] font-bold text-[#144733]">
                  {calculateDaysPlanted(sowingDate)} Days Ago
                </span>
              </div>
              <input
                type="date"
                required
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
                className="w-full bg-white border border-gray-300 focus:border-[#144733] rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none font-semibold"
              />

              {/* Quick Date Presets */}
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setSowingDate(new Date().toISOString().split("T")[0])
                  }
                  className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const d = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);
                    setSowingDate(d.toISOString().split("T")[0]);
                  }}
                  className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  15 Days Ago
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const d = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000);
                    setSowingDate(d.toISOString().split("T")[0]);
                  }}
                  className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  45 Days Ago
                </button>
              </div>
            </div>

            {/* Visual Growth Stage Tiles */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-800 block">
                Current Growth Stage in Field
              </label>
              <div className="grid grid-cols-2 gap-2">
                {GROWTH_STAGES.map((st) => {
                  const isSelected = stage === st.id;

                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setStage(st.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50 border-[#144733] ring-1 ring-[#144733] shadow-xs"
                          : "bg-gray-50 border-gray-200 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">{st.icon}</span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            isSelected
                              ? "bg-[#144733] text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {st.days}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">
                        {st.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-normal mt-0.5 line-clamp-1">
                        {st.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Irrigation Method Chips */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-800 block">
                Irrigation System
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {IRRIGATION_OPTIONS.map((irr) => {
                  const isSelected = irrigation === irr.id;

                  return (
                    <button
                      key={irr.id}
                      type="button"
                      onClick={() => setIrrigation(irr.id)}
                      className={`p-2 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                        isSelected
                          ? "bg-[#144733] text-white border-[#144733] shadow-xs"
                          : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-white"
                      }`}
                    >
                      <span className="text-sm">{irr.icon}</span>
                      <span className="text-[11px] font-semibold leading-tight">
                        {irr.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </form>

        {/* Sticky Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-0 sm:px-4 pointer-events-none">
          <div className="w-full max-w-md md:max-w-xl bg-white/95 backdrop-blur-md p-3.5 border-t border-gray-200 flex items-center gap-2 shadow-2xl pointer-events-auto sm:rounded-b-3xl">
            <Link
              href="/"
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-2xl transition active:scale-95 cursor-pointer text-center"
            >
              Cancel
            </Link>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-[#144733] hover:bg-[#1B4D2E] text-white py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#144733]/25 active:scale-98 transition cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Check className="w-4 h-4 text-[#95CF3A]" />
                  <span>Saving Crop...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#95CF3A]" />
                  <span>Save &amp; Start Crop Tracking →</span>
                </>
              )}
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
