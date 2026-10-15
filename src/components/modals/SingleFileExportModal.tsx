import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  FileCode,
  X,
  Sparkles,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { generateSingleFileHtml } from '../../utils/exportHtmlGenerator';

interface SingleFileExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDeployGuide: () => void;
}

export const SingleFileExportModal: React.FC<SingleFileExportModalProps> = ({
  isOpen,
  onClose,
  onOpenDeployGuide,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlCode = generateSingleFileHtml();

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = htmlCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadFile = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sdn-cinanggerang-1.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <FileCode className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                Ekspor Siap Pakai
              </span>
              <h3 className="font-extrabold text-base sm:text-lg">
                Kode Single-File HTML SDN Cinanggerang I
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

        {/* Content Info */}
        <div className="p-6 space-y-4 flex-1 overflow-y-auto">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs sm:text-sm text-emerald-950 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-emerald-900">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Satu File HTML Mandiri (Standalone) Tanpa Perlu Node.js / NPM</span>
            </div>
            <p className="leading-relaxed">
              File ini telah menggabungkan seluruh struktur halaman, styling <strong>Tailwind CSS (CDN)</strong>, ikon <strong>FontAwesome 6</strong>, dan skrip logika tab interaktif dalam satu berkas berkode utuh.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleDownloadFile}
              className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Unduh File (.html)</span>
            </button>

            <button
              onClick={handleCopyCode}
              className={`py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                copied
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Seluruh Kode'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenDeployGuide();
              }}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-slate-600" />
              <span>Buka Panduan Deploy</span>
            </button>
          </div>

          {/* Code View Preview Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Pratinjau Kode Sumber HTML (Pertama 100 baris):</span>
              <span className="font-mono">Ukuran: ~{(htmlCode.length / 1024).toFixed(1)} KB</span>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto max-h-56 leading-relaxed select-all">
              {htmlCode.substring(0, 1500)}
              {'\n... [dan ribuan baris kode HTML + Tailwind CSS + Vanilla JS lengkap lainnya] ...'}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
