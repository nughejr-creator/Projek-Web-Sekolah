import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  BookOpen,
  Award,
  Quote,
  X,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';
import { TEACHERS_DATA, Teacher } from '../../data/schoolData';

interface TeachersViewProps {
  teachers?: Teacher[];
  onOpenSyncModal?: () => void;
}

export const TeachersView: React.FC<TeachersViewProps> = ({
  teachers = TEACHERS_DATA,
  onOpenSyncModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'kelas' | 'mapel' | 'staf'>('all');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subjects.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (categoryFilter === 'kelas') {
      return teacher.role.toLowerCase().includes('wali kelas');
    }
    if (categoryFilter === 'mapel') {
      return (
        teacher.role.toLowerCase().includes('guru') &&
        !teacher.role.toLowerCase().includes('wali kelas')
      );
    }
    if (categoryFilter === 'staf') {
      return (
        teacher.role.toLowerCase().includes('administrasi') ||
        teacher.role.toLowerCase().includes('pustakawati') ||
        teacher.role.toLowerCase().includes('kepala')
      );
    }
    return true;
  });

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
            Pendidik & Tenaga Ahli
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Dewan Guru & Tenaga Kependidikan
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Mengenal para guru berdedikasi tinggi yang mendampingi proses belajar, tumbuh kembang, dan penanaman budi pekerti putra-putri Anda.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua ({TEACHERS_DATA.length})
            </button>
            <button
              onClick={() => setCategoryFilter('kelas')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                categoryFilter === 'kelas'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Guru Kelas (6)
            </button>
            <button
              onClick={() => setCategoryFilter('mapel')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                categoryFilter === 'mapel'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Guru Mapel Khusus (3)
            </button>
            <button
              onClick={() => setCategoryFilter('staf')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                categoryFilter === 'staf'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pimpinan & Staf (3)
            </button>
          </div>

          {/* Sync Button & Search Input */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            {onOpenSyncModal && (
              <button
                onClick={onOpenSyncModal}
                className="px-3.5 py-2 text-xs font-bold rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                title="Tarik data guru atau profil langsung dari Google Spreadsheet / Drive"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Sinkron Google Sheets</span>
              </button>
            )}

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama guru..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => setSelectedTeacher(teacher)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={teacher.photoUrl}
                    alt={teacher.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-emerald-800 shadow">
                    {teacher.badge}
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                    {teacher.role}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 mt-2 leading-snug group-hover:text-emerald-700 transition">
                    {teacher.name}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    NIP: {teacher.nip}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {teacher.subjects}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Lihat Profil Lengkap</span>
                  <span className="group-hover:translate-x-1 transition">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Tidak ada data guru yang cocok</h3>
            <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian Anda.</p>
          </div>
        )}
      </div>

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="relative h-48 bg-gradient-to-r from-emerald-800 to-teal-900 p-6 flex items-end">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 translate-y-8">
                <img
                  src={selectedTeacher.photoUrl}
                  alt={selectedTeacher.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              </div>
            </div>

            <div className="pt-12 p-6 sm:p-8 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  {selectedTeacher.role}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2">
                  {selectedTeacher.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  NIP. {selectedTeacher.nip}
                </p>
              </div>

              <div className="space-y-2 text-xs sm:text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500">Pendidikan Terakhir:</span>
                  <span className="font-bold text-slate-800 text-right">{selectedTeacher.education}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mata Pelajaran:</span>
                  <span className="font-bold text-emerald-700 text-right">{selectedTeacher.subjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Predikat / Peran:</span>
                  <span className="font-bold text-slate-800 text-right">{selectedTeacher.badge}</span>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1 mb-1">
                  <Quote className="w-3.5 h-3.5" /> Moto Pendidik
                </span>
                <p className="text-xs sm:text-sm text-slate-700 italic">
                  "{selectedTeacher.quote}"
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Tutup Informasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
