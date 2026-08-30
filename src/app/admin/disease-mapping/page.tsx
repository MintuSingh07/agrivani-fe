"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";

// Dynamically import DiseaseHeatMap without SSR for clean client-side Leaflet rendering
const DiseaseHeatMap = dynamic(() => import("@/components/DiseaseHeatMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-3 p-6 text-center shadow-xs">
      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#2D7A4D] flex items-center justify-center animate-spin">
        <Activity className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-900">Loading Map...</p>
        <p className="text-[11px] text-gray-500 mt-0.5">Fetching diseased crop locations</p>
      </div>
    </div>
  ),
});

export default function AdminDiseaseMappingPage() {
  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      {/* Mobile / Tablet / Desktop Responsive Centered App Shell */}
      <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Simple, Clean Header Bar */}
        <header className="px-4 py-3.5 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">
                Disease Outbreak Map
              </h1>
              <p className="text-[11px] text-gray-500 font-medium">
                Registered Diseased Farms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span>Outbreaks</span>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col space-y-4">
          <DiseaseHeatMap />
        </div>

      </main>
    </div>
  );
}
