import test from 'node:test';
import assert from 'node:assert/strict';
import {
  convertGoogleDriveUrl,
  getGoogleSheetCsvUrl,
  parseCsvText,
  parseTeachersFromCsv,
  SAMPLE_TEACHERS_CSV,
  SAMPLE_VISION_MISSION_CSV
} from './googleSheetsSync.ts';

test('convertGoogleDriveUrl converts sharing links to direct image preview', () => {
  const driveUrl = 'https://drive.google.com/file/d/1Ndxe3-ULXMZS4C0QrqC0mUv2mIOadB8x/view?usp=sharing';
  const converted = convertGoogleDriveUrl(driveUrl);
  assert.equal(converted, 'https://lh3.googleusercontent.com/d/1Ndxe3-ULXMZS4C0QrqC0mUv2mIOadB8x');

  const openIdUrl = 'https://drive.google.com/open?id=1AbC_xyz123';
  assert.equal(convertGoogleDriveUrl(openIdUrl), 'https://lh3.googleusercontent.com/d/1AbC_xyz123');

  const regularUrl = 'https://example.com/photo.jpg';
  assert.equal(convertGoogleDriveUrl(regularUrl), 'https://example.com/photo.jpg');
});

test('getGoogleSheetCsvUrl converts Google Sheets URLs to CSV export format', () => {
  const sheetEditUrl = 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0';
  const csvUrl = getGoogleSheetCsvUrl(sheetEditUrl);
  assert.equal(
    csvUrl,
    'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/export?format=csv&gid=0'
  );

  const pubhtmlUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1234/pubhtml';
  assert.equal(getGoogleSheetCsvUrl(pubhtmlUrl), 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1234/pub?output=csv');
});

test('parseCsvText accurately parses CSV rows with quotes and commas', () => {
  const csv = `Kolom1,Kolom2,Kolom3\n"Nilai 1, dengan koma",Nilai 2,"Nilai 3 ""berkutip"""`;
  const parsed = parseCsvText(csv);
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0][0], 'Kolom1');
  assert.equal(parsed[1][0], 'Nilai 1, dengan koma');
  assert.equal(parsed[1][2], 'Nilai 3 "berkutip"');
});

test('parseTeachersFromCsv parses teachers and converts Drive photos', () => {
  const rows = parseCsvText(SAMPLE_TEACHERS_CSV);
  const teachers = parseTeachersFromCsv(rows);

  assert.equal(teachers.length, 6);
  assert.equal(teachers[0].name, 'Drs. H. Maman Suherman, M.Pd.');
  assert.equal(teachers[0].role, 'Kepala Sekolah');
  assert.equal(teachers[0].photoUrl, 'https://lh3.googleusercontent.com/d/1Ndxe3-ULXMZS4C0QrqC0mUv2mIOadB8x');
  assert.equal(teachers[1].role, 'Wali Kelas 1');
});
