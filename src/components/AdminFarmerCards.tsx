"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Phone,
  MapPin,
  Sprout,
  Ruler,
  ChevronRight,
  Search,
  Wheat,
  Camera,
  Layers,
} from "lucide-react";
import { FARMERS_DATA } from "@/data/farmers";

export default function AdminFarmerCards() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFarmers = FARMERS_DATA.filter((farmer) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      farmer.name.toLowerCase().includes(q) ||
      farmer.address.district.toLowerCase().includes(q) ||
      farmer.address.state.toLowerCase().includes(q) ||
      farmer.address.village.toLowerCase().includes(q) ||
      farmer.crops.some((c) => c.name.toLowerCase().includes(q) || c.variety.toLowerCase().includes(q))
    );
  });

  return (
    <div className="w-full space-y-4">
      {/* Header & Search Bar */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#144733] text-white flex items-center justify-center shadow-sm">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                Registered Farmers
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                {filteredFarmers.length} active farmer profiles
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold bg-[#144733]/10 text-[#144733] px-2.5 py-1 rounded-full">
            Admin View
          </span>
        </div>

        {/* Live Search */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, district, or crop..."
            className="w-full pl-9.5 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#144733]/30 focus:border-[#144733] transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Vertical Farmer Cards Feed */}
      <div className="space-y-4">
        {filteredFarmers.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-200 text-center flex flex-col items-center justify-center">
            <User className="w-10 h-10 text-gray-300 mb-2" />
            <p className="text-sm font-semibold text-gray-700">No farmers found</p>
            <p className="text-xs text-gray-400 mt-1">Try searching for a different name, crop, or district</p>
          </div>
        ) : (
          filteredFarmers.map((farmer) => (
            <Link
              key={farmer.id}
              href={`/admin/farmers/${farmer.id}`}
              className="block bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md hover:border-[#144733] transition-all duration-200 overflow-hidden group focus:outline-none cursor-pointer"
            >
              {/* Vertical Card Structure:
                  1. Blank Picture Area (Top)
                  2. Farmer Details & Meta (Bottom)
              */}
              
              {/* Blank Picture Area */}
              <div className="w-full h-36 sm:h-40 bg-[#F4F6F2] border-b border-gray-150 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-[#EBF0E6] transition-colors">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 group-hover:border-[#144733]/40 group-hover:text-[#144733] transition-colors shadow-2xs">
                  <Camera className="w-6 h-6 stroke-[1.7]" />
                </div>
                <span className="text-[11px] font-medium text-gray-400 mt-1.5 tracking-wide group-hover:text-gray-600 transition-colors">
                  Farmer Photo
                </span>

                {/* Total Area Pill (Floating Top-Right) */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-[#144733] border border-gray-200 shadow-2xs">
                  {farmer.totalArea}
                </div>
              </div>

              {/* Farmer Info Body */}
              <div className="p-4 sm:p-5 space-y-3">
                {/* Farmer Name & Arrow */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#144733] transition-colors">
                      {farmer.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>
                        {farmer.address.village}, {farmer.address.district}, {farmer.address.state}
                      </span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#144733] text-gray-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0 shadow-2xs">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Phone & Area Row */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-[#FDFFF1] rounded-xl p-2.5 border border-gray-150 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-gray-400 block uppercase font-semibold">Phone</span>
                      <span className="text-xs font-bold text-gray-800 truncate block">
                        {farmer.phone}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#FDFFF1] rounded-xl p-2.5 border border-gray-150 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-gray-400 block uppercase font-semibold">Cultivated Area</span>
                      <span className="text-xs font-bold text-gray-800 truncate block">
                        {farmer.totalArea} ({farmer.hectares})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Crops Farming Chips */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1 uppercase tracking-wider">
                    <Wheat className="w-3.5 h-3.5 text-emerald-700" />
                    Crops Farmed ({farmer.crops.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {farmer.crops.map((crop) => (
                      <span
                        key={crop.name}
                        className="text-xs font-medium bg-white text-gray-800 border border-gray-200 px-2.5 py-1 rounded-lg shadow-2xs flex items-center gap-1.5"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <strong>{crop.name}</strong>
                        <span className="text-gray-400 text-[11px]">({crop.allocatedArea})</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action Footer */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-[#144733] font-bold">
                  <span>View Full Profile & Crop Details</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
