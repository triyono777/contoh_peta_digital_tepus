import React from 'react';
import { X, Phone, ShieldAlert, HeartPulse, Shield, LifeBuoy } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEmergencyPlace?: (id: string) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onSelectEmergencyPlace,
}) => {
  if (!isOpen) return null;

  const EMERGENCY_HOTLINES = [
    {
      title: 'Pos SAR Satlinmas Rescue Wilayah I (Pantai Siung & Timang)',
      desc: 'Penyelamatan kecelakaan laut, pertolongan wisatawan pantai pesisir, dan evakuasi pemanjat tebing karst.',
      phone: '081392110115',
      placeId: 'fas-4',
      icon: LifeBuoy,
      color: 'bg-rose-600',
    },
    {
      title: 'Puskesmas Tepus I (UGD & Ambulans 24 Jam)',
      desc: 'Layanan medis darurat, kecelakaan lalu lintas, rawat inap, persalinan siaga 24 jam.',
      phone: '0274-391204',
      placeId: 'fas-2',
      icon: HeartPulse,
      color: 'bg-red-600',
    },
    {
      title: 'Polsek Kapanewon Tepus',
      desc: 'Pengaduan tindak kriminalitas, laka lantas jalan raya, gangguan keamanan dan ketertiban.',
      phone: '0274-391110',
      placeId: 'fas-3',
      icon: Shield,
      color: 'bg-blue-600',
    },
    {
      title: 'Posko BPBD & Pemadam Kebakaran Kab. Gunungkidul',
      desc: 'Kedaruratan bencana alam, pohon tumbang, cuaca ekstrem karst, dan evakuasi satwa liar.',
      phone: '0274-394091',
      icon: ShieldAlert,
      color: 'bg-amber-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-rose-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-200" />
            <h3 className="font-bold text-base font-display">
              Kontak Kedaruratan 24 Jam Kalurahan Tepus
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-rose-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Daftar kontak instansi darurat dan fasilitas keselamatan penting yang melayani wilayah Kalurahan Tepus, kawasan pesisir pantai selatan, dan Kapanewon Tepus.
          </p>

          <div className="space-y-3">
            {EMERGENCY_HOTLINES.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl ${item.color} text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {item.placeId && onSelectEmergencyPlace && (
                      <button
                        onClick={() => {
                          onSelectEmergencyPlace(item.placeId!);
                          onClose();
                        }}
                        className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                      >
                        Peta
                      </button>
                    )}
                    <a
                      href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{item.phone}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
            <strong>Petunjuk Keselamatan Pantai:</strong> Selalu patuhi bendera peringatan SAR Linmas di Pantai Siung, Timang, dan Nglambor. Hindari berenang di area palung karang laut selatan.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
