import React from 'react';
import {
  Landmark,
  GraduationCap,
  Users,
  Tent,
  Megaphone,
  UserPlus,
  Laptop,
  ClipboardCheck,
  BookOpen,
  Image,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface NavGridSectionProps {
  onSelectTab: (tabId: string) => void;
  onOpenLogin: () => void;
}

export const NavGridSection: React.FC<NavGridSectionProps> = ({
  onSelectTab,
  onOpenLogin,
}) => {
  const menus = [
    {
      id: 'profil',
      title: 'Profil Sekolah',
      desc: 'Sejarah, fasilitas 6 ruangan & struktur organisasi',
      badge: 'Tentang Kami',
      icon: Landmark,
      color: 'emerald',
      action: () => onSelectTab('profil'),
    },
    {
      id: 'guru',
      title: 'Daftar Guru',
      desc: '14 pendidik profesional, NIP & kualifikasi',
      badge: 'Tenaga Ahli',
      icon: GraduationCap,
      color: 'blue',
      action: () => onSelectTab('guru'),
    },
    {
      id: 'siswa',
      title: 'Daftar Siswa',
      desc: 'Data kelas 1 s.d. 6 dengan pencarian nama & NISN',
      badge: '218 Siswa',
      icon: Users,
      color: 'purple',
      action: () => onSelectTab('siswa'),
    },
    {
      id: 'kegiatan',
      title: 'Kegiatan Sekolah',
      desc: 'Pramuka, Tari Sunda, Futsal & jadwal mingguan',
      badge: 'Ekstrakurikuler',
      icon: Tent,
      color: 'amber',
      action: () => onSelectTab('kegiatan'),
    },
    {
      id: 'pengumuman',
      title: 'Pengumuman',
      desc: 'Informasi resmi, agenda ANBK & kegiatan terbaru',
      badge: 'Update Terkini',
      icon: Megaphone,
      color: 'rose',
      action: () => onSelectTab('pengumuman'),
    },
    {
      id: 'ppdb',
      title: 'PPDB Online 2026',
      desc: 'Pendaftaran murid baru online & cetak bukti daftar',
      badge: 'Pendaftaran Buka',
      icon: UserPlus,
      color: 'primary',
      featured: true,
      action: () => onSelectTab('ppdb'),
    },
    {
      id: 'elearning',
      title: 'E-Learning & Kuis',
      desc: 'Materi tematik kelas 1-6, video & kuis interaktif',
      badge: 'Belajar Digital',
      icon: Laptop,
      color: 'cyan',
      action: () => onSelectTab('elearning'),
    },
    {
      id: 'absen',
      title: 'Absen Online',
      desc: 'Presensi harian siswa & rekap kehadiran real-time',
      badge: 'Presensi Mandiri',
      icon: ClipboardCheck,
      color: 'teal',
      action: () => onSelectTab('absen'),
    },
    {
      id: 'perpustakaan',
      title: 'Perpustakaan Digital',
      desc: 'Koleksi buku tematik, fabel Sunda & ensiklopedia',
      badge: 'Pelangi Ilmu',
      icon: BookOpen,
      color: 'indigo',
      action: () => onSelectTab('perpustakaan'),
    },
    {
      id: 'galeri',
      title: 'Galeri Foto & Video',
      desc: 'Dokumentasi upacara, lomba, dan kegiatan belajar',
      badge: 'Dokumentasi',
      icon: Image,
      color: 'pink',
      action: () => onSelectTab('galeri'),
    },
    {
      id: 'login',
      title: 'Login Admin & Guru',
      desc: 'Dashboard pengelolaan data sekolah & PPDB',
      badge: 'Area Khusus',
      icon: ShieldAlert,
      color: 'slate',
      action: onOpenLogin,
    },
  ];

  const getColorClasses = (color: string, featured?: boolean) => {
    if (featured) {
      return {
        card: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 border-emerald-500',
        iconBg: 'bg-white/20 text-amber-300',
        badge: 'bg-amber-400 text-slate-950 font-bold',
        title: 'text-white',
        desc: 'text-emerald-100',
        arrow: 'text-amber-300 group-hover:translate-x-1',
      };
    }

    switch (color) {
      case 'emerald':
        return {
          card: 'bg-white hover:bg-emerald-50/60 border-slate-200/90 hover:border-emerald-300 text-slate-800 shadow-sm hover:shadow-md',
          iconBg: 'bg-emerald-100 text-emerald-700',
          badge: 'bg-emerald-100 text-emerald-800',
          title: 'text-slate-900 group-hover:text-emerald-800',
          desc: 'text-slate-500',
          arrow: 'text-emerald-600 group-hover:translate-x-1',
        };
      case 'blue':
        return {
          card: 'bg-white hover:bg-blue-50/60 border-slate-200/90 hover:border-blue-300 text-slate-800 shadow-sm hover:shadow-md',
          iconBg: 'bg-blue-100 text-blue-700',
          badge: 'bg-blue-100 text-blue-800',
          title: 'text-slate-900 group-hover:text-blue-800',
          desc: 'text-slate-500',
          arrow: 'text-blue-600 group-hover:translate-x-1',
        };
      case 'purple':
        return {
          card: 'bg-white hover:bg-purple-50/60 border-slate-200/90 hover:border-purple-300 text-slate-800 shadow-sm hover:shadow-md',
          iconBg: 'bg-purple-100 text-purple-700',
          badge: 'bg-purple-100 text-purple-800',
          title: 'text-slate-900 group-hover:text-purple-800',
          desc: 'text-slate-500',
          arrow: 'text-purple-600 group-hover:translate-x-1',
        };
      case 'amber':
        return {
          card: 'bg-white hover:bg-amber-50/60 border-slate-200/90 hover:border-amber-300 text-slate-800 shadow-sm hover:shadow-md',
          iconBg: 'bg-amber-100 text-amber-700',
          badge: 'bg-amber-100 text-amber-800',
          title: 'text-slate-900 group-hover:text-amber-800',
          desc: 'text-slate-500',
          arrow: 'text-amber-600 group-hover:translate-x-1',
        };
      case 'rose':
        return {
          card: 'bg-white hover:bg-rose-50/60 border-slate-200/90 hover:border-rose-300 text-slate-800 shadow-sm hover:shadow-md',
          iconBg: 'bg-rose-100 text-rose-700',
          badge: 'bg-rose-100 text-rose-800',
          title: 'text-slate-900 group-hover:text-rose-800',
          desc: 'text-slate-500',
          arrow: 'text-rose-600 group-hover:translate-x-1',
        };
      case 'cyan':
        return {
          card: 'bg-white hover:bg-cyan-50/60 border-slate-200/90 hover:border-cyan-300 text-slate-800 shadow-sm hover:shadow-md',
          iconBg: 'bg-cyan-100 text-cyan-700',
          badge: 'bg-cyan-100 text-cyan-800',
          title: 'text-slate-900 group-hover:text-cyan-800',
          desc: 'text-slate-500',
          arrow: 'text-cyan-600 group-hover:translate-x-1',
        };
      case 'teal':
        return {
          card: 'bg-white hover:bg-teal-50/60 border-slate-200/90 hover:border-teal-300 text-slate-800 shadow-sm hover:shadow-md',
          iconBg: 'bg-teal-100 text-teal-700',
          badge: 'bg-teal-100 text-teal-800',
          title: 'text-slate-900 group-hover:text-teal-800',
          desc: 'text-slate-500',
          arrow: 'text-teal-600 group-hover:translate-x-1',
        };
      case 'indigo':
        return {
          card: 'bg-white hover:bg-indigo-50/60 border-slate-200/90 hover:border-indigo-300 text-slate-800 shadow-sm hover:shadow-md',
          iconBg: 'bg-indigo-100 text-indigo-700',
          badge: 'bg-indigo-100 text-indigo-800',
          title: 'text-slate-900 group-hover:text-indigo-800',
          desc: 'text-slate-500',
          arrow: 'text-indigo-600 group-hover:translate-x-1',
        };
      case 'pink':
        return {
          card: 'bg-white hover:bg-pink-50/60 border-slate-200/90 hover:border-pink-300 text-slate-800 shadow-sm hover:shadow-md',
          iconBg: 'bg-pink-100 text-pink-700',
          badge: 'bg-pink-100 text-pink-800',
          title: 'text-slate-900 group-hover:text-pink-800',
          desc: 'text-slate-500',
          arrow: 'text-pink-600 group-hover:translate-x-1',
        };
      default:
        return {
          card: 'bg-slate-900 text-white hover:bg-slate-800 border-slate-800 shadow-sm hover:shadow-md',
          iconBg: 'bg-slate-800 text-amber-300',
          badge: 'bg-slate-800 text-slate-300',
          title: 'text-white',
          desc: 'text-slate-400',
          arrow: 'text-amber-300 group-hover:translate-x-1',
        };
    }
  };

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            Pusat Layanan Terpadu
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Menu Utama & Layanan Sekolah
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Akses cepat ke 11 modul informasi, administrasi, dan pembelajaran interaktif SDN Cinanggerang I.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {menus.map((m) => {
            const styles = getColorClasses(m.color, m.featured);
            const IconComponent = m.icon;

            return (
              <button
                key={m.id}
                onClick={m.action}
                className={`p-5 rounded-3xl border transition duration-200 text-left flex flex-col justify-between group cursor-pointer ${styles.card}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${styles.iconBg}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>
                      {m.badge}
                    </span>
                  </div>

                  <h3 className={`font-extrabold text-base mb-1 ${styles.title}`}>
                    {m.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${styles.desc}`}>
                    {m.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-bold">
                  <span>Buka Menu</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${styles.arrow}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
