"use client";

import { useState, useEffect } from "react";
import WeatherCard from "@/components/WeatherCard";
import AdminFarmerCards from "@/components/AdminFarmerCards";

export default function AdminHomePage() {
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("agrivani_admin_name") || localStorage.getItem("agrivani_farmer_name");
      if (savedName) {
        setUserName(savedName);
      } else {
        const savedProfile = localStorage.getItem("agrivani_farmer_profile");
        if (savedProfile) {
          try {
            const parsed = JSON.parse(savedProfile);
            if (parsed.name) setUserName(parsed.name);
          } catch {}
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      {/* Mobile / Tablet / Desktop Responsive Centered App Shell */}
      <main className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* 1. Scenic Weather & Status Header Card (Matching Visual Design) */}
        <section id="admin-weather" className="w-full m-0 p-0">
          <WeatherCard
            userName={userName}
            temperature="26°C"
            condition="Sunny Day"
            windSpeed="5 km/h"
            tempVar="+12°C"
            humidity="42.5%"
            bgImageUrl="/images/farm_weather_scenic.jpg"
          />
        </section>

        {/* 2. Admin Content Area with 6+ Expandable Farmer Cards */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          <AdminFarmerCards />
        </div>
      </main>
    </div>
  );
}

