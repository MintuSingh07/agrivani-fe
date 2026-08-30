"use client";

import { useEffect, useRef, useState } from "react";
import type * as LeafletType from "leaflet";
import {
  Phone,
  MapPin,
  Sprout,
  AlertTriangle,
  Send,
  X,
  Crosshair,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  User,
} from "lucide-react";
import { DISEASED_FARMERS, DiseasedFarmer } from "@/data/diseasedFarmers";
import { useLanguage } from "@/context/LanguageContext";

export default function DiseaseHeatMap() {
  const { t } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletType.Map | null>(null);
  const layerGroupRef = useRef<LeafletType.LayerGroup | null>(null);
  const heatGroupRef = useRef<LeafletType.LayerGroup | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const [selectedFarmer, setSelectedFarmer] = useState<DiseasedFarmer | null>(DISEASED_FARMERS[0]);
  const [advisorySent, setAdvisorySent] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  // Initialize Map
  useEffect(() => {
    let isMounted = true;

    async function initLeaflet() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L = await import("leaflet");

      if (!isMounted || !mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [23.34, 87.95],
        zoom: 10,
        zoomControl: false,
        attributionControl: false,
      });

      // Standard OpenStreetMap tiles (clean & fast)
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);

      // Add Zoom control at bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      const heatGroup = L.layerGroup().addTo(map);
      const layerGroup = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
      heatGroupRef.current = heatGroup;
      layerGroupRef.current = layerGroup;

      setMapLoaded(true);
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Render heatmap circles and markers
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !layerGroupRef.current || !heatGroupRef.current) return;

    import("leaflet").then((Leaflet) => {
      const map = mapInstanceRef.current!;
      const layerGroup = layerGroupRef.current!;
      const heatGroup = heatGroupRef.current!;

      layerGroup.clearLayers();
      heatGroup.clearLayers();

      // Render Soft Thermal Heatmap Glow Circles around diseased farms
      DISEASED_FARMERS.forEach((farmer) => {
        let radius = 5500;
        let color = "#EF4444";
        let fillOpacity = 0.35;

        if (farmer.severity === "critical") {
          radius = 7000;
          color = "#DC2626";
          fillOpacity = 0.4;
        } else if (farmer.severity === "high") {
          radius = 5500;
          color = "#EA580C";
          fillOpacity = 0.32;
        } else if (farmer.severity === "moderate") {
          radius = 4200;
          color = "#D97706";
          fillOpacity = 0.25;
        } else {
          radius = 3200;
          color = "#65A30D";
          fillOpacity = 0.2;
        }

        // Outer glow
        Leaflet.circle([farmer.lat, farmer.lng], {
          radius: radius,
          color: color,
          weight: 1,
          fillColor: color,
          fillOpacity: fillOpacity,
          interactive: false,
        }).addTo(heatGroup);

        // Core thermal point
        Leaflet.circle([farmer.lat, farmer.lng], {
          radius: radius * 0.35,
          color: "transparent",
          fillColor: color,
          fillOpacity: 0.55,
          interactive: false,
        }).addTo(heatGroup);
      });

      // Render Clickable Location Pin for each Diseased Farmer
      DISEASED_FARMERS.forEach((farmer) => {
        const isSelected = selectedFarmer?.id === farmer.id;
        const colorHex =
          farmer.severity === "critical"
            ? "#DC2626"
            : farmer.severity === "high"
            ? "#EA580C"
            : farmer.severity === "moderate"
            ? "#D97706"
            : "#65A30D";

        const markerHtml = `
          <div class="relative cursor-pointer flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${
            isSelected ? "scale-125 z-40" : "hover:scale-110"
          }">
            <div class="px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 border-2 ${
              isSelected ? "bg-gray-900 text-white shadow-xl ring-2 ring-white/80" : "bg-white text-gray-900 shadow-md"
            }" style="border-color: ${colorHex}">
              <span class="w-2.5 h-2.5 rounded-full animate-pulse shrink-0" style="background-color: ${colorHex}"></span>
              <span class="text-[11px] font-bold whitespace-nowrap">${farmer.farmerName.split(" ")[0]}</span>
            </div>
          </div>
        `;

        const customIcon = Leaflet.divIcon({
          html: markerHtml,
          className: "centered-farmer-badge",
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        const marker = Leaflet.marker([farmer.lat, farmer.lng], { icon: customIcon });

        marker.on("click", () => {
          setSelectedFarmer(farmer);
          map.flyTo([farmer.lat, farmer.lng], 12, { duration: 0.8 });
          // Scroll details into view gently
          setTimeout(() => {
            detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }, 300);
        });

        marker.addTo(layerGroup);
      });
    });
  }, [mapLoaded, selectedFarmer]);

  // Recenter map
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([23.34, 87.95], 10, { duration: 0.8 });
    }
  };

  // Send advisory handler
  const handleSendAdvisory = () => {
    setAdvisorySent(true);
    setTimeout(() => {
      alert(`✅ Treatment advisory sent to ${selectedFarmer?.farmerName} (${selectedFarmer?.phone}) via SMS!`);
      setAdvisorySent(false);
    }, 1000);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return { bg: "bg-red-500", text: "text-white", label: "Critical Outbreak" };
      case "high":
        return { bg: "bg-orange-500", text: "text-white", label: "High Risk" };
      case "moderate":
        return { bg: "bg-amber-500", text: "text-white", label: "Moderate Risk" };
      default:
        return { bg: "bg-lime-600", text: "text-white", label: "Early Warning" };
    }
  };

  return (
    <div className="w-full space-y-4">
      
      {/* 1. SIMPLE MAP CANVAS */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
        
        {/* Floating Top Banner on Map */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-[400] flex items-center justify-between pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-gray-200 pointer-events-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-xs font-bold text-gray-900">
              {DISEASED_FARMERS.length} Diseased Crop Locations
            </span>
          </div>

          <button
            onClick={handleRecenter}
            title="Recenter Map"
            className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md hover:bg-white text-gray-700 shadow-sm border border-gray-200 flex items-center justify-center pointer-events-auto cursor-pointer transition active:scale-95"
          >
            <Crosshair className="w-4 h-4 text-[#2D7A4D]" />
          </button>
        </div>

        {/* Leaflet Map Viewport */}
        <div
          ref={mapContainerRef}
          className="w-full h-[320px] sm:h-[380px]"
        />

      </div>

      {/* 2. FARMER DETAILS HEADING */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
          {t.farmerDetailsHeading}
        </h2>
        {selectedFarmer && (
          <span className="text-[11.5px] font-semibold text-[#2D7A4D] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            {selectedFarmer.crop.split(" ")[0]} • {selectedFarmer.severity.toUpperCase()}
          </span>
        )}
      </div>

      {/* 3. FARMER DETAILS & DISEASE DIAGNOSTIC CARD */}
      {selectedFarmer && (
        <div
          ref={detailsRef}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-md space-y-4 animate-in fade-in duration-200"
        >
          {/* Header: Farmer Name, Role & Severity */}
          <div className="flex items-start justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#2D7A4D] border border-emerald-200 flex items-center justify-center font-bold text-xl shrink-0">
                👨‍🌾
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-gray-900 leading-tight">
                    {selectedFarmer.farmerName}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      getSeverityBadge(selectedFarmer.severity).bg
                    } ${getSeverityBadge(selectedFarmer.severity).text}`}
                  >
                    {selectedFarmer.severity}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {selectedFarmer.village}, {selectedFarmer.block}, {selectedFarmer.district}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Disease Diagnosis Box */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-800">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{selectedFarmer.diseaseName}</span>
              </div>
              <span className="text-[10.5px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-md">
                {selectedFarmer.confidenceScore}% AI Confidence
              </span>
            </div>
            
            <p className="text-[11.5px] text-gray-600 font-mono italic">
              Pathogen: {selectedFarmer.pathogen}
            </p>

            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              <strong className="text-gray-900">Symptoms: </strong>
              {selectedFarmer.symptoms}
            </p>
          </div>

          {/* Key Farmer & Crop Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-[#F8FAF5] p-2.5 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-500 font-medium block">Crop &amp; Variety</span>
              <span className="font-bold text-gray-900 block mt-0.5">
                {selectedFarmer.crop}
              </span>
              <span className="text-[10px] text-emerald-800 font-semibold">{selectedFarmer.variety}</span>
            </div>

            <div className="bg-[#F8FAF5] p-2.5 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-500 font-medium block">Infected Area</span>
              <span className="font-bold text-red-700 block mt-0.5">
                {selectedFarmer.affectedArea}
              </span>
              <span className="text-[10px] text-gray-500">Total: {selectedFarmer.totalArea}</span>
            </div>

            <div className="bg-[#F8FAF5] p-2.5 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-500 font-medium block">Growth Stage</span>
              <span className="font-bold text-gray-900 block mt-0.5">
                {selectedFarmer.stage}
              </span>
              <span className="text-[10px] text-gray-500">{selectedFarmer.detectedAt}</span>
            </div>

            <div className="bg-[#F8FAF5] p-2.5 rounded-xl border border-gray-200">
              <span className="text-[10px] text-gray-500 font-medium block">Contact Number</span>
              <span className="font-bold text-gray-900 block mt-0.5">
                {selectedFarmer.phone}
              </span>
              <span className="text-[10px] text-emerald-700 font-medium">Registered User</span>
            </div>
          </div>

          {/* Recommended Treatment */}
          <div className="bg-[#EFF7EE] border border-[#BED5C1] rounded-xl p-3.5 space-y-1">
            <h4 className="text-xs font-bold text-[#143926] flex items-center gap-1.5">
              <span>🧪</span>
              <span>Recommended Chemical &amp; Field Treatment</span>
            </h4>
            <p className="text-xs text-gray-800 leading-relaxed font-medium">
              {selectedFarmer.treatment}
            </p>
            <p className="text-[11px] text-[#2D7A4D] font-semibold mt-1">
              <strong>Cultural Control: </strong>{selectedFarmer.culturalControl}
            </p>
          </div>

          {/* Direct Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <a
              href={`tel:${selectedFarmer.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-xs rounded-xl transition active:scale-95 cursor-pointer border border-gray-200 shadow-2xs whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#2D7A4D] shrink-0" />
              <span>{t.callFarmerBtn}</span>
            </a>

            <button
              onClick={handleSendAdvisory}
              disabled={advisorySent}
              className="flex items-center justify-center gap-2 py-3 px-3 bg-[#2D7A4D] hover:bg-[#246640] text-white font-bold text-xs rounded-xl transition active:scale-95 cursor-pointer shadow-sm whitespace-nowrap"
            >
              <Send className="w-4 h-4 shrink-0" />
              <span>{advisorySent ? "Sending..." : t.sendAdvisoryBtn}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
