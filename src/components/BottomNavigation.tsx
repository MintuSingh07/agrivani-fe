"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Sprout, BookOpen, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NavItem {
  name: string;
  href: string;
  icon: typeof Home;
}

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const navItems: NavItem[] = [
    { name: t.navHome, href: "/", icon: Home },
    { name: t.navCrops, href: "/crops", icon: Sprout },
    { name: t.navLearn, href: "/learn", icon: BookOpen },
    { name: t.navProfile, href: "/profile", icon: User },
  ];

  // Helper to map pathname to index
  const getIndexFromPath = (path: string | null) => {
    if (!path || path === "/") return 0;
    if (path.startsWith("/crops") || path.startsWith("/detection")) return 1;
    if (path.startsWith("/learn")) return 2;
    if (path.startsWith("/profile")) return 3;
    if (path.startsWith("/alerts")) return 0;
    return 0;
  };

  // Immediate local state for responsive gravity glide
  const [activeTab, setActiveTab] = useState(() => getIndexFromPath(pathname));

  // Sync state on external navigation / browser history & kill camera if not on /detection
  useEffect(() => {
    setActiveTab(getIndexFromPath(pathname));

    if (!pathname?.startsWith("/detection") && typeof window !== "undefined") {
      // Clean up all video media tracks immediately
      document.querySelectorAll("video").forEach((video) => {
        if (video.srcObject) {
          try {
            const stream = video.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
          } catch { }
          video.srcObject = null;
        }
      });
      if ((window as any).__agrivani_camera_stream) {
        try {
          const stream = (window as any).__agrivani_camera_stream as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
        } catch { }
        (window as any).__agrivani_camera_stream = null;
      }
    }
  }, [pathname]);

  const handleTabClick = (index: number, href: string) => {
    if (index === activeTab) return;

    // If leaving detection, proactively stop camera stream
    if (pathname?.startsWith("/detection") && href !== "/detection" && typeof window !== "undefined") {
      document.querySelectorAll("video").forEach((video) => {
        if (video.srcObject) {
          try {
            const stream = video.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
          } catch { }
          video.srcObject = null;
        }
      });
      if ((window as any).__agrivani_camera_stream) {
        try {
          const stream = (window as any).__agrivani_camera_stream as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
        } catch { }
        (window as any).__agrivani_camera_stream = null;
      }
    }

    setActiveTab(index);
    router.push(href);
  };

  // Hide bottom navbar on full-page forms (chat, onboarding, get-started, auth, crop add, and admin suite)
  if (
    pathname?.startsWith("/chat") ||
    pathname?.startsWith("/onboarding") ||
    pathname?.startsWith("/get-started") ||
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/crops/add") ||
    pathname?.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-0 sm:px-4">
      <div className="w-full max-w-md md:max-w-xl pointer-events-auto relative">
        {/* Navigation Bar Body with Plain Straight Edges (No rounded corners) */}
        <nav
          aria-label="Curved Bottom Navigation"
          className="relative w-full h-[78px] bg-[#144733] shadow-2xl overflow-visible select-none pb-2"
        >
          {/* Smooth, Fluid Gravity Gliding Container */}
          <motion.div
            className="absolute top-0 bottom-0 w-1/4 flex flex-col items-center pointer-events-none z-10"
            initial={false}
            animate={{
              x: `${activeTab * 100}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 18,
              mass: 1.05,
            }}
          >
            {/* True Mathematical Circle Arc Cutout with Slightly Lower Bottom Trough (#FDFFF1) */}
            <svg
              viewBox="0 0 130 42"
              preserveAspectRatio="none"
              className="w-[126px] h-[40px] absolute -top-[1px] fill-[#FDFFF1] pointer-events-none drop-shadow-xs"
            >
              {/* Perfectly circular cup lowered slightly for a deeper, rounded hug */}
              <path
                d="M 0,0 
                   L 12,0 
                   C 23,0 31,8 38.7,22.3 
                   A 29 29 0 0 0 91.3,22.3 
                   C 99,8 107,0 118,0 
                   L 130,0 
                   L 130,-5 
                   L 0,-5 
                   Z"
              />
            </svg>

            {/* Elevated Lime-Green Active Circle nested inside the circular cup */}
            <motion.div
              key={activeTab}
              initial={{ y: -8, scale: 0.86 }}
              animate={{ y: -16, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 15,
                mass: 0.9,
              }}
              className="w-12 h-12 rounded-full bg-[#95CF3A] shadow-md shadow-black/25 flex items-center justify-center text-[#144733] z-20"
            >
              {(() => {
                const ActiveIcon = navItems[activeTab]?.icon || Home;
                return (
                  <motion.div
                    initial={{ rotate: -10, scale: 0.85 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 15,
                    }}
                  >
                    <ActiveIcon className="w-6 h-6 stroke-[2.3]" />
                  </motion.div>
                );
              })()}
            </motion.div>

            {/* Active Tab Label beneath the circle */}
            <motion.span
              key={`label-${activeTab}`}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-[11px] font-semibold text-white tracking-wide -mt-2.5 z-20"
            >
              {navItems[activeTab]?.name}
            </motion.span>
          </motion.div>

          {/* 4 Touch Target Action Buttons (Icon + Text Label) */}
          <div className="relative w-full h-full flex items-center justify-around z-30 pt-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeTab;

              return (
                <button
                  key={item.name}
                  onClick={() => handleTabClick(index, item.href)}
                  aria-label={item.name}
                  aria-current={isActive ? "page" : undefined}
                  className="w-1/4 h-full flex flex-col items-center justify-center group focus:outline-none cursor-pointer pt-1"
                >
                  {/* When inactive, show icon and label; when active, fade out so sliding element takes over */}
                  <div
                    className={`transition-all duration-200 flex flex-col items-center justify-center gap-1 ${isActive
                      ? "opacity-0 scale-50 pointer-events-none"
                      : "opacity-75 group-hover:opacity-100 group-active:scale-95 text-white"
                      }`}
                  >
                    <Icon className="w-5 h-5 stroke-[1.9]" />
                    <span className="text-[10px] font-normal leading-none tracking-tight">
                      {item.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* iOS Bottom Indicator Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-black/25 rounded-full pointer-events-none" />
        </nav>
      </div>
    </div>
  );
}
