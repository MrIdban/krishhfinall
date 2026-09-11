import React from 'react';
import { KrishihaatLogo } from '../KrishihaatLogo';
import {
  FarmerTileIcon,
  AdminTileIcon,
  BuyerTileIcon,
  DeliverTileIcon,
} from './RoleIcons';
import { WebsiteView, Language } from '../../types';
import { useApp } from '../../context/AppContext';
import { Languages } from 'lucide-react';

interface ChooseSideScreenProps {
  onSelectRole: (role: WebsiteView) => void;
}

export const ChooseSideScreen: React.FC<ChooseSideScreenProps> = ({ onSelectRole }) => {
  const { language, setLanguage, t } = useApp();

  const roleOptions: {
    id: WebsiteView;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'farmer',
      label: t.chooseSide?.farmerLabel || "I'm farmer",
      description: t.chooseSide?.farmerDesc || 'Crops, Daily Harvest Quota, Pricing & Mandi Payouts',
      icon: <FarmerTileIcon className="w-full h-full" />,
    },
    {
      id: 'admin',
      label: t.chooseSide?.adminLabel || "I'm Admin",
      description: t.chooseSide?.adminDesc || 'Mandi Hub Allocation, Gemini AI Forecast & Oversight',
      icon: <AdminTileIcon className="w-full h-full" />,
    },
    {
      id: 'client',
      label: t.chooseSide?.buyerLabel || "I'm Buyer",
      description: t.chooseSide?.buyerDesc || 'Direct Farm-to-Fork Store, Grades A/B/C & Cart',
      icon: <BuyerTileIcon className="w-full h-full" />,
    },
    {
      id: 'rider',
      label: t.chooseSide?.riderLabel || 'I deliver',
      description: t.chooseSide?.riderDesc || 'Electric Van Fleet, Routes, Pickups & OTP Drops',
      icon: <DeliverTileIcon className="w-full h-full" />,
    },
  ];

  return (
    <div
      id="krishihaat-choose-side-screen"
      className="min-h-screen w-full flex flex-col justify-between items-center px-4 py-8 sm:py-12 select-none relative overflow-x-hidden"
      style={{ backgroundColor: '#ede4d4' }}
    >
      {/* Top right language switch for multilingual accessibility */}
      <div className="w-full max-w-6xl flex justify-end items-center mb-4">
        <div className="flex items-center gap-1.5 bg-[#e2d6c3] border border-[#d1c2ab] rounded-full px-3 py-1 text-xs text-[#523d29] shadow-2xs">
          <Languages className="w-3.5 h-3.5 text-[#789568]" />
          <select
            id="choose-language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-transparent text-[#523d29] font-medium text-xs focus:outline-hidden cursor-pointer"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="bn">বাংলা (Bengali)</option>
            <option value="mr">मराठी (Marathi)</option>
            <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
          </select>
        </div>
      </div>

      {/* Main Center Area: Logo + Brand + 4 Role Cards */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-center my-auto">
        {/* Brand Leaf Logo & Title */}
        <div className="flex flex-col items-center mb-10 sm:mb-14">
          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 flex items-center justify-center transition-transform hover:scale-105 duration-300">
            <KrishihaatLogo
              className="w-full h-full"
              leafColor="#829c73"
              veinColor="#ede4d4"
            />
          </div>

          <h1
            className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wider uppercase text-center"
            style={{ color: '#4a3623', fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {t.appName || 'KRISHIHAAT'}
          </h1>

          <div
            className="mt-0.5 sm:mt-1 flex items-center gap-2 text-base sm:text-lg md:text-xl font-medium tracking-wide"
            style={{ color: '#829c73' }}
          >
            <span>{t.chooseSide?.brandTagline || 'Direct ₪ Fair'}</span>
          </div>
        </div>

        {/* 4 Large Rounded Green Role Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 w-full max-w-4xl justify-items-center">
          {roleOptions.map((role) => (
            <div
              key={role.id}
              className="flex flex-col items-center group w-36 sm:w-44 md:w-48 cursor-pointer"
              onClick={() => {
                if (role.id === 'farmer') onSelectRole('farmer_login');
                else if (role.id === 'admin') onSelectRole('admin_login');
                else if (role.id === 'rider') onSelectRole('rider_login');
                else onSelectRole(role.id);
              }}
            >
              {/* Rounded Green Tile */}
              <button
                id={`choose-role-btn-${role.id}`}
                type="button"
                className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-3xl sm:rounded-4xl p-4 sm:p-5 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 group-hover:scale-102 active:scale-95 group-active:translate-y-0 cursor-pointer"
                style={{ backgroundColor: '#8ca57f' }}
                title={
                  role.id === 'farmer'
                    ? 'Enter Farmer Login'
                    : role.id === 'admin'
                    ? 'Enter Admin Login'
                    : `Enter as ${role.label}`
                }
              >
                <div className="w-full h-full transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                  {role.icon}
                </div>
              </button>

              {/* Monospaced Label beneath tile */}
              <span
                className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-mono tracking-wider font-semibold transition-colors duration-200 group-hover:underline text-center"
                style={{ color: '#4a331e' }}
              >
                {role.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle bottom note */}
      <div className="text-center mt-8 text-xs font-mono" style={{ color: '#7a6450' }}>
        {t.chooseSide?.subtitle || 'Select a portal to enter the Krishihaat ecosystem • You can switch anytime'}
      </div>
    </div>
  );
};
