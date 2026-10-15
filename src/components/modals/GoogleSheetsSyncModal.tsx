import React, { useState } from 'react';
import {
  FileSpreadsheet,
  X,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  HelpCircle,
  Database,
  ArrowRight,
  UploadCloud,
  Users,
  Image,
  Copy,
  Check,
  GraduationCap
} from 'lucide-react';
import {
  convertGoogleDriveUrl,
  fetchGoogleSheetCsv,
  parseCsvText,
  parseTeachersFromCsv,
  SAMPLE_TEACHERS_CSV,
  SAMPLE_VISION_MISSION_CSV
} from '../../utils/googleSheetsSync';
import { Teacher } from '../../data/schoolData';

interface GoogleSheetsSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateSchoolProfile: (profile: {
    vision?: string;
    missions?: string[];
    logoUrl?: string;
  }) => void;
  onUpdateTeachers?: (teachers: Teacher[]) => void;
}

export const GoogleSheetsSyncModal: React.FC<GoogleSheetsSyncModalProps> = ({
  isOpen,
  onClose,
  onUpdateSchoolProfile,
  onUpdateTeachers,
}) => {
  const [syncType, setSyncType] = useState<'guru' | 'profil'>('guru');
  const [sheetUrl, setSheetUrl] = useState('');
  const [csvRawText, setCsvRawText] = useState(SAMPLE_TEACHERS_CSV);
  const [activeMode, setActiveMode] = useState<'url' | 'paste'>('paste');
  const [loading, setLoading] = useState(false);
  const [previewTeachers, setPreviewTeachers] = useState<Teacher[] | null>(null);
  const [previewProfile, setPreviewProfile] = useState<{ vision?: string; missions?: string[]; logoUrl?: string } | null>(null);
  const [previewRawRows, setPreviewRawRows] = useState<string[][] | null>(null);
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  if (!isOpen) return null;

  const handleSelectSyncType = (type: 'guru' | 'profil') => {
    setSyncType(type);
    setErrorMsg('');
    setSyncStatus('');
    setPreviewTeachers(null);
    setPreviewProfile(null);
    setPreviewRawRows(null);
    if (type === 'guru') {
      setCsvRawText(SAMPLE_TEACHERS_CSV);
    } else {
      setCsvRawText(SAMPLE_VISION_MISSION_CSV);
    }
  };

  const handleProcessCsv = (csvText: string) => {
    setErrorMsg('');
    try {
      const rows = parseCsvText(csvText);
      if (rows.length < 2) {
        setErrorMsg('Data tabel kosong atau format tidak sesuai. Minimal harus ada baris judul kolom dan minimal 1 baris data.');
        return;
      }
      setPreviewRawRows(rows);

      if (syncType === 'guru') {
        const teachers = parseTeachersFromCsv(rows);
        setPreviewTeachers(teachers);
        setPreviewProfile(null);
        setSyncStatus(`Berhasil membaca ${teachers.length} data guru beserta foto Google Drive.`);
      } else {
        const headers = rows[0].map((h) => h.toLowerCase());
        const dataRows = rows.slice(1);

        const visiIdx = headers.findIndex((h) => h.includes('visi'));
        const misiIdx = headers.findIndex((h) => h.includes('misi'));
        const logoIdx = headers.findIndex((h) => h.includes('logo'));

        let extractedVision: string | undefined;
        if (visiIdx !== -1) {
          for (const row of dataRows) {
            if (row[visiIdx]) {
              extractedVision = row[visiIdx];
              break;
            }
          }
        }

        const extractedMissions: string[] = [];
        if (misiIdx !== -1) {
          for (const row of dataRows) {
            if (row[misiIdx]) {
              extractedMissions.push(row[misiIdx]);
            }
          }
        }

        let extractedLogo: string | undefined;
        if (logoIdx !== -1) {
          for (const row of dataRows) {
            if (row[logoIdx]) {
              extractedLogo = convertGoogleDriveUrl(row[logoIdx]);
              break;
            }
          }
        }

        setPreviewProfile({
          vision: extractedVision,
          missions: extractedMissions,
          logoUrl: extractedLogo
        });
        setPreviewTeachers(null);
        setSyncStatus('Berhasil membaca data Visi, Misi, dan Logo.');
      }
    } catch (err: any) {
      setErrorMsg(`Gagal memproses data CSV: ${err.message}`);
    }
  };

  const handleFetchFromUrl = async () => {
    if (!sheetUrl.trim()) {
      setErrorMsg('Silakan masukkan tautan Google Spreadsheet Anda terlebih dahulu.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSyncStatus('');

    try {
      const text = await fetchGoogleSheetCsv(sheetUrl);
      setCsvRawText(text);
      handleProcessCsv(text);
    } catch (err: any) {
      setErrorMsg(`${err.message} Alternatif mudah: salin seluruh baris tabel di Google Sheets, lalu tempel di tab "Tempel Teks CSV".`);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyData = () => {
    if (syncType === 'guru') {
      if (!previewTeachers || previewTeachers.length === 0) {
        setErrorMsg('Belum ada data guru yang siap diterapkan.');
        return;
      }
      if (onUpdateTeachers) {
        onUpdateTeachers(previewTeachers);
        setSyncStatus(`Sukses! ${previewTeachers.length} data guru dari Google Sheet berhasil diperbarui di halaman Daftar Guru & Website!`);
      }
    } else {
      if (!previewProfile) {
        setErrorMsg('Belum ada data profil yang siap diterapkan.');
        return;
      }
      onUpdateSchoolProfile({
        vision: previewProfile.vision,
        missions: previewProfile.missions,
        logoUrl: previewProfile.logoUrl,
      });
      setSyncStatus('Sukses! Data Visi, Misi & Logo dari Google Sheet/Drive berhasil diperbarui ke seluruh website!');
    }
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(csvRawText);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <FileSpreadsheet className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full inline-block mb-1">
                Fitur Live Cloud Sync
              </span>
              <h3 className="font-extrabold text-base sm:text-xl">
                Ambil Data Guru dari Google Sheet & Google Drive
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-6 flex-1 overflow-y-auto">
          {/* Explanation Alert */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-2">
            <div className="font-extrabold flex items-center gap-2 text-emerald-900">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Jawaban: Ya, Sangat Bisa! Website SDN Cinanggerang I Mendukung Integrasi Ini.</span>
            </div>
            <p className="leading-relaxed text-slate-700">
              Anda bisa mengambil <strong>Daftar Guru</strong> maupun <strong>Visi, Misi & Logo Sekolah</strong> langsung dari tautan Google Spreadsheet di Google Drive. Bahkan, tautan foto guru dari Google Drive (seperti <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-emerald-700">drive.google.com/file/d/...</code>) otomatis dikonversi menjadi gambar tampilan langsung tanpa perlu download manual!
            </p>
          </div>

          {/* Sync Type Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">Pilih Data yang Ingin Diambil:</span>
            <button
              onClick={() => handleSelectSyncType('guru')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer ${
                syncType === 'guru'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Daftar Guru & Foto Drive</span>
            </button>
            <button
              onClick={() => handleSelectSyncType('profil')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer ${
                syncType === 'profil'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Visi, Misi & Logo Sekolah</span>
            </button>
          </div>

          {/* How to setup steps */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2.5">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>Format Kolom yang Disarankan di Google Sheets ({syncType === 'guru' ? 'Data Guru' : 'Visi Misi'}):</span>
            </h4>
            {syncType === 'guru' ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 font-mono">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-700 font-bold">Kolom A:</span> Nama Guru
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-700 font-bold">Kolom B:</span> NIP
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-700 font-bold">Kolom C:</span> Jabatan / Peran
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-700 font-bold">Kolom D:</span> Mata Pelajaran
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-700 font-bold">Kolom E:</span> Pendidikan
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-700 font-bold">Kolom F:</span> Link Foto Drive
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-700 font-bold">Kolom G:</span> Moto Pendidik
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-700 font-bold">Kolom H:</span> Predikat / Badge
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 font-mono">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-700 font-bold">Kolom A:</span> Visi
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-700 font-bold">Kolom B:</span> Misi (1 baris per butir)
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-emerald-700 font-bold">Kolom C:</span> Logo (Link Google Drive)
                </div>
              </div>
            )}
            <p className="text-[11px] text-slate-500 pt-1">
              Catatan: Pastikan file foto di Google Drive disetel ke: <strong>Bagikan (Share) &rarr; Siapa saja yang memiliki tautan &rarr; Pelihat (Viewer)</strong>.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveMode('paste')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeMode === 'paste'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              1. Tempel Teks CSV / Muat Data Contoh
            </button>
            <button
              onClick={() => setActiveMode('url')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeMode === 'url'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              2. Ambil dari Tautan Google Spreadsheet
            </button>
          </div>

          {/* Mode 1: URL Fetch */}
          {activeMode === 'url' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Tautan Google Spreadsheet Anda:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="https://docs.google.com/spreadsheets/d/1ABC.../edit#gid=0"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={handleFetchFromUrl}
                  disabled={loading}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Ambil Data Spreadsheet</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Langkah di Google Sheet: Klik <strong>File &rarr; Bagikan &rarr; Publikasikan ke web &rarr; Pilih format CSV &rarr; Publikasikan</strong> (atau cukup bagikan link Viewer).
              </p>
            </div>
          )}

          {/* Mode 2: Raw Text / CSV Paste */}
          {activeMode === 'paste' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="block text-xs font-bold text-slate-700">
                  Data CSV dari Google Sheets ({syncType === 'guru' ? 'Daftar Guru' : 'Visi Misi'}):
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyTemplate}
                    className="text-xs text-slate-600 hover:text-emerald-700 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTemplate ? 'Tersalin' : 'Salin Format'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProcessCsv(csvRawText)}
                    className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Periksa & Pratinjau
                  </button>
                </div>
              </div>
              <textarea
                rows={6}
                value={csvRawText}
                onChange={(e) => setCsvRawText(e.target.value)}
                placeholder="Tempelkan baris CSV dari Google Sheet di sini..."
                className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-300 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleProcessCsv(csvRawText)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Database className="w-3.5 h-3.5 text-amber-300" />
                  <span>Muat & Proses Data Tabel</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (syncType === 'guru') {
                      setCsvRawText(SAMPLE_TEACHERS_CSV);
                      handleProcessCsv(SAMPLE_TEACHERS_CSV);
                    } else {
                      setCsvRawText(SAMPLE_VISION_MISSION_CSV);
                      handleProcessCsv(SAMPLE_VISION_MISSION_CSV);
                    }
                  }}
                  className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Isi Contoh Data Resmi SDN Cinanggerang I
                </button>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {syncStatus && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>{syncStatus}</span>
            </div>
          )}

          {/* Preview: Teachers Cards */}
          {syncType === 'guru' && previewTeachers && previewTeachers.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span>Pratinjau Hasil Sinkronisasi ({previewTeachers.length} Guru Siap Diterapkan)</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Foto dari Google Drive telah otomatis dikonversi menjadi gambar siap tayang:
                  </p>
                </div>
                <button
                  onClick={handleApplyData}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Terapkan Guru ke Halaman Website</span>
                </button>
              </div>

              {/* Mini Teacher Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
                {previewTeachers.map((teacher, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex gap-3 items-center">
                    <img
                      src={teacher.photoUrl}
                      alt={teacher.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                      onError={(e) => {
                        // Fallback image if drive link is private
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=200&auto=format&fit=crop';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                        {teacher.role}
                      </span>
                      <h5 className="font-extrabold text-xs text-slate-900 truncate mt-1">
                        {teacher.name}
                      </h5>
                      <p className="text-[10px] text-slate-500 truncate">
                        {teacher.subjects}
                      </p>
                      <p className="text-[9px] text-slate-400 font-mono">
                        NIP: {teacher.nip}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preview: Vision, Mission & Logo */}
          {syncType === 'profil' && previewProfile && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Pratinjau Visi, Misi & Logo Sekolah</span>
                </h4>
                <button
                  onClick={handleApplyData}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Terapkan Profil ke Website</span>
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                {previewProfile.logoUrl && (
                  <div className="flex items-center gap-3">
                    <img
                      src={previewProfile.logoUrl}
                      alt="Logo Sekolah"
                      className="w-12 h-12 object-contain rounded-xl border bg-white p-1"
                    />
                    <div>
                      <span className="text-[11px] font-bold text-slate-500">Logo Sekolah (Google Drive):</span>
                      <p className="text-xs font-mono text-emerald-700 truncate max-w-md">{previewProfile.logoUrl}</p>
                    </div>
                  </div>
                )}
                {previewProfile.vision && (
                  <div>
                    <span className="text-xs font-bold text-slate-600">Visi Sekolah:</span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200 mt-1">
                      "{previewProfile.vision}"
                    </p>
                  </div>
                )}
                {previewProfile.missions && previewProfile.missions.length > 0 && (
                  <div>
                    <span className="text-xs font-bold text-slate-600">Misi Sekolah ({previewProfile.missions.length} Butir):</span>
                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 mt-1 bg-white p-3 rounded-xl border border-slate-200">
                      {previewProfile.missions.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 text-center sm:text-left">
            Mendukung tautan Google Drive & Google Sheets secara langsung dengan konversi otomatis.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer transition"
            >
              Tutup Jendela
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
