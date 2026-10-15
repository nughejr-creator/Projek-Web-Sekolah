/**
 * Google Drive & Google Sheets integration utilities for SDN Cinanggerang I
 */
import type { Teacher } from '../data/schoolData.ts';

/**
 * Converts Google Drive sharing/viewing links to direct embeddable image URLs
 * Supported patterns:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - https://lh3.googleusercontent.com/d/FILE_ID
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Match /file/d/FILE_ID or id=FILE_ID
  const fileIdMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return trimmed;
}

/**
 * Converts a standard Google Sheets URL to its CSV export URL
 * Supports:
 * - /spreadsheets/d/SHEET_ID/edit
 * - /spreadsheets/d/SHEET_ID/pubhtml
 * - /spreadsheets/d/e/PUBLIC_ID/pub?output=csv
 */
export function getGoogleSheetCsvUrl(sheetUrl: string): string {
  const trimmed = sheetUrl.trim();
  if (!trimmed) return '';

  // Already a published CSV
  if (trimmed.includes('pub?output=csv') || trimmed.includes('format=csv') || trimmed.includes('tqx=out:csv')) {
    return trimmed;
  }

  // Handle published web url format: /spreadsheets/d/e/.../pubhtml
  if (trimmed.includes('/pubhtml')) {
    return trimmed.replace('/pubhtml', '/pub?output=csv');
  }

  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return trimmed;

  const sheetId = match[1];
  const gidMatch = trimmed.match(/[#&?]gid=([0-9]+)/);
  const gid = gidMatch ? gidMatch[1] : '0';

  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
}

/**
 * Fetches Google Sheet content as text, with automatic fallback proxies if direct fetch
 * encounters CORS restriction in browser environments.
 */
export async function fetchGoogleSheetCsv(sheetUrl: string): Promise<string> {
  const directCsvUrl = getGoogleSheetCsvUrl(sheetUrl);
  if (!directCsvUrl) {
    throw new Error('URL Google Spreadsheet tidak valid.');
  }

  // 1. Try direct fetch first
  try {
    const res = await fetch(directCsvUrl);
    if (res.ok) {
      const text = await res.text();
      // Ensure it returned actual CSV text, not Google HTML login/warning page
      if (text && !text.includes('<!DOCTYPE html>') && text.includes(',')) {
        return text;
      }
    }
  } catch (err) {
    // CORS or network failure, will try proxies
  }

  // 2. Try Google Visualization endpoint directly
  try {
    const match = sheetUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      const sheetId = match[1];
      const gidMatch = sheetUrl.match(/[#&?]gid=([0-9]+)/);
      const gid = gidMatch ? gidMatch[1] : '0';
      const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;
      const res = await fetch(gvizUrl);
      if (res.ok) {
        const text = await res.text();
        if (text && !text.includes('<!DOCTYPE html>') && text.includes(',')) {
          return text;
        }
      }
    }
  } catch (err) {
    // Continue to proxy
  }

  // 3. Fallback to free reliable CORS proxy for Google public sheets
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(directCsvUrl)}`,
    `https://corsproxy.io/?url=${encodeURIComponent(directCsvUrl)}`
  ];

  for (const proxyUrl of proxies) {
    try {
      const res = await fetch(proxyUrl);
      if (res.ok) {
        const text = await res.text();
        if (text && !text.includes('<!DOCTYPE html>') && text.includes(',')) {
          return text;
        }
      }
    } catch {
      // Try next proxy
    }
  }

  throw new Error(
    'Tidak dapat mengakses Google Spreadsheet secara otomatis. Pastikan dokumen sudah diatur "Siapa saja yang memiliki link dapat melihat" (Viewer), atau salin seluruh isi tabel lalu tempelkan langsung di tab "Tempel CSV".'
  );
}

/**
 * Robust CSV string parser handling quotes, commas, and multiline values
 */
export function parseCsvText(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentField.trim());
      if (currentRow.some((field) => field.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((field) => field.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Intelligent mapping from CSV rows into Teacher objects
 */
export function parseTeachersFromCsv(data: string[][]): Teacher[] {
  if (data.length < 2) return [];

  const headers = data[0].map((h) => h.toLowerCase().trim());
  const dataRows = data.slice(1);

  const namaIdx = headers.findIndex((h) => h.includes('nama') || h.includes('guru') || h.includes('name'));
  const nipIdx = headers.findIndex((h) => h.includes('nip'));
  const roleIdx = headers.findIndex((h) => h.includes('jabatan') || h.includes('peran') || h.includes('role') || h.includes('tugas') || h.includes('kelas'));
  const mapelIdx = headers.findIndex((h) => h.includes('mapel') || h.includes('mata pelajaran') || h.includes('pelajaran') || h.includes('subject'));
  const eduIdx = headers.findIndex((h) => h.includes('pendidikan') || h.includes('ijazah') || h.includes('lulusan') || h.includes('jurusan'));
  const fotoIdx = headers.findIndex((h) => h.includes('foto') || h.includes('gambar') || h.includes('image') || h.includes('drive') || h.includes('photo'));
  const quoteIdx = headers.findIndex((h) => h.includes('moto') || h.includes('motto') || h.includes('quote') || h.includes('kutipan') || h.includes('kata'));
  const badgeIdx = headers.findIndex((h) => h.includes('badge') || h.includes('predikat') || h.includes('status') || h.includes('keahlian'));

  if (namaIdx === -1) {
    throw new Error('Kolom "Nama" atau "Nama Guru" tidak ditemukan pada baris pertama Google Spreadsheet.');
  }

  const defaultPhotos = [
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=400&auto=format&fit=crop',
  ];

  return dataRows
    .filter((row) => row[namaIdx] && row[namaIdx].trim().length > 0)
    .map((row, idx) => {
      const name = row[namaIdx].trim();
      const nip = nipIdx !== -1 && row[nipIdx] ? row[nipIdx].trim() : '-';
      const role = roleIdx !== -1 && row[roleIdx] ? row[roleIdx].trim() : 'Guru Kelas';
      const subjects = mapelIdx !== -1 && row[mapelIdx] ? row[mapelIdx].trim() : 'Tematik & Kurikulum Merdeka';
      const education = eduIdx !== -1 && row[eduIdx] ? row[eduIdx].trim() : 'S1 Sarjana Pendidikan (S.Pd.)';
      
      const rawFoto = fotoIdx !== -1 && row[fotoIdx] ? row[fotoIdx].trim() : '';
      const photoUrl = rawFoto ? convertGoogleDriveUrl(rawFoto) : defaultPhotos[idx % defaultPhotos.length];

      const quote = quoteIdx !== -1 && row[quoteIdx] ? row[quoteIdx].trim() : 'Mendidik dengan hati, menginspirasi dengan budi pekerti luhur.';
      const badge = badgeIdx !== -1 && row[badgeIdx] ? row[badgeIdx].trim() : (role.includes('Kepala') ? 'Pimpinan Sekolah' : role.includes('Wali') ? 'Wali Kelas' : 'Guru Pengajar');

      return {
        id: `gdoc-teacher-${idx + 1}`,
        name,
        nip,
        role,
        subjects,
        education,
        photoUrl,
        quote,
        badge
      };
    });
}

/**
 * Sample CSV Data for Teachers ready to paste or preview
 */
export const SAMPLE_TEACHERS_CSV = `Nama Guru,NIP,Jabatan,Mata Pelajaran,Pendidikan,Link Foto Google Drive,Moto Pendidik,Predikat
"Drs. H. Maman Suherman, M.Pd.","19680512 199303 1 004","Kepala Sekolah","Manajemen Pendidikan & Kepemimpinan","S2 Manajemen Pendidikan UPI","https://drive.google.com/file/d/1Ndxe3-ULXMZS4C0QrqC0mUv2mIOadB8x/view?usp=sharing","Keteladanan adalah metode mendidik paling berharga.","Kepala Sekolah Penggerak"
"Ibu Ai Rohayati, S.Pd.SD","19760814 200212 2 003","Wali Kelas 1","Tematik Kelas 1 & Calistung Ramah Anak","S1 PGSD UNINUS Bandung","https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop","Setiap anak adalah bintang yang bersinar dengan caranya sendiri.","Guru Penggerak Angkatan 7"
"Bapak Deden Hendrayana, S.Pd.","19830419 200902 1 002","Wali Kelas 2","Tematik Kelas 2 & Literasi Numerasi","S1 PGSD UPI Purwakarta","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop","Belajar yang menyenangkan adalah kunci membuka potensi generasi masa depan.","Wali Kelas Berdedikasi"
"Ibu Nining Karlina, S.Pd.","19871103 201101 2 009","Wali Kelas 3","Tematik Kelas 3 & Pendidikan Karakter","S1 Pendidikan Bahasa UPI","https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop","Disiplin dengan kasih sayang, cerdas dengan akhlak mulia.","Wali Kelas Berprestasi"
"Bapak Cecep Kurniawan, S.Pd.","19910215 201903 1 007","Guru PJOK & Olahraga","Pendidikan Jasmani, Olahraga & Kesehatan","S1 PKO FPOK UPI","https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop","Di dalam tubuh yang sehat terdapat jiwa dan pikiran yang kuat.","Pelatih Futsal & Atletik"
"Ibu Siti Maryam, S.Pd.I","19850622 201406 2 005","Guru PAI & Budi Pekerti","Pendidikan Agama Islam, Tahfidz & Akhlak","S1 Tarbiyah UIN SGD Bandung","https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=400&auto=format&fit=crop","Ilmu tanpa amal bagai pohon tanpa buah; tanamkan iman sejak dini.","Pembina Marawis & BTQ"`;

/**
 * Sample CSV Data for Visi, Misi & Logo
 */
export const SAMPLE_VISION_MISSION_CSV = `Visi,Misi,Logo Google Drive
"Mewujudkan SDN Cinanggerang I yang CERIA ""Cerdas Edukatif, Religius, IPTEK, Agamis"". Well Pokona mah",Mewujdkan murid yang Cerdas,https://drive.google.com/file/d/1Ndxe3-ULXMZS4C0QrqC0mUv2mIOadB8x/view?usp=sharing
,Mewujdkan murid yang Edukatif,
,Mewujdkan murid yang Religius,
,Mewujdkan murid yang berwawasan IPTEK,
,Mewujdkan murid yang Agamis,`;
