import React from 'react';
import {
  School,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  Heart,
  ChevronRight,
  Download,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface FooterProps {
  onSelectTab: (tabId: string) => void;
  onOpenExportModal: () => void;
  onOpenDeployGuide: () => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenExportModal,
  onOpenDeployGuide,
  onOpenLogin,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: School Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-md">
                <School className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg tracking-tight">
                  {SCHOOL_INFO.name}
                </h3>
                <p className="text-xs text-emerald-400 font-semibold">
                  {SCHOOL_INFO.subdistrict}, {SCHOOL_INFO.district}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Sekolah Dasar Negeri ramah anak yang mendidik dengan keteladanan budi pekerti, nilai luhur budaya Sunda, Kurikulum Merdeka, serta kecakapan teknologi digital abad-21.
            </p>

            <div className="pt-1 flex flex-wrap gap-2 text-xs">
              <button
                onClick={onOpenExportModal}
                className="px-3 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/60 font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>Unduh File HTML</span>
              </button>
              <button
                onClick={onOpenDeployGuide}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Panduan Deploy</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-emerald-400">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('profil')}
                  className="hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> Profil & Fasilitas Sekolah
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('guru')}
                  className="hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> Daftar Dewan Guru
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('siswa')}
                  className="hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> Direktori Peserta Didik
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('kegiatan')}
                  className="hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> Ekstrakurikuler & Jadwal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('pengumuman')}
                  className="hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> Papan Pengumuman
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ppdb')}
                  className="hover:text-amber-300 transition flex items-center gap-1.5 font-bold text-emerald-300 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Pendaftaran PPDB 2026 Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('elearning')}
                  className="hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> E-Learning & Kuis Siswa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('absen')}
                  className="hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> Absen Online Harian
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('perpustakaan')}
                  className="hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> Perpustakaan Digital
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('galeri')}
                  className="hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" /> Galeri Dokumentasi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-emerald-400">
              Kontak & Operasional
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{SCHOOL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-white transition">
                  {SCHOOL_INFO.phone} / {SCHOOL_INFO.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-white transition truncate">
                  {SCHOOL_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{SCHOOL_INFO.operatingHours}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Accreditation & Security */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-emerald-400">
              Status Resmi
            </h4>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <Award className="w-4 h-4" />
                <span>Akreditasi A</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                SK BAN-S/M No: {SCHOOL_INFO.skAkreditasi}
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold">
                NPSN: {SCHOOL_INFO.npsn}
              </div>
            </div>

            <button
              onClick={onOpenLogin}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Login Admin & Guru</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} <strong>SDN Cinanggerang I</strong>. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p className="flex items-center gap-1">
            Mendidik dengan <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> di Pamulihan, Kabupaten Sumedang.
          </p>
        </div>
      </div>
    </footer>
  );
};
