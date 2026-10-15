import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  FileCode,
  Laptop,
  Globe,
  UploadCloud,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Terminal,
  ShieldCheck
} from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenExportModal: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenExportModal,
}) => {
  const [activeDeployPlatform, setActiveDeployPlatform] = useState<'netlify' | 'vercel' | 'github'>('netlify');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                Panduan Praktis Pemula
              </span>
              <h3 className="font-extrabold text-base sm:text-lg">
                Tutorial Simpan, Uji Lokal & Deploy Gratis Online
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1 overflow-y-auto">
          {/* TAHAP 1: CARA MENYIMPAN KODE KE FILE .HTML */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
                Cara Menyimpan Kode ke dalam File (.html)
              </h4>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2.5">
              <p>
                <strong>Langkah A (Otomatis & Paling Cepat):</strong> Klik tombol <button onClick={() => { onClose(); onOpenExportModal(); }} className="text-emerald-700 font-bold underline cursor-pointer">"Unduh Single-File HTML"</button> di bagian navigasi atas. Browser Anda akan langsung mengunduh berkas <code>sdn-cinanggerang-1.html</code> atau ubah namanya menjadi <code>index.html</code>.
              </p>
              <p>
                <strong>Langkah B (Manual melalui Teks Editor):</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 pl-2 text-slate-600">
                <li>Buka aplikasi teks editor di komputer Anda (seperti <em>Visual Studio Code</em>, <em>Notepad++</em>, atau <em>Notepad</em> bawaan Windows).</li>
                <li>Buat file baru, lalu salin dan tempelkan (Paste) seluruh kode program HTML yang disediakan.</li>
                <li>Klik menu <strong>File &rarr; Save As...</strong></li>
                <li>Beri nama file: <code className="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold">index.html</code> (Pastikan format ekstensi berakhiran <code>.html</code>, bukan <code>.txt</code>).</li>
                <li>Simpan file tersebut ke dalam folder baru di komputer Anda, misalnya di folder: <code>C:\Website-SDN-Cinanggerang</code>.</li>
              </ol>
            </div>
          </div>

          {/* TAHAP 2: MENJALANKAN & MENGUJI SECARA LOKAL */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
                Cara Menjalankan dan Menguji di Komputer / Laptop Lokal
              </h4>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Metode Langsung (Klik Ganda):</strong> Cari file <code>index.html</code> di File Explorer komputer Anda, lalu klik dua kali (Double Click). File akan otomatis terbuka di browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dsb.) tanpa membutuhkan koneksi server khusus!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Uji Tampilan Responsif Ponsel (Mobile View):</strong> Tekan tombol <kbd className="bg-slate-200 px-1.5 py-0.5 rounded font-mono">F12</kbd> pada keyboard atau klik kanan &rarr; pilih <em>Inspect Element</em> &rarr; klik ikon ponsel (Toggle Device Toolbar) untuk menguji tampilan di layar HP.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* TAHAP 3: CARA DEPLOY GRATIS KE NETLIFY, VERCEL, ATAU GITHUB PAGES */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
                Cara Melakukan Deploy Online Gratis (Siap Diakses Publik)
              </h4>
            </div>

            {/* Platform Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveDeployPlatform('netlify')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  activeDeployPlatform === 'netlify'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                1. Netlify (Drop & Play)
              </button>
              <button
                type="button"
                onClick={() => setActiveDeployPlatform('vercel')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  activeDeployPlatform === 'vercel'
                    ? 'bg-slate-900 text-white border-slate-900 shadow'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                2. Vercel Hosting
              </button>
              <button
                type="button"
                onClick={() => setActiveDeployPlatform('github')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  activeDeployPlatform === 'github'
                    ? 'bg-purple-700 text-white border-purple-700 shadow'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                3. GitHub Pages
              </button>
            </div>

            {/* Option Details */}
            {activeDeployPlatform === 'netlify' && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-slate-800 space-y-2.5">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Pilihan Paling Direkomendasikan: Netlify Drop (Hanya 1 Menit!)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700 pl-1">
                  <li>Buka website <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline inline-flex items-center gap-0.5">app.netlify.com/drop <ExternalLink className="w-3 h-3" /></a> di browser Anda.</li>
                  <li>Buat sebuah folder di komputer bernama misalnya <code>sdn-cinanggerang</code>, lalu letakkan file <code>index.html</code> di dalam folder tersebut.</li>
                  <li>Tarik (Drag & Drop) folder tersebut ke kotak unggahan di halaman Netlify Drop.</li>
                  <li>Selesai! Dalam hitungan 5 detik website langsung online dengan URL live berkeamanan SSL HTTPS (contoh: <code>https://sdn-cinanggerang-1.netlify.app</code>). Anda juga bisa menyambungkan domain resmi sekolah (seperti <code>.sch.id</code>).</li>
                </ol>
              </div>
            )}

            {activeDeployPlatform === 'vercel' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Laptop className="w-4 h-4 text-slate-700" />
                  <span>Deploy Menggunakan Vercel:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700 pl-1">
                  <li>Kunjungi situs <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold underline inline-flex items-center gap-0.5">vercel.com <ExternalLink className="w-3 h-3" /></a> dan masuk/daftar menggunakan akun GitHub atau Google.</li>
                  <li>Klik tombol <strong>"Add New... &rarr; Project"</strong>.</li>
                  <li>Pilih repository GitHub proyek Anda, atau jalankan perintah CLI: <code>npx vercel</code> di folder proyek melalui terminal command prompt.</li>
                  <li>Klik <strong>Deploy</strong>. Vercel akan otomatis meng-online-kan website dengan kecepatan CDN global (contoh: <code>https://sdn-cinanggerang.vercel.app</code>).</li>
                </ol>
              </div>
            )}

            {activeDeployPlatform === 'github' && (
              <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-xs sm:text-sm text-slate-800 space-y-2.5">
                <div className="font-bold text-purple-900 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-purple-700" />
                  <span>Deploy Menggunakan GitHub Pages (Gratis Selamanya):</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700 pl-1">
                  <li>Buka <a href="https://github.com" target="_blank" rel="noreferrer" className="text-purple-700 font-bold underline inline-flex items-center gap-0.5">github.com <ExternalLink className="w-3 h-3" /></a> dan buat repository baru bernama <code>sdn-cinanggerang-1</code>.</li>
                  <li>Unggah (Upload) file <code>index.html</code> ke branch utama (<code>main</code>).</li>
                  <li>Buka tab <strong>Settings</strong> di repository &rarr; pilih menu <strong>Pages</strong> di bilah samping kiri.</li>
                  <li>Pada bagian <em>Branch</em>, pilih <strong>main</strong> lalu simpan (Save).</li>
                  <li>Tunggu 1-2 menit, website resmi sekolah akan live di: <code>https://username.github.io/sdn-cinanggerang-1/</code>.</li>
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenExportModal();
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <FileCode className="w-4 h-4" /> Ambil Kode Single-File HTML
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
