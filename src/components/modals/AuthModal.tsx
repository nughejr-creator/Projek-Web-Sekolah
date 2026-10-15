import React, { useState } from 'react';
import {
  Lock,
  User,
  KeyRound,
  ShieldAlert,
  GraduationCap,
  X,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { role: 'admin' | 'guru'; name: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [role, setRole] = useState<'admin' | 'guru'>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleDemoFill = (selectedRole: 'admin' | 'guru') => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('guru');
      setPassword('guru123');
    }
    setErrorMsg('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (role === 'admin') {
      if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
        onLoginSuccess({
          role: 'admin',
          name: 'Cecep Kurnia, S.AP. (Operator)',
        });
        onClose();
        return;
      }
    } else {
      if (username.trim().toLowerCase() === 'guru' && password === 'guru123') {
        onLoginSuccess({
          role: 'guru',
          name: 'Hj. Elis Rohaeti, S.Pd. (Dewan Guru)',
        });
        onClose();
        return;
      }
    }

    setErrorMsg(
      `Username atau password ${role === 'admin' ? 'Admin' : 'Guru'} tidak tepat. Anda dapat mengklik tombol "Isi Akun Demo Otomatis" di bawah.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-amber-300" />
          </div>
          <h3 className="font-black text-xl text-white">Login Admin & Guru</h3>
          <p className="text-xs text-emerald-100 mt-1">
            Portal otentikasi pengelola sistem SDN Cinanggerang I
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Role Selector Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Pilih Peran Akses Anda:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setRole('admin');
                  setErrorMsg('');
                }}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'admin'
                    ? 'bg-slate-900 text-white border-slate-900 shadow'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Admin / Operator</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('guru');
                  setErrorMsg('');
                }}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'guru'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-emerald-300" />
                <span>Guru / Pendidik</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Username Akun
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={role === 'admin' ? 'admin' : 'guru'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Masuk ke Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="pt-3 border-t border-slate-100 text-center space-y-2">
            <span className="text-[11px] text-slate-400 font-semibold block">
              Untuk Kemudahan Evaluasi / Demo:
            </span>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                onClick={() => handleDemoFill('admin')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition cursor-pointer"
              >
                Auto-Fill Demo Admin (admin/admin123)
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('guru')}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold transition cursor-pointer"
              >
                Auto-Fill Demo Guru (guru/guru123)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
