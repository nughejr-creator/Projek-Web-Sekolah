import React, { useState } from 'react';
import {
  Laptop,
  BookOpen,
  Video,
  FileText,
  Sparkles,
  Award,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  RotateCcw,
  Play,
  X
} from 'lucide-react';
import {
  ELEARNING_MATERIALS,
  MINI_QUIZ_QUESTIONS,
  LearningMaterial
} from '../../data/schoolData';
import { calculateQuizScore } from '../../utils/schoolLogic';

export const ElearningView: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedMaterial, setSelectedMaterial] = useState<LearningMaterial | null>(null);

  // Mini Quiz States
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const materials = ELEARNING_MATERIALS.filter(
    (mat) => mat.classGrade === selectedGrade
  );

  const handleSelectAnswer = (questionId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const quizResult = calculateQuizScore(quizAnswers, MINI_QUIZ_QUESTIONS);

  return (
    <div className="py-10 sm:py-14 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
            Portal Digital Siswa
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            E-Learning & Ruang Belajar Ceria
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Akses rangkuman materi tematik, modul Kurikulum Merdeka, video animasi edukatif, dan kuis cerdas berhadiah skor instan.
          </p>
        </div>

        {/* Grade Selector Tabs */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                selectedGrade === grade
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-50 hover:bg-emerald-50 text-slate-700'
              }`}
            >
              Kelas {grade} SD
            </button>
          ))}
        </div>

        {/* Materials for Selected Grade */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Materi & Modul Kelas {selectedGrade}</span>
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              Kurikulum Merdeka 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {mat.subject}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      {mat.type === 'video' ? (
                        <>
                          <Video className="w-3.5 h-3.5 text-rose-500" /> Video
                        </>
                      ) : (
                        <>
                          <FileText className="w-3.5 h-3.5 text-blue-500" /> Rangkuman
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                    {mat.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {mat.summary}
                  </p>

                  <div className="text-[11px] text-slate-500 pt-1">
                    Penyusun: <strong>{mat.author}</strong> ({mat.durationOrPages})
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedMaterial(mat)}
                    className="w-full py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {mat.type === 'video' ? <Play className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                    <span>Pelajari Materi Ini</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {materials.length === 0 && (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
              <Laptop className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700">Materi kelas {selectedGrade} sedang dalam proses pembaruan oleh dewan guru.</p>
            </div>
          )}
        </div>

        {/* Interactive Mini Quiz for Kids */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Asah Otak Cilik
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Kuis Cerdas & Tangkas SDN Cinanggerang I
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Uji wawasan pengetahuan umum, sains, budaya Sunda, dan matematika dasarmu!
              </p>
            </div>

            {quizSubmitted && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Skor Kamu:</span>
                  <div className="text-3xl font-black text-emerald-700">
                    {quizResult.score} <span className="text-sm font-normal text-slate-500">/ 50</span>
                  </div>
                </div>
                <div className="text-xs text-slate-600">
                  Benar: <strong>{quizResult.correctCount}</strong> dari {quizResult.totalQuestions} soal ({quizResult.percentage}%)
                </div>
              </div>
            )}
          </div>

          {/* Quiz Questions List */}
          <div className="space-y-6">
            {MINI_QUIZ_QUESTIONS.map((q, qIndex) => {
              const selectedAns = quizAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {qIndex + 1}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAns === optIdx;
                      const isCorrect = q.correctAnswer === optIdx;

                      let btnStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-600';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center text-[10px] font-bold shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {quizSubmitted && (
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                      <span className="font-bold text-emerald-700 block mb-0.5">Penjelasan Edukasi:</span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Terjawab: <strong>{Object.keys(quizAnswers).length}</strong> dari {MINI_QUIZ_QUESTIONS.length} soal
            </span>

            <div className="flex gap-2">
              <button
                onClick={handleResetQuiz}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Ulangi Kuis
              </button>

              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length === 0}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" /> Periksa Jawaban Saya
                </button>
              ) : (
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow transition cursor-pointer"
                >
                  Coba Kuis Lagi
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Material Reading / Video Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Kelas {selectedMaterial.classGrade} • {selectedMaterial.subject}
              </span>
              <button
                onClick={() => setSelectedMaterial(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-black text-slate-900 leading-snug">
              {selectedMaterial.title}
            </h3>

            <div className="text-xs text-slate-500">
              Disusun oleh: <strong>{selectedMaterial.author}</strong> ({selectedMaterial.durationOrPages})
            </div>

            {selectedMaterial.type === 'video' ? (
              <div className="aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-600/90 flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Pratinjau Video Animasi Belajar</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Video interaktif disediakan untuk peserta didik SDN Cinanggerang I via kanal resmi sekolah.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-mono">
                {selectedMaterial.contentBody || selectedMaterial.summary}
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedMaterial(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
