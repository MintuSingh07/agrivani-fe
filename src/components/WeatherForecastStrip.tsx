"use client";

import { useMemo } from "react";
import {
  Sun,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Droplets,
  Calendar,
} from "lucide-react";

interface ForecastDay {
  dayName: string;
  dateStr: string;
  icon: typeof Sun;
  tempHigh: string;
  tempLow: string;
  rainChance: string;
  isToday?: boolean;
  isRainy?: boolean;
}

export default function WeatherForecastStrip() {
  // Generate 7 upcoming days dynamically
  const forecastDays: ForecastDay[] = useMemo(() => {
    const icons = [Sun, CloudSun, CloudRain, CloudDrizzle, CloudLightning, CloudSun, Sun];
    const rainChances = ["10%", "25%", "85%", "60%", "90%", "30%", "5%"];
    const tempHighs = ["28°", "27°", "24°", "25°", "23°", "26°", "29°"];
    const tempLows = ["22°", "21°", "20°", "20°", "19°", "21°", "22°"];

    const days: ForecastDay[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + i);

      const dayName =
        i === 0
          ? "Today"
          : targetDate.toLocaleDateString("en-US", { weekday: "short" });
      const dateStr = targetDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });

      const icon = icons[i % icons.length];
      const isRainy =
        rainChances[i].startsWith("6") ||
        rainChances[i].startsWith("8") ||
        rainChances[i].startsWith("9");

      days.push({
        dayName,
        dateStr,
        icon,
        tempHigh: tempHighs[i],
        tempLow: tempLows[i],
        rainChance: rainChances[i],
        isToday: i === 0,
        isRainy,
      });
    }

    return days;
  }, []);

  return (
    <div className="w-full py-1 space-y-2">
      {/* Slim Header Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-900">
          <Calendar className="w-3.5 h-3.5 text-[#2D7A4D]" />
          <span>7-Day Farm Forecast</span>
        </div>
        <span className="text-[10px] text-gray-400 font-normal">
          Scroll for more →
        </span>
      </div>

      {/* Compact Scrollable Forecast Items without solid capsule backgrounds */}
      <div
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex items-center gap-4 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth [&::-webkit-scrollbar]:hidden"
      >
        {forecastDays.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2.5 py-1 transition-all shrink-0"
            >
              {/* Weather Icon */}
              <div className="shrink-0">
                <Icon
                  className={`w-6 h-6 ${
                    item.isRainy
                      ? "text-sky-600"
                      : item.isToday
                      ? "text-amber-500 fill-amber-400"
                      : "text-amber-500"
                  }`}
                />
              </div>

              {/* Weather Information Group: Day, Date, Temp & Rain */}
              <div className="flex flex-col justify-center min-w-[70px]">
                {/* Day & Date */}
                <div className="flex items-center gap-1 text-[11px] leading-tight">
                  <span
                    className={
                      item.isToday
                        ? "font-semibold text-[#1B4D2E]"
                        : "font-semibold text-gray-800"
                    }
                  >
                    {item.dayName}
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    {item.dateStr}
                  </span>
                </div>

                {/* Temp & Rain Indicator in one line */}
                <div className="flex items-center gap-2 mt-0.5 text-xs leading-none">
                  <span className="font-semibold text-gray-900">
                    {item.tempHigh}{" "}
                    <span className="text-gray-400 font-normal text-[10px]">
                      {item.tempLow}
                    </span>
                  </span>

                  <span
                    className={`flex items-center gap-0.5 text-[10px] font-medium ${
                      item.isRainy ? "text-sky-700 font-semibold" : "text-gray-500"
                    }`}
                  >
                    <Droplets className="w-2.5 h-2.5 text-sky-500" />
                    {item.rainChance}
                  </span>
                </div>
              </div>

              {/* Subtle divider between items except last */}
              {index < forecastDays.length - 1 && (
                <div className="w-[1px] h-6 bg-gray-200/80 ml-2 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
