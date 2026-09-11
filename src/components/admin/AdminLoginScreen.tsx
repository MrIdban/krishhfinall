import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Check, AlertCircle, Languages } from 'lucide-react';
import { Language } from '../../types';

interface AdminLoginScreenProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({ onSuccess, onBack }) => {
  const { setCurrentView, notify, login, t, language, setLanguage } = useApp();

  const [phone, setPhone] = useState('9820012345');
  const [password, setPassword] = useState('admin123');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showForgotNotice, setShowForgotNotice] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!phone.trim()) {
      setError(t.login?.enterAdminId || 'Please enter your phone or admin ID');
      return;
    }
    if (!password.trim()) {
      setError(t.login?.enterPassword || 'Please enter your password');
      return;
    }

    try {
      const res = login('admin', phone, password);
      if (!res.success) {
        setError(res.message || 'Incorrect password! Please try again.');
        return;
      }

      setError(null);
      if (onSuccess) {
        onSuccess();
      } else {
        setCurrentView('admin');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setError('An error occurred during authentication.');
    }
  };

  return (
    <div
      id="admin-login-screen"
      className="min-h-screen w-full flex flex-col justify-between items-center px-4 py-8 select-none relative"
      style={{ backgroundColor: '#ede4d4' }}
    >
      {/* Top bar with back navigation and language dropdown */}
      <div className="w-full max-w-xl flex justify-between items-center gap-2">
        <button
          type="button"
          onClick={() => (onBack ? onBack() : setCurrentView('choose'))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[#503722] hover:bg-[#dfd4c1] transition-colors cursor-pointer"
          title="Return to side selection"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.login?.backToSelect || 'Back to Portals'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-xs font-mono text-[#7b6754]">
            {t.login?.adminTitle || 'Krishihaat Central Admin Portal'}
          </span>

          <div className="flex items-center gap-1 bg-[#dfd4c1] border border-[#cfbeaa] rounded-full px-2.5 py-1 text-xs text-[#503722]">
            <Languages className="w-3.5 h-3.5 text-[#503722]" />
            <select
              id="admin-login-language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-xs font-mono font-medium focus:outline-hidden cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Login Card - Matching lollll_page-0003.jpg */}
      <div className="my-auto w-full flex flex-col items-center">
        <div className="relative w-full max-w-[420px] pt-16">
          {/* Circular Overlapping Avatar Badge */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-36 h-36 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: '#8ca57f' }}
          >
            {/* Admin silhouette icon with suit, tie, collar, and gear from sketch */}
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-28 h-28"
            >
              {/* Head */}
              <circle cx="92" cy="62" r="26" fill="#4a331e" />

              {/* Torso / Suit Jacket Silhouette */}
              <path
                d="
                  M 44 165
                  C 44 126 62 110 92 108
                  C 108 109 120 116 128 126
                  C 122 133 118 142 118 154
                  C 118 158 119 162 120 165
                  Z
                "
                fill="#4a331e"
              />

              {/* Shirt V-neck collar cutout (reveals tile green) */}
              <path
                d="M 80 108 L 92 138 L 104 108 Z"
                fill="#8ca57f"
              />

              {/* Necktie knot and tie blade */}
              <path
                d="M 88 110 L 96 110 L 98 118 L 92 122 L 86 118 Z"
                fill="#4a331e"
              />
              <path
                d="M 92 120 L 97 124 L 95 158 L 92 165 L 89 158 L 87 124 Z"
                fill="#4a331e"
              />

              {/* Gear / Cogwheel overlapping lower right shoulder */}
              <g transform="translate(142, 146)">
                {/* 8 Gear Teeth */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <rect
                    key={angle}
                    x="-4.5"
                    y="-28"
                    width="9"
                    height="9"
                    rx="1.5"
                    fill="#4a331e"
                    transform={`rotate(${angle})`}
                  />
                ))}
                {/* Outer Cogwheel Disc */}
                <circle cx="0" cy="0" r="23" fill="#4a331e" />
                {/* Center Cutout showing green background */}
                <circle cx="0" cy="0" r="11" fill="#8ca57f" />
              </g>
            </svg>
          </div>

          {/* Form Card */}
          <div
            className="w-full rounded-2xl px-8 pt-20 pb-10 shadow-lg flex flex-col"
            style={{ backgroundColor: '#9c846d' }}
          >
            <form onSubmit={handleLogin} className="w-full flex flex-col space-y-6">
              {/* Phone Field */}
              <div className="flex items-center gap-4">
                {/* Phone Handset Icon */}
                <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-[#ede4d4]"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      fill="#ede4d4"
                    />
                  </svg>
                </div>

                <div className="flex-1">
                  <span className="block text-sm font-mono text-[#ede4d4] tracking-wider mb-0.5">
                    {t.login?.adminIdLabel || 'admin id / phone'}
                  </span>
                  <input
                    id="admin-login-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError(null);
                    }}
                    placeholder={t.login?.enterAdminId || 'e.g. 9820012345'}
                    className="w-full bg-transparent font-mono text-[#ede4d4] text-base border-b-2 border-dashed border-[#ede4d4] pb-1 focus:outline-hidden focus:border-solid transition-all placeholder-[#ede4d4]/50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex items-center gap-4">
                {/* Padlock Icon */}
                <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-[#ede4d4]"
                  >
                    <rect x="4" y="11" width="16" height="11" rx="2" fill="#ede4d4" />
                    <path
                      d="M7 11V7a5 5 0 0 1 10 0v4"
                      stroke="#ede4d4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="15.5" r="1.5" fill="#9c846d" />
                    <path d="M12 17v2" stroke="#9c846d" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="flex-1">
                  <span className="block text-sm font-mono text-[#ede4d4] tracking-wider mb-0.5">
                    {t.login?.passwordLabel || 'password'}
                  </span>
                  <input
                    id="admin-login-password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    placeholder={t.login?.enterPassword || '••••••••'}
                    className="w-full bg-transparent font-mono text-[#ede4d4] text-base border-b-2 border-dashed border-[#ede4d4] pb-1 focus:outline-hidden focus:border-solid transition-all placeholder-[#ede4d4]/50"
                  />
                </div>
              </div>

              {/* Forgot password checkbox on the right */}
              <div className="flex justify-end items-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const next = !forgotPassword;
                    setForgotPassword(next);
                    if (next) {
                      setShowForgotNotice(true);
                      setTimeout(() => setShowForgotNotice(false), 5000);
                    }
                  }}
                  className="flex items-center gap-2 text-xs font-mono text-[#ede4d4] hover:underline cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 border-2 border-[#ede4d4] rounded-xs flex items-center justify-center transition-colors ${
                      forgotPassword ? 'bg-[#ede4d4]' : 'bg-transparent'
                    }`}
                  >
                    {forgotPassword && <Check className="w-3 h-3 text-[#9c846d] stroke-[3]" />}
                  </div>
                  <span className="tracking-wide">{t.login?.forgotPassword || 'Forgot password'}</span>
                </button>
              </div>

              {showForgotNotice && (
                <div className="p-2.5 rounded-lg bg-[#503722]/60 border border-[#ede4d4]/30 text-xs font-mono text-[#ede4d4] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-200 shrink-0" />
                  <span>
                    {t.login?.passwordNotice || 'OTP recovery sent to registered mobile. Demo password:'} <strong>admin123</strong>
                  </span>
                </div>
              )}

              {error && (
                <div className="text-xs font-mono text-red-200 bg-red-900/50 p-2 rounded border border-red-300/40">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <div className="pt-3">
                <button
                  id="admin-submit-login-btn"
                  type="submit"
                  onClick={handleLogin}
                  className="w-full py-3 rounded-lg text-lg font-mono font-bold tracking-widest text-[#ede4d4] transition-all duration-200 shadow-md hover:shadow-lg hover:brightness-110 active:scale-98 cursor-pointer flex items-center justify-center"
                  style={{ backgroundColor: '#503722' }}
                >
                  {t.login?.signIn || 'LOGIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs font-mono text-[#7b6754]">
        {t.login?.adminSubtitle || 'Krishihaat Master Administration • Hub Operations, QC & Rider Dispatch'}
      </div>
    </div>
  );
};
