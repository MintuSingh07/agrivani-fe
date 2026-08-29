"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Play,
  Clock,
  RotateCcw,
  CheckCircle2,
  Trash2,
  X,
  ExternalLink,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface RecentVideo {
  id: string;
  title: string;
  instructor: string;
  category: string;
  duration: string;
  progressPercent: number;
  lastWatched: string;
  thumbnail: string;
  videoDesc: string;
}

const INITIAL_RECENT_VIDEOS: RecentVideo[] = [
  {
    id: "vid-1",
    title: "Step-by-Step Spraying Technique for Leaf Blast in Paddy",
    instructor: "Dr. R. K. Sharma (Senior Agronomist, IARI)",
    category: "Disease Control",
    duration: "5:20 mins",
    progressPercent: 85,
    lastWatched: "Today, 11:30 AM",
    thumbnail: "/images/farm_weather_scenic.jpg",
    videoDesc:
      "Learn how to mix systemic Tricyclazole fungicides with correct droplet size and nozzle pressure to prevent fungal spread in wet conditions.",
  },
  {
    id: "vid-2",
    title: "How to Take Soil Samples Correctly for Lab Testing",
    instructor: "Prof. S. Meena (Soil Scientist, TNAU)",
    category: "Soil Health",
    duration: "6:45 mins",
    progressPercent: 100,
    lastWatched: "Yesterday, 3:10 PM",
    thumbnail: "/images/farm_weather_scenic.jpg",
    videoDesc:
      "A complete walkthrough on collecting V-shaped soil core samples across 8 random field spots for accurate N-P-K nutrient profiling.",
  },
  {
    id: "vid-3",
    title: "Drip Irrigation Maintenance & Acid Flush Procedure",
    instructor: "Er. Ramesh Verma (Irrigation Engineer)",
    category: "Water Efficiency",
    duration: "4:15 mins",
    progressPercent: 45,
    lastWatched: "3 days ago",
    thumbnail: "/images/farm_weather_scenic.jpg",
    videoDesc:
      "Clearing salt and calcium carbonate clogging from inline drippers using mild hydrochloric acid flush techniques.",
  },
  {
    id: "vid-4",
    title: "Nano-Urea Foliar Spray: Timing and Dosages",
    instructor: "IFFCO Krishi Specialist Team",
    category: "Crop Nutrition",
    duration: "7:10 mins",
    progressPercent: 20,
    lastWatched: "5 days ago",
    thumbnail: "/images/farm_weather_scenic.jpg",
    videoDesc:
      "Maximizing nitrogen uptake efficiency through morning foliar application at active tillering and flag leaf stages.",
  },
];

export default function RecentVideosPage() {
  const [videos, setVideos] = useState<RecentVideo[]>(INITIAL_RECENT_VIDEOS);
  const [activePlayingVideo, setActivePlayingVideo] = useState<RecentVideo | null>(null);

  const handleClearHistory = () => {
    setVideos([]);
  };

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
                Recent Videos
              </h1>
              <p className="text-[11px] text-gray-500 font-normal">
                Recently played masterclasses & guides
              </p>
            </div>
          </div>

          {videos.length > 0 && (
            <button
              onClick={handleClearHistory}
              title="Clear watch history"
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 flex items-center justify-center transition active:scale-95 border border-gray-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </header>

        {/* Content Body */}
        <div className="p-4 space-y-4 flex-1">
          
          {/* Quick Header Banner */}
          <div className="bg-gradient-to-r from-[#144733] to-[#1B4D2E] text-white p-3.5 rounded-2xl flex items-center justify-between shadow-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-semibold text-[#95CF3A] uppercase tracking-wider block">
                Playback History
              </span>
              <h2 className="text-xs font-semibold">
                {videos.length} {videos.length === 1 ? "Video" : "Videos"} in History
              </h2>
            </div>
            <Link
              href="/learn"
              className="text-[11px] font-semibold bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl flex items-center gap-1 backdrop-blur-md transition active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore All</span>
            </Link>
          </div>

          {/* Videos List */}
          <div className="space-y-3">
            {videos.map((vid) => {
              const isCompleted = vid.progressPercent === 100;

              return (
                <div
                  key={vid.id}
                  onClick={() => setActivePlayingVideo(vid)}
                  className="bg-white rounded-2xl border border-gray-200 p-3 shadow-xs hover:border-[#144733]/40 cursor-pointer transition-all active:scale-[0.99] group"
                >
                  <div className="flex gap-3">
                    {/* Thumbnail with Overlay & Play Icon */}
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100 bg-gray-900">
                      <Image
                        src={vid.thumbnail}
                        alt={vid.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/90 text-[#144733] flex items-center justify-center shadow-md pl-0.5">
                          <Play className="w-4 h-4 fill-[#144733]" />
                        </div>
                      </div>

                      {/* Duration Tag */}
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-semibold px-1.5 py-0.2 rounded">
                        {vid.duration}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            {vid.category}
                          </span>
                          <span className="text-[10px] text-gray-400 font-normal">
                            {vid.lastWatched}
                          </span>
                        </div>
                        <h3 className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2 mt-1">
                          {vid.title}
                        </h3>
                        <p className="text-[10px] text-gray-500 font-normal truncate mt-0.5">
                          {vid.instructor}
                        </p>
                      </div>

                      {/* Progress Bar & Status */}
                      <div className="pt-1.5">
                        <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                          <span className="flex items-center gap-1 font-medium">
                            {isCompleted ? (
                              <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Completed
                              </span>
                            ) : (
                              <span>{vid.progressPercent}% watched</span>
                            )}
                          </span>
                          <span className="text-[9px] text-[#144733] font-semibold group-hover:underline flex items-center gap-0.5">
                            <RotateCcw className="w-2.5 h-2.5" />
                            Resume
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isCompleted ? "bg-emerald-600" : "bg-[#95CF3A]"
                            }`}
                            style={{ width: `${vid.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {videos.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-xs bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
                <Clock className="w-10 h-10 text-gray-300 mx-auto" />
                <div>
                  <p className="font-semibold text-gray-700 text-sm">No recent video history</p>
                  <p className="text-gray-400 mt-1">
                    Videos and farming masterclasses you watch will appear here.
                  </p>
                </div>
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-1.5 bg-[#144733] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs hover:bg-[#1B4D2E] transition active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Browse Video Guides</span>
                </Link>
              </div>
            )}
          </div>

        </div>

        {/* Video Player Modal Simulation */}
        {activePlayingVideo && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 animate-in fade-in zoom-in duration-200">
              {/* Top Bar */}
              <div className="p-3 bg-[#144733] text-white flex items-center justify-between">
                <span className="text-xs font-semibold truncate pr-2">
                  Now Playing
                </span>
                <button
                  onClick={() => setActivePlayingVideo(null)}
                  className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-white transition active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Screen Simulation */}
              <div className="relative w-full h-48 bg-black">
                <Image
                  src={activePlayingVideo.thumbnail}
                  alt={activePlayingVideo.title}
                  fill
                  unoptimized
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                
                {/* Center Play Button Pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#95CF3A] text-[#144733] flex items-center justify-center shadow-2xl pl-1 animate-pulse">
                    <Play className="w-7 h-7 fill-[#144733]" />
                  </div>
                </div>

                {/* Progress bar at bottom of video */}
                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
                  <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#95CF3A]"
                      style={{ width: `${activePlayingVideo.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-white font-medium">
                    <span>Playing HD (Offline Cache Ready)</span>
                    <span>{activePlayingVideo.duration}</span>
                  </div>
                </div>
              </div>

              {/* Video Metadata & Controls */}
              <div className="p-4 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {activePlayingVideo.category}
                  </span>
                  <h3 className="text-xs font-bold text-gray-900 leading-snug mt-1.5">
                    {activePlayingVideo.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-normal mt-0.5">
                    {activePlayingVideo.instructor}
                  </p>
                  <p className="text-[11px] text-gray-600 font-normal leading-relaxed mt-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    {activePlayingVideo.videoDesc}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setActivePlayingVideo(null)}
                    className="flex-1 bg-[#144733] hover:bg-[#1B4D2E] text-white py-2.5 rounded-xl text-xs font-semibold text-center transition active:scale-95"
                  >
                    Close Player
                  </button>
                  <Link
                    href="/learn"
                    className="bg-emerald-50 hover:bg-emerald-100 text-[#144733] py-2.5 px-3 rounded-xl text-xs font-semibold text-center border border-emerald-200 transition active:scale-95"
                  >
                    More Videos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
