import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Check, AlertCircle, Languages } from 'lucide-react';
import { Language } from '../../types';

interface RiderLoginScreenProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

export const RiderLoginScreen: React.FC<RiderLoginScreenProps> = ({ onSuccess, onBack }) => {
  const { setCurrentView, notify, login, riders, setSelectedRiderId, t, language, setLanguage } = useApp();

  const [phone, setPhone] = useState('9755122910');
  const [password, setPassword] = useState('rider123');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showForgotNotice, setShowForgotNotice] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!phone.trim()) {
      setError(t.login?.enterPhone || 'Please enter your phone number or Rider ID');
      return;
    }
    if (!password.trim()) {
      setError(t.login?.enterPassword || 'Please enter your password');
      return;
    }

    try {
      // Validate credentials with login()
      const res = login('rider', phone, password);
      if (!res.success) {
        setError(res.message || 'Incorrect password! Please try again.');
        return;
      }

      // Find matching rider or default to first rider
      const cleanDigits = phone.replace(/\D/g, '');
      const matchedRider = riders.find(
        (r) => r.phone.replace(/\D/g, '') === cleanDigits || r.id === phone.trim()
      ) || riders[0];

      if (matchedRider && setSelectedRiderId) {
        setSelectedRiderId(matchedRider.id);
      }

      setError(null);
      if (onSuccess) {
        onSuccess();
      } else {
        setCurrentView('rider');
      }
    } catch (err) {
      console.error('Rider login error:', err);
      setError('An error occurred during authentication.');
    }
  };

  return (
    <div
      id="rider-login-screen"
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
            {t.login?.riderTitle || 'Krishihaat Delivery Fleet Portal'}
          </span>

          <div className="flex items-center gap-1 bg-[#dfd4c1] border border-[#cfbeaa] rounded-full px-2.5 py-1 text-xs text-[#503722]">
            <Languages className="w-3.5 h-3.5 text-[#503722]" />
            <select
              id="rider-login-language-select"
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

      {/* Main Login Card - Matching sketch design */}
      <div className="my-auto w-full flex flex-col items-center">
        <div className="relative w-full max-w-[420px] pt-16">
          {/* Circular Overlapping Avatar Badge */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-36 h-36 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: '#8ca57f' }}
          >
            {/* Delivery Rider & Cradling Hands Icon */}
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-28 h-28"
            >
              {/* 3D Isometric Parcel / Box in center */}
              <g transform="translate(100, 72)">
                {/* Top face */}
                <path
                  d="M0 -22 L26 -8 L0 6 L-26 -8 Z"
                  fill="#4a331e"
                />
                {/* Left face */}
                <path
                  d="M-26 -8 L0 6 L0 36 L-26 22 Z"
                  fill="#4a331e"
                />
                {/* Right face */}
                <path
                  d="M26 -8 L0 6 L0 36 L26 22 Z"
                  fill="#4a331e"
                />
                {/* Inner seam line on box top (matching green) */}
                <path
                  d="M0 -22 L0 6"
                  stroke="#8ca57f"
                  strokeWidth="2.5"
                />
                {/* Side seam lines */}
                <path
                  d="M-26 -8 L0 6 L26 -8"
                  stroke="#8ca57f"
                  strokeWidth="2"
                />
              </g>

              {/* Left Cradling Hand & Arm */}
              <path
                d="M44 126 C44 126 44 148 44 156 C44 162 48 165 54 165 L66 165 C72 165 76 162 78 156 L78 140 L88 152 C92 157 98 157 102 153 C106 149 106 143 101 138 L76 112 C71 107 63 107 58 112 L50 120"
                stroke="#4a331e"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M45 130 V165 H65 V145"
                fill="#4a331e"
              />

              {/* Right Cradling Hand & Arm */}
              <path
                d="M156 126 C156 126 156 148 156 156 C156 162 152 165 146 165 L134 165 C128 165 124 162 122 156 L122 140 L112 152 C108 157 102 157 98 153 C94 149 94 143 99 138 L124 112 C129 107 137 107 142 112 L150 120"
                stroke="#4a331e"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M155 130 V165 H135 V145"
                fill="#4a331e"
              />
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
                    {t.login?.phoneLabel || 'phone no.'}
                  </span>
                  <input
                    id="rider-login-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError(null);
                    }}
                    placeholder={t.login?.enterPhone || 'e.g. 9755122910'}
                    className="w-full bg-transparent border-b-2 border-[#ede4d4] text-[#ede4d4] text-base font-mono py-1 focus:outline-none focus:border-amber-200 placeholder-[#ede4d4]/50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex items-center gap-4">
                {/* Key Icon */}
                <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 text-[#ede4d4]"
                  >
                    <path
                      d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5-1.4 1.4 2.1 2.1-1.4 1.4-2.1-2.1-1.4 1.4 1.4 1.4-1.4 1.4-1.4-1.4-2.1 2.1a6 6 0 1 1-1.4-1.4l9.2-9.2L17.5 4 19 2.5 21 2z"
                      stroke="#ede4d4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="7.5" cy="16.5" r="1.5" fill="#ede4d4" />
                  </svg>
                </div>

                <div className="flex-1">
                  <span className="block text-sm font-mono text-[#ede4d4] tracking-wider mb-0.5">
                    {t.login?.passwordLabel || 'password'}
                  </span>
                  <input
                    id="rider-login-password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    placeholder={t.login?.enterPassword || '••••••••'}
                    className="w-full bg-transparent border-b-2 border-[#ede4d4] text-[#ede4d4] text-base font-mono py-1 focus:outline-none focus:border-amber-200 placeholder-[#ede4d4]/50"
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
                      setTimeout(() => setShowForgotNotice(false), 6000);
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
                    {t.login?.passwordNotice || 'Rider fleet bypass active. Demo password:'} <strong>rider123</strong> (Bablu Kumar)
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
                  id="rider-submit-login-btn"
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
        {t.login?.riderSubtitle || 'Krishihaat Electric Delivery Fleet • Sehore Mandi Hub Dispatch & Route Hub'}
      </div>
    </div>
  );
};
