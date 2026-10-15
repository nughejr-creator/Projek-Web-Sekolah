/**
 * Generates a complete, single-file HTML representation of SDN Cinanggerang I
 * featuring Tailwind CSS (CDN), FontAwesome (CDN), and vanilla interactive JavaScript.
 */
export function generateSingleFileHtml(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SDN Cinanggerang I - Website Resmi Sekolah Dasar</title>
  <meta name="description" content="Website resmi SDN Cinanggerang I: Profil sekolah, PPDB Online, Guru & Siswa, E-Learning, Absensi, Perpustakaan Digital, dan Galeri.">
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- FontAwesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#ecfdf5',
              100: '#d1fae5',
              200: '#a7f3d0',
              300: '#6ee7b7',
              400: '#34d399',
              500: '#10b981',
              600: '#059669',
              700: '#047857',
              800: '#065f46',
              900: '#064e3b',
            },
            accent: {
              amber: '#f59e0b',
              yellow: '#eab308'
            }
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            display: ['"Outfit"', 'sans-serif']
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, h4, .font-display { font-family: 'Outfit', sans-serif; }
    .tab-content { display: none; }
    .tab-content.active { display: block; animation: fadeIn 0.3s ease-in-out; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col selection:bg-brand-500 selection:text-white">

  <!-- TOP BAR INFO -->
  <div class="bg-brand-900 text-white text-xs py-2 px-4 border-b border-brand-800">
    <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
      <div class="flex items-center gap-4">
        <span><i class="fa-solid fa-graduation-cap text-accent-yellow mr-1.5"></i> NPSN: <strong>20233481</strong></span>
        <span class="hidden sm:inline"><i class="fa-solid fa-award text-accent-yellow mr-1.5"></i> Akreditasi <strong>A (Unggul)</strong></span>
        <span class="hidden md:inline"><i class="fa-solid fa-location-dot text-accent-yellow mr-1.5"></i> Kec. Pamulihan, Sumedang</span>
      </div>
      <div class="flex items-center gap-4">
        <a href="tel:0261203891" class="hover:text-accent-yellow transition"><i class="fa-solid fa-phone mr-1"></i> (0261) 203891</a>
        <a href="mailto:info@sdncinanggerang1.sch.id" class="hover:text-accent-yellow transition hidden sm:inline"><i class="fa-solid fa-envelope mr-1"></i> info@sdncinanggerang1.sch.id</a>
      </div>
    </div>
  </div>

  <!-- MAIN HEADER & NAVIGATION -->
  <header class="bg-white sticky top-0 z-40 shadow-sm border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Brand Logo & School Name -->
        <a href="javascript:void(0)" onclick="switchTab('dashboard')" class="flex items-center gap-3 group">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition">
            <i class="fa-solid fa-school text-xl"></i>
          </div>
          <div>
            <div class="font-display font-black text-xl text-brand-900 tracking-tight leading-none group-hover:text-brand-600 transition">SDN CINANGGERANG I</div>
            <div class="text-xs font-semibold text-emerald-600 tracking-wider uppercase mt-1">Cerdas • Berakhlak • Berprestasi</div>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden lg:flex items-center gap-1">
          <button onclick="switchTab('dashboard')" class="nav-btn px-3 py-2 text-sm font-semibold rounded-lg text-brand-700 bg-brand-50" data-target="dashboard">Beranda</button>
          <button onclick="switchTab('profil')" class="nav-btn px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition" data-target="profil">Profil</button>
          <button onclick="switchTab('guru')" class="nav-btn px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition" data-target="guru">Guru</button>
          <button onclick="switchTab('siswa')" class="nav-btn px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition" data-target="siswa">Siswa</button>
          <button onclick="switchTab('kegiatan')" class="nav-btn px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition" data-target="kegiatan">Kegiatan</button>
          <button onclick="switchTab('pengumuman')" class="nav-btn px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition" data-target="pengumuman">Pengumuman</button>
          <button onclick="switchTab('ppdb')" class="nav-btn px-3.5 py-2 text-sm font-bold rounded-lg text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition flex items-center gap-1.5" data-target="ppdb">
            <i class="fa-solid fa-user-plus text-xs"></i> PPDB
          </button>
          <button onclick="switchTab('elearning')" class="nav-btn px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition" data-target="elearning">E-Learning</button>
          <button onclick="switchTab('absen')" class="nav-btn px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition" data-target="absen">Absen</button>
          <button onclick="switchTab('perpustakaan')" class="nav-btn px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition" data-target="perpustakaan">Perpustakaan</button>
          <button onclick="switchTab('galeri')" class="nav-btn px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition" data-target="galeri">Galeri</button>
        </nav>

        <!-- Right Action Button: Login -->
        <div class="hidden sm:flex items-center gap-2">
          <button onclick="openLoginModal()" class="px-4 py-2 text-sm font-bold rounded-xl text-slate-700 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 transition flex items-center gap-2">
            <i class="fa-solid fa-lock text-brand-600"></i> Login Guru/Admin
          </button>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button id="mobileMenuBtn" onclick="toggleMobileMenu()" class="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none">
          <i class="fa-solid fa-bars text-xl"></i>
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobileMenu" class="hidden lg:hidden pb-4 pt-2 border-t border-slate-100 space-y-1">
        <button onclick="switchTab('dashboard'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg font-semibold text-brand-700 bg-brand-50"><i class="fa-solid fa-house w-6"></i> Beranda</button>
        <button onclick="switchTab('profil'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-school w-6"></i> Profil Sekolah</button>
        <button onclick="switchTab('guru'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-chalkboard-user w-6"></i> Daftar Guru</button>
        <button onclick="switchTab('siswa'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-children w-6"></i> Daftar Siswa</button>
        <button onclick="switchTab('kegiatan'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-campground w-6"></i> Kegiatan Sekolah</button>
        <button onclick="switchTab('pengumuman'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-bullhorn w-6"></i> Pengumuman</button>
        <button onclick="switchTab('ppdb'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg font-bold text-white bg-brand-600"><i class="fa-solid fa-user-plus w-6"></i> PPDB Online 2026</button>
        <button onclick="switchTab('elearning'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-laptop-code w-6"></i> E-Learning & Kuis</button>
        <button onclick="switchTab('absen'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-clipboard-check w-6"></i> Absen Online</button>
        <button onclick="switchTab('perpustakaan'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-book-open-reader w-6"></i> Perpustakaan Digital</button>
        <button onclick="switchTab('galeri'); toggleMobileMenu()" class="w-full text-left px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-images w-6"></i> Galeri Dokumentasi</button>
        <div class="pt-2">
          <button onclick="openLoginModal(); toggleMobileMenu()" class="w-full py-2.5 rounded-xl font-bold text-slate-800 bg-slate-100 hover:bg-brand-100 border border-slate-200 text-center"><i class="fa-solid fa-lock text-brand-600 mr-2"></i> Login Admin & Guru</button>
        </div>
      </div>
    </div>
  </header>

  <!-- MAIN WRAPPER -->
  <main class="flex-grow">
    <!-- TAB 1: BERANDA / DASHBOARD -->
    <div id="tab-dashboard" class="tab-content active">
      <!-- HERO SECTION -->
      <section class="relative bg-gradient-to-br from-brand-900 via-brand-800 to-emerald-950 text-white overflow-hidden py-16 lg:py-24">
        <!-- Decorative blobs -->
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-amber/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <!-- Left Column: Hero Text & CTAs -->
            <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent-yellow text-sm font-semibold">
                <i class="fa-solid fa-sparkles"></i>
                <span>Selamat Datang di Website Resmi SDN Cinanggerang I</span>
              </div>
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-tight text-white">
                Mendidik Generasi <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-accent-yellow">Cerdas, Berkarakter</span> & Cinta Lingkungan.
              </h1>
              <p class="text-lg text-emerald-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Lembaga pendidikan dasar terakreditasi <strong>A (Unggul)</strong> di Pamulihan Sumedang yang mengintegrasikan Kurikulum Merdeka, pembiasaan akhlak Islami, nilai luhur budaya Sunda, dan kecakapan digital abad-21.
              </p>
              
              <!-- Quick CTAs -->
              <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button onclick="switchTab('ppdb')" class="px-6 py-3.5 rounded-xl bg-accent-amber hover:bg-yellow-500 text-slate-900 font-bold shadow-lg shadow-amber-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-2">
                  <i class="fa-solid fa-user-plus"></i> Daftar PPDB 2026 Online
                </button>
                <button onclick="switchTab('profil')" class="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md border border-white/20 transition flex items-center gap-2">
                  <i class="fa-solid fa-compass"></i> Jelajahi Profil Sekolah
                </button>
              </div>

              <!-- Key Metrics -->
              <div class="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div class="text-3xl font-black font-display text-white">218+</div>
                  <div class="text-xs text-emerald-200 font-medium">Siswa Aktif</div>
                </div>
                <div>
                  <div class="text-3xl font-black font-display text-white">14</div>
                  <div class="text-xs text-emerald-200 font-medium">Guru & Tenaga Ahli</div>
                </div>
                <div>
                  <div class="text-3xl font-black font-display text-accent-yellow">A</div>
                  <div class="text-xs text-emerald-200 font-medium">Akreditasi BAN-S/M</div>
                </div>
              </div>
            </div>

            <!-- Right Column: Principal's Greeting Card -->
            <div class="lg:col-span-5">
              <div class="bg-white/95 backdrop-blur-md text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 relative">
                <div class="flex items-center gap-4 mb-4">
                  <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop" alt="Kepala Sekolah SDN Cinanggerang I" class="w-16 h-16 rounded-2xl object-cover shadow border-2 border-brand-500">
                  <div>
                    <h3 class="font-display font-bold text-lg text-brand-900 leading-snug">H. Dedi Suryadi, S.Pd., M.M.Pd.</h3>
                    <p class="text-xs font-semibold text-emerald-600">Kepala Sekolah SDN Cinanggerang I</p>
                    <p class="text-[11px] text-slate-500">NIP: 19710412 199303 1 004</p>
                  </div>
                </div>
                <div class="relative bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
                  <i class="fa-solid fa-quote-left text-brand-400 text-xl absolute -top-3 left-4 bg-white px-1 rounded-full"></i>
                  <p class="text-xs sm:text-sm text-slate-700 italic leading-relaxed pt-1">
                    "Sampurasun! Kami bertekad mewujudkan sekolah yang ramah anak, berbudaya, dan mendorong setiap siswa menemukan potensi terbaiknya melalui keteladanan budi pekerti serta inovasi pembelajaran."
                  </p>
                </div>
                <div class="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span class="flex items-center gap-1.5"><i class="fa-solid fa-circle-check text-brand-600"></i> Sekolah Ramah Anak</span>
                  <button onclick="switchTab('profil')" class="font-bold text-brand-600 hover:text-brand-800">Baca Selengkapnya &rarr;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- NAVIGATION GRID (11 INTERACTIVE MENUS) -->
      <section class="py-12 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <h2 class="text-2xl sm:text-3xl font-display font-bold text-slate-900">Pusat Layanan & Fitur Utama Sekolah</h2>
            <p class="text-slate-600 text-sm mt-2">Pilih menu di bawah ini untuk mengakses informasi dan fasilitas digital SDN Cinanggerang I secara langsung.</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <!-- 1. Profil -->
            <button onclick="switchTab('profil')" class="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:shadow-md border border-slate-200/80 hover:border-emerald-200 transition text-left group">
              <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                <i class="fa-solid fa-landmark"></i>
              </div>
              <h3 class="font-display font-bold text-slate-800 group-hover:text-emerald-700 text-sm">Profil Sekolah</h3>
              <p class="text-xs text-slate-500 mt-1">Sejarah & Fasilitas</p>
            </button>

            <!-- 2. Guru -->
            <button onclick="switchTab('guru')" class="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:shadow-md border border-slate-200/80 hover:border-emerald-200 transition text-left group">
              <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                <i class="fa-solid fa-chalkboard-user"></i>
              </div>
              <h3 class="font-display font-bold text-slate-800 group-hover:text-blue-700 text-sm">Daftar Guru</h3>
              <p class="text-xs text-slate-500 mt-1">14 Tenaga Pendidik</p>
            </button>

            <!-- 3. Siswa -->
            <button onclick="switchTab('siswa')" class="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:shadow-md border border-slate-200/80 hover:border-emerald-200 transition text-left group">
              <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                <i class="fa-solid fa-users"></i>
              </div>
              <h3 class="font-display font-bold text-slate-800 group-hover:text-purple-700 text-sm">Daftar Siswa</h3>
              <p class="text-xs text-slate-500 mt-1">Kelas 1 s.d. Kelas 6</p>
            </button>

            <!-- 4. Kegiatan -->
            <button onclick="switchTab('kegiatan')" class="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:shadow-md border border-slate-200/80 hover:border-emerald-200 transition text-left group">
              <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                <i class="fa-solid fa-campground"></i>
              </div>
              <h3 class="font-display font-bold text-slate-800 group-hover:text-amber-700 text-sm">Kegiatan & Ekskul</h3>
              <p class="text-xs text-slate-500 mt-1">Pramuka, Tari, Futsal</p>
            </button>

            <!-- 5. Pengumuman -->
            <button onclick="switchTab('pengumuman')" class="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:shadow-md border border-slate-200/80 hover:border-emerald-200 transition text-left group">
              <div class="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                <i class="fa-solid fa-bullhorn"></i>
              </div>
              <h3 class="font-display font-bold text-slate-800 group-hover:text-rose-700 text-sm">Pengumuman</h3>
              <p class="text-xs text-slate-500 mt-1">Info Terkini Sekolah</p>
            </button>

            <!-- 6. PPDB Online -->
            <button onclick="switchTab('ppdb')" class="p-5 rounded-2xl bg-gradient-to-br from-brand-600 to-emerald-700 text-white hover:shadow-lg hover:shadow-brand-500/30 transition text-left group">
              <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                <i class="fa-solid fa-user-plus text-accent-yellow"></i>
              </div>
              <h3 class="font-display font-bold text-white text-sm">PPDB Online</h3>
              <p class="text-xs text-emerald-100 mt-1">Pendaftaran 2026/2027</p>
            </button>

            <!-- 7. E-Learning -->
            <button onclick="switchTab('elearning')" class="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:shadow-md border border-slate-200/80 hover:border-emerald-200 transition text-left group">
              <div class="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                <i class="fa-solid fa-laptop-code"></i>
              </div>
              <h3 class="font-display font-bold text-slate-800 group-hover:text-cyan-700 text-sm">E-Learning</h3>
              <p class="text-xs text-slate-500 mt-1">Materi & Kuis Cilik</p>
            </button>

            <!-- 8. Absen Online -->
            <button onclick="switchTab('absen')" class="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:shadow-md border border-slate-200/80 hover:border-emerald-200 transition text-left group">
              <div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                <i class="fa-solid fa-clipboard-check"></i>
              </div>
              <h3 class="font-display font-bold text-slate-800 group-hover:text-teal-700 text-sm">Absen Online</h3>
              <p class="text-xs text-slate-500 mt-1">Presensi Siswa Harian</p>
            </button>

            <!-- 9. Perpustakaan Digital -->
            <button onclick="switchTab('perpustakaan')" class="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:shadow-md border border-slate-200/80 hover:border-emerald-200 transition text-left group">
              <div class="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                <i class="fa-solid fa-book-open-reader"></i>
              </div>
              <h3 class="font-display font-bold text-slate-800 group-hover:text-indigo-700 text-sm">Perpustakaan</h3>
              <p class="text-xs text-slate-500 mt-1">Katalog Buku Digital</p>
            </button>

            <!-- 10. Galeri Dokumentasi -->
            <button onclick="switchTab('galeri')" class="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:shadow-md border border-slate-200/80 hover:border-emerald-200 transition text-left group">
              <div class="w-12 h-12 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                <i class="fa-solid fa-images"></i>
              </div>
              <h3 class="font-display font-bold text-slate-800 group-hover:text-pink-700 text-sm">Galeri Foto</h3>
              <p class="text-xs text-slate-500 mt-1">Dokumentasi Sekolah</p>
            </button>

            <!-- 11. Login Admin & Guru -->
            <button onclick="openLoginModal()" class="p-5 rounded-2xl bg-slate-800 text-white hover:bg-slate-900 transition text-left group col-span-2 sm:col-span-1">
              <div class="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition">
                <i class="fa-solid fa-user-shield text-brand-400"></i>
              </div>
              <h3 class="font-display font-bold text-white text-sm">Portal Guru & Admin</h3>
              <p class="text-xs text-slate-400 mt-1">Kelola Pengumuman & PPDB</p>
            </button>
          </div>
        </div>
      </section>

      <!-- VISI MISI & IDENTITAS SEKOLAH -->
      <section class="py-16 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <!-- Left: Identitas Resmi -->
            <div class="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <i class="fa-solid fa-id-card"></i>
                </div>
                <h3 class="font-display font-bold text-xl text-slate-900">Identitas Sekolah</h3>
              </div>

              <div class="space-y-4 text-sm divide-y divide-slate-100">
                <div class="flex justify-between py-2">
                  <span class="text-slate-500">Nama Sekolah</span>
                  <span class="font-bold text-slate-900">SDN Cinanggerang I</span>
                </div>
                <div class="flex justify-between py-2">
                  <span class="text-slate-500">NPSN</span>
                  <span class="font-mono font-bold text-emerald-700">20233481</span>
                </div>
                <div class="flex justify-between py-2">
                  <span class="text-slate-500">Akreditasi</span>
                  <span class="font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">A (Amat Baik)</span>
                </div>
                <div class="flex justify-between py-2">
                  <span class="text-slate-500">Kurikulum</span>
                  <span class="font-semibold text-slate-800">Kurikulum Merdeka</span>
                </div>
                <div class="flex justify-between py-2">
                  <span class="text-slate-500">Status</span>
                  <span class="font-semibold text-slate-800">Negeri Pemerintah</span>
                </div>
                <div class="py-2">
                  <span class="text-slate-500 block mb-1">Alamat Lengkap</span>
                  <span class="text-slate-800 font-medium leading-relaxed">Jl. Raya Cinanggerang No. 12, Kec. Pamulihan, Kab. Sumedang, Jawa Barat 45365</span>
                </div>
              </div>
            </div>

            <!-- Right: Visi & Misi -->
            <div class="lg:col-span-7 space-y-6">
              <div class="bg-gradient-to-br from-brand-700 to-emerald-900 text-white p-8 rounded-3xl shadow-md">
                <span class="text-xs uppercase tracking-widest text-accent-yellow font-bold">Visi SDN Cinanggerang I</span>
                <p class="text-xl sm:text-2xl font-bold font-display mt-2 leading-relaxed">
                  "Mewujudkan SDN Cinanggerang I yang CERIA \"Cerdas Edukatif, Religius, IPTEK, Agamis\". Well Pokona mah"
                </p>
              </div>

              <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="font-display font-bold text-xl text-slate-900 mb-4 flex items-center gap-2">
                  <i class="fa-solid fa-bullseye text-brand-600"></i> Misi Utama Sekolah
                </h3>
                <ul class="space-y-3 text-sm text-slate-700">
                  <li class="flex items-start gap-3">
                    <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                    <span>Mewujudkan murid yang Cerdas.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                    <span>Mewujudkan murid yang Edukatif.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                    <span>Mewujudkan murid yang Religius.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
                    <span>Mewujudkan murid yang berwawasan IPTEK.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">5</span>
                    <span>Mewujudkan murid yang Agamis.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- OTHER TABS WILL BE INJECTED OR VISIBLE THROUGH TAB MECHANISM -->
  </main>

  <!-- FOOTER -->
  <footer class="bg-slate-900 text-slate-300 pt-16 pb-10 border-t border-slate-800 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        <!-- Col 1: About -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center text-lg">
              <i class="fa-solid fa-school"></i>
            </div>
            <div>
              <div class="font-display font-bold text-white text-base">SDN Cinanggerang I</div>
              <div class="text-xs text-emerald-400">Pamulihan, Sumedang</div>
            </div>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">
            Sekolah Dasar Negeri unggulan di Kabupaten Sumedang yang mendidik dengan kasih sayang, budaya luhur, dan teknologi ramah anak.
          </p>
          <div class="flex items-center gap-3 text-slate-400">
            <span class="w-8 h-8 rounded-lg bg-slate-800 hover:text-white flex items-center justify-center cursor-pointer transition"><i class="fa-brands fa-facebook"></i></span>
            <span class="w-8 h-8 rounded-lg bg-slate-800 hover:text-white flex items-center justify-center cursor-pointer transition"><i class="fa-brands fa-instagram"></i></span>
            <span class="w-8 h-8 rounded-lg bg-slate-800 hover:text-white flex items-center justify-center cursor-pointer transition"><i class="fa-brands fa-youtube"></i></span>
            <span class="w-8 h-8 rounded-lg bg-slate-800 hover:text-white flex items-center justify-center cursor-pointer transition"><i class="fa-brands fa-whatsapp"></i></span>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div>
          <h4 class="font-display font-bold text-white text-sm mb-4">Navigasi Utama</h4>
          <ul class="space-y-2 text-xs">
            <li><button onclick="switchTab('profil')" class="hover:text-emerald-400 transition">Profil & Sejarah Sekolah</button></li>
            <li><button onclick="switchTab('guru')" class="hover:text-emerald-400 transition">Data Guru & Tenaga Ahli</button></li>
            <li><button onclick="switchTab('siswa')" class="hover:text-emerald-400 transition">Data Peserta Didik</button></li>
            <li><button onclick="switchTab('ppdb')" class="hover:text-emerald-400 transition">Pendaftaran PPDB 2026</button></li>
            <li><button onclick="switchTab('absen')" class="hover:text-emerald-400 transition">Absen Online Siswa</button></li>
            <li><button onclick="switchTab('perpustakaan')" class="hover:text-emerald-400 transition">Perpustakaan Digital</button></li>
          </ul>
        </div>

        <!-- Col 3: Contact Info -->
        <div>
          <h4 class="font-display font-bold text-white text-sm mb-4">Kontak & Lokasi</h4>
          <ul class="space-y-3 text-xs text-slate-400">
            <li class="flex items-start gap-2.5">
              <i class="fa-solid fa-map-pin text-brand-400 mt-1"></i>
              <span>Jl. Raya Cinanggerang No. 12, Kec. Pamulihan, Kab. Sumedang 45365</span>
            </li>
            <li class="flex items-center gap-2.5">
              <i class="fa-solid fa-phone text-brand-400"></i>
              <span>(0261) 203891 / 0812-2456-7890</span>
            </li>
            <li class="flex items-center gap-2.5">
              <i class="fa-solid fa-envelope text-brand-400"></i>
              <span>info@sdncinanggerang1.sch.id</span>
            </li>
            <li class="flex items-center gap-2.5">
              <i class="fa-solid fa-clock text-brand-400"></i>
              <span>Senin - Sabtu: 07.00 - 14.00 WIB</span>
            </li>
          </ul>
        </div>

        <!-- Col 4: Akreditasi & Motto -->
        <div class="space-y-3">
          <h4 class="font-display font-bold text-white text-sm mb-2">Akreditasi & Sertifikasi</h4>
          <div class="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <div class="flex items-center gap-3">
              <i class="fa-solid fa-award text-3xl text-accent-yellow"></i>
              <div>
                <div class="text-sm font-bold text-white">Akreditasi A (Unggul)</div>
                <div class="text-[11px] text-slate-400">SK BAN-S/M Kemendikbudristek</div>
              </div>
            </div>
            <p class="text-[11px] text-slate-400 mt-2">
              Berpredikat Sekolah Ramah Anak & Calon Sekolah Adiwiyata Sumedang.
            </p>
          </div>
        </div>
      </div>

      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>&copy; 2026 SDN Cinanggerang I. Hak Cipta Dilindungi Undang-Undang.</p>
        <p>Dirancang untuk Pendidikan Dasar Berkualitas & Ramah Anak.</p>
      </div>
    </div>
  </footer>

  <script>
    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      const target = document.getElementById('tab-' + tabId);
      if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      if (menu) menu.classList.toggle('hidden');
    }
    function openLoginModal() {
      alert("Silakan gunakan tombol Login Guru/Admin pada aplikasi utama untuk masuk ke Dashboard Simulator.");
    }
  </script>
</body>
</html>`;
}
