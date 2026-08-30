"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Ruler,
  Clock,
  Droplets,
  CheckCircle2,
  AlertCircle,
  Wheat,
  Layers,
  Camera,
  Copy,
  Check,
  User,
  Share2,
  Calendar,
  Sparkles,
} from "lucide-react";
import { FARMERS_DATA } from "@/data/farmers";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminFarmerDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const farmerId = resolvedParams.id;

  const [copiedPhone, setCopiedPhone] = useState(false);

  const farmer = FARMERS_DATA.find((f) => f.id === farmerId) || FARMERS_DATA[0];

  const handleCopyPhone = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(farmer.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      {/* Mobile / Tablet / Desktop Responsive Centered App Shell */}
      <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top Header Bar */}
        <header className="px-4 sm:px-6 py-4 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Farmer Profile
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Admin Surveillance & Field Registry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPhone}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Copy Phone"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Farmer Details Content Body */}
        <div className="p-4 sm:p-5 space-y-4 flex-1">
          
          {/* 1. Blank Picture Area & Core Identity Box */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            {/* Blank Picture Area */}
            <div className="w-full h-48 sm:h-56 bg-[#F4F6F2] border-b border-gray-200 flex flex-col items-center justify-center relative">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 shadow-xs">
                <Camera className="w-8 h-8 stroke-[1.5]" />
              </div>
              <p className="text-xs font-semibold text-gray-500 mt-2">
                Farmer Picture Area
              </p>
              <span className="text-[10px] text-gray-400">
                (Blank placeholder for uploaded photograph)
              </span>

              {/* Status Badge */}
              <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
                Verified Farmer
              </div>
            </div>

            {/* Farmer Name & Contact Bar */}
            <div className="p-4 sm:p-5 space-y-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  {farmer.name}
                </h2>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Farming Experience: <strong>{farmer.experienceYears} Years</strong>
                </p>
              </div>

              {/* Quick Actions Row: Phone & Direct Call */}
              <div className="bg-[#FDFFF1] rounded-xl p-3 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#144733] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                      Contact Phone
                    </span>
                    <a
                      href={`tel:${farmer.phone.replace(/\s+/g, "")}`}
                      className="text-sm font-bold text-emerald-800 hover:underline"
                    >
                      {farmer.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyPhone}
                    className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${farmer.phone.replace(/\s+/g, "")}`}
                    className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg bg-[#144733] hover:bg-[#1b5e43] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Address & Landholding Area Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Farm & Home Address</span>
              </div>
              <div className="text-xs text-gray-600 space-y-1 leading-relaxed">
                <p className="font-bold text-gray-900 text-sm">
                  Village {farmer.address.village}
                </p>
                <p>Block: {farmer.address.block}</p>
                <p>District: {farmer.address.district}, {farmer.address.state}</p>
                <p className="text-gray-500 font-mono text-[11px] pt-1">
                  Postal PIN: <strong>{farmer.address.pincode}</strong>
                </p>
              </div>
            </div>

            {/* Farming Area & Soil Card */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
                <Ruler className="w-4 h-4 text-emerald-700" />
                <span>Cultivated Area & Soil</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-black text-[#144733]">
                      {farmer.totalArea}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 block">
                      ({farmer.hectares})
                    </span>
                  </div>
                </div>
                <div className="bg-[#FDFFF1] rounded-lg p-2 border border-gray-150 text-xs text-gray-700 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Soil: <strong>{farmer.soilType}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Detailed Crops Being Farmed Section */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between border-b border-gray-150 pb-2.5">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Wheat className="w-4 h-4 text-emerald-700" />
                <span>Crops Cultivated ({farmer.crops.length})</span>
              </h3>
              <span className="text-xs font-semibold text-[#144733] bg-[#FDFFF1] px-2.5 py-0.5 rounded-full border border-gray-200">
                Active Season
              </span>
            </div>

            <div className="space-y-3">
              {farmer.crops.map((crop, idx) => {
                const isHealthy = crop.status === "Healthy";
                const isAdvisory = crop.status === "Under Advisory";

                return (
                  <div
                    key={idx}
                    className="bg-[#FDFFF1] rounded-xl p-4 border border-gray-200 shadow-2xs space-y-3"
                  >
                    {/* Crop Name & Status Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-gray-900">
                            {crop.name}
                          </h4>
                          <span className="text-xs font-bold text-[#144733] bg-white border border-[#144733]/20 px-2 py-0.5 rounded-full shadow-2xs">
                            {crop.allocatedArea}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 font-medium mt-0.5">
                          Variety: <strong className="text-gray-900">{crop.variety}</strong>
                        </p>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0 ${
                          isHealthy
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : isAdvisory
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {isHealthy ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        <span>{crop.status}</span>
                      </span>
                    </div>

                    {/* Sowing & Growth Stage Progress */}
                    <div className="bg-white rounded-lg p-3 border border-gray-150 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                        <span className="flex items-center gap-1.5 text-[#144733]">
                          <Clock className="w-3.5 h-3.5" />
                          {crop.stage}
                        </span>
                        <span className="text-gray-500 font-mono text-[11px]">
                          {crop.sowingDays} Days Sown
                        </span>
                      </div>

                      {/* Visual Progress Bar */}
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-[#144733] h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(Math.round((crop.sowingDays / 120) * 100), 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Irrigation & Field Details */}
                    <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-sky-600" />
                        <span>Irrigation Method: <strong>{crop.irrigation}</strong></span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
