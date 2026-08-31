"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import WeatherCard from "@/components/WeatherCard";
import WeatherForecastStrip from "@/components/WeatherForecastStrip";
import DiseaseAlertStrip from "@/components/DiseaseAlertStrip";
import HomeCropTracker from "@/components/HomeCropTracker";

export default function FarmerHomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Farmer");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("agrivani_is_logged_in") === "true";
      const userRole = localStorage.getItem("agrivani_user_role");
      const hasOnboarded = localStorage.getItem("agrivani_onboarded") === "true";

      if (!isLoggedIn) {
        if (!hasOnboarded) {
          router.replace("/get-started");
        } else {
          router.replace("/auth");
        }
        return;
      }

      if (userRole === "officer" || userRole === "admin") {
        router.replace("/admin");
        return;
      }

      setIsAuthorized(true);

      const savedName = localStorage.getItem("agrivani_farmer_name");
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
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#FDFFF1] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#144733] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      {/* Mobile/Tablet Centered App Frame Container */}
      <main className="w-full max-w-md md:max-w-xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">

        {/* 1. Full Half-Screen Weather Report Header */}
        <section id="weather" className="w-full m-0 p-0">
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

        {/* Main Dashboard Cards Container */}
        <div className="p-4 space-y-4 flex-1">

          {/* 2. 7-Day Weather Forecast Strip */}
          <section id="forecast">
            <WeatherForecastStrip />
          </section>

          {/* 3. Weather-Correlated Pest / Fungus Outbreak Warning Banner */}
          <section id="disease-alert">
            <DiseaseAlertStrip
              diseaseName="Leaf Blast Fungus"
              targetHref="/alerts/leaf-blast"
            />
          </section>

          {/* 4. Registered Crops & Farm Tracker Section with Add Crop Feature (Under Warning Banner) */}
          <section id="crops-tracker">
            <HomeCropTracker />
          </section>

        </div>
      </main>
    </div>
  );
}
