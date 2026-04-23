"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ZoomIn, ZoomOut, MapPin, ChevronUp, ChevronDown } from "lucide-react";
import {
  Map,
  MapArc,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import type MapLibreGL from "maplibre-gl";

// Hub principal (Paine)
const hub = {
  name: "Paine",
  lng: -70.6693,
  lat: -33.4489,
  country: "Región Metropolitana, Chile",
};

// Destinos conectados al hub
const destinations = [
  { name: "La Serena", lng: -71.2518, lat: -29.9018, country: "Chile" },
  {
    name: "Córdoba",
    lng: -64.1888,
    lat: -31.4135,
    country: "Argentina",
  },
  {
    name: "Buenos Aires",
    lng: -58.3816,
    lat: -34.6037,
    country: "Argentina",
  },
  {
    name: "Punta Cana",
    lng: -68.3725,
    lat: 18.5901,
    country: "República Dominicana",
  },
  {
    name: "Guanajuato",
    lng: -101.2558,
    lat: 21.0190,
    country: "México",
  },
  { name: "Bogotá", lng: -74.0721, lat: 4.7110, country: "Colombia" },
];

// Arcos conectando hub a destinos
const arcs = destinations.map((dest) => ({
  id: dest.name,
  from: [hub.lng, hub.lat] as [number, number],
  to: [dest.lng, dest.lat] as [number, number],
}));

export function ContactMap() {
  const mapRef = useRef<MapLibreGL.Map>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [showHubPopup, setShowHubPopup] = useState(false);
  const [showLegend, setShowLegend] = useState(true);

  const handleZoom = (direction: "in" | "out") => {
    if (!mapRef.current) return;
    const currentZoom = mapRef.current.getZoom();
    const newZoom = direction === "in" ? currentZoom + 1 : currentZoom - 1;
    mapRef.current.flyTo({ zoom: newZoom, duration: 500 });
  };

  // Prevent page scroll when zooming on map
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (container.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div 
      ref={mapContainerRef}
      className="relative h-full w-full rounded-xl overflow-hidden border border-white/10"
    >
      <Map
        ref={mapRef}
        center={[hub.lng, hub.lat]}
        zoom={1.2}
        projection={{ type: "globe" }}
      >
        {/* Arcos conectando Paine a todos los destinos */}
        <MapArc
          data={arcs}
          paint={{
            "line-color": "#a78bfa",
            "line-width": 1.5,
            "line-opacity": 0.6,
            "line-dasharray": [3, 2],
          }}
          hoverPaint={{
            "line-width": 2.5,
            "line-opacity": 1,
          }}
          interactive={false}
        />

        {/* Destinos - puntos simples */}
        {destinations.map((dest) => (
          <MapMarker key={dest.name} longitude={dest.lng} latitude={dest.lat}>
            <MarkerContent>
              <div
                className={cn(
                  "size-2.5 rounded-full border-2 border-white",
                  "bg-emerald-500 shadow-md hover:size-3 transition-all duration-300 cursor-pointer"
                )}
              />
              <MarkerLabel
                position="top"
                className="text-foreground/80 tracking-tight text-xs font-medium whitespace-nowrap bg-background/50 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10"
              >
                {dest.name}
              </MarkerLabel>
            </MarkerContent>
          </MapMarker>
        ))}

        {/* Hub principal - Paine (se sobrepone a todas) */}
        <MapMarker longitude={hub.lng} latitude={hub.lat}>
          <MarkerContent className="relative z-50">
            <div 
              className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
              onClick={() => setShowHubPopup(!showHubPopup)}
            >
              <MapPin
                className="fill-purple-500 stroke-white drop-shadow-lg"
                size={40}
                strokeWidth={1.5}
              />
            </div>
          </MarkerContent>
          <MarkerPopup 
            closeButton
            className="bg-gradient-to-br from-purple-950/95 to-purple-900/95 border border-purple-500/50 shadow-xl"
          >
            <div className="space-y-2.5 min-w-[280px]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400 fill-purple-400 flex-shrink-0" />
                  <h3 className="font-bold text-white text-xs">Sede Central y Origen</h3>
                </div>
                <p className="text-xs text-purple-200 font-semibold">{hub.name}</p>
              </div>
              
              <div className="border-t border-purple-500/30 pt-2">
                <p className="text-[11px] leading-snug text-purple-100">
                  Epicentro operativo en la Región Metropolitana. Conectando talento global hacia Latinoamérica con innovación y excelencia.
                </p>
              </div>

              <div className="flex items-center gap-1 flex-wrap">
                <span className="inline-block px-1.5 py-0.5 bg-purple-600/40 rounded text-[9px] text-purple-200 font-semibold">
                  Globalizado
                </span>
                <span className="inline-block px-1.5 py-0.5 bg-purple-600/40 rounded text-[9px] text-purple-200 font-semibold">
                  Remoto
                </span>
              </div>
            </div>
          </MarkerPopup>
        </MapMarker>
      </Map>

      {/* Zoom Controls - Top Right */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={() => handleZoom("in")}
          className="p-2 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 border border-purple-400/30"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleZoom("out")}
          className="p-2 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 border border-purple-400/30"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>

      {/* Info legend - Bottom Left with Toggle */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-background/80 backdrop-blur-md border border-white/10 rounded-lg shadow-lg overflow-hidden transition-all duration-300">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition-colors"
          >
            <span className="text-xs font-semibold text-white uppercase tracking-wide">Información</span>
            {showLegend ? (
              <ChevronUp className="w-4 h-4 text-purple-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-purple-400" />
            )}
          </button>
          
          {showLegend && (
            <div className="border-t border-white/10 px-3 py-3 text-[11px] space-y-2.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400 fill-purple-400 flex-shrink-0" />
                <span className="text-white font-semibold">Hub Principal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2.5 rounded-full bg-emerald-500 border-2 border-white flex-shrink-0" />
                <span className="text-muted-foreground">Ubicaciones</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                <div className="flex-1 h-px bg-purple-500/60 border-t border-dashed border-purple-500/60" />
                <span className="text-muted-foreground px-1 text-[10px]">Conexiones</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
