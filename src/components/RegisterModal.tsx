import React, { useState } from 'react';
import { PlaceItem, DUSUN_LIST } from '../data/tepusData';
import { X, Plus, Store, Check, AlertCircle } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterPlace: (newPlace: PlaceItem) => void;
  userLocation: { lat: number; lng: number } | null;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onRegisterPlace,
  userLocation,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'umkm' | 'fasilitas'>('umkm');
  const [subCategory, setSubCategory] = useState<PlaceItem['subCategory']>('kuliner');
  const [dusun, setDusun] = useState('Tepus I');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [operationalHours, setOperationalHours] = useState('Setiap Hari: 08.00 - 17.00 WIB');
  const [description, setDescription] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [lat, setLat] = useState<number>(userLocation ? userLocation.lat : -8.1365);
  const [lng, setLng] = useState<number>(userLocation ? userLocation.lng : 110.6815);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPlace: PlaceItem = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      category,
      subCategory,
      lat: Number(lat),
      lng: Number(lng),
      dusun,
      address: address.trim() || `Padukuhan ${dusun}, Kalurahan Tepus`,
      description: description.trim() || 'Unit usaha/fasilitas yang baru didaftarkan ke Peta Digital Desa Tepus.',
      operationalHours: operationalHours.trim() || 'Sesuai Jam Operasional',
      phone: phone.trim() || '081234567890',
      whatsapp: whatsapp.trim() || phone.trim(),
      priceRange: priceRange.trim() || undefined,
      featuredProducts: featuredProducts
        ? featuredProducts.split(',').map((p) => p.trim()).filter(Boolean)
        : undefined,
      facilities: ['Parkir', 'Akses Jalan Desa'],
      verified: true,
      rating: 5.0,
      reviewCount: 1,
    };

    onRegisterPlace(newPlace);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base font-display">
              Daftarkan UMKM atau Fasilitas Baru
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {successMsg ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-800 mb-1">
              Pendaftaran Berhasil!
            </h4>
            <p className="text-xs text-slate-600">
              Data usaha/fasilitas Anda langsung terpasang di Peta Digital Kalurahan Tepus.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-emerald-900">
              <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Formulir ini terbuka untuk warga, pengrajin, pedagang, dan pamong Kalurahan Tepus untuk memperbarui direktori spasial desa.
              </span>
            </div>

            {/* Type selector */}
            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Jenis Entitas
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCategory('umkm');
                    setSubCategory('kuliner');
                  }}
                  className={`py-2 px-3 rounded-lg border font-medium transition-all ${
                    category === 'umkm'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🏪 UMKM / Usaha Warga
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCategory('fasilitas');
                    setSubCategory('pemerintahan');
                  }}
                  className={`py-2 px-3 rounded-lg border font-medium transition-all ${
                    category === 'fasilitas'
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🏛️ Fasilitas Umum
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Nama Usaha / Fasilitas *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Kripik Tempe Sagu Yu Darmi / Posyandu Dusun"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 text-slate-900"
              />
            </div>

            {/* Sub-category & Dusun */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Kategori Khusus
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  {category === 'umkm' ? (
                    <>
                      <option value="kuliner">Kuliner & Makanan Khas</option>
                      <option value="kriya">Kriya & Kerajinan Logam/Bambu</option>
                      <option value="homestay">Homestay & Penginapan</option>
                      <option value="pertanian">Pertanian & Madu Karst</option>
                    </>
                  ) : (
                    <>
                      <option value="pemerintahan">Pemerintahan / Kantor</option>
                      <option value="kesehatan">Kesehatan & Posyandu</option>
                      <option value="keamanan">Keamanan / Pos Ronda</option>
                      <option value="pendidikan">Pendidikan / Sekolah</option>
                      <option value="ibadah">Tempat Ibadah</option>
                      <option value="pasar_niaga">Pasar / Pertashop</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Padukuhan / Dusun *
                </label>
                <select
                  value={dusun}
                  onChange={(e) => setDusun(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  {DUSUN_LIST.filter((d) => d !== 'Semua Dusun / Padukuhan').map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  No. WhatsApp Kontak
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="08123456789"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Jam Operasional
                </label>
                <input
                  type="text"
                  value={operationalHours}
                  onChange={(e) => setOperationalHours(e.target.value)}
                  placeholder="08.00 - 17.00 WIB"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Deskripsi Singkat Usaha / Lokasi
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan produk unggulan, keistimewaan, atau layanan yang disediakan..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Products & Price (for UMKM) */}
            {category === 'umkm' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Produk Unggulan (Pisahkan Koma)
                  </label>
                  <input
                    type="text"
                    value={featuredProducts}
                    onChange={(e) => setFeaturedProducts(e.target.value)}
                    placeholder="Tiwul, Gathot, Belalang Goreng"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Kisaran Harga
                  </label>
                  <input
                    type="text"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    placeholder="Rp 15.000 - Rp 50.000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>
            )}

            {/* Coordinates Lat / Lng */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-800">
                  Koordinat Lokasi di Kalurahan Tepus
                </label>
                {userLocation && (
                  <button
                    type="button"
                    onClick={() => {
                      setLat(userLocation.lat);
                      setLng(userLocation.lng);
                    }}
                    className="text-emerald-700 hover:underline cursor-pointer"
                  >
                    Gunakan Posisi Saya
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="0.0001"
                  value={lat}
                  onChange={(e) => setLat(parseFloat(e.target.value))}
                  placeholder="Latitude (-8.1365)"
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs"
                />
                <input
                  type="number"
                  step="0.0001"
                  value={lng}
                  onChange={(e) => setLng(parseFloat(e.target.value))}
                  placeholder="Longitude (110.6815)"
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan ke Peta Digital</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
