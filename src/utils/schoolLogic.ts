export interface Student {
  id: string;
  nisn: string;
  name: string;
  classGrade: number; // 1 - 6
  gender: 'L' | 'P';
  parentName: string;
  status: 'Aktif' | 'Cuti' | 'Pindah';
}

export interface AttendanceRecord {
  id: string;
  studentName: string;
  classGrade: number;
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpha';
  date: string;
  notes?: string;
  time: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

/**
 * Filter students by search term and class grade
 */
export function filterStudents(
  students: Student[],
  query: string,
  classGrade: number | 'all'
): Student[] {
  const cleanQuery = query.trim().toLowerCase();
  return students.filter((student) => {
    const matchClass = classGrade === 'all' || student.classGrade === classGrade;
    const matchQuery =
      cleanQuery === '' ||
      student.name.toLowerCase().includes(cleanQuery) ||
      student.nisn.includes(cleanQuery);
    return matchClass && matchQuery;
  });
}

/**
 * Calculate attendance statistics summary
 */
export function calculateAttendanceSummary(records: AttendanceRecord[]) {
  const total = records.length;
  if (total === 0) {
    return {
      total: 0,
      hadir: 0,
      sakit: 0,
      izin: 0,
      alpha: 0,
      hadirPercentage: 0,
    };
  }

  const hadir = records.filter((r) => r.status === 'Hadir').length;
  const sakit = records.filter((r) => r.status === 'Sakit').length;
  const izin = records.filter((r) => r.status === 'Izin').length;
  const alpha = records.filter((r) => r.status === 'Alpha').length;

  const hadirPercentage = Math.round((hadir / total) * 100);

  return {
    total,
    hadir,
    sakit,
    izin,
    alpha,
    hadirPercentage,
  };
}

/**
 * Generate formatted PPDB registration code
 */
export function generateRegistrationCode(prefix: string = 'PPDB-CIN1', sequenceNumber: number): string {
  const padded = String(sequenceNumber).padStart(4, '0');
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${padded}`;
}

/**
 * Calculate quiz score
 */
export function calculateQuizScore(
  userAnswers: Record<number, number>,
  questions: QuizQuestion[]
): { score: number; correctCount: number; totalQuestions: number; percentage: number } {
  if (questions.length === 0) {
    return { score: 0, correctCount: 0, totalQuestions: 0, percentage: 0 };
  }

  let correctCount = 0;
  questions.forEach((q) => {
    if (userAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / questions.length) * 100);
  return {
    score: correctCount * 10,
    correctCount,
    totalQuestions: questions.length,
    percentage,
  };
}

/**
 * Format date string to Indonesian locale format
 */
export function formatDateIndonesian(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return dateStr;
  }
}
