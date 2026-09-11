import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FarmerSupportTicket } from '../../types';
import {
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
  User,
  Package,
} from 'lucide-react';

export const FarmerApp: React.FC = () => {
  const {
    selectedFarmerId,
    setSelectedFarmerId,
    farmers,
    stocks,
    vegetables,
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

  const [activeTab, setActiveTab] = useState<'reviews' | 'stock' | 'earnings' | 'support' | 'quota'>('reviews');
  const [lotReadyConfirmed, setLotReadyConfirmed] = useState<boolean>(false);
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);

  // Review reply state
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>('');

  // Support ticket active chat & new ticket form
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState<string>('');
  const [isRaisingTicket, setIsRaisingTicket] = useState<boolean>(false);
  const [newTicketSubject, setNewTicketSubject] = useState<string>('');
  const [newTicketCategory, setNewTicketCategory] = useState<FarmerSupportTicket['category']>('payment');
  const [newTicketInitialMessage, setNewTicketInitialMessage] = useState<string>('');

  const currentFarmer = farmers.find((f) => f.id === selectedFarmerId) || farmers[0];

  const currentFarmerReviews = farmerReviews.filter((r) => r.farmerId === currentFarmer.id);
  const currentFarmerPayouts = farmerPayouts.filter((p) => p.farmerId === currentFarmer.id);
  const currentFarmerTickets = farmerTickets.filter((tkt) => tkt.farmerId === currentFarmer.id);
  const currentFarmerStocks = stocks.filter((s) => s.farmerId === currentFarmer.id);

  const filteredReviews = currentFarmerReviews.filter((r) => {
    if (selectedCropFilter !== 'all' && r.cropName !== selectedCropFilter) return false;
    if (selectedStarFilter !== null && r.rating !== selectedStarFilter) return false;
    return true;
  });

  const totalSettledEarnings = currentFarmerPayouts
    .filter((p) => p.status === 'settled')
    .reduce((sum, p) => sum + p.totalAmount, 0);

  const totalPendingEscrow = currentFarmerPayouts
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.totalAmount, 0);

  const openTicketsCount = currentFarmerTickets.filter((tkt) => tkt.status !== 'resolved').length;

  const currentQuota = demandForecast?.farmerQuotas.find((q) => q.farmerId === currentFarmer.id);

  const handleSendReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    replyToFarmerReview(reviewId, replyText.trim());
    setReplyingReviewId(null);
    setReplyText('');
  };

  const handleSendTicketMessage = (ticketId: string) => {
    if (!ticketReplyText.trim()) return;
    sendFarmerSupportMessage(ticketId, ticketReplyText.trim());
    setTicketReplyText('');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketInitialMessage.trim()) return;
    const ticketId = createFarmerSupportTicket(
      currentFarmer.id,
      newTicketSubject.trim(),
      newTicketCategory,
      newTicketInitialMessage.trim()
    );
    setIsRaisingTicket(false);
    setNewTicketSubject('');
    setNewTicketInitialMessage('');
    setActiveTicketId(ticketId);
  };

  const activeTicket = currentFarmerTickets.find((tkt) => tkt.id === activeTicketId) || currentFarmerTickets[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Farmer Profile Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-stone-800 to-amber-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentFarmer.photoUrl}
              alt={currentFarmer.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-300 shadow-sm shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-100">
                  {currentFarmer.name}
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-medium border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.farmerDesk?.kisanId || 'Kisan ID'}: {currentFarmer.kisanCardNo}
                </span>
                {currentFarmer.organicCertified && (
                  <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-medium border border-amber-500/30">
                    {t.farmerDesk?.organicBadge || 'Organic Certified'}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>{t.farmerDesk?.village || 'Village'}: <strong>{currentFarmer.village}, {currentFarmer.tehsil}</strong></span>
                <span>•</span>
                <span>{t.farmerDesk?.distance || 'Distance'}: <strong>{currentFarmer.distanceKm} km</strong></span>
                <span>•</span>
                <span>{t.farmerDesk?.phone || 'Phone'}: <strong>{currentFarmer.phone}</strong></span>
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-2xs text-stone-400">{t.farmerDesk?.cropsSown || 'Crops Sown'}:</span>
                {currentFarmer.cropsGrown.map((crop) => (
                  <span key={crop} className="text-2xs bg-stone-700/70 text-stone-200 px-2 py-0.5 rounded-md font-medium">
                    {crop}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick stats and farmer switcher */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto bg-stone-900/60 p-3 rounded-xl border border-stone-700/60">
            <div className="text-center px-3 border-r border-stone-700">
              <span className="text-xs text-stone-400 block">{t.farmerDesk?.rating || 'Rating'}</span>
              <span className="text-lg font-extrabold text-amber-300 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-300" />
                {currentFarmer.rating.toFixed(1)}
              </span>
            </div>
            <div className="text-center px-3 border-r border-stone-700">
              <span className="text-xs text-stone-400 block">{t.farmerDesk?.settled || 'Settled'}</span>
              <span className="text-lg font-extrabold text-emerald-400">
                ₹{totalSettledEarnings.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-center px-3">
              <span className="text-xs text-stone-400 block">{t.farmerDesk?.escrow || 'Escrow'}</span>
              <span className="text-lg font-extrabold text-amber-300">
                ₹{totalPendingEscrow.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Farmer Switcher Dropdown for Testing */}
        <div className="mt-4 pt-3 border-t border-stone-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-stone-400">
            {t.farmerDesk?.loggedInAs || 'Logged In As Farmer'}: <strong className="text-stone-200">{currentFarmer.name}</strong> ({currentFarmer.phone})
          </span>
          <div className="flex items-center gap-2">
            <span className="text-stone-400">{t.farmerDesk?.switchFarmer || 'Switch Farmer'}:</span>
            <select
              id="farmer-account-switcher"
              value={selectedFarmerId}
              onChange={(e) => setSelectedFarmerId(e.target.value)}
              className="bg-stone-800 text-stone-200 text-xs px-2.5 py-1 rounded-md border border-stone-600 focus:outline-hidden cursor-pointer"
            >
              {farmers.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.village})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-xs border border-stone-200 p-1.5 flex flex-wrap gap-1">
        <button
          id="farmer-tab-reviews"
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'reviews'
              ? 'bg-amber-100 text-amber-950 shadow-2xs font-bold border border-amber-300'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>{t.farmerDesk?.tabs?.reviews || 'Customer Reviews & Ratings'} ({currentFarmerReviews.length})</span>
        </button>

        <button
          id="farmer-tab-stock"
          onClick={() => setActiveTab('stock')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'stock'
              ? 'bg-emerald-100 text-emerald-950 shadow-2xs font-bold border border-emerald-300'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Package className="w-4 h-4 text-emerald-700" />
          <span>{t.farmerDesk?.tabs?.stock || 'My Harvest Stock & Grading'} ({currentFarmerStocks.length})</span>
        </button>

        <button
          id="farmer-tab-earnings"
          onClick={() => setActiveTab('earnings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'earnings'
              ? 'bg-emerald-100 text-emerald-950 shadow-2xs font-bold border border-emerald-300'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-700" />
          <span>{t.farmerDesk?.tabs?.earnings || 'Bank Earnings & Payouts'} (₹{(totalSettledEarnings + totalPendingEscrow).toLocaleString('en-IN')})</span>
        </button>

        <button
          id="farmer-tab-support"
          onClick={() => setActiveTab('support')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'support'
              ? 'bg-blue-100 text-blue-950 shadow-2xs font-bold border border-blue-300'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Headphones className="w-4 h-4 text-blue-700" />
          <span>{t.farmerDesk?.tabs?.support || 'Mandi Admin Support Desk'}</span>
          {openTicketsCount > 0 && (
            <span className="text-3xs bg-blue-700 text-white font-bold px-1.5 py-0.2 rounded-full">
              {openTicketsCount}
            </span>
          )}
        </button>

        <button
          id="farmer-tab-quota"
          onClick={() => setActiveTab('quota')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'quota'
              ? 'bg-purple-100 text-purple-950 shadow-2xs font-bold border border-purple-300'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-700" />
          <span>{t.farmerDesk?.tabs?.quota || "Tomorrow's Harvest Quota"}</span>
          {currentQuota && (
            <span className="text-3xs bg-purple-700 text-white font-bold px-1.5 py-0.2 rounded-full">
              {currentQuota.recommendedHarvestKg} kg
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: CUSTOMER REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-600 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Filter by Crop:
              </span>
              <button
                onClick={() => setSelectedCropFilter('all')}
                className={`text-xs px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                  selectedCropFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All Crops
              </button>
              {currentFarmer.cropsGrown.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setSelectedCropFilter(crop)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                    selectedCropFilter === crop
                      ? 'bg-emerald-800 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 text-xs text-stone-500">
              <span>Showing {filteredReviews.length} verified direct reviews</span>
            </div>
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">{rev.customerName}</span>
                        {rev.verifiedBuyer && (
                          <span className="text-3xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold border border-emerald-200">
                            Verified Mandi Buyer
                          </span>
                        )}
                      </div>
                      <p className="text-2xs text-stone-500">{rev.customerLocation} • {rev.date}</p>
                    </div>

                    <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span className="text-xs font-bold text-amber-900">{rev.rating}.0</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-2xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-semibold border border-stone-200">
                      Crop: {rev.cropName} (Grade {rev.grade})
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 mt-2.5 leading-relaxed bg-stone-50/80 p-3 rounded-lg border border-stone-100">
                    "{rev.comment}"
                  </p>

                  {/* Existing Farmer Reply */}
                  {rev.farmerReply && (
                    <div className="mt-3 pl-3 border-l-2 border-emerald-600 bg-emerald-50/50 p-2.5 rounded-r-lg">
                      <span className="text-2xs font-bold text-emerald-900 block flex items-center gap-1">
                        <Wheat className="w-3 h-3 text-emerald-700" />
                        Reply from {currentFarmer.name}:
                      </span>
                      <p className="text-xs text-emerald-950 mt-0.5">{rev.farmerReply}</p>
                    </div>
                  )}
                </div>

                {/* Reply action */}
                {!rev.farmerReply && replyingReviewId !== rev.id && (
                  <button
                    onClick={() => {
                      setReplyingReviewId(rev.id);
                      setReplyText('');
                    }}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 self-start flex items-center gap-1 mt-2 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Reply directly to customer
                  </button>
                )}

                {replyingReviewId === rev.id && (
                  <div className="mt-2 space-y-2 pt-2 border-t border-stone-100">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a polite response to this customer..."
                      rows={2}
                      className="w-full text-xs p-2 rounded border border-stone-300 focus:outline-hidden focus:border-emerald-600"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setReplyingReviewId(null)}
                        className="text-xs px-2.5 py-1 text-stone-500 hover:text-stone-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendReply(rev.id)}
                        className="text-xs px-3 py-1 bg-emerald-800 text-white rounded font-semibold hover:bg-emerald-700 cursor-pointer"
                      >
                        Post Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MY HARVEST STOCK */}
      {activeTab === 'stock' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div>
              <h2 className="text-base font-bold text-stone-900">Current Mandi Inventory & Quality Check</h2>
              <p className="text-xs text-stone-500">
                Grade inspections performed daily by Sehore Mandi Quality Inspectors.
              </p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded font-semibold border border-emerald-200">
              Active Lots: {currentFarmerStocks.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentFarmerStocks.map((stock) => {
              const veg = vegetables.find((v) => v.id === stock.vegetableId);
              return (
                <div key={stock.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                  <div className="flex items-center gap-3">
                    {veg && (
                      <img
                        src={veg.image}
                        alt={veg.name}
                        className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm">{veg?.name || 'Crop'}</h3>
                      <span className="text-xs text-stone-500">Harvest Date: {stock.harvestDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200 text-xs">
                    <div>
                      <span className="text-stone-500 block text-2xs">Available Qty:</span>
                      <strong className="text-stone-900 text-sm">{stock.quantityKg} kg</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-2xs">Mandi Rate:</span>
                      <strong className="text-emerald-700 text-sm">₹{stock.pricePerKg} / kg</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-2xs">Certified Grade:</span>
                      <span className={`inline-block px-2 py-0.5 rounded text-2xs font-bold ${
                        stock.grade === 'A' ? 'bg-emerald-100 text-emerald-800' :
                        stock.grade === 'B' ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-700'
                      }`}>
                        Grade {stock.grade}
                      </span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-2xs">Quality Score:</span>
                      <strong className="text-stone-800 text-sm">{stock.qualityScore} / 100</strong>
                    </div>
                  </div>

                  {stock.inspectionNotes && (
                    <p className="text-2xs text-stone-600 bg-white p-2 rounded border border-stone-200 italic">
                      Notes: {stock.inspectionNotes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: BANK EARNINGS & PAYOUTS */}
      {activeTab === 'earnings' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
              <span className="text-xs font-semibold text-stone-500">Total Settled Bank Credit</span>
              <p className="text-2xl font-extrabold text-emerald-700 mt-1">
                ₹{totalSettledEarnings.toLocaleString('en-IN')}
              </p>
              <p className="text-2xs text-stone-400 mt-1">Direct NEFT/UPI into registered Kisan Account</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
              <span className="text-xs font-semibold text-stone-500">Pending Delivery Escrow</span>
              <p className="text-2xl font-extrabold text-amber-600 mt-1">
                ₹{totalPendingEscrow.toLocaleString('en-IN')}
              </p>
              <p className="text-2xs text-stone-400 mt-1">Clears once rider confirms morning doorstep delivery</p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-stone-500">Registered Kisan A/C</span>
                <p className="text-xs font-bold text-stone-800 mt-1 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-700" />
                  SBI Kisan Barkheda Branch
                </p>
                <p className="text-2xs text-stone-500">A/C: ****4102 • IFSC: SBIN0004182</p>
              </div>
              <button
                onClick={() => requestFarmerPayoutSettlement(currentFarmer.id)}
                className="mt-3 w-full bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                Request Immediate Settlement
              </button>
            </div>
          </div>

          {/* Transactions table */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-5 space-y-3">
            <h3 className="font-bold text-sm text-stone-900">Historical Mandi Settlement Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 text-stone-500 text-2xs uppercase tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-3">Order Ref</th>
                    <th className="py-2.5 px-3">Crop & Grade</th>
                    <th className="py-2.5 px-3">Quantity</th>
                    <th className="py-2.5 px-3">Mandi Rate</th>
                    <th className="py-2.5 px-3">Total Amount</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Settlement Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {currentFarmerPayouts.map((pay) => (
                    <tr key={pay.id} className="hover:bg-stone-50/60">
                      <td className="py-2.5 px-3 font-semibold text-stone-900">{pay.orderNumber}</td>
                      <td className="py-2.5 px-3">{pay.cropName} (Grade {pay.grade})</td>
                      <td className="py-2.5 px-3 font-medium">{pay.quantityKg} kg</td>
                      <td className="py-2.5 px-3">₹{pay.ratePerKg} / kg</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-800">₹{pay.totalAmount.toLocaleString('en-IN')}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-2xs font-semibold ${
                          pay.status === 'settled'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {pay.status === 'settled' ? 'Settled' : 'Pending Verification'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-2xs text-stone-500">{pay.payoutMethod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MANDI ADMIN SUPPORT DESK */}
      {activeTab === 'support' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Ticket list */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-bold text-sm text-stone-900">Support Tickets</h3>
              <button
                onClick={() => setIsRaisingTicket(true)}
                className="text-xs bg-emerald-800 text-white font-semibold px-2.5 py-1 rounded hover:bg-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                New Ticket
              </button>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto">
              {currentFarmerTickets.map((tkt) => (
                <div
                  key={tkt.id}
                  onClick={() => {
                    setActiveTicketId(tkt.id);
                    setIsRaisingTicket(false);
                  }}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    activeTicket?.id === tkt.id && !isRaisingTicket
                      ? 'bg-emerald-50 border-emerald-300'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">{tkt.ticketNumber}</span>
                    <span className={`text-3xs px-1.5 py-0.5 rounded font-semibold ${
                      tkt.status === 'resolved' ? 'bg-stone-200 text-stone-700' :
                      tkt.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tkt.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-stone-800 mt-1 line-clamp-1">{tkt.subject}</p>
                  <p className="text-2xs text-stone-400 mt-1">{tkt.createdAt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket conversation or new ticket form */}
          <div className="md:col-span-2 bg-white rounded-xl border border-stone-200 shadow-xs p-5 flex flex-col justify-between">
            {isRaisingTicket ? (
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <h3 className="font-bold text-sm text-stone-900 border-b border-stone-200 pb-2">
                  Raise Direct Support Ticket to Sehore Mandi Incharge
                </h3>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Issue Category</label>
                  <select
                    value={newTicketCategory}
                    onChange={(e) => setNewTicketCategory(e.target.value as any)}
                    className="w-full text-xs p-2 rounded border border-stone-300 focus:outline-hidden"
                  >
                    <option value="payment">Payment & Bank Settlement</option>
                    <option value="grading">Grading & Quality Inspection Dispute</option>
                    <option value="pickup">Van Morning Route & Pickup Timing</option>
                    <option value="crates">Collection Crates & Bags</option>
                    <option value="general">Other Mandi Concern</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={newTicketSubject}
                    onChange={(e) => setNewTicketSubject(e.target.value)}
                    placeholder="Brief description of the issue..."
                    className="w-full text-xs p-2 rounded border border-stone-300 focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Details</label>
                  <textarea
                    value={newTicketInitialMessage}
                    onChange={(e) => setNewTicketInitialMessage(e.target.value)}
                    placeholder="Provide lot numbers, amounts, or specifics..."
                    rows={4}
                    className="w-full text-xs p-2 rounded border border-stone-300 focus:outline-hidden"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRaisingTicket(false)}
                    className="text-xs px-3 py-1.5 text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-xs px-4 py-1.5 bg-emerald-800 text-white rounded font-semibold hover:bg-emerald-700 cursor-pointer"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            ) : activeTicket ? (
              <div className="space-y-4">
                <div className="border-b border-stone-200 pb-3 flex items-start justify-between">
                  <div>
                    <span className="text-2xs text-stone-400 font-semibold">{activeTicket.ticketNumber} • Category: {activeTicket.category}</span>
                    <h3 className="font-bold text-sm text-stone-900 mt-0.5">{activeTicket.subject}</h3>
                    <p className="text-2xs text-stone-500">Mandi Cluster: {activeTicket.cluster}</p>
                  </div>
                  <span className={`text-2xs px-2 py-0.5 rounded font-bold ${
                    activeTicket.status === 'resolved' ? 'bg-stone-200 text-stone-700' :
                    activeTicket.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {activeTicket.status.toUpperCase()}
                  </span>
                </div>

                {/* Conversation message stream */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {activeTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-lg text-xs leading-relaxed max-w-[85%] ${
                        msg.sender === 'farmer'
                          ? 'ml-auto bg-emerald-800 text-white'
                          : 'mr-auto bg-stone-100 text-stone-800 border border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-2xs opacity-90">{msg.senderName}</span>
                        <span className="text-3xs opacity-75">{msg.timestamp}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Reply box */}
                <div className="pt-3 border-t border-stone-200 flex gap-2">
                  <input
                    type="text"
                    value={ticketReplyText}
                    onChange={(e) => setTicketReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendTicketMessage(activeTicket.id)}
                    placeholder="Type reply to Mandi Officer Rameshwar Patel..."
                    className="flex-1 text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-emerald-700"
                  />
                  <button
                    onClick={() => handleSendTicketMessage(activeTicket.id)}
                    className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-500 text-center py-10">No support tickets found.</p>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: DEMAND FORECAST & QUOTA */}
      {activeTab === 'quota' && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-5 space-y-4">
          <div className="border-b border-stone-200 pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                Tomorrow's Gemini Predictive Harvest Allocation
              </h2>
              <p className="text-xs text-stone-500">
                AI quota calculated from local household advance orders and catering demand in Sehore Ward 4.
              </p>
            </div>
            <span className="text-xs bg-purple-100 text-purple-900 px-2.5 py-1 rounded-md font-bold border border-purple-200">
              High Demand Surge (+22%)
            </span>
          </div>

          {currentQuota ? (
            <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 text-2xs block">Requested Crop:</span>
                  <strong className="text-purple-950 text-base">{currentQuota.crop}</strong>
                </div>
                <div>
                  <span className="text-stone-500 text-2xs block">Recommended Morning Harvest:</span>
                  <strong className="text-purple-950 text-base">{currentQuota.recommendedHarvestKg} kg</strong>
                </div>
                <div>
                  <span className="text-stone-500 text-2xs block">Ready Time at Plot:</span>
                  <strong className="text-stone-900 text-base">{currentQuota.suggestedReadyTime}</strong>
                </div>
                <div>
                  <span className="text-stone-500 text-2xs block">Crates Needed:</span>
                  <strong className="text-stone-900 text-base">{currentQuota.cratesNeeded} Plastic Crates</strong>
                </div>
              </div>

              <div className="text-xs text-stone-700 bg-white p-3 rounded-lg border border-purple-200">
                <strong>Locality Reason:</strong> {currentQuota.reason}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-2xs text-stone-500">
                  Morning Van Route A arrives at Barkheda plot at ~6:15 AM.
                </p>
                <button
                  onClick={() => setLotReadyConfirmed(true)}
                  disabled={lotReadyConfirmed}
                  className={`text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                    lotReadyConfirmed
                      ? 'bg-emerald-700 text-white cursor-default'
                      : 'bg-purple-900 hover:bg-purple-800 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {lotReadyConfirmed ? 'Harvest Quota Confirmed Ready' : 'Confirm Lot Ready for Morning Dispatch'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-stone-500 text-xs">
              No specific morning quota pending for this plot today. Regular stock orders active.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
