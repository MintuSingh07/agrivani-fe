"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Sprout,
  Ruler,
  Droplets,
  Check,
  Sparkles,
  Plus,
  X,
  Save,
  Tag,
} from "lucide-react";

interface FarmerProfileData {
  name: string;
  phone: string;
  location: string;
  crops: string[];
  farmSize: string;
  farmUnit: string;
  irrigation: string;
}

const DEFAULT_PROFILE: FarmerProfileData = {
  name: "Zara Patel",
  phone: "+91 98765 43210",
  location: "Sawojajar, East Java",
  crops: ["Rice (Paddy)", "Wheat"],
  farmSize: "4.5",
  farmUnit: "Acres",
  irrigation: "Canal & Borewell",
};

const SUGGESTED_CROPS = [
  "Rice (Paddy)",
  "Wheat",
  "Cotton",
  "Mustard",
  "Sugarcane",
  "Maize",
  "Tomato",
  "Potato",
  "Soybean",
  "Gram (Chana)",
  "Onion",
  "Garlic",
  "Chili / Pepper",
  "Groundnut",
  "Tea",
  "Bajra (Millet)",
  "Jowar (Sorghum)",
  "Barley",
];

const IRRIGATION_OPTIONS = [
  "Canal & Borewell",
  "Drip Irrigation",
  "Sprinkler System",
  "Tube Well Only",
  "Rainfed / Monsoon",
];

const UNIT_OPTIONS = ["Acres", "Bigha", "Hectares", "Guntha"];

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<FarmerProfileData>(DEFAULT_PROFILE);
  const [customCropInput, setCustomCropInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("agrivani_farmer_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProfile((prev) => ({ ...prev, ...parsed }));
        } catch (e) {
          console.warn("Could not parse saved profile:", e);
        }
      }
    }
  }, []);

  const handleToggleCrop = (crop: string) => {
    setProfile((prev) => {
      const exists = prev.crops.includes(crop);
      if (exists) {
        if (prev.crops.length === 1) return prev; // Keep at least 1 crop
        return { ...prev, crops: prev.crops.filter((c) => c !== crop) };
      } else {
        return { ...prev, crops: [...prev.crops, crop] };
      }
    });
  };

  const handleRemoveCrop = (cropToRemove: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProfile((prev) => {
      if (prev.crops.length === 1) return prev;
      return { ...prev, crops: prev.crops.filter((c) => c !== cropToRemove) };
    });
  };

  const handleAddCustomCrop = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customCropInput.trim();
    if (trimmed) {
      // Capitalize first letter cleanly
      const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      if (!profile.crops.some((c) => c.toLowerCase() === formatted.toLowerCase())) {
        setProfile((prev) => ({ ...prev, crops: [...prev.crops, formatted] }));
      }
      setCustomCropInput("");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("agrivani_farmer_profile", JSON.stringify(profile));
      localStorage.setItem("agrivani_farmer_name", profile.name);
    }
    setIsSaved(true);
    setTimeout(() => {
      router.push("/profile");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      <main className="w-full max-w-md md:max-w-xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-36 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top Header */}
        <header className="px-4 py-3.5 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-tight">
                Edit Farmer Profile
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                Update personal, land & crop details
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaved}
            className="flex items-center gap-1.5 bg-[#144733] hover:bg-[#1B4D2E] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs transition active:scale-95 cursor-pointer"
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#95CF3A]" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-[#95CF3A]" />
                <span>Save</span>
              </>
            )}
          </button>
        </header>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-4 space-y-4 flex-1 overflow-y-auto">
          
          {/* 1. Personal Info Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
              <User className="w-4 h-4 text-[#144733]" />
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Personal Information
              </h2>
            </div>

            {/* Farmer Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700 block">
                Farmer Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar / Zara Patel"
                  className="w-full bg-gray-50/80 border border-gray-200 focus:border-[#144733] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700 block">
                Mobile Number
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-gray-400">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  required
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-gray-50/80 border border-gray-200 focus:border-[#144733] focus:bg-white rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Location / Village / District */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700 block">
                Village / District & State
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-gray-400">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  required
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="e.g. Sawojajar, East Java / Karnal, Haryana"
                  className="w-full bg-gray-50/80 border border-gray-200 focus:border-[#144733] focus:bg-white rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* 2. Farm Size & Land Details Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
              <Ruler className="w-4 h-4 text-[#144733]" />
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Farm Size & Land Details
              </h2>
            </div>

            {/* Farm Size & Unit */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700 block">
                Total Land Holding
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  value={profile.farmSize}
                  onChange={(e) => setProfile({ ...profile, farmSize: e.target.value })}
                  placeholder="4.5"
                  className="flex-1 bg-gray-50/80 border border-gray-200 focus:border-[#144733] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none transition"
                />
                <select
                  value={profile.farmUnit}
                  onChange={(e) => setProfile({ ...profile, farmUnit: e.target.value })}
                  className="bg-gray-50/80 border border-gray-200 focus:border-[#144733] focus:bg-white rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none transition"
                >
                  {UNIT_OPTIONS.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Irrigation Source */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-700 block">
                Primary Irrigation Method
              </label>
              <div className="relative">
                <select
                  value={profile.irrigation}
                  onChange={(e) => setProfile({ ...profile, irrigation: e.target.value })}
                  className="w-full bg-gray-50/80 border border-gray-200 focus:border-[#144733] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none transition"
                >
                  {IRRIGATION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 3. Prominent Registered Crops Card with Add Crop Option */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-[#144733]" />
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Registered Crops
                </h2>
              </div>
              <span className="text-[11px] font-bold text-[#144733] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {profile.crops.length} Selected
              </span>
            </div>

            {/* A. Prominent "Add Any Crop" Input Box */}
            <div className="space-y-1.5 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200">
              <label className="text-[11px] font-bold text-[#144733] flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add New Crop Name</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customCropInput}
                  onChange={(e) => setCustomCropInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomCrop();
                    }
                  }}
                  placeholder="Type crop name (e.g. Tomato, Ginger, Onion)..."
                  className="flex-1 bg-white border border-emerald-300 focus:border-[#144733] rounded-xl px-3.5 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none shadow-xs"
                />
                <button
                  type="button"
                  onClick={handleAddCustomCrop}
                  disabled={!customCropInput.trim()}
                  className="bg-[#144733] hover:bg-[#1B4D2E] text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 disabled:opacity-40 transition active:scale-95 cursor-pointer shrink-0 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Crop</span>
                </button>
              </div>
            </div>

            {/* B. Active Registered Crops List with Easy Delete */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-gray-700 block">
                Your Active Crops (Tap ✕ to remove):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.crops.map((crop) => (
                  <div
                    key={crop}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#144733] text-white shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <Check className="w-3 h-3 stroke-[2.5] text-[#95CF3A]" />
                    <span>{crop}</span>
                    <button
                      type="button"
                      aria-label={`Remove ${crop}`}
                      onClick={(e) => handleRemoveCrop(crop, e)}
                      className="w-4 h-4 rounded-full bg-white/20 hover:bg-red-500 hover:text-white flex items-center justify-center text-white/90 transition ml-0.5 cursor-pointer"
                    >
                      <X className="w-2.5 h-2.5 stroke-[3]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* C. Quick-Pick Suggestions List */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              <span className="text-[11px] font-semibold text-gray-500 block">
                Quick Select Common Crops:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_CROPS.map((crop) => {
                  const isSelected = profile.crops.includes(crop);
                  return (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => handleToggleCrop(crop)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#144733] text-white shadow-xs"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3 h-3 stroke-[2.5] text-[#95CF3A]" />
                      ) : (
                        <Plus className="w-3 h-3 text-gray-400" />
                      )}
                      <span>{crop}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Bottom Save Action Button */}
          <div className="pt-2 sticky bottom-4 z-20">
            <button
              type="submit"
              disabled={isSaved}
              className="w-full bg-[#144733] hover:bg-[#1B4D2E] active:scale-98 text-white font-semibold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#144733]/25 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#95CF3A]" />
              <span>{isSaved ? "Saved! Updating Profile..." : "Save Profile Details"}</span>
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}
