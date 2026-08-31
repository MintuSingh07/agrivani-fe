"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  Video,
  FileText,
  Play,
  Clock,
  Download,
  CheckCircle2,
  Filter,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import BottomNavigation from "@/components/BottomNavigation";

export default function LearnPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"videos" | "courses" | "articles">("videos");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("agrivani_is_logged_in") === "true";
      if (!isLoggedIn) {
        router.replace("/auth");
      }
    }
  }, [router]);

  const videoTutorials = [
    {
      id: "rice-blast-remedy",
      title: "Step-by-Step Spraying Technique for Leaf Blast in Paddy",
      instructor: "Dr. R. K. Sharma (Senior Agronomist, IARI)",
      duration: "5:20 mins",
      language: "Hindi / English",
      category: "Disease Control",
      isFeatured: true,
      thumbnail: "/images/farm_weather_scenic.jpg",
      views: "14.2k views",
    },
    {
      id: "soil-testing",
      title: "How to Take Soil Samples Correctly for Lab Testing",
      instructor: "Prof. S. Meena (Soil Scientist, TNAU)",
      duration: "6:45 mins",
      language: "Hindi / English",
      category: "Soil Health",
      thumbnail: "/images/farm_weather_scenic.jpg",
      views: "8.9k views",
    },
    {
      id: "drip-irrigation",
      title: "Drip Irrigation Maintenance & Acid Flush Procedure",
      instructor: "Er. Ramesh Verma (Irrigation Engineer)",
      duration: "4:15 mins",
      language: "Hindi / English",
      category: "Water Efficiency",
      thumbnail: "/images/farm_weather_scenic.jpg",
      views: "11.5k views",
    },
  ];

  const courseList = [
    {
      title: "Rice Farming: Complete Season Masterclass",
      lessons: "12 Lessons",
      duration: "2h 40m",
      level: "Intermediate",
      isOfflineReady: true,
    },
    {
      title: "Organic Pest & Fungal Control Methods",
      lessons: "8 Lessons",
      duration: "1h 50m",
      level: "All Levels",
      isOfflineReady: true,
    },
    {
      title: "High-Yield Wheat Cultivation Protocols",
      lessons: "10 Lessons",
      duration: "2h 15m",
      level: "Beginner",
      isOfflineReady: true,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      <main className="w-full max-w-md md:max-w-xl bg-[#FDFFF1] min-h-screen flex flex-col relative pb-32 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top Header */}
        <header className="px-4 py-3 bg-white/95 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/home"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-95 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-base font-semibold text-gray-900 leading-tight">
                {t.learnTitle}
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                {t.downloadOfflineBtn}
              </p>
            </div>
          </div>

          <span className="bg-emerald-100 text-[#1B4D2E] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-300/60">
            {t.downloadOfflineBtn}
          </span>
        </header>

        {/* Content Body */}
        <div className="p-4 space-y-4 flex-1">
          
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchCoursesPlaceholder}
              className="w-full bg-white pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2D7A4D] transition shadow-xs"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Filter className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Category Tabs: Videos, Courses, Articles */}
          <div className="flex rounded-xl bg-gray-200/70 p-1 gap-1 text-xs">
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "videos"
                  ? "bg-white text-[#1B4D2E] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>{t.videosTab}</span>
            </button>

            <button
              onClick={() => setActiveTab("courses")}
              className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "courses"
                  ? "bg-white text-[#1B4D2E] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.coursesTab}</span>
            </button>

            <button
              onClick={() => setActiveTab("articles")}
              className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "articles"
                  ? "bg-white text-[#1B4D2E] shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.articlesTab}</span>
            </button>
          </div>

          {/* Tab Content: Videos */}
          {activeTab === "videos" && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Featured Disease Remedies
                </h3>
                <span className="text-[11px] text-[#2D7A4D] font-semibold">
                  3 Video Remedies Available
                </span>
              </div>

              {videoTutorials.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs space-y-2.5 p-3"
                >
                  {/* Video Thumbnail */}
                  <div className="relative w-full h-40 rounded-xl overflow-hidden group cursor-pointer border border-gray-100">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors" />

                    {/* Play Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-[#1B4D2E] flex items-center justify-center shadow-xl pl-0.5 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-[#1B4D2E]" />
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{video.duration}</span>
                    </div>

                    <div className="absolute top-2.5 left-2.5 bg-emerald-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      {video.category}
                    </div>
                  </div>

                  {/* Video Details */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-gray-900 leading-snug">
                      {video.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-normal">
                      {video.instructor}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-100">
                      <span>{video.language}</span>
                      <span>{video.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Courses */}
          {activeTab === "courses" && (
            <div className="space-y-3">
              {courseList.map((course, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-xs flex items-center justify-between"
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold bg-emerald-100 text-[#1B4D2E] px-2 py-0.5 rounded">
                        {course.level}
                      </span>
                      <span className="text-[10px] text-gray-500 font-normal">
                        {course.duration} • {course.lessons}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-gray-900">
                      {course.title}
                    </h4>
                  </div>

                  <button className="w-8 h-8 rounded-full bg-emerald-50 text-[#2D7A4D] flex items-center justify-center shrink-0 border border-emerald-200">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Articles */}
          {activeTab === "articles" && (
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-xs space-y-2">
                <span className="text-[10px] font-semibold bg-red-100 text-red-800 px-2 py-0.5 rounded">
                  ICAR Research Paper
                </span>
                <h4 className="text-xs font-semibold text-gray-900">
                  Comprehensive Protocol for Early Blast & Sheath Blight Management in Kharif Paddy
                </h4>
                <p className="text-xs text-gray-600 font-normal leading-relaxed">
                  Detailed technical manual covering spore dispersal biology, systemic fungicide efficacy indices, and biological control regimes.
                </p>
                <div className="pt-2">
                  <Link
                    href="/alerts/leaf-blast"
                    className="text-xs font-semibold text-[#2D7A4D] hover:underline"
                  >
                    View Active Outbreak Alert →
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
