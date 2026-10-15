import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterStudents,
  calculateAttendanceSummary,
  generateRegistrationCode,
  calculateQuizScore,
  formatDateIndonesian,
} from './schoolLogic.ts';
import type { Student, AttendanceRecord, QuizQuestion } from './schoolLogic.ts';

test('filterStudents filters by search term and grade properly', () => {
  const mockStudents: Student[] = [
    { id: '1', nisn: '0012345678', name: 'Ahmad Fauzi', classGrade: 1, gender: 'L', parentName: 'Hasan', status: 'Aktif' },
    { id: '2', nisn: '0012345679', name: 'Siti Nurhaliza', classGrade: 2, gender: 'P', parentName: 'Rahman', status: 'Aktif' },
    { id: '3', nisn: '0012345680', name: 'Budi Santoso', classGrade: 1, gender: 'L', parentName: 'Yanto', status: 'Aktif' },
  ];

  // Test filter by grade
  const grade1 = filterStudents(mockStudents, '', 1);
  assert.equal(grade1.length, 2);

  // Test search query
  const searchSiti = filterStudents(mockStudents, 'siti', 'all');
  assert.equal(searchSiti.length, 1);
  assert.equal(searchSiti[0].name, 'Siti Nurhaliza');

  // Test search by NISN
  const searchNisn = filterStudents(mockStudents, '5680', 'all');
  assert.equal(searchNisn.length, 1);
  assert.equal(searchNisn[0].name, 'Budi Santoso');
});

test('calculateAttendanceSummary calculates percentages and status counts', () => {
  const records: AttendanceRecord[] = [
    { id: '1', studentName: 'Ahmad', classGrade: 4, status: 'Hadir', date: '2026-10-15', time: '07:15' },
    { id: '2', studentName: 'Budi', classGrade: 4, status: 'Hadir', date: '2026-10-15', time: '07:18' },
    { id: '3', studentName: 'Cici', classGrade: 4, status: 'Sakit', date: '2026-10-15', time: '07:20' },
    { id: '4', studentName: 'Deden', classGrade: 4, status: 'Izin', date: '2026-10-15', time: '07:22' },
  ];

  const summary = calculateAttendanceSummary(records);
  assert.equal(summary.total, 4);
  assert.equal(summary.hadir, 2);
  assert.equal(summary.sakit, 1);
  assert.equal(summary.izin, 1);
  assert.equal(summary.alpha, 0);
  assert.equal(summary.hadirPercentage, 50); // 2/4 = 50%
});

test('generateRegistrationCode formats sequential PPDB numbers', () => {
  const code1 = generateRegistrationCode('PPDB-CIN1', 7);
  const currentYear = new Date().getFullYear();
  assert.equal(code1, `PPDB-CIN1-${currentYear}-0007`);
});

test('calculateQuizScore evaluates correct responses accurately', () => {
  const questions: QuizQuestion[] = [
    { id: 1, question: 'Ibu kota Indonesia?', options: ['A', 'B'], correctAnswer: 0, explanation: '' },
    { id: 2, question: 'Lambang sila ke-1?', options: ['A', 'B'], correctAnswer: 1, explanation: '' },
  ];

  const answers = { 1: 0, 2: 1 };
  const result = calculateQuizScore(answers, questions);
  assert.equal(result.correctCount, 2);
  assert.equal(result.percentage, 100);
  assert.equal(result.score, 20);

  const halfAnswers = { 1: 0, 2: 0 };
  const halfResult = calculateQuizScore(halfAnswers, questions);
  assert.equal(halfResult.correctCount, 1);
  assert.equal(halfResult.percentage, 50);
});

test('formatDateIndonesian formats date to Indonesian month names', () => {
  const formatted = formatDateIndonesian('2026-08-17');
  assert.equal(formatted, '17 Agustus 2026');
});
