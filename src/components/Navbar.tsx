import React, { useState } from 'react';
import {
  School,
  Menu,
  X,
  Lock,
  Download,
  BookOpen,
  Phone,
  Mail,
  Award,
  Sparkles,
  MapPin,
  HelpCircle,
  LogOut,
  UserCheck,
  FileSpreadsheet
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLogin: () => void;
  onOpenExportModal: () => void;
  onOpenDeployGuide: () => void;
  onOpenSyncModal?: () => void;
  currentUser: { role: 'admin' | 'guru'; name: string } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenLogin,
  onOpenExportModal,
  onOpenDeployGuide,
  onOpenSyncModal,
  currentUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Beranda', icon: 'fa-house' },
    { id: 'profil', label: 'Profil', icon: 'fa-school' },
    { id: 'guru', label: 'Guru', icon: 'fa-chalkboard-user' },
    { id: 'siswa', label: 'Siswa', icon: 'fa-children' },
    { id: 'kegiatan', label: 'Kegiatan', icon: 'fa-campground' },
    { id: 'pengumuman', label: 'Pengumuman', icon: 'fa-bullhorn' },
    { id: 'ppdb', label: 'PPDB Online', icon: 'fa-user-plus', highlight: true },
    { id: 'elearning', label: 'E-Learning', icon: 'fa-laptop-code' },
    { id: 'absen', label: 'Absen', icon: 'fa-clipboard-check' },
    { id: 'perpustakaan', label: 'Perpustakaan', icon: 'fa-book-open-reader' },
    { id: 'galeri', label: 'Galeri', icon: 'fa-images' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white text-xs py-2 px-4 border-b border-emerald-700/50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>NPSN: <strong>{SCHOOL_INFO.npsn}</strong></span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Akreditasi: <strong>{SCHOOL_INFO.accreditation}</strong></span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Kec. Pamulihan, Kab. Sumedang</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-emerald-100 flex-wrap">
            {onOpenSyncModal && (
              <button
                onClick={onOpenSyncModal}
                className="hover:text-amber-300 flex items-center gap-1 font-semibold transition cursor-pointer text-[11px] sm:text-xs bg-emerald-800/80 hover:bg-emerald-700/90 px-2.5 py-0.5 rounded-lg border border-emerald-600 shadow-xs"
                title="Tarik data guru atau profil langsung dari Google Spreadsheet & Drive"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
                <span>Sinkron Google Sheets</span>
              </button>
            )}
            <button
              onClick={onOpenDeployGuide}
              className="hover:text-amber-300 flex items-center gap-1 font-semibold transition cursor-pointer text-[11px] sm:text-xs bg-emerald-800/60 px-2 py-0.5 rounded border border-emerald-700"
            >
              <HelpCircle className="w-3 h-3 text-amber-300" />
              <span>Panduan Deploy</span>
            </button>
            <button
              onClick={onOpenExportModal}
              className="hover:text-amber-300 flex items-center gap-1 font-semibold transition cursor-pointer text-[11px] sm:text-xs bg-emerald-800/60 px-2 py-0.5 rounded border border-emerald-700"
            >
              <Download className="w-3 h-3 text-amber-300" />
              <span>Unduh Single-File HTML</span>
            </button>
            <a
              href={`tel:${SCHOOL_INFO.phone}`}
              className="hidden lg:flex items-center gap-1 hover:text-amber-300 transition"
            >
              <Phone className="w-3 h-3" />
              <span>{SCHOOL_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & School Name */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition overflow-hidden p-1">
                <img
                  src={SCHOOL_INFO.logoUrl}
                  alt="Logo SDN Cinanggerang I"
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <School className="w-7 h-7 text-white hidden" />
              </div>
              <div>
                <div className="font-extrabold text-xl text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition flex items-center gap-1.5">
                  <span>SDN CINANGGERANG I</span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Negeri
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-600 tracking-wide mt-1">
                  CERIA: Cerdas • Edukatif • Religius • IPTEK • Agamis
                </div>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                if (item.highlight) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-slate-900 ring-2 ring-amber-400'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>{item.label}</span>
                    </button>
                  );
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 font-bold'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Medium screen navigation summary (dropdown trigger or essential buttons) */}
            <div className="hidden lg:flex xl:hidden items-center gap-1.5">
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg ${
                  activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'
                }`}
              >
                Beranda
              </button>
              <button
                onClick={() => handleNavClick('profil')}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg ${
                  activeTab === 'profil' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => handleNavClick('guru')}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg ${
                  activeTab === 'guru' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'
                }`}
              >
                Guru
              </button>
              <button
                onClick={() => handleNavClick('ppdb')}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
              >
                PPDB
              </button>
              <button
                onClick={() => handleNavClick('absen')}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg ${
                  activeTab === 'absen' ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600'
                }`}
              >
                Absen
              </button>
            </div>

            {/* User Auth Action Button */}
            <div className="hidden sm:flex items-center gap-2">
              {currentUser ? (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <div className="text-left text-xs">
                    <span className="font-bold text-slate-800 block leading-tight">{currentUser.name}</span>
                    <span className="text-[10px] text-emerald-700 uppercase font-semibold">
                      {currentUser.role === 'admin' ? 'Operator' : 'Guru'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleNavClick('dashboard-admin')}
                    className="ml-2 px-2.5 py-1 text-[11px] font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    Panel
                  </button>
                  <button
                    onClick={onLogout}
                    title="Keluar"
                    className="p-1 text-slate-400 hover:text-rose-600 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition flex items-center gap-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Login Guru/Admin</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none transition cursor-pointer"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-5 pt-3 border-t border-slate-100 animate-fadeIn space-y-1">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={onOpenExportModal}
                  className="p-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Unduh HTML</span>
                </button>
                <button
                  onClick={onOpenDeployGuide}
                  className="p-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
                  <span>Panduan Deploy</span>
                </button>
              </div>

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center justify-between transition cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-emerald-600 text-white font-bold'
                      : item.highlight
                      ? 'bg-amber-100 text-amber-900 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-slate-900 font-extrabold uppercase">
                      Buka
                    </span>
                  )}
                </button>
              ))}

              <div className="pt-3 border-t border-slate-200">
                {currentUser ? (
                  <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-xl">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[10px] text-emerald-700 uppercase font-semibold">
                        Role: {currentUser.role}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleNavClick('dashboard-admin')}
                        className="px-3 py-1.5 text-xs font-bold bg-emerald-600 text-white rounded-lg"
                      >
                        Panel
                      </button>
                      <button
                        onClick={onLogout}
                        className="px-2.5 py-1.5 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg"
                      >
                        Keluar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="w-full py-2.5 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-emerald-50 border border-slate-300 text-center flex items-center justify-center gap-2 text-sm"
                  >
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Login Admin & Guru</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
