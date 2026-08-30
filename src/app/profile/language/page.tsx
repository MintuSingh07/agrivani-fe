"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check, Search, Globe, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SupportedLanguage } from "@/i18n/translations";

function LanguageSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams?.get("from");
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getTargetProfileRoute = () => {
    if (fromParam === "admin") return "/admin/profile";
    if (fromParam === "farmer") return "/profile";
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("agrivani_user_role");
      if (role === "officer" || role === "admin") {
        return "/admin/profile";
      }
    }
    return "/profile";
  };

  const handleSelect = (langId: string) => {
    setLanguage(langId as SupportedLanguage);
    const target = getTargetProfileRoute();
    setTimeout(() => {
      router.push(target);
    }, 200);
  };

  const handleBack = () => {
    const target = getTargetProfileRoute();
    router.push(target);
  };

  const filteredLanguages = supportedLanguages.filter(
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
            <button
              type="button"
              onClick={handleBack}
              aria-label="Go Back"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-tight">
                {t.appLanguage}
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                Choose your preferred language ({supportedLanguages.length} Languages)
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
              placeholder="Search language or region..."
              className="w-full pl-9.5 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#144733]/30 focus:border-[#144733] transition shadow-xs"
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

          {/* Languages Grid / List */}
          <div className="space-y-2 flex-1">
            {filteredLanguages.map((lang) => {
              const isSelected = language === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => handleSelect(lang.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all duration-150 active:scale-[0.99] cursor-pointer ${
                    isSelected
                      ? "bg-[#144733] text-white border-[#144733] shadow-md shadow-[#144733]/20"
                      : "bg-white text-gray-800 border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                        isSelected
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-emerald-50 text-[#144733] border-emerald-200"
                      }`}
                    >
                      {lang.nativeName.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm leading-tight">
                          {lang.nativeName}
                        </span>
                        <span
                          className={`text-xs ${
                            isSelected ? "text-emerald-200" : "text-gray-500"
                          }`}
                        >
                          ({lang.name})
                        </span>
                      </div>
                      <p
                        className={`text-[11px] mt-0.5 ${
                          isSelected ? "text-emerald-100/90" : "text-gray-400"
                        }`}
                      >
                        {lang.region}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-white text-[#144733] flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Notice */}
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-[11.5px] text-[#144733] flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-[#2D7A4D]" />
            <span>Translations update instantly across all app screens, AI voice, and crop advisories.</span>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function LanguageSelectionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FDFFF1] flex items-center justify-center text-xs text-gray-500">
          Loading language settings...
        </div>
      }
    >
      <LanguageSelectionContent />
    </Suspense>
  );
}
