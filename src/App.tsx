/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { PlaceItem, INITIAL_PLACES } from './data/tepusData';
import { Header } from './components/Header';
import { MapView } from './components/MapView';
import { Sidebar } from './components/Sidebar';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { RegisterModal } from './components/RegisterModal';
import { EmergencyModal } from './components/EmergencyModal';
import { VillageInfoModal } from './components/VillageInfoModal';
import { List, MapPin } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'tepus_digital_map_custom_places_v1';

export default function App() {
  const [places, setPlaces] = useState<PlaceItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...INITIAL_PLACES, ...parsed];
      }
    } catch (e) {
      console.error('Error loading custom places from localStorage:', e);
    }
    return INITIAL_PLACES;
  });

  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDusun, setSelectedDusun] = useState<string>('Semua Dusun / Padukuhan');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // User location
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filter places based on active criteria
  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      // Category Filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'darurat') {
          if (!place.emergencyContact && place.category !== 'darurat') return false;
        } else if (place.category !== selectedCategory) {
          return false;
        }
      }

      // Dusun Filter
      if (selectedDusun !== 'Semua Dusun / Padukuhan') {
        if (place.dusun !== selectedDusun) return false;
      }

      // Verified Filter
      if (verifiedOnly && !place.verified) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = place.name.toLowerCase().includes(query);
        const matchDesc = place.description.toLowerCase().includes(query);
        const matchDusun = place.dusun.toLowerCase().includes(query);
        const matchSub = place.subCategory.toLowerCase().includes(query);
        const matchAddress = place.address.toLowerCase().includes(query);
        const matchProducts = place.featuredProducts?.some((p) =>
          p.toLowerCase().includes(query)
        );
        const matchServices = place.services?.some((s) =>
          s.toLowerCase().includes(query)
        );

        if (
          !matchName &&
          !matchDesc &&
          !matchDusun &&
          !matchSub &&
          !matchAddress &&
          !matchProducts &&
          !matchServices
        ) {
          return false;
        }
      }

      return true;
    });
  }, [places, selectedCategory, selectedDusun, verifiedOnly, searchQuery]);

  // Request user GPS location
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      showToast('Perangkat Anda tidak mendukung fitur Geolocation.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        showToast('Lokasi GPS Anda berhasil ditemukan!');
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err);
        showToast('Izin lokasi tidak diberikan atau GPS belum aktif.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Add new registered place from modal
  const handleRegisterPlace = (newPlace: PlaceItem) => {
    setPlaces((prev) => {
      const updated = [newPlace, ...prev];
      try {
        const customPlaces = updated.filter((p) => p.id.startsWith('custom-'));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customPlaces));
      } catch (err) {
        console.error('Failed to save to localStorage:', err);
      }
      return updated;
    });

    // Automatically select the new place
    setSelectedPlace(newPlace);
  };

  // Header navigation tab selection
  const handleSelectNavTab = (tab: string) => {
    setSelectedCategory(tab);
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-900 select-none">
      {/* Top Navigation Bar adhering to Top Bar Contract */}
      <Header
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        activeTab={selectedCategory}
        onSelectTab={handleSelectNavTab}
      />

      {/* Main Map & Directory Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Side Explorer Panel */}
        <Sidebar
          places={filteredPlaces}
          allPlacesCount={places.length}
          selectedPlace={selectedPlace}
          onSelectPlace={(place) => {
            setSelectedPlace(place);
            setIsMobileSidebarOpen(false);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedDusun={selectedDusun}
          onSelectDusun={setSelectedDusun}
          verifiedOnly={verifiedOnly}
          onToggleVerifiedOnly={() => setVerifiedOnly(!verifiedOnly)}
          userLocation={userLocation}
          isMobileOpen={isMobileSidebarOpen}
          onToggleMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Interactive GIS Map View */}
        <main className="flex-1 h-full relative">
          <MapView
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            onSelectPlace={(place) => setSelectedPlace(place)}
            userLocation={userLocation}
            onRequestUserLocation={handleRequestLocation}
            isLocating={isLocating}
          />

          {/* Floating Mobile Toggle Button (Visible on screens < 640px) */}
          <div className="sm:hidden absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-full shadow-xl text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap border border-slate-700"
            >
              <List className="w-4 h-4 text-emerald-400" />
              <span>Daftar UMKM & Fasilitas ({filteredPlaces.length})</span>
            </button>
          </div>
        </main>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2 border border-slate-700 animate-fade-in">
          <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      <PlaceDetailModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        userLocation={userLocation}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterPlace={handleRegisterPlace}
        userLocation={userLocation}
      />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onSelectEmergencyPlace={(id) => {
          const match = places.find((p) => p.id === id);
          if (match) setSelectedPlace(match);
        }}
      />

      <VillageInfoModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
