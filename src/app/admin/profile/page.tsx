"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Globe,
  Bell,
  LogOut,
  ChevronRight,
  Video,
  X,
  Pencil,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminProfilePage() {
  const { t, currentLanguageInfo } = useLanguage();
  const [selectedLanguageName, setSelectedLanguageName] = useState("English / हिन्दी");
  const [showEditModal, setShowEditModal] = useState(false);

  const [adminProfile, setAdminProfile] = useState({
    name: "Dr. Subhashish Roy",
    role: "Senior Block Agriculture Officer (BAO)",
    designation: "Senior Block Agriculture Officer (BAO)",
    id: "WB-AGRI-2025-884",
    email: "s.roy@wb.gov.in",
    phone: "+91 94340 12890",
    location: "Purba Bardhaman, West Bengal",
    department: "Department of Agriculture, Govt. of West Bengal",
  });

  const [editForm, setEditForm] = useState({ ...adminProfile });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("agrivani_app_language_name");
      if (savedLang) {
        setSelectedLanguageName(savedLang);
      } else if (currentLanguageInfo) {
        setSelectedLanguageName(`${currentLanguageInfo.name} / ${currentLanguageInfo.nativeName}`);
      }

      const savedAdmin = localStorage.getItem("agrivani_officer_profile") || localStorage.getItem("agrivani_admin_profile");
      if (savedAdmin) {
        try {
          const parsed = JSON.parse(savedAdmin);
          setAdminProfile((prev) => ({ ...prev, ...parsed }));
          setEditForm((prev) => ({ ...prev, ...parsed }));
        } catch {}
      }
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminProfile(editForm);
    if (typeof window !== "undefined") {
      localStorage.setItem("agrivani_admin_profile", JSON.stringify(editForm));
      localStorage.setItem("agrivani_officer_profile", JSON.stringify(editForm));
      localStorage.setItem("agrivani_admin_name", editForm.name);
      localStorage.setItem("agrivani_officer_name", editForm.name);
    }
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      {/* Mobile / Tablet / Desktop Responsive Centered App Shell */}
      <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top Header Bar */}
        <header className="px-4 py-3.5 bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 leading-tight">
                Officer &amp; Admin Profile
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                Agricultural Department Portal
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setEditForm({ ...adminProfile });
              setShowEditModal(true);
            }}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#144733] bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 active:scale-95 transition cursor-pointer"
          >
            <Pencil className="w-3 h-3 text-[#144733]" />
            <span>Edit</span>
          </button>
        </header>

        {/* Profile Content Body */}
        <div className="p-4 space-y-4 flex-1">
          
          {/* Officer Identity Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 border-2 border-[#144733]/30 flex items-center justify-center text-[#144733] shrink-0 shadow-xs text-xl font-bold">
                🏛️
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-gray-900 leading-snug truncate">
                    {adminProfile.name}
                  </h2>
                  <span className="text-[10px] font-bold text-[#2D7A4D] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {adminProfile.id}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 font-medium truncate mt-0.5">
                  {adminProfile.designation || adminProfile.role}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1 truncate">
                  <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                  <span>{adminProfile.phone}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5 truncate">
                  <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                  <span>{adminProfile.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setEditForm({ ...adminProfile });
                setShowEditModal(true);
              }}
              title="Edit Profile"
              className="w-8 h-8 rounded-full bg-gray-50 hover:bg-emerald-50 text-gray-500 hover:text-[#144733] border border-gray-200 hover:border-emerald-300 flex items-center justify-center transition active:scale-95 shrink-0 cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Settings & Menu Group */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs divide-y divide-gray-100 overflow-hidden">
            
            {/* 1. App Language Option */}
            <Link
              href="/profile/language?from=admin"
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
              href="/alerts/leaf-blast"
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
          </div>

          {/* Logout Button */}
          <Link
            href="/auth"
            className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 py-3 rounded-2xl text-xs font-semibold border border-red-200 transition active:scale-98 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.logOutBtn}</span>
          </Link>
        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-200 space-y-4 animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-gray-900">Edit Admin Profile</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#144733]/30"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#144733]/30"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Location / Jurisdiction</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#144733]/30"
                    required
                  />
                </div>

                <div className="pt-3 flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#144733] hover:bg-[#1B4D2E] text-white py-3 rounded-2xl text-xs font-semibold transition active:scale-98 cursor-pointer shadow-md shadow-[#144733]/25"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-2xl text-xs font-semibold transition active:scale-98 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
