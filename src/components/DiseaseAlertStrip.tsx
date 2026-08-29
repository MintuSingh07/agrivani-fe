"use client";

import Link from "next/link";
import { AlertTriangle, ChevronRight } from "lucide-react";

interface DiseaseAlertStripProps {
  diseaseName?: string;
  targetHref?: string;
}

export default function DiseaseAlertStrip({
  diseaseName = "Leaf Blast Fungus",
  targetHref = "/alerts/leaf-blast",
}: DiseaseAlertStripProps) {
  return (
    <div className="w-full bg-red-50 border border-red-200/90 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs">
      {/* Alert Icon & Concise Message */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
          <AlertTriangle className="w-4 h-4 text-red-600 animate-pulse" />
        </div>

        <p className="text-xs text-red-900 font-normal leading-tight line-clamp-2">
          High probability of <span className="font-semibold text-red-950">{diseaseName}</span> outbreak in this weather.
        </p>
      </div>

      {/* Know More Action Button */}
      <Link
        href={targetHref}
        className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-95 px-3 py-1.5 rounded-xl transition-all shadow-xs shrink-0"
      >
        <span>Know more</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
