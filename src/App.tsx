import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { ClientApp } from './components/client/ClientApp';
import { AdminApp } from './components/admin/AdminApp';
import { RiderApp } from './components/rider/RiderApp';
import { FarmerApp } from './components/farmer/FarmerApp';
import { FarmerSidePanel } from './components/farmer/FarmerSidePanel';
import { ChooseSideScreen } from './components/landing/ChooseSideScreen';
import { FarmerLoginScreen } from './components/farmer/FarmerLoginScreen';
import { AdminLoginScreen } from './components/admin/AdminLoginScreen';
import { RiderLoginScreen } from './components/rider/RiderLoginScreen';
import { GoogleAd } from './components/ads/GoogleAd';
import { CheckCircle2, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    notification,
    dismissNotification,
  } = useApp();

  // If in 'choose' view (at the beginning), show the full-screen role selector matching uploaded design
  if (currentView === 'choose') {
    return <ChooseSideScreen onSelectRole={(role) => setCurrentView(role)} />;
  }

  // If in 'farmer_login' view, show the dedicated Farmer Login screen matching uploaded design
  if (currentView === 'farmer_login') {
    return (
      <FarmerLoginScreen
        onBack={() => setCurrentView('choose')}
        onSuccess={() => setCurrentView('farmer')}
      />
    );
  }

  // If in 'admin_login' view, show the dedicated Admin Login screen matching uploaded design
  if (currentView === 'admin_login') {
    return (
      <AdminLoginScreen
        onBack={() => setCurrentView('choose')}
        onSuccess={() => setCurrentView('admin')}
      />
    );
  }

  // If in 'rider_login' view, show the dedicated Rider Login screen matching uploaded design
  if (currentView === 'rider_login') {
    return (
      <RiderLoginScreen
        onBack={() => setCurrentView('choose')}
        onSuccess={() => setCurrentView('rider')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 font-sans text-stone-900 selection:bg-emerald-200">
      {/* Toast Notification for cross-site actions */}
      {notification && (
        <div className="fixed top-14 right-4 z-50 max-w-md bg-stone-900 text-white px-4 py-3 rounded-lg shadow-xl border border-stone-700 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs font-medium leading-relaxed flex-1">
            {notification}
          </div>
          <button
            onClick={dismissNotification}
            className="text-stone-400 hover:text-white p-0.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Global Brand & Navigation */}
      <Header />

      {/* Top Google Ads Leaderboard Banner */}
      <GoogleAd
        id="google-ad-top-leaderboard"
        variant="leaderboard"
        slot="1234567890"
        className="mt-2"
      />

      {/* Farmer Side Panel (Drawer for Reviews, Ratings, Earnings, Admin Support) */}
      <FarmerSidePanel />

      {/* Active Website View Container */}
      <main className="flex-1">
        {currentView === 'client' && <ClientApp />}
        {currentView === 'admin' && <AdminApp />}
        {currentView === 'rider' && <RiderApp />}
        {currentView === 'farmer' && <FarmerApp />}
      </main>

      {/* Bottom Google Ads Banner */}
      <GoogleAd
        id="google-ad-bottom-banner"
        variant="footer"
        slot="3456789012"
      />

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs py-5 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-bold text-stone-200">Krishihaat (कृषिहाट)</span> • Direct Farmer-to-Fork Mandi Platform
            <p className="text-2xs text-stone-500 mt-0.5">
              Designed for authentic local clusters • Zero Middleman Network • 100% Transparent Vegetable Grading
            </p>
          </div>
          <div className="text-2xs text-stone-500">
            Current Hub: Sehore Rural Mandi Cluster #04 (Local Officer: Rameshwar Patel)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
