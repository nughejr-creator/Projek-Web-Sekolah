import React, { useState } from 'react';
import {
  Image,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles
} from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../../data/schoolData';

export const GalleryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    'Semua',
    'Belajar di Kelas',
    'Upacara',
    'Ekstrakurikuler',
    'Prestasi & Lomba',
    'Lingkungan',
  ];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'Semua') return true;
    return item.category === selectedCategory;
  });

  const activePhoto = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  };

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
            Dokumentasi Sekolah
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Galeri Foto & Aktivitas Sekolah
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Merekam jejak keceriaan, semangat belajar di kelas, upacara kebangsaan, dan torehan prestasi peserta didik SDN Cinanggerang I.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveLightboxIndex(null);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-2xl transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                  <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow">
                  {item.category}
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Calendar className="w-3 h-3 text-emerald-600" />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition leading-snug line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <Image className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-700">Foto belum tersedia pada kategori ini</h3>
            <p className="text-xs text-slate-500 mt-1">Silakan pilih kategori Semua untuk melihat seluruh foto.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-700 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Big Photo Container with Prev/Next buttons */}
            <div className="relative bg-slate-950 flex items-center justify-center max-h-[65vh]">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/75 transition cursor-pointer"
                title="Foto Sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/75 transition cursor-pointer"
                title="Foto Selanjutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Photo Caption & Metadata */}
            <div className="p-6 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  {activePhoto.category}
                </span>
                <span>{activePhoto.date}</span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                {activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
