import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle,
  UserCheck
} from 'lucide-react';
import { INITIAL_STUDENTS, SCHOOL_INFO } from '../../data/schoolData';
import { filterStudents, Student } from '../../utils/schoolLogic';

export const StudentsView: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentsList] = useState<Student[]>(INITIAL_STUDENTS);

  const filtered = filterStudents(studentsList, searchQuery, selectedGrade);

  const maleCount = filtered.filter((s) => s.gender === 'L').length;
  const femaleCount = filtered.filter((s) => s.gender === 'P').length;

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
            Data Peserta Didik
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Direktori Siswa SDN Cinanggerang I
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Informasi daftar siswa terdaftar pada semester berjalan Tahun Ajaran 2026/2027 berbasis sistem data pokok pendidikan (Dapodik).
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-semibold block">Total Ditampilkan</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">{filtered.length}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Siswa Terdata</span>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-semibold block">Laki-Laki</span>
            <span className="text-2xl sm:text-3xl font-black text-blue-600">{maleCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Siswa Putra</span>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-semibold block">Perempuan</span>
            <span className="text-2xl sm:text-3xl font-black text-pink-600">{femaleCount}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Siswa Putri</span>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-semibold block">Total Keseluruhan</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{SCHOOL_INFO.totalStudents}</span>
            <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">100% Aktif Belajar</span>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Class Grade Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setSelectedGrade('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                selectedGrade === 'all'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Kelas
            </button>
            {[1, 2, 3, 4, 5, 6].map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
                  selectedGrade === grade
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Kelas {grade}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama atau NISN siswa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px] tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">No</th>
                  <th className="py-3.5 px-4 sm:px-6">NISN</th>
                  <th className="py-3.5 px-4 sm:px-6">Nama Lengkap Siswa</th>
                  <th className="py-3.5 px-4 sm:px-6">Kelas</th>
                  <th className="py-3.5 px-4 sm:px-6">Jenis Kelamin</th>
                  <th className="py-3.5 px-4 sm:px-6">Nama Orang Tua / Wali</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((student, idx) => (
                  <tr key={student.id} className="hover:bg-emerald-50/40 transition">
                    <td className="py-3 px-4 sm:px-6 font-semibold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 sm:px-6 font-mono font-bold text-emerald-800">
                      {student.nisn}
                    </td>
                    <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">
                      {student.name}
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">
                        Kelas {student.classGrade}
                      </span>
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      {student.gender === 'L' ? (
                        <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs font-semibold">
                          Laki-laki
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-pink-700 bg-pink-50 px-2 py-0.5 rounded text-xs font-semibold">
                          Perempuan
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-slate-600">
                      {student.parentName}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-center">
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full text-[11px] font-bold">
                        <UserCheck className="w-3 h-3" /> {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 p-6">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700">Tidak ada nama siswa yang cocok</p>
              <p className="text-xs text-slate-500 mt-1">Gunakan kata kunci atau pilih kelas yang berbeda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
