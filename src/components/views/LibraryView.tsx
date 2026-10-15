import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Download,
  Eye,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  BookMarked
} from 'lucide-react';
import { LIBRARY_BOOKS, LibraryBook } from '../../data/schoolData';

export const LibraryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingBook, setReadingBook] = useState<LibraryBook | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const categories = [
    'Semua',
    'Kurikulum Merdeka',
    'Buku Tematik',
    'Cerita Rakyat',
    'Ensiklopedia',
    'Komik Edukasi',
  ];

  const filteredBooks = LIBRARY_BOOKS.filter((book) => {
    const matchCat = selectedCategory === 'Semua' || book.category === selectedCategory;
    const matchSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenReader = (book: LibraryBook) => {
    setReadingBook(book);
    setCurrentPage(0);
  };

  const handleDownloadSimulation = (title: string) => {
    alert(`E-Book "${title}" berhasil diunduh ke perangkat Anda untuk dibaca secara luring!`);
  };

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
            Gerakan Literasi Sekolah
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Perpustakaan Digital "Pelangi Ilmu"
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Katalog buku pelajaran digital, cerita dongeng fabel Sunda, ensiklopedia sains, dan komik edukasi yang dapat dibaca bebas oleh siswa di mana saja.
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
              placeholder="Cari judul buku atau penulis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                    {book.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow">
                    {book.grade}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                    {book.title}
                  </h3>
                  <div className="text-xs text-slate-400">
                    Karya: <strong>{book.author}</strong> • {book.pages} Halaman
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                    {book.synopsis}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenReader(book)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> Baca Buku
                  </button>
                  <button
                    onClick={() => handleDownloadSimulation(book.title)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Unduh
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-700">Buku tidak ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1">Coba cari dengan kata kunci lain atau pilih kategori Semua.</p>
          </div>
        )}
      </div>

      {/* Interactive E-Book Reader Modal */}
      {readingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Pembaca E-Book Interaktif
                </span>
                <h3 className="font-extrabold text-sm sm:text-base truncate max-w-md">
                  {readingBook.title}
                </h3>
              </div>
              <button
                onClick={() => setReadingBook(null)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reading Content Pane */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-4 bg-amber-50/30">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
                <span>Penulis: <strong>{readingBook.author}</strong></span>
                <span>Lembar Bacaan {currentPage + 1} dari {readingBook.sampleContent.length}</span>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-amber-200/70 shadow-inner min-h-[220px] flex flex-col justify-center">
                <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed whitespace-pre-line">
                  {readingBook.sampleContent[currentPage]}
                </p>
              </div>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <span>Ingin membaca seluruh isi buku ini di rumah?</span>
                <button
                  onClick={() => handleDownloadSimulation(readingBook.title)}
                  className="font-bold underline text-emerald-800 hover:text-emerald-950"
                >
                  Unduh Salinan PDF
                </button>
              </div>
            </div>

            {/* Modal Footer with Page Navigation */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="px-4 py-2 rounded-xl border border-slate-300 disabled:opacity-40 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Halaman Sebelumnya
              </button>

              <span className="text-xs font-bold text-slate-600">
                {currentPage + 1} / {readingBook.sampleContent.length}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(readingBook.sampleContent.length - 1, prev + 1))}
                disabled={currentPage === readingBook.sampleContent.length - 1}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                Halaman Selanjutnya <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
