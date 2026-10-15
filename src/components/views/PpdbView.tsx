import React, { useState } from 'react';
import {
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Printer,
  Download,
  Calendar,
  FileText,
  Phone,
  Home,
  School,
  Sparkles,
  QrCode,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { PPDBApplicant, INITIAL_PPDB_APPLICANTS } from '../../data/schoolData';
import { generateRegistrationCode } from '../../utils/schoolLogic';

interface PpdbViewProps {
  applicants: PPDBApplicant[];
  onAddApplicant: (newApplicant: PPDBApplicant) => void;
}

export const PpdbView: React.FC<PpdbViewProps> = ({
  applicants,
  onAddApplicant,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    nik: '',
    birthPlace: '',
    birthDate: '',
    gender: 'L' as 'L' | 'P',
    originSchool: '',
    parentName: '',
    parentPhone: '',
    address: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [latestRegistration, setLatestRegistration] = useState<PPDBApplicant | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (
      !formData.fullName.trim() ||
      !formData.nik.trim() ||
      !formData.birthPlace.trim() ||
      !formData.birthDate ||
      !formData.originSchool.trim() ||
      !formData.parentName.trim() ||
      !formData.parentPhone.trim() ||
      !formData.address.trim()
    ) {
      setErrorMsg('Mohon lengkapi seluruh kolom formulir wajib yang bertanda bintang (*).');
      return;
    }

    if (formData.nik.trim().length < 10) {
      setErrorMsg('Nomor Induk Kependudukan (NIK) calon siswa harus valid (minimal 10-16 digit angka).');
      return;
    }

    const regNumber = generateRegistrationCode('PPDB-CIN1', applicants.length + 1);
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;

    const newApplicant: PPDBApplicant = {
      id: `reg-${Date.now()}`,
      registrationNumber: regNumber,
      fullName: formData.fullName.trim(),
      nik: formData.nik.trim(),
      birthPlace: formData.birthPlace.trim(),
      birthDate: formData.birthDate,
      gender: formData.gender,
      originSchool: formData.originSchool.trim(),
      parentName: formData.parentName.trim(),
      parentPhone: formData.parentPhone.trim(),
      address: formData.address.trim(),
      status: 'Menunggu Verifikasi',
      submittedAt: formattedDate,
    };

    onAddApplicant(newApplicant);
    setLatestRegistration(newApplicant);

    // Reset form
    setFormData({
      fullName: '',
      nik: '',
      birthPlace: '',
      birthDate: '',
      gender: 'L',
      originSchool: '',
      parentName: '',
      parentPhone: '',
      address: '',
    });
  };

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Penerimaan Peserta Didik Baru 2026/2027
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            PPDB Online SDN Cinanggerang I
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Pendaftaran resmi calon peserta didik baru Kelas 1 secara transparan, mudah, dan bebas biaya pungutan (100% Gratis).
          </p>
        </div>

        {/* Info Persyaratan Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold text-amber-300">Syarat Usia</span>
              <h4 className="font-extrabold text-base">Minimal 6 Tahun</h4>
              <p className="text-xs text-emerald-100">Dihitung per 1 Juli 2026 (Prioritas 7 tahun ke atas).</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold text-amber-300">Dokumen Verifikasi</span>
              <h4 className="font-extrabold text-base">Akta, KK & KTP Ortu</h4>
              <p className="text-xs text-emerald-100">Bawa fotokopi dokumen saat verifikasi langsung di posko.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold text-amber-300">Biaya Pendaftaran</span>
              <h4 className="font-extrabold text-base text-amber-300">GRATIS 0 RUPIAH</h4>
              <p className="text-xs text-emerald-100">Seluruh proses PPDB didanai program BOS Nasional.</p>
            </div>
          </div>
        </div>

        {/* Modal / Card Sukses Pendaftaran */}
        {latestRegistration && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Pendaftaran Berhasil Dikirim!
                  </span>
                  <h3 className="font-black text-xl text-slate-900">
                    Kartu Tanda Bukti Pendaftaran Siswa Baru
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Nomor Registrasi:</span>
                <span className="font-mono font-black text-lg text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl inline-block border border-emerald-200">
                  {latestRegistration.registrationNumber}
                </span>
              </div>
            </div>

            {/* Printable Preview Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">Nama Calon Siswa:</span>
                  <strong className="text-slate-900 text-base">{latestRegistration.fullName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">NIK Calon Siswa:</span>
                  <strong className="text-slate-800 font-mono">{latestRegistration.nik}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Jenis Kelamin:</span>
                  <strong className="text-slate-800">{latestRegistration.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Tempat, Tanggal Lahir:</span>
                  <strong className="text-slate-800">{latestRegistration.birthPlace}, {latestRegistration.birthDate}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Asal Satuan TK/PAUD:</span>
                  <strong className="text-slate-800">{latestRegistration.originSchool}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Nama Orang Tua / Wali:</span>
                  <strong className="text-slate-800">{latestRegistration.parentName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">No. WhatsApp / HP:</span>
                  <strong className="text-slate-800">{latestRegistration.parentPhone}</strong>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-xs">Alamat Tinggal:</span>
                  <strong className="text-slate-800">{latestRegistration.address}</strong>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-500">
                  Waktu Submit: <strong>{latestRegistration.submittedAt}</strong> • Status: <strong className="text-amber-600">{latestRegistration.status}</strong>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4" /> Cetak Bukti Pendaftaran
                  </button>
                  <button
                    onClick={() => setLatestRegistration(null)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main 2-Column: Registration Form & Live Applicants List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Formulir PPDB Online */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Formulir Pendaftaran Siswa Baru
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Isi data calon peserta didik sesuai dokumen resmi Kartu Keluarga (KK) & Akta Kelahiran.
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Calon Siswa <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Muhammad Raihan Pratama"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  required
                />
              </div>

              {/* NIK & Jenis Kelamin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    NIK Calon Siswa (Sesuai KK) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="16 digit NIK"
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jenis Kelamin <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: 'L' })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        formData.gender === 'L'
                          ? 'bg-blue-50 border-blue-400 text-blue-700 ring-1 ring-blue-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      Laki-laki
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: 'P' })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        formData.gender === 'P'
                          ? 'bg-pink-50 border-pink-400 text-pink-700 ring-1 ring-pink-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      Perempuan
                    </button>
                  </div>
                </div>
              </div>

              {/* Tempat & Tanggal Lahir */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tempat Lahir <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Sumedang"
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tanggal Lahir <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              {/* Asal TK/PAUD */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Asal Sekolah (TK / PAUD / RA) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: TK PGRI Melati Pamulihan (atau tulis 'Tidak TK')"
                  value={formData.originSchool}
                  onChange={(e) => setFormData({ ...formData, originSchool: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  required
                />
              </div>

              {/* Nama Orang Tua & No HP/WA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Ayah / Ibu / Wali <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nama Orang Tua"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    No. WhatsApp / HP Orang Tua <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="0812xxxxxxxx"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                    required
                  />
                </div>
              </div>

              {/* Alamat Tinggal */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Lengkap Domisili <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Nama jalan/dusun, RT/RW, Desa, Kecamatan..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl text-sm shadow-md shadow-emerald-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-5 h-5 text-amber-300" />
                  <span>Kirim Formulir Pendaftaran Sekarang</span>
                </button>
              </div>
            </form>
          </div>

          {/* Kolom Kanan: Daftar Pendaftar Terkini & Layanan Posko */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Applicant Counter */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <School className="w-4 h-4 text-emerald-600" />
                  <span>Calon Siswa Terdaftar ({applicants.length})</span>
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Kuota: 56 Siswa
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {applicants.map((app) => (
                  <div
                    key={app.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1 hover:bg-emerald-50/50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-emerald-800 text-[11px]">
                        {app.registrationNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          app.status === 'Diterima'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      {app.fullName} ({app.gender})
                    </div>
                    <div className="text-slate-500">
                      Asal: {app.originSchool} • Wali: {app.parentName}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Posko Informasi Bantuan PPDB */}
            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200 text-xs text-amber-950 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                <Phone className="w-4 h-4 text-amber-700" />
                <span>Butuh Bantuan Pendaftaran?</span>
              </div>
              <p className="leading-relaxed">
                Orang tua dapat datang langsung ke posko PPDB di Sekretariat SDN Cinanggerang I pada jam kerja (Senin - Sabtu pukul 08.00 - 13.00 WIB) untuk dibantu pengisian form oleh panitia.
              </p>
              <div className="font-bold text-slate-900">
                Kontak Hotline PPDB: <a href="https://wa.me/6281224567890" target="_blank" rel="noreferrer" className="text-emerald-700 underline">0812-2456-7890 (Pak Cecep)</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
