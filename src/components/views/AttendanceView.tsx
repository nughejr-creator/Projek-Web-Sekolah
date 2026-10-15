import React, { useState } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Users,
  Search,
  Check,
  HeartCrack,
  Info,
  Sparkles
} from 'lucide-react';
import { AttendanceRecord, calculateAttendanceSummary } from '../../utils/schoolLogic';
import { INITIAL_STUDENTS } from '../../data/schoolData';

interface AttendanceViewProps {
  attendanceRecords: AttendanceRecord[];
  onAddAttendance: (record: AttendanceRecord) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  attendanceRecords,
  onAddAttendance,
}) => {
  const [classGrade, setClassGrade] = useState<number>(1);
  const [studentName, setStudentName] = useState<string>('');
  const [customStudentName, setCustomStudentName] = useState<string>('');
  const [status, setStatus] = useState<'Hadir' | 'Sakit' | 'Izin' | 'Alpha'>('Hadir');
  const [notes, setNotes] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string>('');

  const summary = calculateAttendanceSummary(attendanceRecords);

  const studentsInClass = INITIAL_STUDENTS.filter((s) => s.classGrade === classGrade);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = studentName === 'other' ? customStudentName.trim() : studentName.trim();

    if (!finalName) {
      alert('Silakan pilih atau ketik nama siswa.');
      return;
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;
    const dateStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      studentName: finalName,
      classGrade,
      status,
      notes: notes.trim() || undefined,
      date: dateStr,
      time: timeStr,
    };

    onAddAttendance(newRecord);
    setSuccessToast(`Presensi ananda "${finalName}" berhasil disimpan!`);
    setStudentName('');
    setCustomStudentName('');
    setNotes('');

    setTimeout(() => {
      setSuccessToast('');
    }, 4000);
  };

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
            Presensi Siswa Harian
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Absen Online SDN Cinanggerang I
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Form pencatatan kehadiran harian siswa secara mandiri dan rekapitulasi real-time untuk pemantauan dewan guru dan orang tua.
          </p>
        </div>

        {/* Live Attendance Stats Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 sm:gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-semibold block">Total Tercatat</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{summary.total}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Siswa Hari Ini</span>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-semibold block">Hadir</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">{summary.hadir}</span>
            <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">{summary.hadirPercentage}% Kehadiran</span>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-semibold block">Sakit</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-500">{summary.sakit}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Kondisi Kurang Fit</span>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-semibold block">Izin</span>
            <span className="text-2xl sm:text-3xl font-black text-blue-500">{summary.izin}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Pemberitahuan Ortu</span>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm text-center col-span-2 sm:col-span-1">
            <span className="text-xs text-slate-500 font-semibold block">Alpha / Tanpa Ket.</span>
            <span className="text-2xl sm:text-3xl font-black text-rose-500">{summary.alpha}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Perlu Dikonfirmasi</span>
          </div>
        </div>

        {/* 2-Column: Attendance Form & Live Attendance Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Absensi */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Formulir Presensi Harian Siswa
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Silakan pilih kelas dan konfirmasi kehadiran ananda sebelum jam belajar dimulai.
              </p>
            </div>

            {successToast && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{successToast}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pilih Kelas */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tingkat Kelas <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => {
                        setClassGrade(grade);
                        setStudentName('');
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        classGrade === grade
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Kelas {grade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nama Siswa Dropdown / Ketik */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Siswa Kelas {classGrade} <span className="text-rose-500">*</span>
                </label>
                <select
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  required
                >
                  <option value="">-- Pilih Nama Siswa dari Daftar Kelas {classGrade} --</option>
                  {studentsInClass.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.nisn})
                    </option>
                  ))}
                  <option value="other">+ Ketik Nama Siswa Lainnya...</option>
                </select>
              </div>

              {studentName === 'other' && (
                <div className="animate-fadeIn">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ketik Nama Lengkap Siswa
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap siswa..."
                    value={customStudentName}
                    onChange={(e) => setCustomStudentName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                    required
                  />
                </div>
              )}

              {/* Status Kehadiran Radio Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Keterangan Kehadiran <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus('Hadir')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      status === 'Hadir'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" /> Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('Sakit')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      status === 'Sakit'
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <HeartCrack className="w-3.5 h-3.5" /> Sakit
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('Izin')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      status === 'Izin'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <Info className="w-3.5 h-3.5" /> Izin
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('Alpha')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      status === 'Alpha'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Alpha
                  </button>
                </div>
              </div>

              {/* Catatan / Alasan jika Sakit/Izin */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Tambahan / Alasan (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Sakit demam flu / ada keperluan keluarga penting"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-sm shadow-md shadow-emerald-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ClipboardCheck className="w-4 h-4 text-amber-300" />
                  <span>Kirim Presensi Sekarang</span>
                </button>
              </div>
            </form>
          </div>

          {/* Tabel Rekapitulasi Presensi Terkini */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Log Presensi Real-Time Hari Ini
                </h3>
                <p className="text-xs text-slate-400">Pembaruan langsung saat siswa mengisi absensi</p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                Live Data
              </span>
            </div>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {attendanceRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs hover:bg-emerald-50/50 transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 text-sm">{rec.studentName}</strong>
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded">
                        Kls {rec.classGrade}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                      <span><Clock className="w-3 h-3 inline mr-1 text-slate-400" />{rec.time}</span>
                      {rec.notes && <span className="italic text-slate-600">"{rec.notes}"</span>}
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full font-bold text-[11px] shrink-0 ${
                      rec.status === 'Hadir'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.status === 'Sakit'
                        ? 'bg-amber-100 text-amber-900'
                        : rec.status === 'Izin'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    {rec.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
