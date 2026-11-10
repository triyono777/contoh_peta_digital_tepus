export interface PlaceItem {
  id: string;
  name: string;
  category: 'umkm' | 'fasilitas' | 'wisata' | 'darurat';
  subCategory: 
    | 'kuliner' 
    | 'kriya' 
    | 'homestay' 
    | 'pertanian'
    | 'pemerintahan' 
    | 'kesehatan' 
    | 'keamanan' 
    | 'pendidikan' 
    | 'ibadah' 
    | 'pasar_niaga' 
    | 'wisata_bahari';
  lat: number;
  lng: number;
  dusun: string;
  address: string;
  description: string;
  operationalHours: string;
  phone: string;
  whatsapp?: string;
  priceRange?: string;
  featuredProducts?: string[];
  services?: string[];
  facilities: string[];
  verified: boolean;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  emergencyContact?: boolean;
}

export const TEPUS_CENTER: [number, number] = [-8.1420, 110.6800];
export const DEFAULT_ZOOM = 13;

// Boundary approximate polygon of Kalurahan Tepus (Gunungkidul)
export const TEPUS_VILLAGE_BOUNDARY: [number, number][] = [
  [-8.1150, 110.6650],
  [-8.1130, 110.6900],
  [-8.1250, 110.7050],
  [-8.1450, 110.7080],
  [-8.1680, 110.7020],
  [-8.1850, 110.6880], // Coastline east
  [-8.1840, 110.6780], // Siung & Nglambor
  [-8.1800, 110.6600], // Timang Coast
  [-8.1720, 110.6550],
  [-8.1500, 110.6580],
  [-8.1280, 110.6610],
  [-8.1150, 110.6650]
];

export const DUSUN_LIST = [
  'Semua Dusun / Padukuhan',
  'Tepus I',
  'Tepus II',
  'Tepus III',
  'Blekonang',
  'Walikang',
  'Gembuk',
  'Singkil',
  'Dongsari',
  'Trosari',
  'Ngasem',
  'Bantalwatu',
  'Pudak',
  'Pakel',
  'Pantai Siung',
  'Pantai Timang'
];

export const CATEGORIES = [
  { id: 'all', label: 'Semua Kategori' },
  { id: 'umkm', label: 'UMKM & Produk Khas', color: 'emerald' },
  { id: 'fasilitas', label: 'Fasilitas Umum', color: 'blue' },
  { id: 'wisata', label: 'Wisata & Alam', color: 'amber' },
  { id: 'darurat', label: 'Layanan Darurat', color: 'rose' }
] as const;

export const INITIAL_PLACES: PlaceItem[] = [
  // --- FASILITAS UMUM PENTING ---
  {
    id: 'fas-1',
    name: 'Kantor Kalurahan Tepus',
    category: 'fasilitas',
    subCategory: 'pemerintahan',
    lat: -8.1364,
    lng: 110.6812,
    dusun: 'Tepus I',
    address: 'Jl. Baron - Tepus Km 18, Padukuhan Tepus I, Kalurahan Tepus',
    description: 'Pusat administrasi pemerintahan desa, pelayanan kependudukan, perizinan surat pengantar, aula balai desa, dan kantor BUMDes Maju Mandiri.',
    operationalHours: 'Senin - Jumat: 08.00 - 15.30 WIB',
    phone: '081227189001',
    whatsapp: '6281227189001',
    facilities: ['Parkir Luas', 'Aula Pertemuan', 'Toilet Ramah Difabel', 'Wi-Fi Gratis Desa Digital', 'Pelayanan KTP/KK'],
    verified: true,
    rating: 4.8,
    reviewCount: 42,
    services: ['Administrasi Kependudukan', 'Surat Izin Usaha Mikro', 'Pelayanan Bantuan Sosial', 'Konsultasi BUMDes']
  },
  {
    id: 'fas-2',
    name: 'Puskesmas Tepus I (UGD 24 Jam)',
    category: 'darurat',
    subCategory: 'kesehatan',
    lat: -8.1351,
    lng: 110.6835,
    dusun: 'Tepus II',
    address: 'Jl. Raya Tepus No. 12, Padukuhan Tepus II',
    description: 'Fasilitas pelayanan kesehatan tingkat pertama utama dengan Unit Gawat Darurat (UGD) 24 Jam, rawat inap, ambulans siaga, poli gigi, KIA/KB, dan farmasi.',
    operationalHours: 'UGD 24 Jam | Poliklinik: 08.00 - 14.00 WIB',
    phone: '0274-391204',
    whatsapp: '6281392817263',
    facilities: ['UGD 24 Jam', 'Ambulans Siaga', 'Rawat Inap', 'Apotek 24 Jam', 'Laboratorium Dasar', 'Parkir Darurat'],
    verified: true,
    rating: 4.7,
    reviewCount: 68,
    emergencyContact: true,
    services: ['Gawat Darurat 24 Jam', 'Rawat Inap', 'Pemeriksaan Dokter Umum & Gigi', 'Persalinan 24 Jam', 'Rujukan RS']
  },
  {
    id: 'fas-3',
    name: 'Polsek Tepus',
    category: 'darurat',
    subCategory: 'keamanan',
    lat: -8.1332,
    lng: 110.6805,
    dusun: 'Tepus I',
    address: 'Jl. Raya Pantai Selatan, Padukuhan Tepus I',
    description: 'Kantor Kepolisian Sektor Tepus melayani pengaduan masyarakat, patroli keamanan pesisir dan desa, laporan kehilangan, serta penerbitan SKCK.',
    operationalHours: 'Pelayanan Darurat & Pengaduan 24 Jam',
    phone: '0274-391110',
    whatsapp: '6282134567890',
    facilities: ['Pelayanan SPKT 24 Jam', 'Mobil Patroli Reaksi Cepat', 'Parkir'],
    verified: true,
    rating: 4.6,
    reviewCount: 31,
    emergencyContact: true,
    services: ['Laporan Kepolisian', 'Patroli Kamtibmas', 'SKCK', 'Bhabinkamtibmas']
  },
  {
    id: 'fas-4',
    name: 'Pos SAR Satlinmas Rescue Wilayah I (Pantai Siung)',
    category: 'darurat',
    subCategory: 'keamanan',
    lat: -8.1824,
    lng: 110.6838,
    dusun: 'Pantai Siung',
    address: 'Kawasan Pesisir Pantai Siung, Dusun Wates, Tepus',
    description: 'Posko utama Tim SAR Linmas Wilayah I Istimewa Yogyakarta untuk penyelamatan laut, mitigasi gelombang tinggi, kecelakaan laut, dan pemanjat tebing karst Siung.',
    operationalHours: 'Siaga 24 Jam Penuh',
    phone: '081392110115',
    whatsapp: '6281392110115',
    facilities: ['Perahu Karet Rescue', 'Peralatan Panjat Tebing Evakuasi', 'P3K & Tandu Darurat', 'Radio Komunikasi Pesisir'],
    verified: true,
    rating: 4.9,
    reviewCount: 89,
    emergencyContact: true,
    services: ['Pertolongan Korban Laka Laut', 'Peringatan Dini Gelombang & Cuaca', 'Evakuasi Tebing Karst', 'Pengamanan Wisatawan']
  },
  {
    id: 'fas-5',
    name: 'Pasar Desa Tepus & Sentra Niaga',
    category: 'fasilitas',
    subCategory: 'pasar_niaga',
    lat: -8.1378,
    lng: 110.6819,
    dusun: 'Tepus I',
    address: 'Sebelah Timur Balai Kalurahan Tepus',
    description: 'Pusat perekonomian rakyat desa. Menyediakan bahan pangan segar dari petani lokal, hasil laut nelayan, bumbu rempah, serta kios jajanan tradisional.',
    operationalHours: 'Hari Pasaran Pahing & Wage: 05.00 - 12.00 WIB (Kios Harian Buka Tiap Hari)',
    phone: '085729112233',
    facilities: ['Kios Sayur & Ikan Segar', 'ATM BPD DIY', 'Toilet Umum', 'Parkir Sepeda Motor & Pikap', 'Musholla Pasar'],
    verified: true,
    rating: 4.5,
    reviewCount: 54,
    services: ['Belanja Hasil Tani & Laut', 'Grosir Sembako', 'Toko Obat & Kebutuhan Harian']
  },
  {
    id: 'fas-6',
    name: 'SMK Negeri 1 Tepus',
    category: 'fasilitas',
    subCategory: 'pendidikan',
    lat: -8.1402,
    lng: 110.6775,
    dusun: 'Singkil',
    address: 'Padukuhan Singkil, Kalurahan Tepus',
    description: 'Sekolah Menengah Kejuruan unggulan bidang Perhotelan, Tata Boga Pariwisata, dan Teknik Komputer Jaringan pendukung potensi Desa Wisata Tepus.',
    operationalHours: 'Senin - Jumat: 07.00 - 15.30 WIB',
    phone: '0274-391300',
    facilities: ['Lab Praktik Perhotelan', 'Dapur Praktik Tata Boga', 'Perpustakaan', 'Lapangan Olahraga', 'Akses Internet Fiber'],
    verified: true,
    rating: 4.7,
    reviewCount: 40
  },
  {
    id: 'fas-7',
    name: 'Masjid Agung Al-Huda Kalurahan Tepus',
    category: 'fasilitas',
    subCategory: 'ibadah',
    lat: -8.1360,
    lng: 110.6828,
    dusun: 'Tepus II',
    address: 'Padukuhan Tepus II, Tepus, Gunungkidul',
    description: 'Masjid utama kalurahan untuk ibadah berjamaah, pengajian rutin warga, dan rest area ibadah bagi wisatawan jalur pantai selatan.',
    operationalHours: 'Buka 24 Jam untuk Ibadah',
    phone: '081228990022',
    facilities: ['Tempat Wudhu Nyaman', 'Kamar Mandi Bersih', 'Ruang Sholat Ber-AC Sejuk', 'Parkir Luas', 'Air Bersih PAMDes'],
    verified: true,
    rating: 4.9,
    reviewCount: 76
  },
  {
    id: 'fas-8',
    name: 'Pertashop & Mini SPBU Desa Tepus',
    category: 'fasilitas',
    subCategory: 'pasar_niaga',
    lat: -8.1388,
    lng: 110.6840,
    dusun: 'Tepus II',
    address: 'Jl. Poros Pantai Siung - Timang Km 1, Tepus II',
    description: 'Stasiun pengisian bahan bakar resmi Pertamina (Pertamax) untuk kendaraan warga dan wisatawan yang menuju pantai selatan.',
    operationalHours: 'Setiap Hari: 06.00 - 21.00 WIB',
    phone: '087839110022',
    facilities: ['Bahan Bakar Pertamax Resmi', 'Isi Angin Gratis', 'Pembayaran QRIS MyPertamina'],
    verified: true,
    rating: 4.8,
    reviewCount: 35
  },

  // --- UMKM UNGGULAN DESA TEPUS ---
  {
    id: 'umkm-1',
    name: 'Sentra Kerajinan Tembaga & Perak Tepus (Blekonang)',
    category: 'umkm',
    subCategory: 'kriya',
    lat: -8.1395,
    lng: 110.6885,
    dusun: 'Blekonang',
    address: 'Sentra Kriya Dusun Blekonang RT 03/RW 02, Kalurahan Tepus',
    description: 'Kelompok perajin tembaga, kuningan, dan perak legendaris Kalurahan Tepus. Memproduksi mangkok ukir, ornamen dinding, aksesoris tatah logam, dan cinderamata khas Gunungkidul yang sudah diekspor ke berbagai negara.',
    operationalHours: 'Setiap Hari: 08.00 - 17.00 WIB',
    phone: '081392881234',
    whatsapp: '6281392881234',
    priceRange: 'Rp 25.000 - Rp 2.500.000',
    featuredProducts: ['Mangkok Tembaga Ukir Motif Karst', 'Cincin & Bros Perak Filigri', 'Lampu Hias Kuningan Antik', 'Plakat Cinderamata Desa Wisata'],
    facilities: ['Galeri Showroom', 'Workshop Pembuatan Langsung', 'Area Belajar Kriya (Wisata Edukasi)', 'Parkir Mobil', 'Pembayaran QRIS & Transfer'],
    verified: true,
    rating: 4.9,
    reviewCount: 88,
    imageUrl: '/src/assets/images/tepus_umkm_crafts_1794282661844.jpg'
  },
  {
    id: 'umkm-2',
    name: 'Tiwul & Gathot Instan Yu Sri Khas Tepus',
    category: 'umkm',
    subCategory: 'kuliner',
    lat: -8.1355,
    lng: 110.6792,
    dusun: 'Tepus I',
    address: 'Padukuhan Tepus I RT 02 (50 meter barat Balai Desa)',
    description: 'Pusat oleh-oleh makanan tradisional berbahan baku singkong organik petani karst Tepus. Tiwul manis gula jawa, tiwul gurih pengganti nasi, dan gathot kenyal dengan kemasan higienis tahan hingga 1 tahun.',
    operationalHours: 'Setiap Hari: 07.30 - 20.00 WIB',
    phone: '085228123999',
    whatsapp: '6285228123999',
    priceRange: 'Rp 15.000 - Rp 45.000 / pack',
    featuredProducts: ['Tiwul Instan Manis Pandan & Coklat', 'Tiwul Putih Gurih', 'Gathot Kering Siap Rebus', 'Kue Tiwul Ayun Kukus'],
    facilities: ['Toko Oleh-oleh', 'Tester Gratis untuk Pengunjung', 'Kemasan Vacuum Siap Kirim Luar Kota', 'QRIS & Cashless', 'P-IRT & Halal MUI'],
    verified: true,
    rating: 4.8,
    reviewCount: 112,
    imageUrl: '/src/assets/images/tepus_culinary_tiwul_1794282636925.jpg'
  },
  {
    id: 'umkm-3',
    name: 'Walang Goreng Gurih Pak No Tepus',
    category: 'umkm',
    subCategory: 'kuliner',
    lat: -8.1382,
    lng: 110.6831,
    dusun: 'Tepus II',
    address: 'Jl. Poros Pantai Siung RT 04, Tepus II',
    description: 'Kuliner ekstrem khas Gunungkidul yang gurih dan kaya protein tinggi. Belalang kayu pilihan digoreng krispi dengan bumbu bawang putih rempah rahasia. Tersedia rasa Gurih Original, Pedas Manis, dan Balado Pedas.',
    operationalHours: 'Setiap Hari: 08.00 - 21.00 WIB',
    phone: '087738229911',
    whatsapp: '6287738229911',
    priceRange: 'Rp 30.000 - Rp 40.000 / toples',
    featuredProducts: ['Walang Goreng Gurih Bawang', 'Walang Goreng Pedas Manis', 'Laron & Ungkrung Jati Musiman', 'Keripik Tempe Sagu'],
    facilities: ['Bisa Cicip di Tempat', 'Kemasan Toples Segel Alumunium', 'Kirim Paket Seluruh Indonesia', 'QRIS'],
    verified: true,
    rating: 4.7,
    reviewCount: 95
  },
  {
    id: 'umkm-4',
    name: 'Madu Klanceng Sari Karst Tepus',
    category: 'umkm',
    subCategory: 'pertanian',
    lat: -8.1430,
    lng: 110.6912,
    dusun: 'Gembuk',
    address: 'Padukuhan Gembuk RT 01/RW 03, Kalurahan Tepus',
    description: 'Budidaya lebah tanpa sengat (Trigona sp.) di vegetasi hutan karst alami Tepus. Madu klanceng murni dengan rasa asam manis segar alami berkhasiat tinggi untuk kekebalan tubuh dan pernapasan.',
    operationalHours: 'Setiap Hari: 08.00 - 17.00 WIB',
    phone: '081904123888',
    whatsapp: '6281904123888',
    priceRange: 'Rp 70.000 - Rp 250.000 / botol',
    featuredProducts: ['Madu Klanceng Murni 250ml', 'Madu Klanceng Sarang Utuh', 'Propolis Alami Ekstrak', 'Paket Wisata Sedot Madu Langsung'],
    facilities: ['Kebun Edukasi Lebah Ramah Anak', 'Uji Keaslian Madu', 'Parkir', 'Pesan Antar COD'],
    verified: true,
    rating: 4.9,
    reviewCount: 64
  },
  {
    id: 'umkm-5',
    name: 'Olahan Rumput Laut Segara Kidul (Pantai Siung)',
    category: 'umkm',
    subCategory: 'kuliner',
    lat: -8.1795,
    lng: 110.6825,
    dusun: 'Pantai Siung',
    address: 'Kampung Pesisir Siung RT 01, Tepus',
    description: 'Usaha kelompok wanita nelayan pesisir mengolah rumput laut jenis Gracilaria dan Eucheuma yang dibudidayakan di perairan laut jernih Siung. Menghasilkan keripik renyah kaya serat, dodol rumput laut, dan agar-agar segar.',
    operationalHours: 'Setiap Hari: 08.00 - 18.00 WIB',
    phone: '085329112288',
    whatsapp: '6285329112288',
    priceRange: 'Rp 10.000 - Rp 35.000',
    featuredProducts: ['Keripik Rumput Laut Krispi Aneka Rasa', 'Dodol Rumput Laut Alami', 'Manisan Rumput Laut Segar'],
    facilities: ['Tempat Belanja Pesisir', 'Pemesanan Suvenir Acara', 'Halal MUI'],
    verified: true,
    rating: 4.8,
    reviewCount: 47
  },
  {
    id: 'umkm-6',
    name: 'Batik Tulis Sekar Segoro Motif Karst & Biota Laut',
    category: 'umkm',
    subCategory: 'kriya',
    lat: -8.1348,
    lng: 110.6765,
    dusun: 'Walikang',
    address: 'Padukuhan Walikang RT 02, Kalurahan Tepus',
    description: 'Studio batik tulis dan cap binaan Desa Wisata Tepus. Mengangkat ragam motif orisinil: tebing karst perbukitan kapur, biota terumbu karang Pantai Nglambor, dan jala nelayan samudra selatan.',
    operationalHours: 'Senin - Sabtu: 09.00 - 16.30 WIB',
    phone: '081229003311',
    whatsapp: '6281229003311',
    priceRange: 'Rp 120.000 - Rp 950.000 / lembar kain',
    featuredProducts: ['Kain Batik Tulis Motif Watu Karst', 'Syal Sutra Motif Ikan Segoro', 'Kemeja Batik Katun Halus Pria/Wanita'],
    facilities: ['Galeri Batik', 'Kelas Membatik Singkat untuk Wisatawan', 'Pewarna Alami Ramah Lingkungan', 'Kemasan Eksklusif'],
    verified: true,
    rating: 4.9,
    reviewCount: 52
  },
  {
    id: 'umkm-7',
    name: 'Warung Lobster & Ikan Bakar Pak Sis Pantai Timang',
    category: 'umkm',
    subCategory: 'kuliner',
    lat: -8.1755,
    lng: 110.6630,
    dusun: 'Pantai Timang',
    address: 'Pintu Masuk Wisata Gondola Pantai Timang',
    description: 'Kuliner laut segar legendaris. Menyajikan lobster karang hasil tangkapan nelayan Timang dengan bumbu saus padang dan bakar madu khas, ditemani sambal bawang mentah dan lalapan segar.',
    operationalHours: 'Setiap Hari: 08.00 - 17.30 WIB',
    phone: '081328900445',
    whatsapp: '6281328900445',
    priceRange: 'Rp 50.000 - Rp 350.000 (sesuai timbangan)',
    featuredProducts: ['Paket Lobster Karang Bakar Madu', 'Cumi Asam Manis Segar', 'Ikan Kakap Merah Bakar Bumbu Rujak', 'Es Kelapa Muda Pesisir'],
    facilities: ['Gazebo Pandang Laut', 'Toilet & Tempat Bilas', 'Musholla', 'Parkir Jeep Timang', 'QRIS'],
    verified: true,
    rating: 4.8,
    reviewCount: 168
  },
  {
    id: 'umkm-8',
    name: 'Homestay Desa Wisata Tepus "Griya Limasan Karst"',
    category: 'umkm',
    subCategory: 'homestay',
    lat: -8.1420,
    lng: 110.6810,
    dusun: 'Singkil',
    address: 'Padukuhan Singkil RT 03/RW 01, Tepus',
    description: 'Penginapan keluarga berbasis arsitektur rumah tradisional Limasan Jawa kayu jati. Suasana pedesaan tenang nan asri, sarapan tiwul & nasi jagung hangat, serta dekat dengan akses ke seluruh pantai di Tepus.',
    operationalHours: 'Check-in 24 Jam (Reservasi Sebelumnya)',
    phone: '081227005522',
    whatsapp: '6281227005522',
    priceRange: 'Rp 180.000 - Rp 350.000 / malam',
    featuredProducts: ['Kamar Standard Fan', 'Kamar Family AC Rumah Limasan', 'Paket Sewa 1 Rumah Lengkap', 'Paket Tour Wisata Pantai'],
    facilities: ['Kamar Mandi Dalam & Water Heater', 'Wi-Fi Cepat', 'Sarapan Masakan Desa', 'Halaman Parkir Luas', 'Dapur Bersama'],
    verified: true,
    rating: 4.9,
    reviewCount: 79
  },
  {
    id: 'umkm-9',
    name: 'Keripik Pisang & Emping Melinjo Mbak Tri',
    category: 'umkm',
    subCategory: 'kuliner',
    lat: -8.1315,
    lng: 110.6860,
    dusun: 'Trosari',
    address: 'Padukuhan Trosari RT 01, Kalurahan Tepus',
    description: 'Produsen camilan renyah gurih dari kebun melinjo dan pisang kepok lokal. Tanpa bahan pengawet kimia, digoreng dengan minyak kelapa berkualitas.',
    operationalHours: 'Setiap Hari: 08.00 - 18.00 WIB',
    phone: '085743110998',
    whatsapp: '6285743110998',
    priceRange: 'Rp 12.000 - Rp 30.000 / bungkus',
    featuredProducts: ['Emping Melinjo Gurih Tipis', 'Keripik Pisang Madu Renyah', 'Sale Pisang Basah Gulung'],
    facilities: ['Pemesanan Kiloan & Grosir', 'Kemasan Oleh-oleh', 'QRIS'],
    verified: true,
    rating: 4.6,
    reviewCount: 38
  },
  {
    id: 'umkm-10',
    name: 'Kerajinan Anyaman Bambu & Serat Alam Dusun Ngasem',
    category: 'umkm',
    subCategory: 'kriya',
    lat: -8.1285,
    lng: 110.6780,
    dusun: 'Ngasem',
    address: 'Padukuhan Ngasem RT 02, Tepus',
    description: 'Kelompok sesepuh dan pemuda pengrajin anyaman bambu apus. Membuat besek oleh-oleh ramah lingkungan, kap lampu estetik kafe, tampah tradisional, dan keranjang suvenir ramah lingkungan.',
    operationalHours: 'Senin - Sabtu: 08.00 - 16.00 WIB',
    phone: '081329871166',
    whatsapp: '6281329871166',
    priceRange: 'Rp 5.000 - Rp 150.000',
    featuredProducts: ['Besek Bambu Halus Kemasan Makanan', 'Kap Lampu Gantung Estetik', 'Keranjang Suvenir Anyaman Serat'],
    facilities: ['Pesanan Kustom untuk Kafe & Hotel', 'Kirim Luar Kota', 'Workshop Anyam'],
    verified: true,
    rating: 4.7,
    reviewCount: 29
  },

  // --- DESTINASI WISATA PESISIR KALURAHAN TEPUS ---
  {
    id: 'wisata-1',
    name: 'Pantai Timang & Gondola Tradisional',
    category: 'wisata',
    subCategory: 'wisata_bahari',
    lat: -8.1772,
    lng: 110.6610,
    dusun: 'Pantai Timang',
    address: 'Padukuhan Dongsari, Kalurahan Tepus',
    description: 'Ikon wisata bahari dunia di Kalurahan Tepus. Menyeberangi samudra berombak dahsyat menuju Pulau Karang Panjang menggunakan kereta gantung tali tradisional (gondola) atau jembatan gantung kayu.',
    operationalHours: 'Setiap Hari: 07.00 - 17.00 WIB',
    phone: '081392770011',
    whatsapp: '6281392770011',
    priceRange: 'Tiket Masuk: Rp 10.000 | Gondola: Rp 150.000 | Jembatan: Rp 100.000',
    facilities: ['Shuttle Jeep Offroad', 'Pos Pengawas Keselamatan', 'Warung Kuliner Lobster', 'Toilet & Musholla', 'Spot Foto Instagramable'],
    verified: true,
    rating: 4.8,
    reviewCount: 310,
    imageUrl: '/src/assets/images/tepus_coastal_landscape_1794282635439.jpg'
  },
  {
    id: 'wisata-2',
    name: 'Pantai Siung & Tebing Panjat Karst',
    category: 'wisata',
    subCategory: 'wisata_bahari',
    lat: -8.1830,
    lng: 110.6835,
    dusun: 'Pantai Siung',
    address: 'Dusun Wates, Kalurahan Tepus',
    description: 'Surga panjat tebing alami dengan 250 jalur pemanjatan berstandar internasional di tebing karang raksasa. Memiliki pasir putih lembut, perahu nelayan tradisional, dan area camping tepi pantai yang teduh.',
    operationalHours: 'Buka 24 Jam (Camping Area)',
    phone: '081392110115',
    whatsapp: '6281392110115',
    priceRange: 'Tiket Masuk: Rp 10.000',
    facilities: ['Pos SAR Linmas 24 Jam', 'Area Camping Luas', 'Warung Makan Ikan Bakar', 'Toilet & Kamar Mandi Bilas', 'Penyewaan Alat Panjat'],
    verified: true,
    rating: 4.8,
    reviewCount: 245
  },
  {
    id: 'wisata-3',
    name: 'Pantai Nglambor (Spot Snorkeling Konservasi)',
    category: 'wisata',
    subCategory: 'wisata_bahari',
    lat: -8.1820,
    lng: 110.6790,
    dusun: 'Pantai Siung',
    address: 'Sebelah Barat Pantai Siung, Tepus',
    description: 'Teluk pantai yang diapit dua pulau karang pelindung alami (Watu Semar & Watu Kalong) sehingga ombaknya tenang. Sangat aman dan populer untuk snorkeling melihat terumbu karang warna-warni dan aneka ikan hias.',
    operationalHours: 'Setiap Hari: 06.30 - 17.00 WIB',
    phone: '082134991122',
    whatsapp: '6282134991122',
    priceRange: 'Sewa Alat Snorkeling + Foto Underwater: Rp 50.000',
    facilities: ['Pemandu Snorkeling Bersertifikat', 'Foto Bawah Air', 'Life Jacket & Snorkel Bersih', 'Ruang Ganti & Loker'],
    verified: true,
    rating: 4.7,
    reviewCount: 220
  },
  {
    id: 'wisata-4',
    name: 'Pantai Jogan (Air Terjun Pengantin Tepi Laut)',
    category: 'wisata',
    subCategory: 'wisata_bahari',
    lat: -8.1812,
    lng: 110.6810,
    dusun: 'Pantai Siung',
    address: 'Jalur Akses Pantai Siung, Tepus',
    description: 'Fenomena geologi karst langka di mana aliran sungai air tawar pegunungan karst jatuh langsung menjadi air terjun setinggi 10 meter ke bibir laut Samudra Hindia.',
    operationalHours: 'Setiap Hari: 06.00 - 17.30 WIB',
    phone: '081392881900',
    priceRange: 'Tiket Terusan Siung-Jogan: Rp 10.000',
    facilities: ['Spot Rapelling Air Terjun', 'Gazebo Istirahat', 'Warung Es Kelapa', 'Jalur Tangga Kayu'],
    verified: true,
    rating: 4.6,
    reviewCount: 140
  }
];

export const VILLAGE_PROFILE = {
  name: 'Kalurahan Tepus',
  kapanewon: 'Kapanewon Tepus',
  kabupaten: 'Kabupaten Gunungkidul',
  provinsi: 'D.I. Yogyakarta',
  postalCode: '55881',
  lurah: 'Hendy Pratama, S.IP.',
  awards: ['Juara 2 Desa Wisata Terbaik Nasional ADWI (Kemenparekraf RI)', 'Desa Mandiri Budaya DIY'],
  population: '9.420 Jiwa',
  households: '2.840 KK',
  areaKm2: '35,4 km²',
  totalDusun: 20
};
