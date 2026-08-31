"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Sun, Wind, Thermometer, Droplets, ChevronRight, Moon, CloudSun } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface WeatherCardProps {
  userName?: string;
  location?: string;
  temperature?: string;
  condition?: string;
  timestamp?: string;
  windSpeed?: string;
  tempVar?: string;
  humidity?: string;
  bgImageUrl?: string;
}

export default function WeatherCard({
  userName = "Zara",
  location = "",
  temperature = "26°C",
  condition,
  timestamp,
  windSpeed = "5 km/h",
  tempVar = "+12°C",
  humidity = "42.5%",
  bgImageUrl = "/images/farm_weather_scenic.jpg",
}: WeatherCardProps) {
  const { t } = useLanguage();
  const [greeting, setGreeting] = useState("Good Morning");
  const [currentTime, setCurrentTime] = useState("");
  const [currentLocation, setCurrentLocation] = useState(location);
  const [isNight, setIsNight] = useState(false);
  const [profileHref, setProfileHref] = useState("/profile");

  const displayCondition = condition || (isNight ? "Clear Night" : t.sunnyDay);

  // 1. Dynamic local time & greeting calculation (Updates live every second)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("agrivani_user_role");
      if (role === "officer" || role === "admin") {
        setProfileHref("/admin/profile");
      } else {
        setProfileHref("/profile");
      }
    }

    const updateTimeAndGreeting = () => {
      const now = new Date();
      const hour = now.getHours();

      let timeOfDay = t.greetingMorning;
      if (hour >= 12 && hour < 17) {
        timeOfDay = t.greetingAfternoon;
      } else if (hour >= 17 || hour < 5) {
        timeOfDay = t.greetingEvening;
        setIsNight(true);
      } else {
        setIsNight(false);
      }
      setGreeting(timeOfDay);

      // Live formatted timestamp (e.g., "9:57 PM | Aug 24")
      const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
      const dateStr = now.toLocaleDateString([], { month: "short", day: "numeric" });
      setCurrentTime(`${timeStr} | ${dateStr}`);
    };

    updateTimeAndGreeting();
    const interval = setInterval(updateTimeAndGreeting, 1000);
    return () => clearInterval(interval);
  }, [t]);

  // 2. Dual Real Geolocation fetching (IP Fallback + High Accuracy GPS)
  useEffect(() => {
    let isMounted = true;

    // Helper: IP-based real location lookup (Instant)
    const fetchIpLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.city && (data.region || data.country_name)) {
            if (isMounted) {
              setCurrentLocation(`${data.city}, ${data.region || data.country_name}`);
            }
          }
        }
      } catch {
        // Fallback to secondary IP API if ipapi fails
        try {
          const res2 = await fetch("https://api.bigdatacloud.net/data/client-location");
          if (res2.ok) {
            const data2 = await res2.json();
            if (data2 && data2.city && data2.principalSubdivision) {
              if (isMounted) {
                setCurrentLocation(`${data2.city}, ${data2.principalSubdivision}`);
              }
            }
          }
        } catch {
          // Ignore IP fetch errors
        }
      }
    };

    // Trigger instant IP location fetch
    fetchIpLocation();

    // Trigger browser HTML5 GPS location if available
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            if (res.ok) {
              const data = await res.json();
              const city = data.city || data.locality || data.principalSubdivision;
              const state = data.principalSubdivision || data.countryName;
              if (city && state && isMounted) {
                setCurrentLocation(`${city}, ${state}`);
              }
            }
          } catch {
            // Keep existing resolved location
          }
        },
        () => {
          // GPS Permission denied or timed out
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative w-full sm:rounded-t-3xl rounded-b-[24px] overflow-hidden shadow-md text-white min-h-[250px] sm:min-h-[270px] flex flex-col justify-between p-4 sm:p-5 bg-[#144225]">
      {/* Scenic Farm Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImageUrl}
          alt="Farm Background"
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-cover object-center scale-105"
        />
        {/* Ambient Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-emerald-950/20 to-black/70" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full flex-1 gap-3.5">
        {/* Top Header Bar: Dynamic Greeting on Left, Chevron Arrow on Right */}
        <div className="flex items-start justify-between w-full">
          {/* Greeting & Location */}
          <div className="flex flex-col gap-0.5 pr-2">
            <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight drop-shadow-md">
              {greeting}, {userName}
            </h2>
            <div className="flex items-center gap-1 text-xs text-white/95 font-normal drop-shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
              <span>{currentLocation}</span>
            </div>
          </div>

          {/* Right-Pointed Arrow Button linking to Profile */}
          <Link
            href={profileHref}
            aria-label="View Profile"
            className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/25 text-white hover:bg-black/45 transition-all active:scale-95 shrink-0 ml-2 shadow-sm cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </Link>
        </div>

        {/* Main Temperature & Weather Stats */}
        <div className="flex items-end justify-between pt-1 my-auto">
          {/* Hero Temperature */}
          <div className="text-5xl sm:text-6xl font-semibold text-white tracking-tighter leading-none drop-shadow-md">
            {temperature}
          </div>

          {/* Weather Condition & Time */}
          <div className="flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5 text-base sm:text-lg font-semibold text-white drop-shadow-sm">
              {isNight ? (
                <Moon className="w-5 h-5 text-indigo-200 fill-indigo-200" />
              ) : displayCondition.toLowerCase().includes("sun") || displayCondition.toLowerCase().includes("धूप") || displayCondition.toLowerCase().includes("রৌদ্র") ? (
                <Sun className="w-5 h-5 text-amber-300 fill-amber-300" />
              ) : (
                <CloudSun className="w-5 h-5 text-sky-200" />
              )}
              <span>{displayCondition}</span>
            </div>
            <span className="text-[11px] sm:text-xs text-white/85 font-normal mt-0.5 tracking-wide">
              {currentTime}
            </span>
          </div>
        </div>

        {/* Bottom Glassmorphism Metrics Pills */}
        <div className="grid grid-cols-3 gap-2 pt-2 pb-0.5">
          {/* Wind */}
          <div className="bg-white/20 backdrop-blur-md border border-white/25 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-sm">
            <Wind className="w-3.5 h-3.5 text-white/90 shrink-0" />
            <span className="truncate">{windSpeed}</span>
          </div>

          {/* Temp Variation */}
          <div className="bg-white/20 backdrop-blur-md border border-white/25 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-sm">
            <Thermometer className="w-3.5 h-3.5 text-white/90 shrink-0" />
            <span className="truncate">{tempVar}</span>
          </div>

          {/* Humidity */}
          <div className="bg-white/20 backdrop-blur-md border border-white/25 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-sm">
            <Droplets className="w-3.5 h-3.5 text-white/90 shrink-0" />
            <span className="truncate">{humidity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
