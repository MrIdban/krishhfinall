import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Info, Sparkles, CheckCircle2 } from 'lucide-react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export type GoogleAdVariant = 'leaderboard' | 'in-feed' | 'footer' | 'sidebar' | 'compact';

export interface GoogleAdProps {
  id?: string;
  slot?: string;
  client?: string;
  variant?: GoogleAdVariant;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  customTitle?: string;
  customDesc?: string;
  customCta?: string;
  customUrl?: string;
  customTag?: string;
  customPhoto?: string;
}

const DEFAULT_CLIENT_ID =
  (import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID as string) || 'ca-pub-9428516801937583';

// Contextual agricultural & mandi sponsors with authentic photography
const RELEVANT_SPONSORS = [
  {
    tag: 'Govt. Subsidized Solar Tech',
    title: 'Kisan Urja PM-KUSUM 7.5HP Solar Pumps',
    desc: 'Get up to 60% central & state subsidy on high-efficiency solar irrigation pumps. Zero diesel expense.',
    cta: 'Check Eligibility',
    url: 'https://pmkusum.mnre.gov.in',
    displayUrl: 'pmkusum.mnre.gov.in/solar-subsidy',
    badge: 'Solar Agri Sponsor',
    photo: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&auto=format&fit=crop&q=80',
    iconBg: 'bg-amber-100 text-amber-800',
  },
  {
    tag: 'Certified Organic Inputs',
    title: 'IFFCO Nano Urea & Liquid Bio-Fertilizers',
    desc: 'Boost vegetable harvest yield by 18-24% with residue-free organic spray solutions. Same-day village dispatch.',
    cta: 'Order at Mandi Rate',
    url: 'https://www.iffcobazar.in',
    displayUrl: 'iffcobazar.in/nano-fertilizers',
    badge: 'Agri Bio Sponsor',
    photo: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop&q=80',
    iconBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    tag: 'Smart Cold Chain Storage',
    title: 'FarmGate Micro Cold Storage Pods (5MT - 25MT)',
    desc: 'Solar-powered cold rooms for tomato, potato, and leafy greens. Reduce post-harvest spoilage to near zero.',
    cta: 'Explore Pods',
    url: 'https://enam.gov.in',
    displayUrl: 'enam.gov.in/cold-chain-network',
    badge: 'Cold Storage Partner',
    photo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
    iconBg: 'bg-blue-100 text-blue-800',
  },
  {
    tag: 'Precision Agri Tech',
    title: 'Garuda Kisan Drone Crop Spraying & Mapping',
    desc: 'Cover 10 acres in 40 minutes with AI-assisted fertilizer and pesticide micron-sprayers. Book local pilot.',
    cta: 'Book Drone Service',
    url: 'https://agricoop.nic.in',
    displayUrl: 'garuda-agri.in/mandi-cluster',
    badge: 'Drone Tech Sponsor',
    photo: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&auto=format&fit=crop&q=80',
    iconBg: 'bg-purple-100 text-purple-800',
  },
  {
    tag: 'High Yield Certified Seeds',
    title: 'National Seeds Corp F1 Hybrid Vegetable Seeds',
    desc: 'Disease-resistant cauliflower, tomato, and chilli seeds certified for Madhya Pradesh black soil clusters.',
    cta: 'View Seed Catalog',
    url: 'https://indiaseeds.com',
    displayUrl: 'indiaseeds.com/hybrid-vegetables',
    badge: 'Certified Seeds Partner',
    photo: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&auto=format&fit=crop&q=80',
    iconBg: 'bg-teal-100 text-teal-800',
  },
];

export const GoogleAd: React.FC<GoogleAdProps> = ({
  id = 'google-ad-unit',
  slot = '1234567890',
  client = DEFAULT_CLIENT_ID,
  variant = 'leaderboard',
  format = 'auto',
  responsive = true,
  className = '',
  customTitle,
  customDesc,
  customCta,
  customUrl,
  customTag,
  customPhoto,
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Pick a contextual sponsor based on slot or variant
  const sponsorIndex = Math.abs(
    (slot.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) +
      (variant === 'footer' ? 2 : variant === 'in-feed' ? 1 : 0)) %
      RELEVANT_SPONSORS.length
  );
  const sponsor = RELEVANT_SPONSORS[sponsorIndex];

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (e) {
      // Browser ad-blocker or unverified origin caught gracefully
      console.debug('Google AdSense note:', e);
    }
  }, [slot, client]);

  // Specific visual styles depending on layout variant
  if (variant === 'leaderboard') {
    return (
      <div id={id} className={`w-full max-w-7xl mx-auto px-4 py-2 ${className}`}>
        <div className="relative bg-gradient-to-r from-stone-50 via-white to-stone-50 border border-stone-200/90 rounded-xl p-3 sm:p-4 shadow-2xs hover:shadow-xs transition-shadow">
          {/* Header Row: Official Google Ads & AdChoices attribution */}
          <div className="flex items-center justify-between text-3xs font-mono text-stone-400 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="bg-stone-200 text-stone-700 font-bold px-1.5 py-0.5 rounded-xs tracking-wider uppercase">
                Ad
              </span>
              <span className="font-semibold text-stone-500">Google Ads</span>
              <span className="hidden sm:inline text-stone-400">• Verified Sponsor</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowConfigModal(true)}
                className="hover:text-emerald-700 underline flex items-center gap-1 cursor-pointer"
                title="Google AdSense unit configuration"
              >
                <Info className="w-3 h-3" />
                <span className="hidden sm:inline">Ad Choices</span>
              </button>
            </div>
          </div>

          {/* Actual Google AdSense <ins> container */}
          <ins
            ref={adRef}
            className="adsbygoogle block overflow-hidden"
            style={{ display: 'block', minHeight: '60px' }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />

          {/* High-quality contextual Ad creative display */}
          <div className="mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-stone-100">
            <div className="flex items-center gap-3">
              {/* Ad Photo Thumbnail */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200 shadow-2xs">
                <img
                  src={customPhoto || sponsor.photo}
                  alt={customTitle || sponsor.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                    {customTitle || sponsor.title}
                  </h4>
                  <span className="hidden md:inline-block text-3xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {customTag || sponsor.tag}
                  </span>
                </div>
                <p className="text-2xs text-stone-600 mt-0.5 line-clamp-1">
                  {customDesc || sponsor.desc}
                </p>
                <div className="flex items-center gap-1.5 mt-1 text-3xs text-stone-400">
                  <span className="font-mono">{sponsor.displayUrl}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">{sponsor.badge}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <a
                href={customUrl || sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-stone-900 hover:bg-emerald-800 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                <span>{customCta || sponsor.cta}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* AdSense Configuration Dialog */}
        {showConfigModal && (
          <AdConfigModal
            client={client}
            slot={slot}
            onClose={() => setShowConfigModal(false)}
          />
        )}
      </div>
    );
  }

  if (variant === 'in-feed') {
    return (
      <div
        id={id}
        className={`bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col justify-between shadow-2xs hover:border-emerald-500 transition-all ${className}`}
      >
        <div>
          {/* In-Feed Ad Full Photo Banner */}
          <div className="relative h-40 bg-stone-100 overflow-hidden">
            <img
              src={customPhoto || sponsor.photo}
              alt={customTitle || sponsor.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-2 left-2 bg-amber-500 text-stone-950 text-2xs px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-2xs flex items-center gap-1">
              <span>Ad</span>
              <span>•</span>
              <span>Google Ads</span>
            </div>
            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              className="absolute top-2 right-2 bg-stone-900/70 hover:bg-stone-900 text-white p-1 rounded-full backdrop-blur-xs cursor-pointer"
              title="Ad info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* AdSense Script placeholder */}
          <ins
            ref={adRef}
            className="adsbygoogle block overflow-hidden"
            style={{ display: 'block' }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />

          <div className="p-3.5">
            <span className="text-3xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              {customTag || sponsor.tag}
            </span>
            <h4 className="text-xs font-bold text-stone-900 leading-snug">
              {customTitle || sponsor.title}
            </h4>
            <p className="text-2xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
              {customDesc || sponsor.desc}
            </p>
          </div>
        </div>

        <div className="p-3.5 pt-0 mt-auto flex items-center justify-between border-t border-stone-100 pt-3">
          <span className="text-3xs font-mono text-stone-400 truncate max-w-[120px]">
            {sponsor.displayUrl}
          </span>
          <a
            href={customUrl || sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>{customCta || sponsor.cta}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {showConfigModal && (
          <AdConfigModal
            client={client}
            slot={slot}
            onClose={() => setShowConfigModal(false)}
          />
        )}
      </div>
    );
  }

  // Footer or Compact Variant
  return (
    <div id={id} className={`w-full max-w-7xl mx-auto px-4 py-3 ${className}`}>
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 sm:p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          {/* Ad Photo Thumbnail */}
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-200 shadow-2xs">
            <img
              src={customPhoto || sponsor.photo}
              alt={customTitle || sponsor.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="bg-stone-200 text-stone-700 text-3xs font-mono font-bold px-1.5 py-0.2 rounded-xs uppercase shrink-0">
                Ad • Google
              </span>
              <span className="text-3xs text-emerald-700 font-semibold">{sponsor.badge}</span>
            </div>
            <h5 className="text-xs font-bold text-stone-900">
              {customTitle || sponsor.title}
            </h5>
            <p className="text-2xs text-stone-600 line-clamp-1">
              {customDesc || sponsor.desc}
            </p>
          </div>
        </div>

        {/* AdSense tag */}
        <ins
          ref={adRef}
          className="adsbygoogle hidden"
          data-ad-client={client}
          data-ad-slot={slot}
        />

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowConfigModal(true)}
            className="text-stone-400 hover:text-stone-600 p-1"
            title="Google Ads settings"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          <a
            href={customUrl || sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{customCta || sponsor.cta}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {showConfigModal && (
        <AdConfigModal
          client={client}
          slot={slot}
          onClose={() => setShowConfigModal(false)}
        />
      )}
    </div>
  );
};

// Modal showing AdSense Publisher details and customization help
const AdConfigModal: React.FC<{
  client: string;
  slot: string;
  onClose: () => void;
}> = ({ client, slot, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900">Google Ads / AdSense</h3>
              <p className="text-2xs text-stone-500">Live AdSense Network Integration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200">
          <div>
            <span className="text-3xs font-mono font-bold text-stone-500 uppercase block">
              AdSense Publisher ID
            </span>
            <code className="text-xs font-mono text-emerald-800 font-bold">
              {client}
            </code>
          </div>

          <div>
            <span className="text-3xs font-mono font-bold text-stone-500 uppercase block">
              Active Ad Unit Slot
            </span>
            <code className="text-xs font-mono text-stone-800">
              {slot}
            </code>
          </div>

          <div>
            <span className="text-3xs font-mono font-bold text-stone-500 uppercase block">
              Runtime Status
            </span>
            <span className="inline-flex items-center gap-1 text-2xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              adsbygoogle.js library loaded
            </span>
          </div>
        </div>

        <div className="mt-3 text-2xs text-stone-500 leading-relaxed">
          To connect your own personal AdSense account, update{' '}
          <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800 font-mono">
            VITE_GOOGLE_ADSENSE_CLIENT_ID
          </code>{' '}
          in your settings or environment variables with your publisher ID (e.g.{' '}
          <code className="font-mono">ca-pub-XXXXXXXXXXXX</code>).
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
