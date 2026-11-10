import React, { useState } from 'react';
import { PlaceItem } from '../data/tepusData';
import {
  X,
  Phone,
  Navigation,
  CheckCircle2,
  Clock,
  MapPin,
  Star,
  Copy,
  Check,
  Tag,
  ShieldAlert,
  Share2,
} from 'lucide-react';
import { getGoogleMapsDirUrl, getWhatsAppChatUrl, formatDistance, calculateDistanceKm } from '../utils/geoUtils';

interface PlaceDetailModalProps {
  place: PlaceItem | null;
  onClose: () => void;
  userLocation: { lat: number; lng: number } | null;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  userLocation,
}) => {
  const [copied, setCopied] = useState(false);

  if (!place) return null;

  const distance = userLocation
    ? calculateDistanceKm(userLocation.lat, userLocation.lng, place.lat, place.lng)
    : null;

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${place.lat}, ${place.lng}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sharePlace = () => {
    if (navigator.share) {
      navigator.share({
        title: place.name,
        text: `${place.name} - Peta Digital Kalurahan Tepus, Gunungkidul`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      copyCoordinates();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/50 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header Media / Image */}
        <div className="relative h-48 sm:h-56 bg-slate-800 shrink-0 overflow-hidden">
          {place.imageUrl ? (
            <img
              src={place.imageUrl}
              alt={place.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-800 to-slate-900 text-white p-6 text-center">
              <span className="text-4xl mb-2">
                {place.category === 'umkm'
                  ? '🏪'
                  : place.category === 'fasilitas'
                  ? '🏛️'
                  : place.category === 'darurat'
                  ? '🏥'
                  : '🌊'}
              </span>
              <p className="text-sm font-medium text-emerald-200">
                Kalurahan Tepus, Kapanewon Tepus, Gunungkidul
              </p>
            </div>
          )}

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close & Share Action Buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={sharePlace}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Bagikan Lokasi"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Badge over image */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs text-emerald-200 font-medium mb-1">
              <span>{place.dusun}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{place.subCategory.replace('_', ' ')}</span>
              {distance !== null && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-300 font-semibold font-mono">
                    {formatDistance(distance)} dari lokasi Anda
                  </span>
                </>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight font-display">
              {place.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-700">
          {/* Quick Metrics Bar (Unboxed clean metadata) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                <span className="font-mono">{place.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({place.reviewCount} ulasan warga)</span>
              </div>
              {place.verified && (
                <div className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Terverifikasi BUMDes / Desa</span>
                </div>
              )}
            </div>

            {place.priceRange && (
              <div className="text-slate-600 font-medium font-mono text-xs">
                {place.priceRange}
              </div>
            )}
          </div>

          {/* Action CTAs: Direct WhatsApp, Call, Google Maps Directions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {place.whatsapp && (
              <a
                href={getWhatsAppChatUrl(place.whatsapp, place.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl shadow-xs transition-colors"
              >
                <span>💬 WhatsApp Langsung</span>
              </a>
            )}

            {place.phone && (
              <a
                href={`tel:${place.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-xl transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span>Telepon: {place.phone}</span>
              </a>
            )}

            <a
              href={getGoogleMapsDirUrl(place.lat, place.lng, place.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl shadow-xs transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Petunjuk Arah Rute</span>
            </a>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Deskripsi & Informasi Lengkap
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {place.description}
            </p>
          </div>

          {/* Operating Hours & Address */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Jam Operasional:</span>
                <span className="text-slate-600">{place.operationalHours}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Alamat Wilayah:</span>
                <span className="text-slate-600">{place.address}</span>
              </div>
            </div>

            {/* Coordinates with Copy button */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-slate-500">
              <span className="font-mono text-[11px]">
                Koordinat: {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
              </span>
              <button
                onClick={copyCoordinates}
                className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:text-emerald-900 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin Koordinat</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Featured Products / Services (if UMKM or Public Service) */}
          {place.featuredProducts && place.featuredProducts.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-700" />
                <span>Produk Unggulan & Olahan Khas</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {place.featuredProducts.map((prod, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-slate-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
                    <span className="font-medium">{prod}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services (if Government/Healthcare) */}
          {place.services && place.services.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Layanan Publik Tersedia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {place.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-slate-800"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                    <span className="font-medium">{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Facilities Checklist */}
          {place.facilities && place.facilities.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Fasilitas Tempat
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                {place.facilities.map((fac, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 rounded-md border border-slate-200 font-medium"
                  >
                    ✓ {fac}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Emergency note if applicable */}
          {place.emergencyContact && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-900 text-xs">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <span>
                Ini adalah kontak resmi layanan kedaruratan 24 jam wilayah Kalurahan Tepus dan pesisir Gunungkidul. Harap gunakan dengan bijak.
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Peta Digital Resmi Kalurahan Tepus</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
