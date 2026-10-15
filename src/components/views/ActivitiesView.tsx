import React, { useState } from 'react';
import {
  Tent,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  CheckCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { EXTRACURRICULARS_DATA, WEEKLY_SCHEDULE } from '../../data/schoolData';

export const ActivitiesView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Semua');

  const days = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const filteredSchedule = selectedDay === 'Semua'
    ? WEEKLY_SCHEDULE
    : WEEKLY_SCHEDULE.filter((item) => item.day === selectedDay);

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
            Bakat, Minat & Karakter
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Kegiatan & Ekstrakurikuler Sekolah
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Mengembangkan potensi kecerdasan majemuk, kebugaran fisik, apresiasi seni Sunda, dan jiwa kepemimpinan anak di luar jam tatap muka kelas.
          </p>
        </div>

        {/* Extracurricular Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Pilihan Ekstrakurikuler Unggulan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Setiap siswa didorong memilih minimal 1 kegiatan ekstrakurikuler pilihan di samping Pramuka wajib.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXTRACURRICULARS_DATA.map((extra) => (
              <div
                key={extra.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={extra.photoUrl}
                      alt={extra.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-700/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-xl shadow">
                      Aktif Berprestasi
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-emerald-700 transition">
                      {extra.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {extra.description}
                    </p>

                    <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate"><strong>Pembina:</strong> {extra.coach}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><strong>Jadwal:</strong> {extra.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><strong>Tempat:</strong> {extra.location}</span>
                      </div>
                    </div>

                    {extra.achievements.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                          <Trophy className="w-3.5 h-3.5 text-amber-500" /> Prestasi Terkini:
                        </span>
                        <ul className="space-y-1">
                          {extra.achievements.map((ach, idx) => (
                            <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                              <span className="text-amber-500 font-bold shrink-0">•</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Terbuka untuk Pendaftaran Siswa</span>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jadwal Mingguan Sekolah Interaktif */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-1">
                <Calendar className="w-3.5 h-3.5" /> Kalender Aktivitas
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Jadwal Kegiatan & Pembiasaan Mingguan
              </h2>
            </div>

            {/* Filter Hari */}
            <div className="flex flex-wrap gap-1">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                    selectedDay === day
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredSchedule.map((sched, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition flex items-start gap-4"
              >
                <div className="w-20 shrink-0 text-center bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{sched.day}</span>
                  <span className="text-xs font-black text-emerald-700">{sched.time}</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {sched.activity}
                  </h4>
                  <span className="text-[11px] text-slate-500 mt-1 inline-block">
                    SDN Cinanggerang I Pamulihan
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
