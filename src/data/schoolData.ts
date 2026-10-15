import { Student, AttendanceRecord, QuizQuestion } from '../utils/schoolLogic';

export interface Teacher {
  id: string;
  name: string;
  role: string;
  nip: string;
  education: string;
  subjects: string;
  photoUrl: string;
  phone?: string;
  quote: string;
  badge: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  icon: string;
}

export interface Extracurricular {
  id: string;
  name: string;
  coach: string;
  schedule: string;
  location: string;
  description: string;
  achievements: string[];
  icon: string;
  photoUrl: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'PPDB' | 'Akademik' | 'Kegiatan' | 'Pengumuman Umum';
  date: string;
  author: string;
  excerpt: string;
  content: string;
  isImportant?: boolean;
}

export interface LearningMaterial {
  id: string;
  classGrade: number;
  subject: string;
  title: string;
  type: 'video' | 'pdf' | 'ringkasan';
  author: string;
  durationOrPages: string;
  summary: string;
  contentBody?: string;
  videoUrl?: string;
  downloadUrl?: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: 'Buku Tematik' | 'Kurikulum Merdeka' | 'Cerita Rakyat' | 'Ensiklopedia' | 'Komik Edukasi';
  grade: string;
  pages: number;
  coverUrl: string;
  synopsis: string;
  sampleContent: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Belajar di Kelas' | 'Upacara' | 'Ekstrakurikuler' | 'Prestasi & Lomba' | 'Lingkungan';
  date: string;
  imageUrl: string;
  caption: string;
}

export interface PPDBApplicant {
  id: string;
  registrationNumber: string;
  fullName: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  gender: 'L' | 'P';
  originSchool: string;
  parentName: string;
  parentPhone: string;
  address: string;
  status: 'Menunggu Verifikasi' | 'Diterima' | 'Perlu Perbaikan';
  submittedAt: string;
}

export const SCHOOL_INFO = {
  name: 'SDN Cinanggerang I',
  fullName: 'Sekolah Dasar Negeri Cinanggerang I',
  subdistrict: 'Kecamatan Pamulihan',
  district: 'Kabupaten Sumedang',
  province: 'Jawa Barat',
  npsn: '20233481',
  status: 'Negeri',
  accreditation: 'A (Unggul)',
  accreditationScore: '94 / 100',
  skAkreditasi: '1857/BAN-SM/SK/2022',
  foundedYear: '1978',
  curriculum: 'Kurikulum Merdeka & Kurikulum 2013',
  address: 'Jl. Raya Cinanggerang No. 12, Desa Cinanggerang, Kec. Pamulihan, Kab. Sumedang, Jawa Barat 45365',
  phone: '(0261) 203891',
  whatsapp: '0812-2456-7890',
  email: 'info@sdncinanggerang1.sch.id',
  website: 'https://sdncinanggerang1.sch.id',
  operatingHours: 'Senin - Sabtu: 07.00 - 14.00 WIB',
  motto: '“CERIA: Cerdas, Edukatif, Religius, IPTEK, Agamis”',
  logoUrl: 'https://lh3.googleusercontent.com/d/1Ndxe3-ULXMZS4C0QrqC0mUv2mIOadB8x',
  totalStudents: 218,
  totalTeachers: 14,
  totalClasses: 6,
  totalGraduates: '1.450+ Alumni',
  principal: {
    name: 'H. Dedi Suryadi, S.Pd., M.M.Pd.',
    nip: '19710412 199303 1 004',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
    welcomeMessage: 'Sampurasun! Selamat datang di website resmi SDN Cinanggerang I. Sebagai salah satu lembaga pendidikan dasar yang mengakar kuat di tatar Pamulihan Sumedang, kami berkomitmen untuk menumbuhkembangkan potensi fitrah setiap anak didik melalui suasana belajar yang ramah, agamis, berbasis budaya luhur Sunda, dan adaptif terhadap perkembangan teknologi digital abad ke-21. Semoga website ini menjadi jembatan silaturahmi, informasi, serta kolaborasi harmonis antara pihak sekolah, orang tua, dan masyarakat luas.',
  },
  vision: 'Mewujudkan SDN Cinanggerang I yang CERIA "Cerdas Edukatif, Religius, IPTEK, Agamis". Well Pokona mah',
  missions: [
    'Mewujudkan murid yang Cerdas.',
    'Mewujudkan murid yang Edukatif.',
    'Mewujudkan murid yang Religius.',
    'Mewujudkan murid yang berwawasan IPTEK.',
    'Mewujudkan murid yang Agamis.'
  ],
  coreValues: [
    { title: 'Silih Asah', desc: 'Saling mencerdaskan dan bertukar ilmu pengetahuan.', icon: 'book' },
    { title: 'Silih Asih', desc: 'Saling menyayangi, welas asih, dan peduli sesama.', icon: 'heart' },
    { title: 'Silih Asuh', desc: 'Saling membimbing, menjaga, dan menguatkan budi pekerti.', icon: 'shield' },
    { title: 'Rancage & Motekar', desc: 'Kreatif, tangkas, dan pantang menyerah dalam belajar.', icon: 'star' },
  ],
};

export const TEACHERS_DATA: Teacher[] = [
  {
    id: 't-1',
    name: 'H. Dedi Suryadi, S.Pd., M.M.Pd.',
    role: 'Kepala Sekolah',
    nip: '19710412 199303 1 004',
    education: 'S2 Magister Manajemen Pendidikan (UPI)',
    subjects: 'Manajerial & Pembinaan Karakter',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
    quote: 'Mendidik bukan sekadar mengisi bejana kosong, melainkan menyalakan api rasa ingin tahu anak.',
    badge: 'Kepala Sekolah Penggerak'
  },
  {
    id: 't-2',
    name: 'Hj. Elis Rohaeti, S.Pd.SD.',
    role: 'Wali Kelas 1',
    nip: '19750821 199803 2 003',
    education: 'S1 PGSD Universitas Terbuka',
    subjects: 'Tematik Kelas 1 (Calistung Ramah Anak)',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    quote: 'Setiap anak kelas 1 adalah tunas suci yang harus dibimbing dengan kelembutan senyum seorang ibu.',
    badge: 'Guru Teladan 2024'
  },
  {
    id: 't-3',
    name: 'Asep Saepuloh, S.Pd.',
    role: 'Wali Kelas 2 & Pembina Pramuka',
    nip: '19820315 200604 1 012',
    education: 'S1 Pendidikan Bahasa & Sastra Indonesia',
    subjects: 'Tematik Kelas 2 & Pramuka Siaga',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
    quote: 'Belajar melalui permainan tradisi membuat anak cerdas secara sosial dan emosional.',
    badge: 'Pelatih Pramuka Kwarda'
  },
  {
    id: 't-4',
    name: 'Neni Maryani, S.Pd.',
    role: 'Wali Kelas 3 & Koord. Literasi',
    nip: '19860611 200902 2 005',
    education: 'S1 PGSD Universitas Pendidikan Indonesia',
    subjects: 'Tematik Kelas 3 & Pojok Baca Pelangi',
    photoUrl: 'https://images.unsplash.com/photo-1580894732470-3f48d3e2ee55?q=80&w=600&auto=format&fit=crop',
    quote: 'Buku adalah jendela dunia, dan membaca adalah sayap untuk menjelajahinya.',
    badge: 'Penggiat Literasi Sekolah'
  },
  {
    id: 't-5',
    name: 'Iwan Ridwan, S.Pd.I.',
    role: 'Guru Pendidikan Agama Islam & Budi Pekerti',
    nip: '19790104 200701 1 018',
    education: 'S1 Pendidikan Agama Islam UIN SGD',
    subjects: 'PAI, BTQ (Baca Tulis Al-Quran) & Marawis',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    quote: 'Akhlakul karimah adalah pondasi utama kesuksesan dunia dan keselamatan akhirat.',
    badge: 'Ustadz Pembina Rohis'
  },
  {
    id: 't-6',
    name: 'Ratna Juwita, S.Pd.',
    role: 'Wali Kelas 4 & Koord. P5',
    nip: '19900518 201402 2 004',
    education: 'S1 PGSD Universitas Negeri Yogyakarta',
    subjects: 'IPAS Kelas 4 & Proyek Profil Pancasila',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    quote: 'Eksperimen sains sederhana menanamkan rasa syukur atas keteraturan alam semesta.',
    badge: 'Fasilitator P5 Tingkat Kab.'
  },
  {
    id: 't-7',
    name: 'Dadan Ramdani, S.Pd.Or.',
    role: 'Guru PJOK & Pelatih Futsal',
    nip: '19881120 201101 1 007',
    education: 'S1 Pendidikan Jasmani Kesehatan & Rekreasi',
    subjects: 'Pendidikan Jasmani, Olahraga & Kesehatan',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    quote: 'Mens sana in corpore sano: Di dalam tubuh yang sehat terdapat jiwa yang kuat dan berani.',
    badge: 'Juara O2SN Pelatih Terbaik'
  },
  {
    id: 't-8',
    name: 'Eneng Siti Fatimah, S.Pd.',
    role: 'Wali Kelas 5 & Pembina Tari Sunda',
    nip: '19920803 201903 2 015',
    education: 'S1 Pendidikan Seni Tari & Budaya Sunda',
    subjects: 'Tematik Kelas 5, Tari Jaipong & Kaulinan',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    quote: 'Menari bukan hanya gerak raga, tetapi melestarikan nyawa dan kelembutan tradisi leluhur.',
    badge: 'Koreografer FLS2N'
  },
  {
    id: 't-9',
    name: 'Yudi Hermawan, S.Pd.',
    role: 'Wali Kelas 6 & Tim Sukses US/ANBK',
    nip: '19840224 200801 1 009',
    education: 'S1 Pendidikan Matematika & IPA',
    subjects: 'Matematika, IPA Kelas 6 & Persiapan Masuk SMP',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
    quote: 'Kunci matematika bukan hafalan rumus, melainkan ketekunan memahami pola dan logika.',
    badge: 'Instruktur ANBK Sekolah'
  },
  {
    id: 't-10',
    name: 'Mila Rosilawati, S.Pd.',
    role: 'Guru Bahasa Inggris & TIK Cilik',
    nip: '19941014 202012 2 011',
    education: 'S1 Pendidikan Bahasa Inggris',
    subjects: 'English for Kids & Komputer Ceria',
    photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop',
    quote: 'Speaking English can be fun and interactive through songs, games, and digital stories.',
    badge: 'Pendidik Kreatif Digital'
  },
  {
    id: 't-11',
    name: 'Cecep Kurnia, S.AP.',
    role: 'Tenaga Administrasi & Operator Dapodik',
    nip: '19870919 201001 1 008',
    education: 'S1 Administrasi Publik',
    subjects: 'Sistem Informasi Sekolah, Dapodik & PPDB',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop',
    quote: 'Data yang akurat dan rapi adalah cermin keterbukaan dan profesionalisme sekolah kita.',
    badge: 'Operator Dapodik Teladan'
  },
  {
    id: 't-12',
    name: 'Ibu Rina Marlina, A.Md.Pust.',
    role: 'Pustakawati & Pengelola Perpustakaan',
    nip: '19910405 201502 2 007',
    education: 'D3 Perpustakaan & Informasi Sains',
    subjects: 'Perpustakaan Digital & Dongeng Anak',
    photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
    quote: 'Perpustakaan kami adalah rumah ajaib penuh petualangan bagi setiap mata kecil yang haus ilmu.',
    badge: 'Pustakawan Inovatif'
  }
];

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'fac-1',
    name: 'Ruang Kelas Nyaman & Berproyektor',
    description: 'Enam ruang kelas berlantai keramik bersih, pencahayaan alami yang melimpah, kipas angin dan proyektor LCD untuk pembelajaran digital interaktif.',
    photoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop',
    icon: 'chalkboard'
  },
  {
    id: 'fac-2',
    name: 'Perpustakaan Ramah Anak "Pelangi Ilmu"',
    description: 'Menyediakan lebih dari 2.500 judul buku tematik, ensiklopedia sains, dongeng fabel, serta pojok karpet santai untuk mendengarkan cerita.',
    photoUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
    icon: 'book-open'
  },
  {
    id: 'fac-3',
    name: 'Laboratorium Komputer & TIK',
    description: 'Dilengkapi 25 unit Chromebook/PC layar datar dengan koneksi internet cepat fiber optic untuk latihan ANBK dan pembelajaran pengenalan komputer.',
    photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    icon: 'laptop'
  },
  {
    id: 'fac-4',
    name: 'Lapangan Olahraga & Upacara Serbaguna',
    description: 'Area outdoor luas yang aman dengan lantai semen halus untuk pelaksanaan upacara bendera, senam irama, futsal mini, kasti, dan bulu tangkis.',
    photoUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
    icon: 'volleyball'
  },
  {
    id: 'fac-5',
    name: 'UKS & Ruang Dokter Kecil',
    description: 'Fasilitas kesehatan pertolongan pertama lengkap dengan ranjang periksa, tensimeter digital, timbangan badan, obat standar, dan konseling gizi anak.',
    photoUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
    icon: 'briefcase-medical'
  },
  {
    id: 'fac-6',
    name: 'Musholla Al-Ikhlas & Taman Toga Hijau',
    description: 'Tempat ibadah bersih dengan tempat wudhu terpisah untuk sholat dhuha berjamaah dan taman apotek hidup sebagai sarana edukasi hayati.',
    photoUrl: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=800&auto=format&fit=crop',
    icon: 'mosque'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  { id: 'std-1', nisn: '0123984101', name: 'Ahmad Faiz Al-Faruq', classGrade: 1, gender: 'L', parentName: 'H. Ruslan', status: 'Aktif' },
  { id: 'std-2', nisn: '0123984102', name: 'Anindita Cahya Putri', classGrade: 1, gender: 'P', parentName: 'Bambang Sudarsono', status: 'Aktif' },
  { id: 'std-3', nisn: '0123984103', name: 'Bayu Pratama Wijaya', classGrade: 1, gender: 'L', parentName: 'Dadan Setiawan', status: 'Aktif' },
  { id: 'std-4', nisn: '0123984104', name: 'Bilqis Humaira Syakira', classGrade: 1, gender: 'P', parentName: 'Irfan Hakim', status: 'Aktif' },
  { id: 'std-5', nisn: '0112765201', name: 'Dimas Aditya Nugraha', classGrade: 2, gender: 'L', parentName: 'Gunawan', status: 'Aktif' },
  { id: 'std-6', nisn: '0112765202', name: 'Elsa Febriyani', classGrade: 2, gender: 'P', parentName: 'Ade Suryana', status: 'Aktif' },
  { id: 'std-7', nisn: '0112765203', name: 'Farhan Maulana Malik', classGrade: 2, gender: 'L', parentName: 'Asep Suhendar', status: 'Aktif' },
  { id: 'std-8', nisn: '0112765204', name: 'Gisela Az-Zahra', classGrade: 2, gender: 'P', parentName: 'Dani Darmawan', status: 'Aktif' },
  { id: 'std-9', nisn: '0101827301', name: 'Hafiz Dzaki Ramadhan', classGrade: 3, gender: 'L', parentName: 'Mulyadi', status: 'Aktif' },
  { id: 'std-10', nisn: '0101827302', name: 'Intan Permata Sari', classGrade: 3, gender: 'P', parentName: 'Cecep Sunandar', status: 'Aktif' },
  { id: 'std-11', nisn: '0101827303', name: 'Jovan Keenan Alvaro', classGrade: 3, gender: 'L', parentName: 'Joni Iskandar', status: 'Aktif' },
  { id: 'std-12', nisn: '0101827304', name: 'Kayla Nadhira Putri', classGrade: 3, gender: 'P', parentName: 'Nanang Sujana', status: 'Aktif' },
  { id: 'std-13', nisn: '0098716401', name: 'Luthfi Rahman Hakim', classGrade: 4, gender: 'L', parentName: 'Heri Kurniawan', status: 'Aktif' },
  { id: 'std-14', nisn: '0098716402', name: 'Maya Anggraeni', classGrade: 4, gender: 'P', parentName: 'Yayan Hendrayana', status: 'Aktif' },
  { id: 'std-15', nisn: '0098716403', name: 'Naufal Al-Ghifari', classGrade: 4, gender: 'L', parentName: 'Tatang Sutisna', status: 'Aktif' },
  { id: 'std-16', nisn: '0098716404', name: 'Olivia Salsabila', classGrade: 4, gender: 'P', parentName: 'Endang Sobarna', status: 'Aktif' },
  { id: 'std-17', nisn: '0089625501', name: 'Pandu Satria Utama', classGrade: 5, gender: 'L', parentName: 'Agus Priyono', status: 'Aktif' },
  { id: 'std-18', nisn: '0089625502', name: 'Qonita Rahadatul Aisy', classGrade: 5, gender: 'P', parentName: 'Drs. Subekti', status: 'Aktif' },
  { id: 'std-19', nisn: '0089625503', name: 'Raka Dwi Ardiansyah', classGrade: 5, gender: 'L', parentName: 'Wawan Gunawan', status: 'Aktif' },
  { id: 'std-20', nisn: '0089625504', name: 'Syifa Nuraini Rahmah', classGrade: 5, gender: 'P', parentName: 'Dudung Bahtiar', status: 'Aktif' },
  { id: 'std-21', nisn: '0076534601', name: 'Tegar Bintang Pamungkas', classGrade: 6, gender: 'L', parentName: 'Sulaeman', status: 'Aktif' },
  { id: 'std-22', nisn: '0076534602', name: 'Ulfah Fauziyyah', classGrade: 6, gender: 'P', parentName: 'Kuswara', status: 'Aktif' },
  { id: 'std-23', nisn: '0076534603', name: 'Vino Bastian Pratama', classGrade: 6, gender: 'L', parentName: 'Rudi Hartono', status: 'Aktif' },
  { id: 'std-24', nisn: '0076534604', name: 'Zahra Cantika Dewi', classGrade: 6, gender: 'P', parentName: 'Toto Hermanto', status: 'Aktif' },
];

export const EXTRACURRICULARS_DATA: Extracurricular[] = [
  {
    id: 'extra-1',
    name: 'Pramuka (Siaga & Penggalang)',
    coach: 'Kak Asep Saepuloh, S.Pd. & Kak Neni Maryani, S.Pd.',
    schedule: 'Jumat, 14.00 - 16.00 WIB',
    location: 'Halaman Utama & Ruang Kelas 3',
    description: 'Wadah pembentukan karakter disiplin, kemandirian, cinta alam, tali temali, semaphore, dan kepemimpinan generasi muda tunas kelapa.',
    achievements: ['Juara 1 Lomba Ketangkasan Baris Berbaris Kwarran Pamulihan 2024', 'Regu Pramuka Tergiat Jambore Ranting Sumedang'],
    icon: 'campground',
    photoUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=700&auto=format&fit=crop'
  },
  {
    id: 'extra-2',
    name: 'Seni Tari Tradisional Sunda (Jaipong)',
    coach: 'Ibu Eneng Siti Fatimah, S.Pd.',
    schedule: 'Rabu, 14.30 - 16.00 WIB',
    location: 'Ruang Kesenian & Serbaguna',
    description: 'Melestarikan tarian khas Priangan seperti Tari Jaipong, Tari Merak, dan Tari Rampak Nusantara dengan balutan kostum anggun dan rancak.',
    achievements: ['Juara 2 FLS2N Tingkat Kecamatan Pamulihan 2024', 'Penampil Pembuka Hari Guru Nasional se-Kabupaten Sumedang'],
    icon: 'music',
    photoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=700&auto=format&fit=crop'
  },
  {
    id: 'extra-3',
    name: 'Futsal & Atletik Mini Cilik',
    coach: 'Pak Dadan Ramdani, S.Pd.Or.',
    schedule: 'Sabtu, 07.30 - 09.30 WIB',
    location: 'Lapangan Olahraga SDN Cinanggerang I',
    description: 'Melatih kemampuan dasar menggiring bola, teknik shooting, kerjasama regu tim, sportivitas, serta kecepatan lari sprint anak.',
    achievements: ['Juara 3 Turnamen Futsal SD Cup Antar Sekolah Pamulihan', 'Medali Emas Lari 60M Putra O2SN 2024'],
    icon: 'futbol',
    photoUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=700&auto=format&fit=crop'
  },
  {
    id: 'extra-4',
    name: 'Marawis & Seni Hadroh Islami',
    coach: 'Ustadz Iwan Ridwan, S.Pd.I.',
    schedule: 'Kamis, 14.00 - 15.30 WIB',
    location: 'Musholla Al-Ikhlas SDN Cinanggerang I',
    description: 'Menumbuhkan kecintaan terhadap sholawat Nabi Muhammad SAW melalui ketukan rebana ritmis marawis dan lagu-lagu qasidah merdu.',
    achievements: ['Juara Harapan 1 Festival Seni Islami Sumedang', 'Pengisi Acara Rutin Peringatan Maulid & Isra Miraj'],
    icon: 'drum',
    photoUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=700&auto=format&fit=crop'
  },
  {
    id: 'extra-5',
    name: 'Dokter Kecil & UKS Mula',
    coach: 'Bidan Puskesmas Pamulihan & Bu Ratna Juwita, S.Pd.',
    schedule: 'Selasa, 14.00 - 15.30 WIB',
    location: 'Ruang UKS & Pojok Sehat',
    description: 'Kader cilik yang dibina untuk mempraktikkan hidup bersih sehat (PHBS), P3K dasar, pemeriksaan kuku/gigi, serta peduli kantin sehat.',
    achievements: ['UKS Berpredikat Bintang Tiga dari Dinas Kesehatan', 'Duta Cuci Tangan Pakai Sabun Kecamatan Pamulihan'],
    icon: 'heart-pulse',
    photoUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=700&auto=format&fit=crop'
  },
  {
    id: 'extra-6',
    name: 'Klub Sains Cilik & Robotik Sederhana',
    coach: 'Pak Yudi Hermawan, S.Pd. & Bu Mila Rosilawati, S.Pd.',
    schedule: 'Senin, 14.00 - 15.30 WIB',
    location: 'Lab TIK & Laboratorium IPA',
    description: 'Eksperimen sains berbasis bahan ramah lingkungan, pengamatan mikroskop digital sederhana, coding pemula, dan daur ulang kreatif.',
    achievements: ['Finalis Lomba Inovasi Sains Cilik Sumedang 2024', 'Karya Sains Roket Air Terbaik Hari Kebangkitan Nasional'],
    icon: 'flask',
    photoUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=700&auto=format&fit=crop'
  }
];

export const WEEKLY_SCHEDULE = [
  { day: 'Senin', time: '07.00 - 07.45', activity: 'Upacara Bendera Merah Putih & Pembinaan Karakter Kebangsaan' },
  { day: 'Senin', time: '07.45 - 12.30', activity: 'Kegiatan Belajar Mengajar (KBM) Kurikulum Merdeka' },
  { day: 'Senin', time: '14.00 - 15.30', activity: 'Ekskul Sains Cilik & Robotik Sederhana' },
  { day: 'Selasa', time: '06.45 - 07.15', activity: 'Gerakan Literasi Sekolah (Membaca Buku 15 Menit di Pojok Baca)' },
  { day: 'Selasa', time: '07.15 - 12.30', activity: 'KBM Reguler & Praktik Sains di Luar Kelas' },
  { day: 'Selasa', time: '14.00 - 15.30', activity: 'Ekskul Dokter Kecil & Pembinaan UKS' },
  { day: 'Rabu', time: '06.45 - 07.15', activity: 'Rebo Nyunda (Percakapan Basa Sunda & Mengenal Kawih Buhun)' },
  { day: 'Rabu', time: '07.15 - 12.30', activity: 'KBM Reguler & Muatan Lokal Bahasa & Sastra Sunda' },
  { day: 'Rabu', time: '14.30 - 16.00', activity: 'Ekskul Tari Seni Jaipong Priangan' },
  { day: 'Kamis', time: '06.45 - 07.15', activity: 'Senam Pagi Anak Sehat Indonesia & Sarapan Gizi Bersama' },
  { day: 'Kamis', time: '07.15 - 12.30', activity: 'KBM Reguler & Pembelajaran Komputer di Lab TIK' },
  { day: 'Kamis', time: '14.00 - 15.30', activity: 'Ekskul Marawis & Hadroh Sholawat' },
  { day: 'Jumat', time: '06.45 - 07.30', activity: 'Jumat Berkah: Sholat Dhuha Berjamaah, Infaq Ceria & Tadarus Surat Pendek' },
  { day: 'Jumat', time: '07.30 - 11.00', activity: 'KBM Singkat & Jumat Bersih Operasi Semut Adiwiyata' },
  { day: 'Jumat', time: '13.30 - 15.30', activity: 'Latihan Pramuka Wajib Gugus Depan SDN Cinanggerang I' },
  { day: 'Sabtu', time: '07.00 - 08.00', activity: 'Sabtu Ceria: Jalan Sehat Lingkungan & Senam Kesegaran Jasmani' },
  { day: 'Sabtu', time: '08.00 - 11.30', activity: 'Pengembangan Diri, Proyek P5, dan Ekskul Futsal Cilik' },
];

export const ANNOUNCEMENTS_DATA: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Dibuka',
    category: 'PPDB',
    date: '2026-10-10',
    author: 'Panitia PPDB SDN Cinanggerang I',
    excerpt: 'Pendaftaran siswa baru Kelas 1 SDN Cinanggerang I kini dapat dilakukan secara online melalui formulir resmi di website atau langsung di posko sekolah.',
    content: 'Diberitahukan kepada seluruh orang tua/wali calon murid baru, SDN Cinanggerang I membuka kuota 56 calon siswa (2 rombongan belajar) untuk Tahun Ajaran 2026/2027. Persyaratan utama meliputi: Usia minimal 6 tahun per 1 Juli 2026, fotokopi Akta Kelahiran, Kartu Keluarga, KTP orang tua, dan surat keterangan tamat TK/PAUD (jika ada). Pendaftaran GRATIS tanpa dipungut biaya apapun.',
    isImportant: true,
  },
  {
    id: 'ann-2',
    title: 'Jadwal Asesmen Nasional Berbasis Komputer (ANBK) Kelas 5',
    category: 'Akademik',
    date: '2026-10-05',
    author: 'Tim Kurikulum & ANBK',
    excerpt: 'Pelaksanaan Gladi Bersih dan ANBK Utama Tahun 2026 untuk siswa-siswi Kelas 5 akan digelar di Laboratorium Komputer sekolah.',
    content: 'Seluruh peserta didik kelas 5 terpilih diharapkan hadir tepat waktu pukul 07.00 WIB berseragam lengkap. Diharapkan orang tua menjaga kesehatan anak, istirahat cukup, dan sarapan bergizi sebelum berangkat. Simulasi perangkat akan didampingi langsung oleh teknisi dan operator sekolah.',
    isImportant: true,
  },
  {
    id: 'ann-3',
    title: 'Peringatan Hari Sumpah Pemuda & Gelar Karya Proyek Penguatan Pelajar Pancasila (P5)',
    category: 'Kegiatan',
    date: '2026-09-28',
    author: 'Kesiswaan & Seni',
    excerpt: 'Saksikan pentas seni, pameran daur ulang botol plastik, bazar makanan tradisional Sunda, dan lomba kostum pahlawan nasional.',
    content: 'Acara akan diselenggarakan di Lapangan SDN Cinanggerang I. Orang tua siswa diundang hadir untuk mengapresiasi kreasi anak-anak mulai dari tarian daerah, paduan suara lagu wajib, hingga stan display kerajinan tangan kelas 1 sampai kelas 6.',
    isImportant: false,
  },
  {
    id: 'ann-4',
    title: 'Program Pemberian Vitamin A & Imunisasi BIAS Puskesmas Pamulihan',
    category: 'Pengumuman Umum',
    date: '2026-09-18',
    author: 'Tim UKS & Bidan Pembina',
    excerpt: 'Pemberian obat cacing berkala dan imunisasi Difteri Tetanus (DT) bagi peserta didik kelas 1 dan 2.',
    content: 'Bekerjasama dengan UPTD Puskesmas Pamulihan, SDN Cinanggerang I mengadakan imunisasi Bulan Imunisasi Anak Sekolah (BIAS). Pastikan ananda sudah sarapan dari rumah.',
    isImportant: false,
  },
  {
    id: 'ann-5',
    title: 'Prestasi Juara 1 Lomba Cerdas Cermat Sains Tingkat Gugus',
    category: 'Akademik',
    date: '2026-09-02',
    author: 'Humas Sekolah',
    excerpt: 'Selamat kepada ananda Raka Dwi Ardiansyah dan Syifa Nuraini atas raihan Juara Pertama dalam O2SN & Sains Day 2026.',
    content: 'Prestasi membanggakan kembali ditorehkan oleh duta sains SDN Cinanggerang I. Semoga memotivasi seluruh teman-teman untuk terus tekun belajar dan gemar membaca.',
    isImportant: false,
  }
];

export const INITIAL_PPDB_APPLICANTS: PPDBApplicant[] = [
  {
    id: 'reg-001',
    registrationNumber: 'PPDB-CIN1-2026-0001',
    fullName: 'Muhammad Raihan Pratama',
    nik: '3211090805190002',
    birthPlace: 'Sumedang',
    birthDate: '2019-05-08',
    gender: 'L',
    originSchool: 'TK PGRI Melati Pamulihan',
    parentName: 'Agus Gunawan',
    parentPhone: '081321456789',
    address: 'Dusun Cinanggerang RT 02 RW 03, Desa Cinanggerang',
    status: 'Diterima',
    submittedAt: '2026-10-11 08:30 WIB'
  },
  {
    id: 'reg-002',
    registrationNumber: 'PPDB-CIN1-2026-0002',
    fullName: 'Alya Syakila Putri',
    nik: '3211094709190001',
    birthPlace: 'Bandung',
    birthDate: '2019-09-17',
    gender: 'P',
    originSchool: 'PAUD Tunas Harapan',
    parentName: 'Wahyu Hidayat',
    parentPhone: '085294567112',
    address: 'Dusun Cigintung RT 01 RW 01, Kec. Pamulihan',
    status: 'Menunggu Verifikasi',
    submittedAt: '2026-10-12 10:15 WIB'
  },
  {
    id: 'reg-003',
    registrationNumber: 'PPDB-CIN1-2026-0003',
    fullName: 'Fikri Aditya Pratama',
    nik: '3211092203190004',
    birthPlace: 'Sumedang',
    birthDate: '2019-03-22',
    gender: 'L',
    originSchool: 'TK Al-Falah Pamulihan',
    parentName: 'Iwan Kartiwa',
    parentPhone: '087823445566',
    address: 'Jl. Raya Simpang No. 45, Desa Cinanggerang',
    status: 'Menunggu Verifikasi',
    submittedAt: '2026-10-13 13:40 WIB'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', studentName: 'Ahmad Faiz Al-Faruq', classGrade: 1, status: 'Hadir', date: '2026-10-15', time: '06:55 WIB' },
  { id: 'att-2', studentName: 'Anindita Cahya Putri', classGrade: 1, status: 'Hadir', date: '2026-10-15', time: '06:58 WIB' },
  { id: 'att-3', studentName: 'Dimas Aditya Nugraha', classGrade: 2, status: 'Hadir', date: '2026-10-15', time: '07:05 WIB' },
  { id: 'att-4', studentName: 'Elsa Febriyani', classGrade: 2, status: 'Sakit', notes: 'Demam flu', date: '2026-10-15', time: '07:10 WIB' },
  { id: 'att-5', studentName: 'Hafiz Dzaki Ramadhan', classGrade: 3, status: 'Hadir', date: '2026-10-15', time: '07:00 WIB' },
  { id: 'att-6', studentName: 'Intan Permata Sari', classGrade: 3, status: 'Izin', notes: 'Acara keluarga', date: '2026-10-15', time: '07:12 WIB' },
  { id: 'att-7', studentName: 'Luthfi Rahman Hakim', classGrade: 4, status: 'Hadir', date: '2026-10-15', time: '06:45 WIB' },
  { id: 'att-8', studentName: 'Pandu Satria Utama', classGrade: 5, status: 'Hadir', date: '2026-10-15', time: '06:50 WIB' },
  { id: 'att-9', studentName: 'Syifa Nuraini Rahmah', classGrade: 5, status: 'Hadir', date: '2026-10-15', time: '06:52 WIB' },
  { id: 'att-10', studentName: 'Tegar Bintang Pamungkas', classGrade: 6, status: 'Hadir', date: '2026-10-15', time: '06:40 WIB' },
];

export const ELEARNING_MATERIALS: LearningMaterial[] = [
  {
    id: 'mat-1',
    classGrade: 1,
    subject: 'Bahasa Indonesia',
    title: 'Mengenal Bunyi Huruf Vokal dan Kata Bermakna',
    type: 'ringkasan',
    author: 'Hj. Elis Rohaeti, S.Pd.SD.',
    durationOrPages: 'Ringkasan 4 Lembar',
    summary: 'Materi belajar bunyi A, I, U, E, O serta mengeja suku kata terbuka (ba, ca, da, fa, ga). Dilengkapi gambar ilustrasi benda di rumah.',
    contentBody: 'Materi Pembelajaran Kelas 1:\n1. Bunyi Huruf Vokal: Huruf A (Apel), I (Ikan), U (Udang), E (Ekor), O (Obor).\n2. Mari Mengeja: B-U = BU, K-U = KU -> BUKU.\n3. Latihan di rumah: Sebutkan 3 nama benda di dalam tas sekolahmu yang berawalan huruf B!'
  },
  {
    id: 'mat-2',
    classGrade: 2,
    subject: 'Matematika Asyik',
    title: 'Penjumlahan dan Pengurangan dengan Garis Bilangan',
    type: 'video',
    author: 'Asep Saepuloh, S.Pd.',
    durationOrPages: 'Video Durasi 8 Menit',
    summary: 'Video animasi interaktif cara mudah melompat ke kanan untuk penjumlahan dan melompat ke kiri untuk pengurangan di garis angka 1-20.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'mat-3',
    classGrade: 3,
    subject: 'Basa Sunda',
    title: 'Kaulinan Barudak Lemah Cai: Oray-orayan jeung Congklak',
    type: 'ringkasan',
    author: 'Neni Maryani, S.Pd.',
    durationOrPages: 'Modul PDF 6 Halaman',
    summary: 'Mikawanoh rupa-rupa kaulinan barudak Sunda jaman baheula, kakawihan oray-orayan, sarta tata krama dina kaulinan babarengan.',
    contentBody: 'Mikawanoh Kaulinan Sunda:\n1. Oray-orayan: Kaulinan bari ngawih "Oray-orayan luar-leor mapay sawah, tong ka sawah parena keur beukah".\n2. Galah Asin / Gobang: Kaulinan ngajaga garis sangkan batur teu bisa asup.\n3. Nilai Karakter: Gotong royong, jujur, jeung resep babarengan.'
  },
  {
    id: 'mat-4',
    classGrade: 4,
    subject: 'IPAS (Sains & Sosial)',
    title: 'Metamorfosis Hewan Sempurna & Tidak Sempurna',
    type: 'pdf',
    author: 'Ratna Juwita, S.Pd.',
    durationOrPages: 'E-Modul 12 Halaman',
    summary: 'Mempelajari tahapan daur hidup kupu-kupu, katak, kecoa, dan belalang. Lengkap dengan bagan tahapan telur, ulat, kepompong, hingga dewasa.',
    contentBody: 'Tahapan Metamorfosis Kupu-Kupu:\n1. Telur: Diletakkan induk kupu-kupu di atas daun.\n2. Ulat (Larva): Makan daun untuk tumbuh besar.\n3. Kepompong (Pupa): Istirahat dan mengalami perubahan bentuk fisik di dalam cangkang.\n4. Kupu-kupu Dewasa (Imago): Keluar dengan sayap indah siap mencari madu bunga.'
  },
  {
    id: 'mat-5',
    classGrade: 5,
    subject: 'Ilmu Pengetahuan Alam',
    title: 'Sistem Organ Pernapasan Manusia & Cara Menjaganya',
    type: 'video',
    author: 'Eneng Siti Fatimah, S.Pd.',
    durationOrPages: 'Video Animasi 3D 10 Menit',
    summary: 'Menjelaskan alur udara dari hidung, faring, trakea, bronkus, bronkiolus, hingga pertukaran oksigen di alveolus paru-paru manusia.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'mat-6',
    classGrade: 6,
    subject: 'Matematika & Persiapan Ujian',
    title: 'Menghitung Luas Permukaan & Volume Bangun Ruang',
    type: 'ringkasan',
    author: 'Yudi Hermawan, S.Pd.',
    durationOrPages: 'Ringkasan Rumus Cepat & Soal Latihan',
    summary: 'Kumpulan trik cepat menghitung volume balok, kubus, prisma segitiga, dan tabung disertai 10 contoh soal pembahasan ujian sekolah.',
    contentBody: 'Kunci Rumus Bangun Ruang:\n1. Kubus: V = s × s × s, Luas Permukaan = 6 × s²\n2. Balok: V = p × l × t, Luas Permukaan = 2 × (p×l + p×t + l×t)\n3. Tabung: V = π × r² × t (gunakan π = 22/7 atau 3,14)\nTip: Selalu perhatikan satuan panjang (cm atau m) sebelum menghitung!'
  }
];

export const MINI_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Apa semboyan bangsa Indonesia yang tertera pada pita yang dicengkeram oleh burung Garuda Pancasila?',
    options: ['Tut Wuri Handayani', 'Bhinneka Tunggal Ika', 'Bersatu Kita Teguh', 'Ing Ngarsa Sung Tulada'],
    correctAnswer: 1,
    explanation: 'Bhinneka Tunggal Ika bermakna berbeda-beda tetapi tetap satu jua, merupakan semboyan resmi persatuan bangsa Indonesia.'
  },
  {
    id: 2,
    question: 'Di bawah ini hewan yang mengalami metamorfosis sempurna adalah...',
    options: ['Kecoa', 'Belalang', 'Kupu-kupu', 'Capung'],
    correctAnswer: 2,
    explanation: 'Kupu-kupu mengalami 4 tahap perubahan wujud sempurna: Telur -> Larva (ulat) -> Pupa (kepompong) -> Imago (kupu-kupu).'
  },
  {
    id: 3,
    question: 'Organ tubuh manusia yang berfungsi memompa darah ke seluruh tubuh adalah...',
    options: ['Paru-paru', 'Jantung', 'Hati', 'Ginjal'],
    correctAnswer: 1,
    explanation: 'Jantung berdetak tanpa henti untuk memompa darah kaya oksigen ke seluruh sel tubuh manusia.'
  },
  {
    id: 4,
    question: 'Kaulinan barudak Sunda anu ngagunakeun batu leutik atawa kuwuk sarta papan kai anu aya liangna disebut...',
    options: ['Egrang', 'Galah', 'Congklak', 'Gatrik'],
    correctAnswer: 2,
    explanation: 'Congklak mangrupakeun kaulinan tradisi Sunda make papan kayu jeung siki kerang/kuwuk nu pinuh ku nilai ngitung jeung strategi.'
  },
  {
    id: 5,
    question: 'Sebuah persegi memiliki panjang sisi 8 cm. Berapakah luas persegi tersebut?',
    options: ['16 cm²', '32 cm²', '64 cm²', '80 cm²'],
    correctAnswer: 2,
    explanation: 'Rumus luas persegi adalah Sisi × Sisi = 8 cm × 8 cm = 64 cm².'
  }
];

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'book-1',
    title: 'Buku Siswa: Tematik Terpadu Kelas 1 - Diriku',
    author: 'Kemendikbudristek RI',
    category: 'Kurikulum Merdeka',
    grade: 'Kelas 1 SD',
    pages: 146,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
    synopsis: 'Buku panduan siswa kelas 1 tema 1 yang membimbing anak mengenal tubuh, teman baru, dan cara merawat kebersihan diri dengan gembira.',
    sampleContent: [
      'Bab 1: Aku dan Teman Baru di Sekolah.\nKita memiliki teman baru. Bersama teman kita bisa tertawa dan belajar bersama. Mari saling menyapa dengan sopan!',
      'Bab 2: Tubuhku Karunia Tuhan.\nTubuh kita memiliki mata untuk melihat, telinga untuk mendengar, tangan untuk memegang, dan kaki untuk berjalan. Rawatlah dengan mandi dua kali sehari.',
      'Bab 3: Aku Merawat Tubuhku.\nGosoklah gigi setelah sarapan dan sebelum tidur di malam hari agar kuman tidak merusak gigimu.'
    ]
  },
  {
    id: 'book-2',
    title: 'Dongeng Si Kancil & Kuya di Pasundan',
    author: 'Asep Saepuloh & Tim Bahasa Sunda',
    category: 'Cerita Rakyat',
    grade: 'Semua Kelas',
    pages: 48,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop',
    synopsis: 'Kumpulan fabel sarat amanat budi pekerti tentang kecerdikan, keadilan, serta pentingnya tidak sombong saat memiliki kelebihan.',
    sampleContent: [
      'Alkisah di hiji leuweung tutupan di Sumedang, hirup Sakadang Kuya jeung Sakadang Monyet. Sakadang Kuya getol melak cau, sedengkeun monyet ngan ukur ulin.',
      'Nalika cau geus asak koneng, monyet hayang ngala tapi embung babagi. Kuya tetep sabar sarta make akal calakan pikeun mere pelajaran ka si Monyet.',
      'Amanat: Jalma anu sombong jeung sarakah pasti bakal meunang karugian, sabalikna jalma jujur jeung sabar bakal pinuntun kabagjaan.'
    ]
  },
  {
    id: 'book-3',
    title: 'Ensiklopedia Cilik: Rahasia Alam Semesta & Planet',
    author: 'Dr. Hendra Wijaya',
    category: 'Ensiklopedia',
    grade: 'Kelas 4, 5, 6',
    pages: 96,
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    synopsis: 'Penjelajahan visual mengagumkan mengenal Matahari, delapan planet tata surya, bulan, meteor, dan fenomena gerhana.',
    sampleContent: [
      'Matahari adalah bintang raksasa di pusat tata surya kita. Suhunya mencapai 15 juta derajat Celcius di intinya dan memberikan cahaya bagi Bumi kita.',
      'Bumi adalah satu-satunya planet yang diketahui memiliki air cair dan kehidupan. Atmosfer Bumi melindungi kita dari radiasi sinar berbahaya.',
      'Planet Mars dijuluki planet merah karena permukaannya dilapisi debu besi oksida yang menyerupai karat.'
    ]
  },
  {
    id: 'book-4',
    title: 'Petualangan Sahabat Pancasila: Memupuk Toleransi',
    author: 'Pusat Kurikulum & Perbukuan',
    category: 'Buku Tematik',
    grade: 'Kelas 3, 4',
    pages: 82,
    coverUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
    synopsis: 'Kisah seru empat sahabat cilik dari berbagai latar belakang suku dan agama di sebuah desa yang hidup rukun bergotong-royong.',
    sampleContent: [
      'Dika, Wayan, Maria, dan Siti belajar bersama di bawah pohon rindang sekolah. Walaupun pakaian adat dan hari rayanya berbeda, mereka saling menghormati.',
      'Saat balai desa membutuhkan bantuan cat pagar, seluruh anak-anak membawa kuas dan saling bantu tanpa membedakan suku asal.',
      'Pesan Moral: Persatuan dalam keberagaman adalah kekayaan terindah negeri kita, Indonesia.'
    ]
  },
  {
    id: 'book-5',
    title: 'Matematika Asyik: Teka-Teki Angka Ajaib',
    author: 'Prof. Suyanto, M.Sc.',
    category: 'Komik Edukasi',
    grade: 'Kelas 2, 3, 4',
    pages: 64,
    coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600&auto=format&fit=crop',
    synopsis: 'Komik bergambar warna-warni yang mengajarkan perkalian, pembagian, dan logika spasial melalui kasus detektif cilik matematika.',
    sampleContent: [
      'Detektif Cilik mencari jejak kue yang hilang dengan menghitung kelipatan angka 3 di lantai dapur!',
      'Rumus rahasia perkalian angka 9: gunakan kedua tanganmu untuk melihat angka puluhan dan satuan secara instan.',
      'Trik cepat: Setiap bilangan genap yang dijumlahkan dengan sesama bilangan genap akan selalu menghasilkan bilangan genap!'
    ]
  },
  {
    id: 'book-6',
    title: 'Adiwiyata Cilik: Menjaga Bumi dari Sekolah Kita',
    author: 'Tim Lingkungan Hidup SDN Cinanggerang I',
    category: 'Ensiklopedia',
    grade: 'Semua Kelas',
    pages: 52,
    coverUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop',
    synopsis: 'Panduan praktis anak SD untuk memilah sampah organik dan anorganik, membuat kompos dari daun kering, dan menanam tanaman obat keluarga.',
    sampleContent: [
      'Pilah Sampah dengan 3 Warna: Tong Hijau untuk sisa daun & buah, Tong Kuning untuk botol plastik & kaleng, Tong Merah untuk limbah baterai berbahaya.',
      'Membuat Pupuk Kompos Sederhana: Kumpulkan dedaunan di taman sekolah, semprotkan cairan EM4, tutup rapat di wadah karung selama 3 minggu.',
      'Mari membawa botol minum (tumbler) dan kotak bekal sendiri dari rumah untuk mengurangi sampah plastik sekali pakai.'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Upacara Bendera Hari Senin Penuh Khidmat',
    category: 'Upacara',
    date: '13 Oktober 2026',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=900&auto=format&fit=crop',
    caption: 'Seluruh dewan guru dan siswa-siswi SDN Cinanggerang I mengikuti upacara bendera dengan tertib di halaman sekolah.'
  },
  {
    id: 'gal-2',
    title: 'Suasana Belajar Aktif & Berpusat pada Anak',
    category: 'Belajar di Kelas',
    date: '08 Oktober 2026',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=900&auto=format&fit=crop',
    caption: 'Peserta didik kelas 4 antusias melakukan diskusi kelompok pembuatan peta konsep sistem ekosistem darat.'
  },
  {
    id: 'gal-3',
    title: 'Latihan Tari Rampak Jaipong Priangan',
    category: 'Ekstrakurikuler',
    date: '03 Oktober 2026',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop',
    caption: 'Siswi anggota ekskul tari berlatih gerakan gerak ukel dan godeg dipandu oleh Ibu Eneng Siti Fatimah.'
  },
  {
    id: 'gal-4',
    title: 'Praktek Pengenalan Komputer & Mengetik di Lab TIK',
    category: 'Belajar di Kelas',
    date: '25 September 2026',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop',
    caption: 'Siswa kelas 5 berlatih menggunakan software pengolah kata dan latihan simulasi soal ANBK dengan gembira.'
  },
  {
    id: 'gal-5',
    title: 'Penyerahan Piala Juara 1 Pramuka Tingkat Kecamatan',
    category: 'Prestasi & Lomba',
    date: '18 September 2026',
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=900&auto=format&fit=crop',
    caption: 'Kepala Sekolah Bapak H. Dedi Suryadi mengalungkan medali apresiasi kepada regu Pramuka Siaga berprestasi.'
  },
  {
    id: 'gal-6',
    title: 'Jumat Bersih & Budidaya Kebun Sayur Adiwiyata',
    category: 'Lingkungan',
    date: '11 September 2026',
    imageUrl: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=900&auto=format&fit=crop',
    caption: 'Kegiatan gotong royong memupuk tanaman cabai, jahe, dan merapikan taman bunga di depan ruang guru.'
  },
  {
    id: 'gal-7',
    title: 'Keceriaan Pojok Baca di Perpustakaan Pelangi Ilmu',
    category: 'Belajar di Kelas',
    date: '02 September 2026',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=900&auto=format&fit=crop',
    caption: 'Anak-anak kelas 2 membaca dongeng bergambar sambil berdiskusi seru di area karpet empuk perpustakaan.'
  },
  {
    id: 'gal-8',
    title: 'Pertandingan Persahabatan Futsal Antar Kelas',
    category: 'Ekstrakurikuler',
    date: '28 Agustus 2026',
    imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=900&auto=format&fit=crop',
    caption: 'Sorak sorai penonton menyemangati tim kelas 5 dan 6 yang bertanding sportif di lapangan utama sekolah.'
  }
];
