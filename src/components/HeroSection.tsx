import React from 'react';
import {
  Sparkles,
  UserPlus,
  Compass,
  Award,
  Users,
  GraduationCap,
  Calendar,
  ChevronRight,
  Quote,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { SCHOOL_INFO, ANNOUNCEMENTS_DATA } from '../data/schoolData';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const latestAnnouncement = ANNOUNCEMENTS_DATA[0];

  return (
    <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white overflow-hidden py-14 lg:py-20 border-b border-emerald-700/40">
      {/* Background ambient glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Ticker / Running Info Bar */}
        {latestAnnouncement && (
          <div className="mb-8 max-w-4xl mx-auto lg:mx-0">
            <div className="bg-emerald-950/70 border border-emerald-600/40 backdrop-blur-md rounded-2xl p-2.5 sm:px-4 sm:py-2.5 flex items-center gap-3 text-xs sm:text-sm">
              <span className="bg-amber-400 text-slate-950 text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> Info Terkini
              </span>
              <p className="truncate text-emerald-100 flex-1">
                <strong className="text-white">{latestAnnouncement.title}</strong> — {latestAnnouncement.excerpt}
              </p>
              <button
                onClick={() => onNavigate('pengumuman')}
                className="text-amber-300 hover:text-amber-200 font-bold shrink-0 flex items-center text-xs ml-1 cursor-pointer"
              >
                Lihat <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Greeting, Main Headline, Description, and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Selamat Datang di Website Resmi SDN Cinanggerang I</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Menumbuhkan Generasi <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-amber-300">
                Cerdas, Berakhlak Mulia,
              </span>{' '}
              & Berbudaya Sunda.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-emerald-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Sekolah Dasar Negeri unggulan di Kecamatan Pamulihan, Kabupaten Sumedang. Berkomitmen menghadirkan lingkungan belajar yang aman, ramah anak, berakar pada kearifan lokal, dan siap menghadapi era digital.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => onNavigate('ppdb')}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 transition transform hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
              >
                <UserPlus className="w-5 h-5" />
                <span>Daftar PPDB 2026/2027</span>
              </button>

              <button
                onClick={() => onNavigate('profil')}
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-white/25 transition flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-emerald-300" />
                <span>Profil & Fasilitas</span>
              </button>

              <button
                onClick={() => onNavigate('absen')}
                className="px-5 py-3.5 rounded-2xl bg-emerald-800/80 hover:bg-emerald-700/80 text-white font-semibold text-sm sm:text-base border border-emerald-600/50 transition flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Absen Siswa</span>
              </button>
            </div>

            {/* Fast Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/15 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-white">{SCHOOL_INFO.totalStudents}</div>
                <div className="text-xs text-emerald-200 font-medium flex items-center gap-1 mt-0.5">
                  <Users className="w-3 h-3" /> Siswa Aktif
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-white">{SCHOOL_INFO.totalTeachers}</div>
                <div className="text-xs text-emerald-200 font-medium flex items-center gap-1 mt-0.5">
                  <GraduationCap className="w-3 h-3" /> Dewan Guru & Staf
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-amber-300">A</div>
                <div className="text-xs text-emerald-200 font-medium flex items-center gap-1 mt-0.5">
                  <Award className="w-3 h-3 text-amber-300" /> Akreditasi BAN-S/M
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-white">6</div>
                <div className="text-xs text-emerald-200 font-medium flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3" /> Ekstrakurikuler
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sambutan Kepala Sekolah Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full -z-0 opacity-60"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={SCHOOL_INFO.principal.photoUrl}
                      alt={SCHOOL_INFO.principal.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md border-2 border-emerald-600"
                    />
                    <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow">
                      KS
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-1">
                      Sambutan Kepala Sekolah
                    </span>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                      {SCHOOL_INFO.principal.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      NIP. {SCHOOL_INFO.principal.nip}
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 relative mt-3">
                  <Quote className="w-6 h-6 text-emerald-400/50 absolute top-2 right-2" />
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{SCHOOL_INFO.principal.welcomeMessage}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Sekolah Ramah Anak Sumedang</span>
                  </div>
                  <button
                    onClick={() => onNavigate('profil')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition flex items-center gap-1 cursor-pointer"
                  >
                    Profil Lengkap <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
