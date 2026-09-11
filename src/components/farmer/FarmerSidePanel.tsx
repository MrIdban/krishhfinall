import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FarmerSupportTicket } from '../../types';
import {
  X,
  Star,
  DollarSign,
  Headphones,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  Send,
  PlusCircle,
  Wheat,
  Award,
  TrendingUp,
  CreditCard,
  Building2,
  Sparkles,
  ChevronRight,
  Filter,
  Check,
  RotateCcw,
} from 'lucide-react';

export const FarmerSidePanel: React.FC = () => {
  const {
    isFarmerPanelOpen,
    closeFarmerPanel,
    selectedFarmerId,
    setSelectedFarmerId,
    farmers,
    farmerReviews,
    farmerPayouts,
    farmerTickets,
    replyToFarmerReview,
    requestFarmerPayoutSettlement,
    sendFarmerSupportMessage,
    createFarmerSupportTicket,
    demandForecast,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'reviews' | 'rating' | 'earnings' | 'support' | 'quota'>('reviews');
  const [lotReadyConfirmed, setLotReadyConfirmed] = useState<boolean>(false);
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);

  // Reply state for reviews
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');

  // Support ticket active chat and new ticket form
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState<string>('');
  const [isRaisingTicket, setIsRaisingTicket] = useState<boolean>(false);
  const [newTicketSubject, setNewTicketSubject] = useState<string>('');
  const [newTicketCategory, setNewTicketCategory] = useState<FarmerSupportTicket['category']>('crate_supply');
  const [newTicketMessage, setNewTicketMessage] = useState<string>('');

  if (!isFarmerPanelOpen) return null;

  const activeFarmer = farmers.find((f) => f.id === selectedFarmerId) || farmers[0];

  // Farmer's reviews
  const thisFarmerReviews = farmerReviews.filter((r) => r.farmerId === activeFarmer.id);
  const filteredReviews = thisFarmerReviews.filter((r) => {
    if (selectedCropFilter !== 'all' && r.cropName !== selectedCropFilter) return false;
    if (selectedStarFilter !== null && r.rating !== selectedStarFilter) return false;
    return true;
  });

  // Calculate rating stats
  const totalReviewsCount = thisFarmerReviews.length;
  const averageRating =
    totalReviewsCount > 0
      ? (
          thisFarmerReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount
        ).toFixed(1)
      : activeFarmer.rating.toFixed(1);

  const starCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: thisFarmerReviews.filter((r) => r.rating === stars).length,
    percentage:
      totalReviewsCount > 0
        ? Math.round((thisFarmerReviews.filter((r) => r.rating === stars).length / totalReviewsCount) * 100)
        : 0,
  }));

  // Farmer's payouts
  const thisFarmerPayouts = farmerPayouts.filter((p) => p.farmerId === activeFarmer.id);
  const settledAmount = thisFarmerPayouts
    .filter((p) => p.status === 'settled')
    .reduce((sum, p) => sum + p.totalAmount, 0);
  const pendingAmount = thisFarmerPayouts
    .filter((p) => p.status === 'pending' || p.status === 'processing')
    .reduce((sum, p) => sum + p.totalAmount, 0);
  const totalEarnings = settledAmount + pendingAmount;

  // Crop-wise earnings calculation
  const cropEarningsMap: Record<string, number> = {};
  thisFarmerPayouts.forEach((p) => {
    const key = p.cropName.split(' ')[0] || p.cropName;
    cropEarningsMap[key] = (cropEarningsMap[key] || 0) + p.totalAmount;
  });

  // Farmer's support tickets
  const thisFarmerTickets = farmerTickets.filter((tkt) => tkt.farmerId === activeFarmer.id);
  const currentChatTicket = thisFarmerTickets.find((tkt) => tkt.id === activeTicketId) || thisFarmerTickets[0];

  const handleSendReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    replyToFarmerReview(reviewId, replyText.trim());
    setReplyText('');
    setReplyingReviewId(null);
  };

  const handleSendTicketMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketReplyText.trim() || !currentChatTicket) return;
    sendFarmerSupportMessage(currentChatTicket.id, ticketReplyText.trim());
    setTicketReplyText('');
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;
    const newId = createFarmerSupportTicket(
      activeFarmer.id,
      newTicketSubject.trim(),
      newTicketCategory,
      newTicketMessage.trim()
    );
    setActiveTicketId(newId);
    setNewTicketSubject('');
    setNewTicketMessage('');
    setIsRaisingTicket(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeFarmerPanel}
        aria-hidden="true"
      />

      {/* Slide-over Drawer */}
      <div
        id="farmer-side-panel"
        className="relative z-10 w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden border-l border-stone-300 animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="bg-emerald-900 text-white px-5 py-4 border-b border-emerald-800 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-800 border border-emerald-700 flex items-center justify-center text-amber-300 shrink-0">
                <Wheat className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold tracking-tight text-white">
                    {t.farmerPanel.title}
                  </h2>
                  <span className="text-2xs font-bold uppercase tracking-wider bg-emerald-800 text-emerald-200 border border-emerald-700 px-2 py-0.5 rounded">
                    KISAN PORTAL
                  </span>
                </div>
                <p className="text-xs text-emerald-200 line-clamp-1">
                  {t.farmerPanel.subTitle}
                </p>
              </div>
            </div>

            <button
              id="farmer-panel-close-btn"
              onClick={closeFarmerPanel}
              className="p-1.5 text-emerald-300 hover:text-white hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
              title={t.common.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Farmer Switcher & Active Identity Bar */}
          <div className="mt-3.5 pt-3 border-t border-emerald-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={activeFarmer.photoUrl}
                alt={activeFarmer.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{activeFarmer.name}</span>
                  {activeFarmer.verified ? (
                    <span className="flex items-center gap-1 text-2xs bg-emerald-800 text-emerald-200 px-1.5 py-0.2 rounded border border-emerald-700 font-medium">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Verified Kisan
                    </span>
                  ) : (
                    <span className="text-2xs bg-amber-900/80 text-amber-200 px-1.5 py-0.2 rounded border border-amber-700 font-medium">
                      Pending Verification
                    </span>
                  )}
                </div>
                <div className="text-2xs text-emerald-200 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                  <span>{activeFarmer.village}, {activeFarmer.tehsil}</span>
                  <span>•</span>
                  <span>{activeFarmer.kisanCardNo}</span>
                  <span>•</span>
                  <span className="text-amber-300 font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    {averageRating} ({totalReviewsCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Switch Farmer Dropdown */}
            <div className="w-full sm:w-auto">
              <label htmlFor="farmer-select-dropdown" className="sr-only">
                {t.farmerPanel.switchFarmer}
              </label>
              <select
                id="farmer-select-dropdown"
                value={activeFarmer.id}
                onChange={(e) => setSelectedFarmerId(e.target.value)}
                className="w-full sm:w-auto bg-emerald-800 text-white text-xs border border-emerald-700 rounded-md px-2.5 py-1.5 font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-400 cursor-pointer"
              >
                {farmers.map((farmer) => (
                  <option key={farmer.id} value={farmer.id} className="text-stone-900">
                    {farmer.name} ({farmer.village} - {farmer.rating}★)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Reviews, Rating, Earnings, Support) */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 py-2 flex items-center justify-between gap-1 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              id="farmer-tab-reviews"
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.farmerPanel.tabs.reviews}</span>
              <span
                className={`text-2xs px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'reviews' ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-700'
                }`}
              >
                {thisFarmerReviews.length}
              </span>
            </button>

            <button
              id="farmer-tab-rating"
              onClick={() => setActiveTab('rating')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'rating'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>{t.farmerPanel.tabs.rating}</span>
            </button>

            <button
              id="farmer-tab-earnings"
              onClick={() => setActiveTab('earnings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'earnings'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>{t.farmerPanel.tabs.earnings}</span>
              {pendingAmount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </button>

            <button
              id="farmer-tab-support"
              onClick={() => setActiveTab('support')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'support'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>{t.farmerPanel.tabs.support}</span>
              <span
                className={`text-2xs px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'support' ? 'bg-emerald-800 text-white' : 'bg-stone-200 text-stone-700'
                }`}
              >
                {thisFarmerTickets.length}
              </span>
            </button>

            <button
              id="farmer-tab-quota"
              onClick={() => setActiveTab('quota')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'quota'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Harvest Quota</span>
              <span className="text-3xs px-1.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900">
                Next-Day
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* ======================= TAB 1: REVIEWS ======================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Reviews Summary & Filter Bar */}
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 text-amber-900 font-bold text-xl px-3 py-1 rounded-md border border-amber-300 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    {averageRating}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
                      {t.farmerPanel.reviews.buyerReviews}
                    </h3>
                    <p className="text-2xs text-stone-500">
                      Direct feedback from verified neighborhood families and catering buyers
                    </p>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 self-stretch sm:self-auto">
                  <select
                    id="reviews-crop-filter"
                    value={selectedCropFilter}
                    onChange={(e) => setSelectedCropFilter(e.target.value)}
                    className="text-xs bg-white border border-stone-300 rounded px-2 py-1 font-medium text-stone-700 focus:outline-hidden"
                  >
                    <option value="all">{t.farmerPanel.reviews.filterAll}</option>
                    {activeFarmer.cropsGrown.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1 bg-white border border-stone-300 rounded px-1 py-0.5">
                    {[5, 4, 3].map((star) => (
                      <button
                        key={star}
                        id={`filter-star-${star}`}
                        onClick={() => setSelectedStarFilter(selectedStarFilter === star ? null : star)}
                        className={`text-2xs font-bold px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                          selectedStarFilter === star
                            ? 'bg-amber-500 text-white'
                            : 'text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        {star}★
                      </button>
                    ))}
                    {selectedStarFilter !== null && (
                      <button
                        onClick={() => setSelectedStarFilter(null)}
                        className="text-2xs text-stone-400 hover:text-stone-700 p-0.5"
                        title="Clear star filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              {filteredReviews.length === 0 ? (
                <div className="text-center py-12 bg-stone-50 rounded-lg border border-dashed border-stone-300">
                  <MessageSquare className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                  <p className="text-xs text-stone-600 font-medium">
                    {t.farmerPanel.reviews.noReviews}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCropFilter('all');
                      setSelectedStarFilter(null);
                    }}
                    className="mt-2 text-xs text-emerald-700 underline font-semibold"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      id={`review-card-${rev.id}`}
                      className="bg-white border border-stone-200 rounded-lg p-3.5 shadow-2xs hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-stone-900">
                              {rev.customerName}
                            </span>
                            <span className="text-2xs text-stone-500">
                              • {rev.customerLocation}
                            </span>
                            {rev.verifiedBuyer && (
                              <span className="text-2xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded font-medium flex items-center gap-0.5">
                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                {t.farmerPanel.reviews.verifiedBuyer}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center text-amber-500">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star
                                  key={idx}
                                  className={`w-3.5 h-3.5 ${
                                    idx < rev.rating
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-stone-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-2xs bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded font-medium">
                              {rev.cropName} (Grade {rev.grade})
                            </span>
                            <span className="text-2xs text-stone-400">
                              {rev.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Comment text */}
                      <p className="text-xs text-stone-700 mt-2.5 leading-relaxed bg-stone-50/70 p-2.5 rounded border border-stone-100">
                        "{rev.comment}"
                      </p>

                      {/* Farmer's Existing Reply */}
                      {rev.farmerReply && (
                        <div className="mt-2.5 pl-3 border-l-2 border-emerald-600 bg-emerald-50/50 p-2 rounded-r text-2xs">
                          <span className="font-bold text-emerald-900 flex items-center gap-1">
                            <Wheat className="w-3 h-3 text-emerald-700" />
                            {activeFarmer.name} (Farmer Reply):
                          </span>
                          <p className="text-emerald-800 mt-0.5 font-medium leading-relaxed">
                            {rev.farmerReply}
                          </p>
                        </div>
                      )}

                      {/* Reply button or inline reply form */}
                      {!rev.farmerReply && (
                        <div className="mt-2.5">
                          {replyingReviewId === rev.id ? (
                            <div className="space-y-2 bg-stone-50 p-2.5 rounded border border-stone-200">
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder={t.farmerPanel.reviews.replyPlaceholder}
                                rows={2}
                                className="w-full text-xs p-2 bg-white border border-stone-300 rounded focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                              />
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setReplyingReviewId(null);
                                    setReplyText('');
                                  }}
                                  className="text-xs text-stone-500 hover:text-stone-700 px-2 py-1"
                                >
                                  {t.common.cancel}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSendReply(rev.id)}
                                  className="text-xs bg-emerald-700 text-white font-semibold px-3 py-1 rounded hover:bg-emerald-800 cursor-pointer"
                                >
                                  {t.farmerPanel.reviews.sendReply}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              id={`reply-btn-${rev.id}`}
                              onClick={() => {
                                setReplyingReviewId(rev.id);
                                setReplyText('');
                              }}
                              className="text-2xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <MessageSquare className="w-3 h-3" />
                              Reply to Buyer
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ======================= TAB 2: RATING & QUALITY ======================= */}
          {activeTab === 'rating' && (
            <div className="space-y-4">
              {/* Big Rating Banner */}
              <div className="bg-linear-to-br from-emerald-900 to-emerald-950 text-white rounded-xl p-5 shadow-sm border border-emerald-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-emerald-800/80 border border-emerald-600 flex flex-col items-center justify-center text-center shadow-inner">
                      <span className="text-3xl font-extrabold text-amber-300 tracking-tight leading-none">
                        {averageRating}
                      </span>
                      <div className="flex items-center text-amber-400 mt-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                        ))}
                      </div>
                      <span className="text-3xs text-emerald-200 mt-0.5">out of 5.0</span>
                    </div>

                    <div>
                      <div className="text-xs uppercase font-bold tracking-wider text-emerald-300">
                        {t.farmerPanel.rating.overallScore}
                      </div>
                      <h3 className="text-base font-bold text-white mt-0.5">
                        {activeFarmer.name} • {activeFarmer.village}
                      </h3>
                      <p className="text-2xs text-emerald-200 mt-0.5">
                        Based on {totalReviewsCount} verified customer deliveries and local Mandi quality checks
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-800/50 border border-emerald-700/80 rounded-lg p-3 text-center min-w-[130px]">
                    <div className="text-2xs text-emerald-200 uppercase font-semibold">
                      Trust Standing
                    </div>
                    <div className="text-sm font-bold text-emerald-100 flex items-center justify-center gap-1 mt-0.5">
                      <Award className="w-4 h-4 text-amber-300" />
                      Top 2% Mandi
                    </div>
                  </div>
                </div>

                {/* Rating Distribution Bar */}
                <div className="mt-5 pt-4 border-t border-emerald-800 space-y-2">
                  <div className="text-2xs uppercase font-bold text-emerald-300 tracking-wider">
                    {t.farmerPanel.rating.ratingDistribution}
                  </div>
                  {starCounts.map((row) => (
                    <div key={row.stars} className="flex items-center gap-2.5 text-2xs">
                      <span className="w-8 text-emerald-200 font-medium text-right flex items-center justify-end gap-0.5">
                        {row.stars} <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                      </span>
                      <div className="flex-1 bg-emerald-950/80 h-2.5 rounded-full overflow-hidden border border-emerald-800">
                        <div
                          className="bg-amber-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${row.percentage}%` }}
                        />
                      </div>
                      <span className="w-12 text-emerald-300 font-mono text-right">
                        {row.percentage}% ({row.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Inspection & Compliance Metrics */}
              <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Mandi Quality Compliance Report (Sehore APMC)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                    <span className="text-2xs text-stone-500 uppercase font-bold">
                      {t.farmerPanel.rating.qualityScore}
                    </span>
                    <div className="text-lg font-bold text-emerald-900 mt-1 flex items-baseline gap-1">
                      98.4%
                      <span className="text-2xs text-emerald-600 font-normal">Pass Rate</span>
                    </div>
                    <p className="text-2xs text-stone-500 mt-1 leading-snug">
                      Verified by Mandi Officer Rameshwar Patel during daily crate sorting.
                    </p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                    <span className="text-2xs text-stone-500 uppercase font-bold">
                      {t.farmerPanel.rating.onTimeHarvest}
                    </span>
                    <div className="text-lg font-bold text-emerald-900 mt-1 flex items-baseline gap-1">
                      100%
                      <span className="text-2xs text-emerald-600 font-normal">Morning Dispatch</span>
                    </div>
                    <p className="text-2xs text-stone-500 mt-1 leading-snug">
                      Evening harvest crates prepared before 6:30 AM every morning.
                    </p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-3">
                    <span className="text-2xs text-stone-500 uppercase font-bold">
                      {t.farmerPanel.rating.zeroRejection}
                    </span>
                    <div className="text-lg font-bold text-emerald-900 mt-1 flex items-baseline gap-1">
                      0.0%
                      <span className="text-2xs text-emerald-600 font-normal">Return Rate</span>
                    </div>
                    <p className="text-2xs text-stone-500 mt-1 leading-snug">
                      Zero customer return complaints recorded this quarter.
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges & Mandi Accreditations */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  {t.farmerPanel.rating.badgesEarned}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="bg-white border border-stone-200 rounded-lg p-2.5 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">
                        Tier-1 Mandi Gold Farmer
                      </span>
                      <span className="text-2xs text-stone-500">
                        Granted by Sehore Agriculture Committee for consistent Grade-A output.
                      </span>
                    </div>
                  </div>

                  {activeFarmer.organicCertified && (
                    <div className="bg-white border border-stone-200 rounded-lg p-2.5 flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <Wheat className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-800 block">
                          Certified Organic Producer
                        </span>
                        <span className="text-2xs text-stone-500">
                          100% natural compost & bio-fertilizer verified on Plot #14.
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="bg-white border border-stone-200 rounded-lg p-2.5 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">
                        Morning Harvest Dispatch Champion
                      </span>
                      <span className="text-2xs text-stone-500">
                        Never delayed locality morning route delivery slots.
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-stone-200 rounded-lg p-2.5 flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">
                        Direct Kisan Credit Mandi Partner
                      </span>
                      <span className="text-2xs text-stone-500">
                        Card #{activeFarmer.kisanCardNo} with direct zero-fee settlement.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 3: EARNINGS & PAYOUTS ======================= */}
          {activeTab === 'earnings' && (
            <div className="space-y-4">
              {/* Earnings Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white border border-stone-200 rounded-xl p-3.5 shadow-2xs">
                  <span className="text-2xs font-bold text-stone-500 uppercase tracking-wide">
                    {t.farmerPanel.earnings.totalEarnings}
                  </span>
                  <div className="text-xl font-extrabold text-stone-900 mt-1">
                    ₹{totalEarnings.toLocaleString('en-IN')}
                  </div>
                  <div className="text-2xs text-emerald-700 font-medium flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    100% Direct Payouts
                  </div>
                </div>

                <div className="bg-white border border-stone-200 rounded-xl p-3.5 shadow-2xs">
                  <span className="text-2xs font-bold text-stone-500 uppercase tracking-wide">
                    {t.farmerPanel.earnings.settledAmount}
                  </span>
                  <div className="text-xl font-extrabold text-emerald-800 mt-1">
                    ₹{settledAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-2xs text-stone-500 mt-1">
                    Credited to Bank / UPI
                  </div>
                </div>

                <div className="bg-white border border-stone-200 rounded-xl p-3.5 shadow-2xs">
                  <span className="text-2xs font-bold text-stone-500 uppercase tracking-wide">
                    {t.farmerPanel.earnings.pendingAmount}
                  </span>
                  <div className="text-xl font-extrabold text-amber-700 mt-1">
                    ₹{pendingAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-2xs text-stone-500 mt-1">
                    For Morning Route Dispatch
                  </div>
                </div>
              </div>

              {/* Zero-Commission Mandi Direct Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-emerald-950">
                    Zero Middleman Commission Policy (0% Deductions)
                  </h4>
                  <p className="text-2xs text-emerald-800 mt-0.5 leading-relaxed">
                    {t.farmerPanel.earnings.directBankNote}
                  </p>
                </div>
                {pendingAmount > 0 && (
                  <button
                    id="request-advance-settlement-btn"
                    onClick={() => requestFarmerPayoutSettlement(activeFarmer.id)}
                    className="shrink-0 text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-3 py-1.5 rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    {t.farmerPanel.earnings.requestAdvance}
                  </button>
                )}
              </div>

              {/* Crop-Wise Earnings Breakdown */}
              <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5">
                  Earnings Breakdown By Crop
                </h4>
                <div className="space-y-2.5">
                  {Object.entries(cropEarningsMap).map(([crop, amount]) => {
                    const pct = totalEarnings > 0 ? Math.round((amount / totalEarnings) * 100) : 0;
                    return (
                      <div key={crop} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-stone-800">{crop}</span>
                          <span className="font-mono text-stone-900 font-bold">
                            ₹{amount.toLocaleString('en-IN')} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Transactions Ledger */}
              <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    {t.farmerPanel.earnings.transactionHistory}
                  </h4>
                  <span className="text-2xs text-stone-500">
                    {thisFarmerPayouts.length} transactions recorded
                  </span>
                </div>

                <div className="space-y-2.5">
                  {thisFarmerPayouts.map((tx) => (
                    <div
                      key={tx.id}
                      id={`payout-tx-${tx.id}`}
                      className="border border-stone-200 rounded-lg p-3 hover:border-stone-300 transition-colors bg-stone-50/50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-stone-900">
                              {tx.cropName}
                            </span>
                            <span className="text-2xs bg-stone-200 text-stone-800 font-bold px-1.5 py-0.2 rounded">
                              Grade {tx.grade}
                            </span>
                            {tx.orderNumber && (
                              <span className="text-2xs text-stone-500 font-mono">
                                #{tx.orderNumber}
                              </span>
                            )}
                          </div>
                          <div className="text-2xs text-stone-500 mt-1 flex flex-wrap items-center gap-x-2">
                            <span>{tx.quantityKg} kg @ ₹{tx.ratePerKg}/kg</span>
                            <span>•</span>
                            <span>{tx.date}</span>
                          </div>
                          <div className="text-2xs text-stone-600 font-medium mt-1">
                            {tx.payoutMethod}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-extrabold text-stone-900">
                            ₹{tx.totalAmount.toLocaleString('en-IN')}
                          </div>
                          <span
                            className={`inline-block mt-1 text-2xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              tx.status === 'settled'
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {tx.status === 'settled' ? 'SETTLED' : 'PENDING'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 4: ADMIN SUPPORT ======================= */}
          {activeTab === 'support' && (
            <div className="space-y-4">
              {/* Local Officer Desk Card */}
              <div className="bg-stone-900 text-white rounded-xl p-4 shadow-sm border border-stone-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xs uppercase tracking-wider text-emerald-400 font-bold">
                        {t.farmerPanel.support.officerTitle}
                      </div>
                      <h4 className="text-sm font-bold text-white">
                        {t.farmerPanel.support.officerName}
                      </h4>
                      <p className="text-2xs text-stone-300 mt-0.5">
                        Cluster Office: Sehore Rural Mandi Hub #04 • 6:00 AM - 7:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${t.farmerPanel.support.officerContact}`}
                      id="call-officer-btn"
                      className="text-xs bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {t.farmerPanel.support.officerContact}
                    </a>
                  </div>
                </div>

                <p className="text-2xs text-stone-400 mt-3 pt-2.5 border-t border-stone-800 leading-relaxed">
                  {t.farmerPanel.support.directDeskNotice}
                </p>
              </div>

              {/* Tickets List & New Request Header */}
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  {t.farmerPanel.support.yourTickets} ({thisFarmerTickets.length})
                </h4>
                <button
                  id="farmer-raise-ticket-btn"
                  onClick={() => setIsRaisingTicket(!isRaisingTicket)}
                  className="text-xs bg-emerald-700 text-white font-semibold px-3 py-1 rounded-md hover:bg-emerald-800 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  {isRaisingTicket ? t.common.cancel : t.farmerPanel.support.raiseTicket}
                </button>
              </div>

              {/* Raise New Ticket Form */}
              {isRaisingTicket && (
                <form
                  onSubmit={handleCreateTicketSubmit}
                  className="bg-stone-50 border border-emerald-300 rounded-xl p-4 space-y-3 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-950">
                      Submit Mandi Admin Inquiry
                    </span>
                    <span className="text-2xs text-stone-500">
                      Direct notification to Officer Rameshwar Patel
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-2xs font-bold text-stone-700 block mb-1">
                        {t.farmerPanel.support.category}
                      </label>
                      <select
                        value={newTicketCategory}
                        onChange={(e) =>
                          setNewTicketCategory(e.target.value as FarmerSupportTicket['category'])
                        }
                        className="w-full text-xs bg-white border border-stone-300 rounded-md p-2 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="crate_supply">Harvesting Crates Supply & Transport</option>
                        <option value="payment">Advance Payout & Token Settlement</option>
                        <option value="quota">Harvest Quota Expansion (Catering Bulk)</option>
                        <option value="grading_dispute">Grading & Quality Score Inquiry</option>
                        <option value="crop_advisory">Soil Nutrient & Organic Certification</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-2xs font-bold text-stone-700 block mb-1">
                        {t.farmerPanel.support.subject}
                      </label>
                      <input
                        type="text"
                        value={newTicketSubject}
                        onChange={(e) => setNewTicketSubject(e.target.value)}
                        placeholder="e.g. Need 30 extra plastic crates for morning lot"
                        className="w-full text-xs bg-white border border-stone-300 rounded-md p-2 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-2xs font-bold text-stone-700 block mb-1">
                      {t.farmerPanel.support.message}
                    </label>
                    <textarea
                      value={newTicketMessage}
                      onChange={(e) => setNewTicketMessage(e.target.value)}
                      placeholder="Describe details regarding harvest date, lot size, or vehicle timing..."
                      rows={3}
                      className="w-full text-xs bg-white border border-stone-300 rounded-md p-2 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsRaisingTicket(false)}
                      className="text-xs text-stone-600 px-3 py-1.5"
                    >
                      {t.common.cancel}
                    </button>
                    <button
                      type="submit"
                      id="farmer-submit-ticket-btn"
                      className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-1.5 rounded-md shadow-xs cursor-pointer"
                    >
                      {t.farmerPanel.support.submit}
                    </button>
                  </div>
                </form>
              )}

              {/* Tickets Discussion Threads */}
              <div className="space-y-3">
                {thisFarmerTickets.map((ticket) => {
                  const isSelected = ticket.id === (currentChatTicket?.id || activeTicketId);
                  return (
                    <div
                      key={ticket.id}
                      id={`ticket-thread-${ticket.id}`}
                      className={`border rounded-xl p-3.5 transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-white shadow-xs ring-1 ring-emerald-500/20'
                          : 'border-stone-200 bg-stone-50/70 hover:bg-white'
                      }`}
                    >
                      <div
                        className="flex items-start justify-between gap-2 cursor-pointer"
                        onClick={() => setActiveTicketId(ticket.id)}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-2xs font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                              #{ticket.ticketNo}
                            </span>
                            <h5 className="text-xs font-bold text-stone-900">
                              {ticket.subject}
                            </h5>
                          </div>
                          <div className="text-2xs text-stone-500 mt-1 flex items-center gap-2">
                            <span className="capitalize">
                              Category: {ticket.category.replace('_', ' ')}
                            </span>
                            <span>•</span>
                            <span>Created: {ticket.createdAt}</span>
                          </div>
                        </div>

                        <span
                          className={`text-2xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            ticket.status === 'resolved'
                              ? 'bg-stone-200 text-stone-700'
                              : ticket.status === 'in_progress'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </div>

                      {/* Chat Messages inside this ticket */}
                      <div className="mt-3 pt-3 border-t border-stone-200 space-y-2.5">
                        {ticket.messages.map((msg) => {
                          const isFarmer = msg.sender === 'farmer';
                          return (
                            <div
                              key={msg.id}
                              className={`flex flex-col ${
                                isFarmer ? 'items-end' : 'items-start'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 mb-0.5 text-3xs text-stone-500">
                                <span>{msg.senderName}</span>
                                <span>•</span>
                                <span>{msg.timestamp}</span>
                              </div>
                              <div
                                className={`text-xs p-2.5 rounded-lg max-w-[85%] leading-relaxed ${
                                  isFarmer
                                    ? 'bg-emerald-800 text-white rounded-tr-xs'
                                    : 'bg-white text-stone-800 border border-stone-300 rounded-tl-xs shadow-2xs'
                                }`}
                              >
                                {msg.text}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Send Message to Admin */}
                      {isSelected && (
                        <form
                          onSubmit={handleSendTicketMessage}
                          className="mt-3 pt-2.5 border-t border-stone-200 flex items-center gap-2"
                        >
                          <input
                            type="text"
                            value={ticketReplyText}
                            onChange={(e) => setTicketReplyText(e.target.value)}
                            placeholder={t.farmerPanel.support.replyAsFarmer}
                            className="flex-1 text-xs bg-white border border-stone-300 rounded-md px-3 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                          />
                          <button
                            type="submit"
                            className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-3 py-1.5 rounded-md flex items-center gap-1 shrink-0 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{t.farmerPanel.support.send}</span>
                          </button>
                        </form>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================= TAB 5: AI HARVEST QUOTA ======================= */}
          {activeTab === 'quota' && (() => {
            const thisFarmerQuota = demandForecast?.farmerQuotas.find(
              (q) => q.farmerId === activeFarmer.id
            );
            const cropForecast = demandForecast?.cropForecasts.find(
              (c) =>
                c.cropName.toLowerCase().includes(thisFarmerQuota?.crop.toLowerCase() || '') ||
                (thisFarmerQuota?.crop.toLowerCase() || '').includes(c.cropName.toLowerCase())
            );

            return (
              <div className="space-y-4">
                {/* Quota Banner */}
                <div className="bg-gradient-to-br from-emerald-900 to-stone-900 text-white p-4 rounded-xl shadow-xs border border-emerald-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-2xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Next-Day Morning Delivery Model
                    </span>
                    <span className="text-2xs text-emerald-300 font-mono">
                      {demandForecast?.forecastDate || 'Tomorrow 6:30 AM'}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white">
                    AI Harvest Quota for {activeFarmer.name}
                  </h3>
                  <p className="text-2xs text-emerald-100/80 mt-1 leading-relaxed">
                    Based on Gemini AI predictive demand across Sehore households and local caterers. Zero overharvesting, zero distress sales.
                  </p>
                </div>

                {thisFarmerQuota ? (
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xs font-bold text-stone-500 uppercase tracking-wider">
                          Allocated Morning Crop
                        </div>
                        <div className="text-lg font-black text-stone-900">
                          {thisFarmerQuota.crop}
                        </div>
                        <div className="text-2xs text-emerald-700 font-semibold mt-0.5">
                          {activeFarmer.village} Farm Cluster
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-black text-emerald-700">
                          {thisFarmerQuota.recommendedHarvestKg} <span className="text-sm font-bold text-stone-600">kg</span>
                        </div>
                        <div className="text-2xs font-semibold text-stone-500">
                          {thisFarmerQuota.cratesNeeded} Reusable Crates
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-2xs bg-white p-3 rounded-lg border border-stone-200">
                      <div>
                        <span className="text-stone-500 block">Harvest Ready Deadline:</span>
                        <strong className="text-amber-800 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          {thisFarmerQuota.suggestedReadyTime}
                        </strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Locality Route Time:</span>
                        <strong className="text-stone-800 mt-0.5 block">
                          6:30 AM - 9:30 AM
                        </strong>
                      </div>
                    </div>

                    <div className="text-2xs text-stone-600 bg-emerald-50/70 border border-emerald-200 rounded-lg p-3">
                      <strong>AI Dispatch Logic:</strong> {thisFarmerQuota.reason}
                    </div>

                    {/* Readiness Action */}
                    <div className="pt-1">
                      {lotReadyConfirmed ? (
                        <div className="p-3 bg-green-100 border border-green-300 rounded-lg text-green-900 text-xs font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                          <span>
                            Crates Marked Ready! Mandi pickup rider assigned for {thisFarmerQuota.suggestedReadyTime}.
                          </span>
                        </div>
                      ) : (
                        <button
                          id="farmer-confirm-quota-ready-btn"
                          onClick={() => setLotReadyConfirmed(true)}
                          className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition"
                        >
                          <Check className="w-4 h-4" />
                          <span>Confirm {thisFarmerQuota.recommendedHarvestKg} kg Harvest Lot Packed in Crates</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 text-center text-stone-500 text-xs">
                    <Clock className="w-6 h-6 text-stone-400 mx-auto mb-2" />
                    No harvest quota currently allocated for this farmer.
                  </div>
                )}

                {/* Demand Forecast for Crop */}
                {cropForecast && (
                  <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-2.5">
                    <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-700" />
                      Sehore Mandi Demand Context for {cropForecast.cropName}
                    </h4>

                    <div className="grid grid-cols-3 gap-2 text-center text-2xs">
                      <div className="p-2 bg-stone-50 rounded border border-stone-200">
                        <div className="text-stone-500">Locality Demand</div>
                        <div className="font-extrabold text-stone-900 text-sm mt-0.5">
                          {cropForecast.predictedDemandKg} kg
                        </div>
                      </div>
                      <div className="p-2 bg-stone-50 rounded border border-stone-200">
                        <div className="text-stone-500">Fair Mandi Rate</div>
                        <div className="font-extrabold text-emerald-800 text-sm mt-0.5">
                          {cropForecast.fairPriceGuidance}
                        </div>
                      </div>
                      <div className="p-2 bg-stone-50 rounded border border-stone-200">
                        <div className="text-stone-500">Demand Shift</div>
                        <div className="font-extrabold text-amber-700 text-sm mt-0.5">
                          +{cropForecast.changePercent}%
                        </div>
                      </div>
                    </div>

                    <div className="text-2xs text-stone-600 bg-stone-50 p-2 rounded border border-stone-200">
                      <strong>Quality Grade Targets:</strong> Grade A: {cropForecast.gradeBreakdown.A} kg • Grade B: {cropForecast.gradeBreakdown.B} kg • Grade C: {cropForecast.gradeBreakdown.C} kg
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Panel Footer */}
        <div className="bg-stone-50 border-t border-stone-200 px-5 py-3 text-2xs text-stone-500 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Krishihaat Direct Farmer Governance • Sehore APMC Kendra</span>
          </div>
          <button
            onClick={closeFarmerPanel}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
