import React from 'react';
import {
  Landmark,
  Building2,
  Users2,
  History,
  CheckCircle,
  Award,
  BookOpen,
  Laptop,
  HeartPulse,
  Trees,
  Sparkles,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { SCHOOL_INFO, FACILITIES_DATA } from '../../data/schoolData';

export const ProfileView: React.FC = () => {
  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Breadcrumb & Title */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
            Tentang Kami
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Profil Resmi SDN Cinanggerang I
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Mengenal lebih dekat sejarah perjalanan, sarana prasarana penunjang belajar, dan bagan struktur organisasi pengelola sekolah.
          </p>
        </div>

        {/* Sejarah Singkat */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl text-xs font-bold">
              <History className="w-4 h-4" />
              <span>Didirikan Tahun 1978</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              Sejarah Singkat & Dedikasi 4 Dekade
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              SDN Cinanggerang I berakar dari inisiatif para tokoh sesepuh masyarakat Desa Cinanggerang dan Pemerintah Kabupaten Sumedang pada era 1970-an untuk menyediakan akses pendidikan dasar berkualitas bagi anak-anak di lereng perbukitan Pamulihan.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dari bangunan bersahaja 3 ruangan kelas darurat, kini SDN Cinanggerang I telah bertransformasi menjadi institusi dasar modern berakreditasi <strong>A (Unggul)</strong>, berpredikat Sekolah Ramah Anak, dan menjadi percontohan Sekolah Penggerak Adiwiyata di Kecamatan Pamulihan dengan membina lebih dari 1.450 alumni berprestasi.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-xs text-slate-500 block">Total Rombel</span>
                <span className="font-extrabold text-slate-900 text-lg">6 Kelas Lengkap</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-xs text-slate-500 block">Akreditasi BAN-S/M</span>
                <span className="font-extrabold text-emerald-700 text-lg">Nilai 94 (A)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop"
                alt="Lingkungan SDN Cinanggerang I"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Kampus Sekolah Ramah Anak</div>
                  <h3 className="text-lg font-bold">Lingkungan Belajar Asri, Aman, dan Bersahaja</h3>
                  <p className="text-xs text-emerald-200 mt-0.5">Jl. Raya Cinanggerang No. 12, Kec. Pamulihan, Sumedang</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fasilitas Sekolah */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Sarana & Prasarana
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Fasilitas Unggulan Pendukung Belajar
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Dirancang untuk kenyamanan, kebersihan, serta stimulasi motorik dan kognitif anak secara optimal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACILITIES_DATA.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={fac.photoUrl}
                    alt={fac.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-emerald-800 shadow">
                    Fasilitas Terawat
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition">
                      {fac.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> Standar Nasional Pendidikan
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Struktur Organisasi */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Manajemen Sekolah
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Bagan Struktur Organisasi & Pengelola
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
              Sinergi kepemimpinan dan dewan pendidik dalam menjalankan tata kelola sekolah yang transparan dan akuntabel.
            </p>
          </div>

          {/* Org Chart Visualization */}
          <div className="flex flex-col items-center space-y-6">
            {/* Top Level: Komite Sekolah & Kepala Sekolah */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl w-full">
              <div className="bg-slate-900 text-white p-4 rounded-2xl text-center shadow-md">
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Mitra Masyarakat</span>
                <div className="font-extrabold text-sm sm:text-base mt-1">Komite SDN Cinanggerang I</div>
                <div className="text-xs text-slate-300 mt-0.5">Ketua: Drs. H. Tatang Sutisna</div>
              </div>

              <div className="bg-emerald-700 text-white p-4 rounded-2xl text-center shadow-md border-2 border-emerald-500">
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Pimpinan Sekolah</span>
                <div className="font-extrabold text-sm sm:text-base mt-1">{SCHOOL_INFO.principal.name}</div>
                <div className="text-xs text-emerald-100 mt-0.5">Kepala Sekolah SDN Cinanggerang I</div>
              </div>
            </div>

            {/* Connecting line */}
            <div className="w-0.5 h-6 bg-slate-300"></div>

            {/* Second Level: Tata Usaha / Operator & Koordinator Kurikulum */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center">
                <div className="font-bold text-xs sm:text-sm text-emerald-950">Administrasi & Dapodik</div>
                <div className="text-xs font-semibold text-emerald-700 mt-1">Cecep Kurnia, S.AP.</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Operator Sekolah & Kepegawaian</div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center">
                <div className="font-bold text-xs sm:text-sm text-emerald-950">Kurikulum & Asesmen</div>
                <div className="text-xs font-semibold text-emerald-700 mt-1">Yudi Hermawan, S.Pd.</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Penanggung Jawab Kurikulum Merdeka</div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center">
                <div className="font-bold text-xs sm:text-sm text-emerald-950">Kesiswaan & Pembinaan</div>
                <div className="text-xs font-semibold text-emerald-700 mt-1">Asep Saepuloh, S.Pd.</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Pembina Karakter & Ekstrakurikuler</div>
              </div>
            </div>

            {/* Connecting line */}
            <div className="w-0.5 h-6 bg-slate-300"></div>

            {/* Third Level: Dewan Guru Kelas 1 s.d. 6 & Guru Mata Pelajaran */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 w-full">
              <h4 className="text-xs font-bold text-center text-slate-500 uppercase tracking-wider mb-4">
                Dewan Guru Kelas, Guru Bidang Studi & Tenaga Perpustakaan
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-xs">
                  <div className="font-bold text-slate-900">Kelas 1</div>
                  <div className="text-emerald-700 font-semibold truncate">Hj. Elis R, S.Pd.</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-xs">
                  <div className="font-bold text-slate-900">Kelas 2</div>
                  <div className="text-emerald-700 font-semibold truncate">Asep S, S.Pd.</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-xs">
                  <div className="font-bold text-slate-900">Kelas 3</div>
                  <div className="text-emerald-700 font-semibold truncate">Neni M, S.Pd.</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-xs">
                  <div className="font-bold text-slate-900">Kelas 4</div>
                  <div className="text-emerald-700 font-semibold truncate">Ratna J, S.Pd.</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-xs">
                  <div className="font-bold text-slate-900">Kelas 5</div>
                  <div className="text-emerald-700 font-semibold truncate">Eneng S, S.Pd.</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-xs">
                  <div className="font-bold text-slate-900">Kelas 6</div>
                  <div className="text-emerald-700 font-semibold truncate">Yudi H, S.Pd.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
