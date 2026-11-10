import React from 'react';
import { MapPin, Plus, PhoneCall, Info } from 'lucide-react';

interface HeaderProps {
  onOpenRegister: () => void;
  onOpenEmergency: () => void;
  onOpenAbout: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRegister,
  onOpenEmergency,
  onOpenAbout,
  activeTab,
  onSelectTab,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200 shadow-xs z-30 shrink-0">
      {/* Zone 1: Brand wordmark (single text element) */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
          <MapPin className="w-5 h-5" />
        </div>
        <a
          href="#map"
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-emerald-800 transition-colors font-display"
        >
          Peta Digital Desa Tepus
        </a>
      </div>

      {/* Zone 2: 4-5 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button
          onClick={() => onSelectTab('all')}
          className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'all' ? 'text-emerald-800 font-semibold' : ''
          }`}
        >
          Eksplorasi Peta
        </button>
        <button
          onClick={() => onSelectTab('umkm')}
          className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'umkm' ? 'text-emerald-800 font-semibold' : ''
          }`}
        >
          Katalog UMKM
        </button>
        <button
          onClick={() => onSelectTab('fasilitas')}
          className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'fasilitas' ? 'text-emerald-800 font-semibold' : ''
          }`}
        >
          Fasilitas Umum
        </button>
        <button
          onClick={() => onSelectTab('wisata')}
          className={`hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'wisata' ? 'text-emerald-800 font-semibold' : ''
          }`}
        >
          Wisata Pesisir
        </button>
        <button
          onClick={onOpenAbout}
          className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Info className="w-4 h-4 text-slate-400" />
          <span>Profil Desa</span>
        </button>
      </nav>

      {/* Zone 3: Actions (Primary CTA and Emergency Quick Access) */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenEmergency}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          title="Kontak Kedaruratan & Pos SAR Wilayah 1"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Darurat 24 Jam</span>
        </button>

        <button
          onClick={onOpenRegister}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-all shadow-xs hover:shadow whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Daftarkan UMKM</span>
        </button>
      </div>
    </header>
  );
};
