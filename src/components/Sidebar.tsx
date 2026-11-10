import React from 'react';
import { PlaceItem, CATEGORIES, DUSUN_LIST } from '../data/tepusData';
import {
  Search,
  X,
  MapPin,
  Star,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { formatDistance, calculateDistanceKm, getGoogleMapsDirUrl } from '../utils/geoUtils';

interface SidebarProps {
  places: PlaceItem[];
  allPlacesCount: number;
  selectedPlace: PlaceItem | null;
  onSelectPlace: (place: PlaceItem) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedDusun: string;
  onSelectDusun: (dusun: string) => void;
  verifiedOnly: boolean;
  onToggleVerifiedOnly: () => void;
  userLocation: { lat: number; lng: number } | null;
  isMobileOpen: boolean;
  onToggleMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  places,
  allPlacesCount,
  selectedPlace,
  onSelectPlace,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedDusun,
  onSelectDusun,
  verifiedOnly,
  onToggleVerifiedOnly,
  userLocation,
  isMobileOpen,
  onToggleMobile,
}) => {
  return (
    <aside
      className={`fixed sm:relative inset-y-0 left-0 z-40 sm:z-10 w-full sm:w-[380px] lg:w-[420px] bg-white border-r border-slate-200 shadow-xl sm:shadow-none flex flex-col transition-transform duration-300 ease-in-out shrink-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
      }`}
    >
      {/* Mobile Top Close Header */}
      <div className="flex sm:hidden items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
        <span className="font-semibold text-slate-800 text-sm">
          Daftar UMKM & Fasilitas
        </span>
        <button
          onClick={onToggleMobile}
          className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search & Filters Section */}
      <div className="p-4 border-b border-slate-200 bg-white space-y-3 shrink-0">
        {/* Search Input Box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari UMKM, tiwul, lobster, puskesmas, SAR..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Segmented Tabs (Functional Buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dusun Selector & Verified Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <select
              value={selectedDusun}
              onChange={(e) => onSelectDusun(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              {DUSUN_LIST.map((dusun) => (
                <option key={dusun} value={dusun}>
                  {dusun}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onToggleVerifiedOnly}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
              verifiedOnly
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Terverifikasi</span>
          </button>
        </div>

        {/* Results Counter and Filter Summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
          <span>
            Menampilkan <strong className="text-slate-800 font-semibold">{places.length}</strong> dari {allPlacesCount} lokasi
          </span>
          {(searchQuery || selectedCategory !== 'all' || selectedDusun !== 'Semua Dusun / Padukuhan' || verifiedOnly) && (
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
                onSelectDusun('Semua Dusun / Padukuhan');
                if (verifiedOnly) onToggleVerifiedOnly();
              }}
              className="text-xs text-emerald-700 hover:underline cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Places List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 divide-y divide-slate-100">
        {places.length === 0 ? (
          <div className="p-8 text-center text-slate-500 flex flex-col items-center justify-center">
            <Filter className="w-10 h-10 text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700 mb-1">
              Tidak ada lokasi yang cocok
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Coba ganti kata kunci pencarian atau reset filter wilayah dusun.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
                onSelectDusun('Semua Dusun / Padukuhan');
                if (verifiedOnly) onToggleVerifiedOnly();
              }}
              className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
            >
              Tampilkan Semua Lokasi
            </button>
          </div>
        ) : (
          places.map((place) => {
            const isSelected = selectedPlace?.id === place.id;
            const distance = userLocation
              ? calculateDistanceKm(userLocation.lat, userLocation.lng, place.lat, place.lng)
              : null;

            return (
              <div
                key={place.id}
                onClick={() => onSelectPlace(place)}
                className={`pt-2.5 first:pt-0 p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                {/* Clean Unboxed Metadata Line (No static pills) */}
                <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 mb-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-semibold text-slate-700">{place.dusun}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{place.subCategory.replace('_', ' ')}</span>
                    {distance !== null && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-700 font-mono font-medium">
                          {formatDistance(distance)}
                        </span>
                      </>
                    )}
                  </div>
                  {place.verified && (
                    <span className="text-emerald-700 flex items-center gap-0.5 text-[10px] font-medium shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Terverifikasi</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="font-bold text-sm text-slate-900 leading-snug mb-1 hover:text-emerald-800 transition-colors">
                  {place.name}
                </h4>

                {/* Short Description */}
                <p className="text-xs text-slate-600 line-clamp-2 mb-2 leading-relaxed">
                  {place.description}
                </p>

                {/* Bottom Bar: Rating, Price / Service tag, Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100/80 text-xs">
                  <div className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                    <span className="font-mono">{place.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({place.reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={getGoogleMapsDirUrl(place.lat, place.lng, place.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Petunjuk Arah Google Maps"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPlace(place);
                      }}
                      className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                    >
                      <span>Detail</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
