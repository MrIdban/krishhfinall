import React from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  Languages,
  Wheat,
  LayoutGrid,
  LogOut,
} from 'lucide-react';
import { KrishihaatLogo } from './KrishihaatLogo';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    currentView,
    setCurrentView,
    t,
    openFarmerPanel,
    currentUser,
    logout,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs">
      {/* Top Banner: Zero Middleman Assurance & Quick info */}
      <div className="bg-emerald-800 text-white text-xs px-3 py-1.5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-700 px-2 py-0.5 rounded-sm font-semibold tracking-wide flex items-center gap-1">
            <Wheat className="w-3.5 h-3.5 text-amber-300" />
            {t.header?.directFarmToFork || '100% DIRECT FARM-TO-FORK'}
          </span>
          <span className="hidden sm:inline text-emerald-100">
            {t.directMotto}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Active Logged-in User Badge */}
          {currentUser && (
            <div className="flex items-center gap-2 bg-emerald-900/80 px-2.5 py-0.5 rounded-md border border-emerald-700/60 text-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-stone-200">
                {t.header?.active || 'Active'}: <strong className="text-white">{currentUser.name}</strong>
              </span>
              <span className="bg-emerald-700 text-emerald-100 px-1.5 py-0.2 rounded uppercase font-bold text-3xs">
                {currentUser.role === 'admin' ? (t.header?.roles?.admin || 'Admin Hub') :
                 currentUser.role === 'farmer' ? (t.header?.roles?.farmer || 'Farmer') :
                 currentUser.role === 'rider' ? (t.header?.roles?.rider || 'Rider') : (t.header?.roles?.buyer || 'Buyer')}
              </span>
            </div>
          )}

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-emerald-900/60 rounded px-2 py-0.5">
            <Languages className="w-3.5 h-3.5 text-emerald-300" />
            <select
              id="header-language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-white text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="en" className="text-stone-900">English</option>
              <option value="hi" className="text-stone-900">हिन्दी (Hindi)</option>
              <option value="bn" className="text-stone-900">বাংলা (Bengali)</option>
              <option value="mr" className="text-stone-900">मराठी (Marathi)</option>
              <option value="pa" className="text-stone-900">ਪੰਜਾਬੀ (Punjabi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Bar with App Branding and Navigation Controls */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <div
            onClick={() => setCurrentView('choose')}
            className="flex items-center gap-2.5 cursor-pointer group"
            title="Return to beginning screen to choose side"
          >
            <div className="w-11 h-11 rounded-lg bg-[#ede4d4] border border-[#d3c4ad] flex items-center justify-center p-1 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <KrishihaatLogo className="w-full h-full" leafColor="#829c73" veinColor="#ede4d4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-stone-900 tracking-tight group-hover:text-emerald-800 transition-colors">
                  {t.appName}
                </span>
                <span className="text-2xs bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded font-medium border border-stone-300">
                  {t.header?.mandiDirect || 'MANDI DIRECT'}
                </span>
              </div>
              <p className="text-xs text-stone-500 line-clamp-1">
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls: Choose Side, Farmer Drawer & Log Out */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Switch Side Button */}
          <button
            id="header-switch-side-btn"
            onClick={() => setCurrentView('choose')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#ede4d4] hover:bg-[#e2d5c1] text-[#4a3623] border border-[#d1c2ab] shadow-2xs transition-all cursor-pointer"
            title="Return to start screen to choose side"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#6b855e]" />
            <span>{t.header?.switchPortal || 'Choose Side'}</span>
          </button>

          {/* Farmer Side Panel Trigger */}
          {(currentView === 'farmer' || currentView === 'client') && (
            <button
              id="header-open-farmer-panel-btn"
              onClick={() => openFarmerPanel()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs transition-colors cursor-pointer"
              title="Open Farmer Drawer: Reviews, Ratings, Earnings & Admin Support"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0">
                <Wheat className="w-3 h-3" />
              </div>
              <div className="text-left">
                <span className="block leading-tight font-bold">{t.farmerPanel.title}</span>
                <span className="text-3xs text-emerald-800 font-semibold block leading-tight">
                  {language === 'hi' ? 'त्वरित पैनल' : language === 'bn' ? 'দ্রুত প্যানেল' : language === 'mr' ? 'जलद पॅनेल' : language === 'pa' ? 'ਤੁਰੰਤ ਪੈਨਲ' : 'Quick Drawer'}
                </span>
              </div>
            </button>
          )}

          {/* Log out button when logged into a portal */}
          {currentUser && currentUser.role !== 'buyer' && (
            <button
              id="header-logout-btn"
              onClick={() => {
                logout();
                setCurrentView('choose');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-700 border border-stone-200 shadow-2xs transition-colors cursor-pointer"
              title="Log out and return to portal selection"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.header?.logout || 'Log Out'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
