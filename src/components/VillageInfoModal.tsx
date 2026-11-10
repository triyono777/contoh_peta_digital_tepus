import React from 'react';
import { X, Award, MapPin, Users, LandPlot, Building, Compass } from 'lucide-react';
import { VILLAGE_PROFILE } from '../data/tepusData';

interface VillageInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VillageInfoModal: React.FC<VillageInfoModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-emerald-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-300" />
            <h3 className="font-bold text-base font-display">
              Profil Kalurahan Tepus, Gunungkidul
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Hero Banner with award */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Desa Wisata Berprestasi Nasional (ADWI)</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Kalurahan Tepus merupakan salah satu desa wisata mandiri terkemuka di D.I. Yogyakarta yang meraih penghargaan <strong>Juara 2 Desa Wisata Terbaik Nasional ADWI</strong> oleh Kemenparekraf RI. Terkenal dengan pesona alam perbukitan karst, keindahan pantai samudra selatan, dan kemandirian UMKM kriya serta kuliner.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <LandPlot className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Luas Wilayah</span>
              <strong className="text-xs sm:text-sm font-mono text-slate-800">{VILLAGE_PROFILE.areaKm2}</strong>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <Building className="w-4 h-4 text-blue-700 mx-auto mb-1" />
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Padukuhan</span>
              <strong className="text-xs sm:text-sm font-mono text-slate-800">{VILLAGE_PROFILE.totalDusun} Dusun</strong>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <Users className="w-4 h-4 text-amber-700 mx-auto mb-1" />
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Jumlah Warga</span>
              <strong className="text-xs sm:text-sm font-mono text-slate-800">{VILLAGE_PROFILE.population}</strong>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <MapPin className="w-4 h-4 text-rose-700 mx-auto mb-1" />
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Kode Pos</span>
              <strong className="text-xs sm:text-sm font-mono text-slate-800">{VILLAGE_PROFILE.postalCode}</strong>
            </div>
          </div>

          {/* Sektor Unggulan */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Potensi Unggulan Wilayah
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                <span className="text-emerald-700 font-bold shrink-0">1.</span>
                <div>
                  <strong className="text-slate-800">Sentra Kerajinan Logam & Tembaga Blekonang:</strong> Warisan tatah ukir logam kuningan, tembaga, dan perak yang dipasarkan secara ekspor dan nasional.
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                <span className="text-emerald-700 font-bold shrink-0">2.</span>
                <div>
                  <strong className="text-slate-800">Pariwisata Bahari Kelas Dunia:</strong> Pantai Timang (Gondola Karang), Pantai Siung (Situs Panjat Tebing Karst Internasional), Pantai Nglambor (Snorkeling), Pantai Jogan (Air Terjun Laut).
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2">
                <span className="text-emerald-700 font-bold shrink-0">3.</span>
                <div>
                  <strong className="text-slate-800">Olahan Kuliner Tradisional Gunungkidul:</strong> Tiwul instan organik, gathot, belalang krispi (walang goreng), keripik rumput laut, dan madu klanceng hutan karst.
                </div>
              </div>
            </div>
          </div>

          {/* Alamat Sekretariat */}
          <div className="pt-2 border-t border-slate-200 text-slate-600">
            <p>
              <strong>Sekretariat Kalurahan Tepus:</strong> Jl. Baron - Tepus Km 18, Padukuhan Tepus I, Kapanewon Tepus, Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta 55881.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
