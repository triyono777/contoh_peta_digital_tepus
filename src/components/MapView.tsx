import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  PlaceItem,
  TEPUS_CENTER,
  TEPUS_VILLAGE_BOUNDARY,
} from '../data/tepusData';
import { Layers, Crosshair, Map as MapIcon, Mountain, Eye } from 'lucide-react';

interface MapViewProps {
  places: PlaceItem[];
  selectedPlace: PlaceItem | null;
  onSelectPlace: (place: PlaceItem) => void;
  userLocation: { lat: number; lng: number } | null;
  onRequestUserLocation: () => void;
  isLocating: boolean;
}

type TileType = 'streets' | 'satellite' | 'topo';

export const MapView: React.FC<MapViewProps> = ({
  places,
  selectedPlace,
  onSelectPlace,
  userLocation,
  onRequestUserLocation,
  isLocating,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const boundaryLayerRef = useRef<L.Polygon | null>(null);
  const userMarkerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [currentTile, setCurrentTile] = useState<TileType>('streets');
  const [showBoundary, setShowBoundary] = useState<boolean>(true);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: TEPUS_CENTER,
      zoom: 13,
      minZoom: 11,
      maxZoom: 18,
      zoomControl: true,
    });

    // Default street layer
    const streetTile = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }
    ).addTo(map);

    tileLayerRef.current = streetTile;
    markersLayerRef.current = L.layerGroup().addTo(map);
    userMarkerRef.current = L.layerGroup().addTo(map);

    // Add Kalurahan Tepus Boundary Polygon
    const boundary = L.polygon(TEPUS_VILLAGE_BOUNDARY, {
      color: '#059669',
      weight: 2.5,
      dashArray: '6, 6',
      fillColor: '#10b981',
      fillOpacity: 0.08,
    }).addTo(map);

    boundary.bindTooltip('Batas Wilayah Kalurahan Tepus', {
      sticky: true,
      className: 'text-xs font-semibold px-2 py-1 bg-white/90 shadow rounded',
    });

    boundaryLayerRef.current = boundary;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Tile Layer Switching
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '&copy; OpenStreetMap contributors';

    if (currentTile === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
    } else if (currentTile === 'topo') {
      url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      attribution = 'Kartendaten: &copy; OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: &copy; OpenTopoMap';
    }

    const newTile = L.tileLayer(url, {
      attribution,
      maxZoom: currentTile === 'satellite' ? 18 : 17,
    }).addTo(map);

    tileLayerRef.current = newTile;
  }, [currentTile]);

  // Handle Boundary visibility
  useEffect(() => {
    const map = mapInstanceRef.current;
    const boundary = boundaryLayerRef.current;
    if (!map || !boundary) return;

    if (showBoundary) {
      if (!map.hasLayer(boundary)) {
        boundary.addTo(map);
      }
    } else {
      if (map.hasLayer(boundary)) {
        map.removeLayer(boundary);
      }
    }
  }, [showBoundary]);

  // Render Markers when places or selection changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    places.forEach((place) => {
      const isSelected = selectedPlace?.id === place.id;

      // Color scheme according to category
      let bgClass = 'bg-emerald-600 text-white';
      let pinSymbol = '🏪';

      if (place.category === 'fasilitas') {
        bgClass = 'bg-blue-600 text-white';
        pinSymbol = '🏛️';
      } else if (place.category === 'wisata') {
        bgClass = 'bg-amber-600 text-white';
        pinSymbol = '🌊';
      } else if (place.category === 'darurat') {
        bgClass = 'bg-rose-600 text-white animate-bounce-subtle';
        pinSymbol = '🏥';
      }

      const customHtml = `
        <div class="relative group cursor-pointer">
          <div class="flex items-center justify-center w-8 h-8 rounded-full ${bgClass} shadow-md transition-transform duration-200 ${
            isSelected ? 'scale-125 ring-4 ring-emerald-400 ring-offset-2' : 'hover:scale-110'
          }">
            <span class="text-sm select-none">${pinSymbol}</span>
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
            place.category === 'fasilitas'
              ? 'bg-blue-600'
              : place.category === 'wisata'
              ? 'bg-amber-600'
              : place.category === 'darurat'
              ? 'bg-rose-600'
              : 'bg-emerald-600'
          }"></div>
          ${
            isSelected
              ? '<span class="absolute -top-1 -right-1 flex h-3 w-3"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>'
              : ''
          }
        </div>
      `;

      const customIcon = L.divIcon({
        html: customHtml,
        className: 'custom-div-icon',
        iconSize: [32, 38],
        iconAnchor: [16, 36],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([place.lat, place.lng], { icon: customIcon });

      // Rich custom popup card
      const popupContent = `
        <div class="w-64 p-3 bg-white text-slate-800 text-left font-sans">
          <div class="flex items-center justify-between gap-1 mb-1.5">
            <span class="text-[10px] font-bold tracking-wider uppercase text-slate-500">
              ${place.dusun}
            </span>
            ${
              place.verified
                ? '<span class="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Terverifikasi</span>'
                : ''
            }
          </div>
          <h4 class="font-bold text-sm text-slate-900 leading-snug mb-1">
            ${place.name}
          </h4>
          <p class="text-xs text-slate-600 line-clamp-2 mb-2 leading-relaxed">
            ${place.description}
          </p>
          <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span class="text-amber-600 font-semibold flex items-center gap-1">
              ★ ${place.rating.toFixed(1)} <span class="text-slate-400 font-normal">(${place.reviewCount})</span>
            </span>
            <button id="btn-detail-${place.id}" class="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded transition-colors cursor-pointer">
              Lihat Detail
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        className: 'custom-leaflet-popup',
      });

      marker.on('click', () => {
        onSelectPlace(place);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-detail-${place.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectPlace(place);
          };
        }
      });

      markersLayer.addLayer(marker);
    });
  }, [places, selectedPlace, onSelectPlace]);

  // Center on selected place
  useEffect(() => {
    if (!selectedPlace || !mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([selectedPlace.lat, selectedPlace.lng], 16, {
      duration: 1.2,
    });
  }, [selectedPlace]);

  // Handle User Location marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    const userLayer = userMarkerRef.current;
    if (!map || !userLayer) return;

    userLayer.clearLayers();

    if (userLocation) {
      const userHtml = `
        <div class="relative">
          <div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center">
            <div class="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <span class="absolute -top-1 -left-1 flex h-7 w-7 pointer-events-none">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
          </span>
        </div>
      `;

      const userIcon = L.divIcon({
        html: userHtml,
        className: 'custom-div-icon',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 1000,
      }).bindTooltip('Lokasi Anda Saat Ini', {
        permanent: false,
        direction: 'top',
        className: 'text-xs font-medium px-2 py-0.5 bg-blue-900 text-white rounded shadow',
      });

      const accuracyCircle = L.circle([userLocation.lat, userLocation.lng], {
        radius: 80,
        color: '#3b82f6',
        weight: 1,
        fillColor: '#60a5fa',
        fillOpacity: 0.15,
      });

      userLayer.addLayer(accuracyCircle);
      userLayer.addLayer(userMarker);

      map.flyTo([userLocation.lat, userLocation.lng], 15, { duration: 1 });
    }
  }, [userLocation]);

  // Preset location quick jumps
  const jumpTo = (coords: [number, number], zoom = 14) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(coords, zoom, { duration: 1 });
  };

  return (
    <div className="relative w-full h-full min-h-[350px] overflow-hidden bg-slate-100">
      {/* The actual Leaflet container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Map Controls - Top Left Quick Jump Presets */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 p-1 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200 text-xs">
        <button
          onClick={() => jumpTo(TEPUS_CENTER, 13)}
          className="px-2.5 py-1.5 font-medium text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          Semua Wilayah
        </button>
        <button
          onClick={() => jumpTo([-8.1364, 110.6812], 16)}
          className="px-2.5 py-1.5 font-medium text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          Pusat Kalurahan & Pasar
        </button>
        <button
          onClick={() => jumpTo([-8.1395, 110.6885], 16)}
          className="px-2.5 py-1.5 font-medium text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          Sentra UMKM Logam
        </button>
        <button
          onClick={() => jumpTo([-8.1800, 110.6750], 14)}
          className="px-2.5 py-1.5 font-medium text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          Kawasan Pantai Siung & Timang
        </button>
      </div>

      {/* Floating Map Controls - Top Right (Tile switch & Boundary toggle & My Location) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        {/* Layer Switcher */}
        <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-xl shadow-md border border-slate-200 flex flex-col gap-1 text-xs">
          <div className="text-[10px] font-bold text-slate-400 px-1.5 pt-0.5 tracking-wider uppercase">
            Lapisan Peta
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentTile('streets')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                currentTile === 'streets'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Jalan</span>
            </button>
            <button
              onClick={() => setCurrentTile('satellite')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                currentTile === 'satellite'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Satelit</span>
            </button>
            <button
              onClick={() => setCurrentTile('topo')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                currentTile === 'topo'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>Topografi</span>
            </button>
          </div>
        </div>

        {/* Boundary & User Location Buttons */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setShowBoundary(!showBoundary)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl shadow-md border transition-all cursor-pointer whitespace-nowrap ${
              showBoundary
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Tampilkan / Sembunyikan Garis Batas Kalurahan Tepus"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showBoundary ? 'Batas Aktif' : 'Tampilkan Batas'}</span>
          </button>

          <button
            onClick={onRequestUserLocation}
            disabled={isLocating}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-md transition-colors cursor-pointer whitespace-nowrap"
            title="Deteksi Lokasi GPS Saya"
          >
            <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Mencari...' : 'Lokasi Saya'}</span>
          </button>
        </div>
      </div>

      {/* Legend Badge Bar - Bottom Left */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-4 px-3 py-2 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200 text-xs text-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
          <span>UMKM Lokal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
          <span>Fasilitas Umum</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-600 inline-block"></span>
          <span>Wisata & Pantai</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-600 inline-block"></span>
          <span>Kedaruratan & SAR</span>
        </div>
      </div>
    </div>
  );
};
