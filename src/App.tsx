import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NavGridSection } from './components/NavGridSection';
import { VisionMissionSection } from './components/VisionMissionSection';
import { ProfileView } from './components/views/ProfileView';
import { TeachersView } from './components/views/TeachersView';
import { StudentsView } from './components/views/StudentsView';
import { ActivitiesView } from './components/views/ActivitiesView';
import { AnnouncementsView } from './components/views/AnnouncementsView';
import { PpdbView } from './components/views/PpdbView';
import { ElearningView } from './components/views/ElearningView';
import { AttendanceView } from './components/views/AttendanceView';
import { LibraryView } from './components/views/LibraryView';
import { GalleryView } from './components/views/GalleryView';
import { AdminDashboard } from './components/views/AdminDashboard';
import { AuthModal } from './components/modals/AuthModal';
import { SingleFileExportModal } from './components/modals/SingleFileExportModal';
import { DeployGuideModal } from './components/modals/DeployGuideModal';
import { GoogleSheetsSyncModal } from './components/modals/GoogleSheetsSyncModal';
import { Footer } from './components/Footer';

import {
  INITIAL_PPDB_APPLICANTS,
  INITIAL_ATTENDANCE,
  ANNOUNCEMENTS_DATA,
  TEACHERS_DATA,
  SCHOOL_INFO,
  PPDBApplicant,
  Announcement,
  Teacher
} from './data/schoolData';
import { AttendanceRecord } from './utils/schoolLogic';
import { Download, HelpCircle, Sparkles, FileSpreadsheet } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Shared Application State
  const [ppdbApplicants, setPpdbApplicants] = useState<PPDBApplicant[]>(INITIAL_PPDB_APPLICANTS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS_DATA);
  const [teachers, setTeachers] = useState<Teacher[]>(TEACHERS_DATA);
  const [schoolProfile, setSchoolProfile] = useState({
    vision: SCHOOL_INFO.vision,
    missions: SCHOOL_INFO.missions,
    logoUrl: SCHOOL_INFO.logoUrl,
  });

  // Auth State
  const [currentUser, setCurrentUser] = useState<{ role: 'admin' | 'guru'; name: string } | null>(null);

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDeployGuideModalOpen, setIsDeployGuideModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  const handleAddApplicant = (applicant: PPDBApplicant) => {
    setPpdbApplicants((prev) => [applicant, ...prev]);
  };

  const handleUpdateApplicantStatus = (id: string, status: 'Diterima' | 'Menunggu Verifikasi') => {
    setPpdbApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const handleAddAttendance = (record: AttendanceRecord) => {
    setAttendanceRecords((prev) => [record, ...prev]);
  };

  const handleAddAnnouncement = (announcement: Announcement) => {
    setAnnouncements((prev) => [announcement, ...prev]);
  };

  const handleLoginSuccess = (user: { role: 'admin' | 'guru'; name: string }) => {
    setCurrentUser(user);
    setActiveTab('dashboard-admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (activeTab === 'dashboard-admin') {
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideModalOpen(true)}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-grow">
        {activeTab === 'dashboard' && (
          <>
            <HeroSection onNavigate={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
            <NavGridSection
              onSelectTab={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onOpenLogin={() => setIsLoginModalOpen(true)}
            />
            <VisionMissionSection
              vision={schoolProfile.vision}
              missions={schoolProfile.missions}
              logoUrl={schoolProfile.logoUrl}
            />
          </>
        )}

        {activeTab === 'profil' && <ProfileView />}
        {activeTab === 'guru' && (
          <TeachersView
            teachers={teachers}
            onOpenSyncModal={() => setIsSyncModalOpen(true)}
          />
        )}
        {activeTab === 'siswa' && <StudentsView />}
        {activeTab === 'kegiatan' && <ActivitiesView />}
        {activeTab === 'pengumuman' && (
          <AnnouncementsView
            onOpenPpdb={() => {
              setActiveTab('ppdb');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
        {activeTab === 'ppdb' && (
          <PpdbView
            applicants={ppdbApplicants}
            onAddApplicant={handleAddApplicant}
          />
        )}
        {activeTab === 'elearning' && <ElearningView />}
        {activeTab === 'absen' && (
          <AttendanceView
            attendanceRecords={attendanceRecords}
            onAddAttendance={handleAddAttendance}
          />
        )}
        {activeTab === 'perpustakaan' && <LibraryView />}
        {activeTab === 'galeri' && <GalleryView />}

        {activeTab === 'dashboard-admin' && currentUser && (
          <AdminDashboard
            currentUser={currentUser}
            onLogout={handleLogout}
            onBackToPublic={() => {
              setActiveTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            ppdbApplicants={ppdbApplicants}
            onUpdateApplicantStatus={handleUpdateApplicantStatus}
            announcements={announcements}
            onAddAnnouncement={handleAddAnnouncement}
            attendanceRecords={attendanceRecords}
            onOpenSyncModal={() => setIsSyncModalOpen(true)}
          />
        )}
      </main>

      {/* Floating Quick Action Widget for Single-File HTML & Deploy */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
        <button
          onClick={() => setIsExportModalOpen(true)}
          className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-xl shadow-emerald-700/30 transition transform hover:scale-105 flex items-center gap-2 text-xs font-extrabold cursor-pointer group"
          title="Unduh / Salin Kode Single-File HTML"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span className="hidden sm:inline">Unduh Single-File HTML</span>
        </button>
      </div>

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <SingleFileExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onOpenDeployGuide={() => setIsDeployGuideModalOpen(true)}
      />

      <DeployGuideModal
        isOpen={isDeployGuideModalOpen}
        onClose={() => setIsDeployGuideModalOpen(false)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      <GoogleSheetsSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onUpdateSchoolProfile={(newProfile) => {
          setSchoolProfile((prev) => ({
            ...prev,
            ...(newProfile.vision ? { vision: newProfile.vision } : {}),
            ...(newProfile.missions ? { missions: newProfile.missions } : {}),
            ...(newProfile.logoUrl ? { logoUrl: newProfile.logoUrl } : {}),
          }));
        }}
        onUpdateTeachers={(newTeachers) => setTeachers(newTeachers)}
      />
    </div>
  );
}
