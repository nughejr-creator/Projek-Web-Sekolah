import React from 'react';
import {
  Award,
  IdCard,
  MapPin,
  CheckCircle2,
  Heart,
  BookOpen,
  Shield,
  Star,
  Sparkles,
  Layers,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface VisionMissionSectionProps {
  vision?: string;
  missions?: string[];
  logoUrl?: string;
}

export const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({
  vision = SCHOOL_INFO.vision,
  missions = SCHOOL_INFO.missions,
  logoUrl = SCHOOL_INFO.logoUrl,
}) => {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-700 bg-emerald-100 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full">
            Identitas & Komitmen Lembaga
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Visi, Misi & Karakter Budaya Sekolah
          </h2>
          <p className="text-slate-600 text-sm mt-1.5">
            Pondasi kokoh SDN Cinanggerang I dalam mengantarkan putra-putri bangsa menjadi insan cerdas dan berkarakter mulia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official School Identity Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center overflow-hidden p-1">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo Sekolah"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <IdCard className={`w-6 h-6 ${logoUrl ? 'hidden' : ''}`} />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">Identitas Sekolah Resmi</h3>
                <p className="text-xs text-slate-500">Kementerian Pendidikan Dasar dan Menengah</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Nama Sekolah:</span>
                <span className="font-bold text-slate-900">{SCHOOL_INFO.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">NPSN:</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {SCHOOL_INFO.npsn}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Bentuk Pendidikan:</span>
                <span className="font-semibold text-slate-800">Sekolah Dasar (SD)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Status Sekolah:</span>
                <span className="font-semibold text-slate-800">Negeri Pemerintah</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Peringkat Akreditasi:</span>
                <span className="font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" /> {SCHOOL_INFO.accreditation}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">SK Akreditasi:</span>
                <span className="font-mono text-xs text-slate-700">{SCHOOL_INFO.skAkreditasi}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Kurikulum:</span>
                <span className="font-semibold text-slate-800">{SCHOOL_INFO.curriculum}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Tahun Berdiri:</span>
                <span className="font-semibold text-slate-800">{SCHOOL_INFO.foundedYear}</span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 block text-xs mb-1">Alamat Domisili:</span>
                <p className="text-xs text-slate-800 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 inline mr-1" />
                  {SCHOOL_INFO.address}
                </p>
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-slate-500 block text-[11px]">Telepon:</span>
                <span className="font-bold text-emerald-900">{SCHOOL_INFO.phone}</span>
              </div>
              <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-slate-500 block text-[11px]">Surel:</span>
                <span className="font-bold text-emerald-900 truncate block">info@sdncinanggerang1.sch.id</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visi & Misi & 4 Core Values */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visi Banner */}
            <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white p-7 sm:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full pointer-events-none"></div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Visi SDN Cinanggerang I
              </span>
              <p className="text-lg sm:text-xl font-extrabold mt-3 leading-relaxed">
                "{vision}"
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-600/60 flex items-center gap-2 text-xs text-emerald-200">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Motto: {SCHOOL_INFO.motto}</span>
              </div>
            </div>

            {/* Misi List */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                  Misi Strategis SDN Cinanggerang I
                </h3>
              </div>

              <div className="space-y-3">
                {missions.map((mission, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {mission}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Nilai Utama Budaya Sunda & Pancasila */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Nilai Karakter Kearifan Lokal: Silih Asah, Asih, Asuh & Motekar</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SCHOOL_INFO.coreValues.map((val, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100/80">
                    <div className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>{val.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
