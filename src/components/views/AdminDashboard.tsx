import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Megaphone,
  ClipboardCheck,
  CheckCircle2,
  Clock,
  PlusCircle,
  FileText,
  LogOut,
  ArrowLeft,
  Sparkles,
  Search,
  Check,
  Filter
} from 'lucide-react';
import {
  PPDBApplicant,
  Announcement,
  SCHOOL_INFO,
  ANNOUNCEMENTS_DATA
} from '../../data/schoolData';
import { AttendanceRecord, calculateAttendanceSummary } from '../../utils/schoolLogic';

interface AdminDashboardProps {
  currentUser: { role: 'admin' | 'guru'; name: string };
  onLogout: () => void;
  onBackToPublic: () => void;
  ppdbApplicants: PPDBApplicant[];
  onUpdateApplicantStatus: (id: string, status: 'Diterima' | 'Menunggu Verifikasi') => void;
  announcements: Announcement[];
  onAddAnnouncement: (announcement: Announcement) => void;
  attendanceRecords: AttendanceRecord[];
  onOpenSyncModal?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onLogout,
  onBackToPublic,
  ppdbApplicants,
  onUpdateApplicantStatus,
  announcements,
  onAddAnnouncement,
  attendanceRecords,
  onOpenSyncModal,
}) => {
  const [activeTab, setActiveTab] = useState<'ppdb' | 'pengumuman' | 'presensi'>('ppdb');

  // New Announcement Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'PPDB' | 'Akademik' | 'Kegiatan' | 'Pengumuman Umum'>('Pengumuman Umum');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const attendanceSummary = calculateAttendanceSummary(attendanceRecords);

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      alert('Judul dan isi pengumuman wajib diisi.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      date: today,
      author: currentUser.name,
      excerpt: newExcerpt.trim() || newContent.trim().substring(0, 100) + '...',
      content: newContent.trim(),
      isImportant,
    };

    onAddAnnouncement(newAnn);
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setIsImportant(false);
    setPostSuccess(true);

    setTimeout(() => {
      setPostSuccess(false);
    }, 4000);
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-white/10 px-3 py-1 rounded-full">
              <ShieldAlert className="w-3.5 h-3.5" /> Portal Internal Sekolah
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Dashboard Manajemen {currentUser.role === 'admin' ? 'Operator' : 'Dewan Guru'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Selamat bertugas, <strong>{currentUser.name}</strong> • SDN Cinanggerang I Pamulihan
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenSyncModal && (
              <button
                onClick={onOpenSyncModal}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> Sinkron Google Sheets & Drive
              </button>
            )}
            <button
              onClick={onBackToPublic}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Lihat Website Publik
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Keluar Akun
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold block">Total Murid Aktif</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{SCHOOL_INFO.totalStudents}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Semester Ganjil 2026/2027</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold block">Pendaftar PPDB</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">{ppdbApplicants.length}</span>
            <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">Kapasitas 56 Siswa</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold block">Presensi Tercatat</span>
            <span className="text-2xl sm:text-3xl font-black text-blue-600">{attendanceSummary.total}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">{attendanceSummary.hadirPercentage}% Hadir Hari Ini</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-semibold block">Pengumuman Aktif</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-600">{announcements.length}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Ditampilkan ke Publik</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            onClick={() => setActiveTab('ppdb')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'ppdb'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Kelola Calon Siswa PPDB ({ppdbApplicants.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pengumuman')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'pengumuman'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Buat Pengumuman Baru</span>
          </button>

          <button
            onClick={() => setActiveTab('presensi')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'presensi'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Rekap Presensi Siswa</span>
          </button>
        </div>

        {/* Tab 1: Kelola PPDB */}
        {activeTab === 'ppdb' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-black text-lg text-slate-900">
                  Daftar Berkas Calon Siswa Baru PPDB 2026/2027
                </h3>
                <p className="text-xs text-slate-500">
                  Verifikasi kelengkapan berkas fisik dan tentukan status kelulusan pendaftar.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                {ppdbApplicants.filter((a) => a.status === 'Diterima').length} Diterima dari {ppdbApplicants.length} Pendaftar
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                    <th className="py-3 px-4">No. Registrasi</th>
                    <th className="py-3 px-4">Nama Calon Siswa</th>
                    <th className="py-3 px-4">NIK & JK</th>
                    <th className="py-3 px-4">Asal TK/PAUD</th>
                    <th className="py-3 px-4">Orang Tua / Kontak</th>
                    <th className="py-3 px-4">Status Verifikasi</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ppdbApplicants.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-800">
                        {app.registrationNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 block">{app.fullName}</strong>
                        <span className="text-[11px] text-slate-400">{app.birthPlace}, {app.birthDate}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-xs text-slate-700 block">{app.nik}</span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {app.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{app.originSchool}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 block">{app.parentName}</span>
                        <span className="text-slate-500 font-mono text-xs">{app.parentPhone}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            app.status === 'Diterima'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {app.status === 'Menunggu Verifikasi' ? (
                          <button
                            onClick={() => onUpdateApplicantStatus(app.id, 'Diterima')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition cursor-pointer"
                          >
                            Setujui / Terima
                          </button>
                        ) : (
                          <button
                            onClick={() => onUpdateApplicantStatus(app.id, 'Menunggu Verifikasi')}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition cursor-pointer"
                          >
                            Kembalikan Status
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Buat Pengumuman Baru */}
        {activeTab === 'pengumuman' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="font-black text-lg text-slate-900">
                Terbitkan Pengumuman Resmi Baru
              </h3>
              <p className="text-xs text-slate-500">
                Pengumuman yang dikirim akan langsung tayang pada halaman beranda dan menu Pengumuman di website.
              </p>
            </div>

            {postSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Pengumuman berhasil diterbitkan dan langsung tampil di website resmi!</span>
              </div>
            )}

            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Judul Pengumuman <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jadwal Gladi Bersih Upacara Hari Sumpah Pemuda"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Pengumuman
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  >
                    <option value="Pengumuman Umum">Pengumuman Umum</option>
                    <option value="Akademik">Akademik / Ujian</option>
                    <option value="PPDB">PPDB 2026/2027</option>
                    <option value="Kegiatan">Kegiatan & Lomba</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ringkasan Singkat (Muncul di kartu pengumuman)
                </label>
                <input
                  type="text"
                  placeholder="Ringkasan 1-2 kalimat pengantar..."
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Isi Pengumuman Lengkap <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Ketik rincian informasi selengkapnya di sini..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isImportant"
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="isImportant" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Tandai sebagai Pengumuman Sangat Penting (Disorot di Ticker)
                </label>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Terbitkan Pengumuman Sekarang</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Rekap Presensi */}
        {activeTab === 'presensi' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-black text-lg text-slate-900">
                  Laporan Audit Kehadiran Siswa Hari Ini
                </h3>
                <p className="text-xs text-slate-500">
                  Rekapitulasi otomatis presensi online untuk evaluasi kehadiran mingguan.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                {attendanceRecords.length} Catatan Absensi
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {attendanceRecords.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-slate-900">{r.studentName}</strong>
                      <span className="text-[10px] bg-slate-200 font-bold px-1.5 py-0.5 rounded text-slate-700">
                        Kls {r.classGrade}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Waktu Input: {r.time} {r.notes && `• "${r.notes}"`}
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full font-bold text-xs ${
                      r.status === 'Hadir'
                        ? 'bg-emerald-100 text-emerald-800'
                        : r.status === 'Sakit'
                        ? 'bg-amber-100 text-amber-900'
                        : r.status === 'Izin'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
