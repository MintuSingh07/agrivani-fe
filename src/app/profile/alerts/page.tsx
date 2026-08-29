"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  CloudRain,
  Bug,
  AlertTriangle,
  ChevronRight,
  Info,
  CheckCheck,
  Calendar,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

interface NotificationItem {
  id: string;
  type: "pest" | "weather" | "advisory";
  title: string;
  message: string;
  timestamp: string;
  severity: "high" | "warning" | "info";
  read: boolean;
  linkHref?: string;
  actionText?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "alert-1",
    type: "pest",
    title: "High Risk: Leaf Blast Fungus Outbreak",
    message:
      "Continuous night humidity (>92%) and morning dew have triggered high spore germination in Rice (Paddy) crops in your sector. Inspect lower leaf margins for diamond-shaped lesions.",
    timestamp: "Today, 8:30 AM",
    severity: "high",
    read: false,
    linkHref: "/alerts/leaf-blast",
    actionText: "View Spray & Advisory Guide",
  },
  {
    id: "alert-2",
    type: "weather",
    title: "Heavy Rainfall & Thunderstorm Warning",
    message:
      "IMD forecast predicts 45mm–60mm precipitation over the next 36 hours. Delay all foliar fertilizer applications and ensure proper farm drainage channels are clear.",
    timestamp: "Yesterday, 4:15 PM",
    severity: "warning",
    read: false,
  },
  {
    id: "alert-3",
    type: "pest",
    title: "Stem Borer Alert in Neighboring Farms",
    message:
      "Yellow Stem Borer egg masses detected in 3 adjacent fields within 2 km. Install Pheromone Traps (5 traps/acre) immediately to monitor moth population.",
    timestamp: "Aug 26, 2026",
    severity: "warning",
    read: true,
  },
  {
    id: "alert-4",
    type: "advisory",
    title: "Optimal Urea Top-Dressing Window",
    message:
      "Panicle Initiation stage reached for Kharif Paddy. Apply remaining 25% Nitrogen dosage along with MOP before upcoming light irrigation.",
    timestamp: "Aug 24, 2026",
    severity: "info",
    read: true,
  },
  {
    id: "alert-5",
    type: "weather",
    title: "Temperature Spike (+4°C above normal)",
    message:
      "Daytime temperatures expected to touch 38°C with dry winds. Maintain 3-5 cm standing water in paddy fields to prevent heat stress and leaf curl.",
    timestamp: "Aug 21, 2026",
    severity: "warning",
    read: true,
  },
];

export default function WeatherPestAlertsPage() {
  const [filter, setFilter] = useState<"all" | "pest" | "weather" | "advisory">("all");
  const [alerts, setAlerts] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const filteredAlerts = alerts.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  const unreadCount = alerts.filter((a) => !a.read).length;

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
                Weather & Pest Alerts
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                Previous notifications & advisory history
              </p>
            </div>
          </div>

          {unreadCount > 0 ? (
            <button
              onClick={markAllAsRead}
              className="text-[11px] text-[#144733] font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 hover:bg-emerald-100 active:scale-95 transition"
            >
              <CheckCheck className="w-3 h-3 text-emerald-600" />
              <span>Mark all read</span>
            </button>
          ) : (
            <span className="text-[10px] text-gray-400 font-normal">All read</span>
          )}
        </header>

        {/* Content Body */}
        <div className="p-4 space-y-3.5 flex-1">
          
          {/* Quick Filter Tabs */}
          <div className="flex rounded-xl bg-gray-200/70 p-1 gap-1 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                filter === "all"
                  ? "bg-white text-[#144733] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setFilter("pest")}
              className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all ${
                filter === "pest"
                  ? "bg-white text-rose-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Bug className="w-3 h-3" />
              <span>Pest/Disease</span>
            </button>
            <button
              onClick={() => setFilter("weather")}
              className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all ${
                filter === "weather"
                  ? "bg-white text-sky-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <CloudRain className="w-3 h-3" />
              <span>Weather</span>
            </button>
            <button
              onClick={() => setFilter("advisory")}
              className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all ${
                filter === "advisory"
                  ? "bg-white text-amber-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Info className="w-3 h-3" />
              <span>Advisory</span>
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredAlerts.map((item) => {
              const isHigh = item.severity === "high";
              const isWarning = item.severity === "warning";

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl p-4 border transition-all ${
                    !item.read
                      ? "bg-white border-emerald-300/80 shadow-xs ring-1 ring-emerald-500/10"
                      : "bg-white/80 border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          item.type === "pest"
                            ? "bg-rose-50 text-rose-600 border border-rose-200"
                            : item.type === "weather"
                            ? "bg-sky-50 text-sky-600 border border-sky-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {item.type === "pest" ? (
                          <Bug className="w-4 h-4" />
                        ) : item.type === "weather" ? (
                          <CloudRain className="w-4 h-4" />
                        ) : (
                          <Info className="w-4 h-4" />
                        )}
                      </div>

                      <div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isHigh
                              ? "bg-rose-100 text-rose-800"
                              : isWarning
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isHigh ? "High Alert" : isWarning ? "Warning" : "Advisory Tip"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                      <Calendar className="w-3 h-3" />
                      <span>{item.timestamp}</span>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 ml-1 inline-block" />
                      )}
                    </div>
                  </div>

                  <div className="mt-2.5">
                    <h3 className="text-xs font-bold text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-normal leading-relaxed mt-1">
                      {item.message}
                    </p>
                  </div>

                  {item.linkHref && (
                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-end">
                      <Link
                        href={item.linkHref}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#144733] hover:text-[#1B4D2E] active:scale-95 transition"
                      >
                        <span>{item.actionText || "View Details"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredAlerts.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-xs bg-white rounded-2xl border border-gray-200 p-6">
                <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="font-semibold text-gray-700">No alerts found</p>
                <p className="text-gray-400 mt-0.5">You are all caught up with your crop updates.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
