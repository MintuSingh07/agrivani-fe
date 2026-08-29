"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Search, Globe } from "lucide-react";

interface LanguageOption {
  id: string;
  name: string;
  nativeName: string;
  region: string;
}

const LANGUAGES: LanguageOption[] = [
  { id: "hi", name: "Hindi", nativeName: "हिन्दी", region: "North & Central India" },
  { id: "en", name: "English", nativeName: "English", region: "Universal / All India" },
  { id: "mr", name: "Marathi", nativeName: "मराठी", region: "Maharashtra" },
  { id: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", region: "Punjab & Haryana" },
  { id: "or", name: "Oriya (Odia)", nativeName: "ଓଡ଼ିଆ", region: "Odisha" },
  { id: "gu", name: "Gujarati", nativeName: "ગુજરાતી", region: "Gujarat" },
  { id: "raj", name: "Rajasthani", nativeName: "राजस्थानी", region: "Rajasthan" },
  { id: "ta", name: "Tamil", nativeName: "தமிழ்", region: "Tamil Nadu" },
  { id: "te", name: "Telugu", nativeName: "తెలుగు", region: "Andhra Pradesh & Telangana" },
  { id: "ne", name: "Nepali", nativeName: "नेपाली", region: "Sikkim & Northern Hill States" },
  { id: "as", name: "Assamese", nativeName: "অসমীয়া", region: "Assam & North East" },
  { id: "bn", name: "Bengali", nativeName: "বাংলা", region: "West Bengal & Tripura" },
];

export default function LanguageSelectionPage() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<string>("en");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("agrivani_app_language");
      if (saved) {
        setSelectedLang(saved);
      }
    }
  }, []);

  const handleSelect = (langId: string) => {
    setSelectedLang(langId);
    if (typeof window !== "undefined") {
      localStorage.setItem("agrivani_app_language", langId);
      const chosen = LANGUAGES.find((l) => l.id === langId);
      if (chosen) {
        localStorage.setItem("agrivani_app_language_name", `${chosen.name} / ${chosen.nativeName}`);
      }
    }
    // Instant smooth transition back to profile
    setTimeout(() => {
      router.push("/profile");
    }, 250);
  };

  const filteredLanguages = LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      <main className="w-full max-w-md md:max-w-xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
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
                App Language
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                Choose your preferred language (12 Languages)
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#144733] flex items-center justify-center border border-emerald-200">
            <Globe className="w-4 h-4" />
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 space-y-4 flex-1 flex flex-col">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language (e.g. Hindi, தமிழ், বাংলা)..."
              className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#144733] transition shadow-xs"
            />
          </div>

          {/* Language Cards Grid / List */}
          <div className="space-y-2 flex-1 overflow-y-auto pb-4">
            {filteredLanguages.map((lang) => {
              const isSelected = selectedLang === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => handleSelect(lang.id)}
                  type="button"
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                    isSelected
                      ? "bg-emerald-50/90 border-[#144733] shadow-xs ring-1 ring-[#144733]/20"
                      : "bg-white border-gray-200 hover:bg-gray-50/80 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                        isSelected
                          ? "bg-[#144733] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {lang.nativeName.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-900">
                          {lang.name}
                        </span>
                        <span className="text-xs font-medium text-emerald-800 bg-emerald-100/60 px-1.5 py-0.2 rounded text-[11px]">
                          {lang.nativeName}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-normal block mt-0.5">
                        {lang.region}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? "bg-[#144733] border-[#144733] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}

            {filteredLanguages.length === 0 && (
              <div className="text-center py-10 text-gray-500 text-xs">
                No languages match &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
