import React, { useState } from 'react';
import {
    Megaphone,
  Calendar,
  User,
  Search,
  ChevronRight,
  X,
  AlertCircle,
  Share2,
  Printer,
  Sparkles
} from 'lucide-react';
import { ANNOUNCEMENTS_DATA, Announcement } from '../../data/schoolData';
import { formatDateIndonesian } from '../../utils/schoolLogic';

interface AnnouncementsViewProps {
  onOpenPpdb?: () => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({ onOpenPpdb }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const categories = ['Semua', 'PPDB', 'Akademik', 'Kegiatan', 'Pengumuman Umum'];

  const filtered = ANNOUNCEMENTS_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
            Informasi Terkini
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Papan Pengumuman Sekolah
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Pemberitahuan resmi, agenda kegiatan, jadwal ujian, dan informasi penting lainnya bagi orang tua, guru, serta peserta didik SDN Cinanggerang I.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari kata kunci pengumuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Announcements List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAnnouncement(item)}
              className={`bg-white rounded-3xl p-6 sm:p-7 border transition duration-200 shadow-sm hover:shadow-lg flex flex-col justify-between cursor-pointer group ${
                item.isImportant
                  ? 'border-emerald-300 ring-2 ring-emerald-500/20'
                  : 'border-slate-200/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                      item.category === 'PPDB'
                        ? 'bg-amber-100 text-amber-900'
                        : item.category === 'Akademik'
                        ? 'bg-blue-100 text-blue-900'
                        : item.category === 'Kegiatan'
                        ? 'bg-purple-100 text-purple-900'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {item.category}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDateIndonesian(item.date)}</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate">{item.author}</span>
                </span>
                <span className="font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition">
                  Baca Detail <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-700">Tidak ada pengumuman yang sesuai</h3>
            <p className="text-xs text-slate-500 mt-1">Coba pilih kategori lain atau reset kata kunci pencarian.</p>
          </div>
        )}
      </div>

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 animate-fadeIn space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {selectedAnnouncement.category}
              </span>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {selectedAnnouncement.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {formatDateIndonesian(selectedAnnouncement.date)}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedAnnouncement.author}
                </span>
              </div>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 text-xs sm:text-sm text-emerald-900 font-medium">
              {selectedAnnouncement.excerpt}
            </div>

            <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-3">
              <p>{selectedAnnouncement.content}</p>
            </div>

            {selectedAnnouncement.category === 'PPDB' && onOpenPpdb && (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between gap-3">
                <div className="text-xs text-amber-900">
                  <span className="font-bold block">Ingin mendaftar sebagai murid baru?</span>
                  Isi formulir online sekarang dalam hitungan menit.
                </div>
                <button
                  onClick={() => {
                    setSelectedAnnouncement(null);
                    onOpenPpdb();
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shrink-0 cursor-pointer"
                >
                  Buka Form PPDB
                </button>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Cetak
              </button>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
