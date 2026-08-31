"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Globe,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Video,
  X,
  Copy,
  Check,
  Headphones,
  ExternalLink,
  Pencil,
  Sprout,
  Ruler,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProfilePage() {
  const router = useRouter();
  const { t, currentLanguageInfo } = useLanguage();
  const [selectedLanguageName, setSelectedLanguageName] = useState("English / हिन्दी");
  const [showHelplineModal, setShowHelplineModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [farmerProfile, setFarmerProfile] = useState({
    name: "Farmer",
    phone: "+91 98765 43210",
    location: "Purba Bardhaman, West Bengal",
    crops: ["Rice (Paddy)", "Wheat"],
    farmSize: "4.5",
    farmUnit: "Acres",
    irrigation: "Canal & Borewell",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("agrivani_is_logged_in") === "true";
      const userRole = localStorage.getItem("agrivani_user_role");
      if (!isLoggedIn) {
        router.replace("/auth");
        return;
      }
      if (userRole === "officer" || userRole === "admin") {
        router.replace("/admin/profile");
        return;
      }

      const savedLangName = localStorage.getItem("agrivani_app_language_name");
      if (savedLangName) {
        setSelectedLanguageName(savedLangName);
      } else if (currentLanguageInfo) {
        setSelectedLanguageName(`${currentLanguageInfo.name} / ${currentLanguageInfo.nativeName}`);
      }
      const savedProfile = localStorage.getItem("agrivani_farmer_profile");
      if (savedProfile) {
        try {
          setFarmerProfile(JSON.parse(savedProfile));
        } catch {}
      }
    }
  }, [currentLanguageInfo, router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("agrivani_is_logged_in");
      localStorage.removeItem("agrivani_user_role");
      localStorage.removeItem("agrivani_farmer_name");
      localStorage.removeItem("agrivani_farmer_profile");
      localStorage.removeItem("agrivani_logged_in_user");
    }
    router.push("/auth");
  };

  const handleCopyNumber = (num: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(num);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      <main className="w-full max-w-md md:max-w-xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top Header */}
        <header className="px-4 py-3.5 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/home"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-tight">
                {t.profileTitle}
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                {t.farmerProfileSubtitle}
              </p>
            </div>
          </div>

          <Link
            href="/profile/edit"
            className="flex items-center gap-1 text-[11px] font-semibold text-[#144733] bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 active:scale-95 transition"
          >
            <Pencil className="w-3 h-3 text-[#144733]" />
            <span>{t.editProfileBtn}</span>
          </Link>
        </header>

        {/* Content Body */}
        <div className="p-4 space-y-4 flex-1">
          
          {/* Farmer Card with Clean Avatar Icon & Edit Action */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 border-2 border-[#144733]/30 flex items-center justify-center text-[#144733] shrink-0 shadow-xs">
                <User className="w-7 h-7 stroke-[2.2]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-gray-900 leading-snug truncate">
                    {farmerProfile.name}
                  </h2>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5 truncate">
                  <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                  <span>{farmerProfile.phone}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5 truncate">
                  <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                  <span>{farmerProfile.location}</span>
                </div>
              </div>
            </div>

            <Link
              href="/profile/edit"
              title="Edit Profile"
              className="w-8 h-8 rounded-full bg-gray-50 hover:bg-emerald-50 text-gray-500 hover:text-[#144733] border border-gray-200 hover:border-emerald-300 flex items-center justify-center transition active:scale-95 shrink-0"
            >
              <Pencil className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Farm Info Overview */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/profile/edit"
              className="bg-white p-3 rounded-2xl border border-gray-200 shadow-xs hover:border-[#144733]/40 transition block"
            >
              <span className="text-[10px] text-gray-400 font-normal flex items-center justify-between">
                <span>Registered Crops</span>
                <Pencil className="w-2.5 h-2.5 text-gray-300" />
              </span>
              <span className="text-xs font-semibold text-gray-900 mt-0.5 block truncate">
                {farmerProfile.crops && farmerProfile.crops.length > 0
                  ? farmerProfile.crops.join(", ")
                  : "No crops added"}
              </span>
            </Link>
            <Link
              href="/profile/edit"
              className="bg-white p-3 rounded-2xl border border-gray-200 shadow-xs hover:border-[#144733]/40 transition block"
            >
              <span className="text-[10px] text-gray-400 font-normal flex items-center justify-between">
                <span>Total Farm Size</span>
                <Pencil className="w-2.5 h-2.5 text-gray-300" />
              </span>
              <span className="text-xs font-semibold text-gray-900 mt-0.5 block">
                {farmerProfile.farmSize} {farmerProfile.farmUnit}
              </span>
            </Link>
          </div>

          {/* Settings Group */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs divide-y divide-gray-100 overflow-hidden">
            
            {/* 1. App Language Option */}
            <Link
              href="/profile/language?from=farmer"
              className="p-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition active:bg-gray-100"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#144733]" />
                <span className="text-xs font-semibold text-gray-800">{t.appLanguage}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {selectedLanguageName}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </Link>

            {/* 2. Weather & Pest Alerts Option */}
            <Link
              href="/profile/alerts"
              className="p-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition active:bg-gray-100"
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#144733]" />
                <span className="text-xs font-semibold text-gray-800">{t.weatherPestAlerts}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </Link>

            {/* 3. Recent Videos Option */}
            <Link
              href="/profile/recent-videos"
              className="p-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition active:bg-gray-100"
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-[#144733]" />
                <span className="text-xs font-semibold text-gray-800">{t.recentVideos}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="text-[10px] text-gray-400">4</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </Link>

            {/* 4. Krishi Vigyan Kendra Helpline */}
            <div
              onClick={() => setShowHelplineModal(true)}
              className="p-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition active:bg-gray-100"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#144733]" />
                <span className="text-xs font-semibold text-gray-800">{t.kisanHelpline}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#144733] font-semibold">
                <span className="text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {t.kisanHelplineNumber}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 py-3 rounded-2xl text-xs font-semibold border border-red-200 transition active:scale-98 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logOutBtn}</span>
          </button>

        </div>

        {/* Helpline Modal / Action Sheet */}
        {showHelplineModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-200 space-y-4 animate-in slide-in-from-bottom duration-300">
              
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#144733] flex items-center justify-center border border-emerald-200">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">
                      Krishi Vigyan Kendra Helpline
                    </h3>
                    <p className="text-[11px] text-gray-500 font-normal mt-0.5">
                      Government Kisan Call Center & Agricultural Support
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowHelplineModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Primary Helpline Card */}
              <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-900 bg-emerald-200/70 px-2 py-0.5 rounded uppercase tracking-wider">
                    Toll-Free National Helpline
                  </span>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    24x7 Available
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="text-xl font-black text-[#144733] tracking-wider">
                      1800-180-1551
                    </div>
                    <span className="text-[11px] text-emerald-800 font-medium">
                      Shortcode: <strong className="font-bold">1551</strong>
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyNumber("18001801551")}
                    className="flex items-center gap-1 bg-white hover:bg-emerald-100 text-[#144733] px-3 py-1.5 rounded-xl text-xs font-semibold border border-emerald-300 transition active:scale-95 shadow-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-emerald-900/90 leading-relaxed font-normal pt-1 border-t border-emerald-200/60">
                  Talk directly with agricultural agronomists, plant pathologists, and soil scientists in 22 local Indian languages.
                </p>
              </div>

              {/* Secondary Local KVK Lines */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                  Additional Support Lines
                </h4>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-gray-900">
                      ICAR Direct Advisory Desk
                    </div>
                    <div className="text-[11px] text-gray-500 font-normal">
                      +91 11 2584 1285 / 2584 6451
                    </div>
                  </div>
                  <a
                    href="tel:+911125841285"
                    className="text-xs font-semibold text-[#144733] hover:underline"
                  >
                    Call
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href="tel:18001801551"
                  className="flex-1 bg-[#144733] hover:bg-[#1B4D2E] text-white py-3 rounded-2xl text-xs font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-[#144733]/25 transition active:scale-98"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 1800-180-1551 Now</span>
                </a>
                <button
                  onClick={() => setShowHelplineModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-2xl text-xs font-semibold transition active:scale-98"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
