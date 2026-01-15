"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const STOCKHOLM_COORDS: [number, number] = [18.0686, 59.3293];

export function StockholmMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: STOCKHOLM_COORDS,
      zoom: 11,
      attributionControl: false,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    // Create ping marker element
    const ping = document.createElement("div");
    ping.className = "ping-marker";

    new mapboxgl.Marker({ element: ping })
      .setLngLat(STOCKHOLM_COORDS)
      .addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .ping-marker {
          width: 16px;
          height: 16px;
          background-color: #22c55e;
          border-radius: 50%;
          position: relative;
        }
        .ping-marker::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background-color: #22c55e;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        .mapboxgl-ctrl-logo {
          display: none !important;
        }
        .mapboxgl-ctrl-group {
          background: var(--muted) !important;
          border: 1px solid var(--border) !important;
          border-radius: var(--radius) !important;
        }
        .mapboxgl-ctrl-group button {
          background: transparent !important;
          border: none !important;
        }
        .mapboxgl-ctrl-group button + button {
          border-top: 1px solid var(--border) !important;
        }
        .mapboxgl-ctrl-group button span {
          filter: none !important;
        }
      `}</style>
      <div ref={mapContainer} className="absolute inset-0 w-full h-full saturate-[0.8]" />
      {/* Warm tint overlay */}
      <div className="absolute inset-0 bg-amber-100/[0.04] pointer-events-none" />
    </>
  );
}
