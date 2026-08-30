"use client";

import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";

export default function AdminDiseaseMappingPage() {
  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      {/* Mobile / Tablet / Desktop Responsive Centered App Shell */}
      <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        {/* Top Header Bar */}
        <header className="px-4 sm:px-6 py-4 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">Disease Mapping</h1>
              <p className="text-xs text-gray-500 font-medium">Regional Outbreak & Surveillance</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
            <Activity className="w-4 h-4" />
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#144733]/10 flex items-center justify-center text-[#144733] mb-4">
            <Activity className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Disease Mapping System</h2>
          <p className="text-sm text-gray-600 max-w-xs">
            Regional agricultural disease tracking, heatmap analytics, and outbreak alerts will be displayed here.
          </p>
        </div>
      </main>
    </div>
  );
}
