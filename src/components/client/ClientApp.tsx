import React, { useState } from 'react';
import { useApp, calculateGradePrice } from '../../context/AppContext';
import { VegetableProduct, VegetableGrade, Farmer, FarmerStock, Order } from '../../types';
import {
  Search,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  Truck,
  ShieldCheck,
  Wheat,
  Info,
  Clock,
  MapPin,
  ArrowRight,
  MessageSquare,
  Sparkles,
  CreditCard,
  Banknote,
  AlertCircle,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { CustomerCareModal } from './CustomerCareModal';
import { OrderTrackingModal } from './OrderTrackingModal';
import { GoogleAd } from '../ads/GoogleAd';

export const ClientApp: React.FC = () => {
  const {
    t,
    language,
    vegetables,
    farmers,
    stocks,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartTotalKg,
    cartTotalAmount,
    placeOrder,
    orders,
  } = useApp();

  // Search & Category Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Per-vegetable selected farmer & grade
  // e.g. { [vegId]: { farmerId: string, grade: VegetableGrade } }
  const [selectionState, setSelectionState] = useState<
    Record<string, { farmerId: string; grade: VegetableGrade }>
  >(() => {
    const initial: Record<string, { farmerId: string; grade: VegetableGrade }> = {};
    vegetables.forEach((v) => {
      // Find first farmer with stock
      const stock = stocks.find((s) => s.vegetableId === v.id);
      initial[v.id] = {
        farmerId: stock ? stock.farmerId : farmers[0].id,
        grade: stock ? stock.grade : 'A',
      };
    });
    return initial;
  });

  // Cart & Checkout Drawer
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [tokenPercentage, setTokenPercentage] = useState<number>(30); // Default 30% min
  const [paymentMode, setPaymentMode] = useState<'prepaid' | 'cod'>('prepaid');

  // Customer Details Form
  const [customerName, setCustomerName] = useState('Priya Sharma');
  const [customerPhone, setCustomerPhone] = useState('+91 98260 11928');
  const [customerAddress, setCustomerAddress] = useState('Flat 201, Green Meadows, Civil Lines, Sehore');

  // Modals
  const [isCareModalOpen, setIsCareModalOpen] = useState(false);
  const [careDefaultOrderId, setCareDefaultOrderId] = useState<string | undefined>(undefined);
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [isOrdersListOpen, setIsOrdersListOpen] = useState(false);

  // Helper to get selected state for a vegetable
  const getSelected = (vegId: string) => {
    return (
      selectionState[vegId] || {
        farmerId: farmers[0].id,
        grade: 'A',
      }
    );
  };

  const handleSelectFarmer = (vegId: string, farmerId: string) => {
    setSelectionState((prev) => ({
      ...prev,
      [vegId]: { ...getSelected(vegId), farmerId },
    }));
  };

  const handleSelectGrade = (vegId: string, grade: VegetableGrade) => {
    setSelectionState((prev) => ({
      ...prev,
      [vegId]: { ...getSelected(vegId), grade },
    }));
  };

  // Filter vegetables
  const filteredVegetables = vegetables.filter((v) => {
    const localizedName = v.names[language] || v.name;
    const matchesSearch =
      localizedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || v.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Categories list
  const categories = [
    { id: 'all', label: t.common.all },
    {
      id: 'staples',
      label:
        language === 'hi'
          ? 'आलू व प्याज'
          : language === 'bn'
          ? 'আলু ও পেঁয়াজ'
          : language === 'mr'
          ? 'बटाटा व कांदा'
          : language === 'pa'
          ? 'ਆਲੂ ਤੇ ਪਿਆਜ਼'
          : 'Potatoes & Onions',
    },
    {
      id: 'grains',
      label:
        language === 'hi'
          ? 'चावल व गेहूँ'
          : language === 'bn'
          ? 'চাল ও গম'
          : language === 'mr'
          ? 'तांदूळ व गहू'
          : language === 'pa'
          ? 'ਚੌਲ ਤੇ ਕਣਕ'
          : 'Rice & Wheat',
    },
  ];

  // Bulk determination
  const effectiveIsBulk = isBulkMode || cartTotalKg >= 50;
  const tokenAmount = effectiveIsBulk
    ? Math.round((cartTotalAmount * Math.max(30, tokenPercentage)) / 100)
    : 0;
  const remainingBalance = cartTotalAmount - tokenAmount;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = placeOrder({
      customerName,
      customerPhone,
      customerAddress,
      isBulk: effectiveIsBulk,
      tokenPercentage: effectiveIsBulk ? tokenPercentage : undefined,
      paymentMode,
    });

    setIsCartOpen(false);
    setTrackedOrder(newOrder);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Sub-header Banner: Next-Day Locality Delivery Model */}
      <div className="bg-emerald-900 text-white border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-800 flex items-center justify-center text-amber-300 font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <span>{t.client.deliveryPromise}</span>
              </div>
              <p className="text-2xs text-emerald-100">
                Direct village harvest from Barkheda, Rampur & Chandpur hubs • Fresh morning doorstep delivery across the entire locality
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* My Orders Button */}
            <button
              id="client-my-orders-btn"
              onClick={() => setIsOrdersListOpen(!isOrdersListOpen)}
              className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 border border-emerald-700 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              {t.client.myOrders} ({orders.length})
            </button>

            {/* Customer Care Direct to Local Admin */}
            <button
              id="client-customer-care-btn"
              onClick={() => {
                setCareDefaultOrderId(orders[0]?.id);
                setIsCareModalOpen(true);
              }}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {t.client.customerCareBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Orders Dropdown/Drawer (if open) */}
      {isOrdersListOpen && (
        <div className="bg-white border-b border-stone-300 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                {t.clientExtra?.recentOrders || 'Recent Direct Farm Orders'} ({orders.length})
              </span>
              <button
                onClick={() => setIsOrdersListOpen(false)}
                className="text-2xs text-stone-500 hover:text-stone-800 font-bold cursor-pointer"
              >
                {t.clientExtra?.close || 'Close'} ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 text-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono font-bold text-emerald-800">
                        {ord.orderNumber}
                      </span>
                      <span
                        className={`text-2xs font-bold px-1.5 py-0.5 rounded uppercase ${
                          ord.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : ord.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {ord.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-stone-600 text-2xs">
                      {ord.items.length} items • {ord.totalKg} kg • ₹{ord.totalAmount}
                    </div>
                    {ord.isBulk && ord.tokenPaid && (
                      <div className="text-2xs text-emerald-700 font-medium">
                        Advance Token: ₹{ord.tokenPaid} ({ord.tokenPercentage}%)
                      </div>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between pt-1 border-t border-stone-200">
                    <button
                      id={`track-order-btn-${ord.id}`}
                      onClick={() => setTrackedOrder(ord)}
                      className="text-2xs text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {t.client.trackOrder || 'Live Tracking'} →
                    </button>
                    <button
                      onClick={() => {
                        setCareDefaultOrderId(ord.id);
                        setIsCareModalOpen(true);
                      }}
                      className="text-2xs text-stone-500 hover:text-stone-800 cursor-pointer"
                    >
                      {t.client.customerCareBtn || 'Help / Care'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Client Area */}
      <main className="max-w-7xl mx-auto px-4 py-5 flex-1 w-full">
        {/* Search Bar & Category Navigation */}
        <div className="bg-white rounded-xl p-3 shadow-xs border border-stone-200 mb-5">
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              id="client-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.common.search}
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 rounded-lg border border-stone-200 focus:outline-hidden focus:border-emerald-600 text-stone-900 placeholder:text-stone-400"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-800 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Official Grade Pricing Notice Banner */}
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-5 flex items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold">{t.clientExtra?.noticeOnGrades || 'Notice on Grades'}:</span>{' '}
              {t.grades.ruleHint} ({t.grades.gradeA}: {t.grades.premium} • {t.grades.gradeB}: {t.grades.standard} • {t.grades.gradeC}: {t.grades.economy}).
            </div>
          </div>
          <span className="hidden sm:inline font-mono text-2xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
            {t.clientExtra?.fairMandiTariff || 'FAIR MANDI TARIFF'}
          </span>
        </div>

        {/* Vegetables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVegetables.map((veg, index) => {
            const currentSelection = getSelected(veg.id);

            // Find stock of the selected farmer & grade
            const matchingStock = stocks.find(
              (s) =>
                s.vegetableId === veg.id &&
                s.farmerId === currentSelection.farmerId &&
                s.grade === currentSelection.grade
            );

            // Compute current active price
            const currentPrice = matchingStock
              ? matchingStock.pricePerKg
              : calculateGradePrice(veg.basePriceGradeA, currentSelection.grade);

            const selectedFarmer =
              farmers.find((f) => f.id === currentSelection.farmerId) || farmers[0];

            // Quantity currently in cart for this specific (veg, farmer, grade) combination
            const cartItem = cart.find(
              (i) =>
                i.vegetableId === veg.id &&
                i.farmerId === currentSelection.farmerId &&
                i.grade === currentSelection.grade
            );
            const inCartQty = cartItem ? cartItem.quantityKg : 0;

            const localizedName = veg.names[language] || veg.name;

            return (
              <React.Fragment key={veg.id}>
                <div
                  id={`veg-card-${veg.id}`}
                  className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden flex flex-col hover:border-emerald-500 transition-all"
                >
                {/* Vegetable Image & Category */}
                <div className="relative h-40 bg-stone-100 overflow-hidden">
                  <img
                    src={veg.image}
                    alt={localizedName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-2xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {veg.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3.5 flex-1 flex flex-col">
                  {/* Name & Base Info */}
                  <div className="mb-2">
                    <h3 className="font-bold text-sm text-stone-900 leading-tight">
                      {localizedName}
                    </h3>
                    <p className="text-2xs text-stone-500 mt-0.5 line-clamp-1">
                      {veg.nutritionalHighlight}
                    </p>
                  </div>

                  {/* 1) CHOOSE FARMER SELECTOR */}
                  <div className="mb-2.5 pt-2 border-t border-stone-100">
                    <div className="text-2xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                      <Wheat className="w-3 h-3 text-emerald-700" />
                      <span>{t.client.chooseFarmerTitle}</span>
                    </div>

                    <div className="space-y-1">
                      {farmers.map((farmer) => {
                        const isFarmerSelected = currentSelection.farmerId === farmer.id;
                        return (
                          <button
                            key={farmer.id}
                            id={`select-farmer-${veg.id}-${farmer.id}`}
                            onClick={() => handleSelectFarmer(veg.id, farmer.id)}
                            className={`w-full text-left px-2 py-1 rounded text-2xs transition flex items-center justify-between border cursor-pointer ${
                              isFarmerSelected
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                            }`}
                          >
                            <span className="truncate">
                              {farmer.name} ({farmer.village})
                            </span>
                            <span className="text-stone-400 shrink-0 ml-1">
                              {farmer.distanceKm} km
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2) CHOOSE GRADE SELECTOR (A / B / C) */}
                  <div className="mb-3 pt-2 border-t border-stone-100">
                    <div className="flex items-center justify-between text-2xs font-bold text-stone-700 mb-1">
                      <span>{t.client.chooseGradeTitle}</span>
                      <span className="text-amber-700 font-semibold text-2xs">
                        {t.clientExtra?.lowerGradeCheaper || 'Lower Grade = Cheaper Price'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      {(['A', 'B', 'C'] as VegetableGrade[]).map((g) => {
                        const isGradeSelected = currentSelection.grade === g;
                        const gradePrice = calculateGradePrice(veg.basePriceGradeA, g);
                        return (
                          <button
                            key={g}
                            id={`select-grade-${veg.id}-${g}`}
                            onClick={() => handleSelectGrade(veg.id, g)}
                            className={`p-1.5 rounded text-center border transition cursor-pointer flex flex-col items-center ${
                              isGradeSelected
                                ? 'bg-amber-50 border-amber-600 text-amber-950 font-bold ring-1 ring-amber-500'
                                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                            }`}
                          >
                            <span className="text-2xs font-bold">Grade {g}</span>
                            <span className="text-xs font-black text-stone-900 mt-0.5">
                              ₹{gradePrice}
                              <span className="text-3xs font-normal text-stone-500">/kg</span>
                            </span>
                            <span className="text-3xs text-stone-500 line-clamp-1">
                              {g === 'A' ? t.grades.premium : g === 'B' ? t.grades.standard : t.grades.economy}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="mt-auto pt-2.5 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="text-2xs text-stone-500">{t.clientExtra?.activeRate || 'Active Rate'}</div>
                      <div className="text-base font-extrabold text-stone-900">
                        ₹{currentPrice}{' '}
                        <span className="text-xs font-normal text-stone-500">/ kg</span>
                      </div>
                    </div>

                    {inCartQty > 0 ? (
                      <div className="flex items-center bg-emerald-700 text-white rounded-lg p-0.5 shadow-xs">
                        <button
                          id={`qty-minus-${veg.id}`}
                          onClick={() =>
                            updateCartQty(
                              veg.id,
                              currentSelection.farmerId,
                              currentSelection.grade,
                              inCartQty - 1
                            )
                          }
                          className="p-1 hover:bg-emerald-800 rounded cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold">{inCartQty} kg</span>
                        <button
                          id={`qty-plus-${veg.id}`}
                          onClick={() =>
                            updateCartQty(
                              veg.id,
                              currentSelection.farmerId,
                              currentSelection.grade,
                              inCartQty + 1
                            )
                          }
                          className="p-1 hover:bg-emerald-800 rounded cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        id={`add-to-cart-${veg.id}`}
                        onClick={() =>
                          addToCart(
                            veg.id,
                            currentSelection.farmerId,
                            currentSelection.grade,
                            1
                          )
                        }
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-2xs transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {t.client.addToCart}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* In-Feed Google Ads Placement */}
              {(index === 3 || index === 7) && (
                <GoogleAd
                  key={`google-ad-infeed-${index}`}
                  id={`google-ad-infeed-${index}`}
                  variant="in-feed"
                  slot={index === 3 ? "2345678901" : "2345678902"}
                />
              )}
            </React.Fragment>
          );
        })}
        </div>
      </main>

      {/* Floating Bottom Cart Bar (if items exist) */}
      {cart.length > 0 && !isCartOpen && (
        <div className="sticky bottom-0 z-30 bg-white border-t border-stone-300 shadow-lg p-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">
                  {cartTotalKg} kg Vegetables in Basket
                </div>
                <div className="text-2xs text-stone-500">
                  Total: <span className="font-bold text-stone-900">₹{cartTotalAmount}</span>
                  {cartTotalKg >= 50 && (
                    <span className="ml-2 bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                      Bulk Order (Token Applicable)
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              id="view-cart-bottom-btn"
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>{t.client.viewCart}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Cart & Checkout Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col overflow-hidden">
            {/* Drawer Header */}
            <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-bold text-base">{t.client.cartSummary}</h2>
              </div>
              <button
                id="cart-drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
                className="text-emerald-200 hover:text-white p-1 rounded font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Items List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700 uppercase tracking-wider">
                  <span>{t.client.cartSummary} ({cart.length})</span>
                  <button
                    onClick={clearCart}
                    className="text-2xs text-red-600 hover:underline cursor-pointer"
                  >
                    {t.client.emptyCart || 'Clear Basket'}
                  </button>
                </div>

                {cart.map((item, idx) => {
                  const veg = vegetables.find((v) => v.id === item.vegetableId);
                  const farmer = farmers.find((f) => f.id === item.farmerId);
                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1">
                        <div className="font-bold text-stone-900">
                          {veg?.names[language] || veg?.name || 'Vegetable'}
                        </div>
                        <div className="text-2xs text-stone-500">
                          🌾 {farmer?.name} •{' '}
                          <span className="font-semibold text-amber-800">
                            Grade {item.grade}
                          </span>{' '}
                          • ₹{item.pricePerKg}/kg
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white border border-stone-300 rounded p-0.5">
                          <button
                            onClick={() =>
                              updateCartQty(
                                item.vegetableId,
                                item.farmerId,
                                item.grade,
                                item.quantityKg - 1
                              )
                            }
                            className="p-1 text-stone-600 hover:bg-stone-100 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-1.5 font-bold text-stone-800">
                            {item.quantityKg} kg
                          </span>
                          <button
                            onClick={() =>
                              updateCartQty(
                                item.vegetableId,
                                item.farmerId,
                                item.grade,
                                item.quantityKg + 1
                              )
                            }
                            className="p-1 text-stone-600 hover:bg-stone-100 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="w-16 text-right font-bold text-stone-900">
                          ₹{item.quantityKg * item.pricePerKg}
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.vegetableId, item.farmerId, item.grade)
                          }
                          className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Mode: Regular vs Bulk Toggle */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                  <span>{t.client.orderType}</span>
                  {cartTotalKg >= 50 && (
                    <span className="text-2xs bg-amber-200 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                      AUTO-BULK (50KG+)
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsBulkMode(false)}
                    disabled={cartTotalKg >= 50}
                    className={`p-2 rounded-lg border text-left text-xs transition cursor-pointer ${
                      !effectiveIsBulk
                        ? 'bg-white border-emerald-600 ring-1 ring-emerald-600 font-semibold'
                        : 'bg-stone-100 border-stone-200 text-stone-500'
                    }`}
                  >
                    <div className="font-bold text-stone-900">{t.client.regularOrder}</div>
                    <div className="text-2xs text-stone-500 mt-0.5">{t.client.regularOrderDesc}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsBulkMode(true)}
                    className={`p-2 rounded-lg border text-left text-xs transition cursor-pointer ${
                      effectiveIsBulk
                        ? 'bg-amber-50 border-amber-600 ring-1 ring-amber-600 font-semibold'
                        : 'bg-stone-100 border-stone-200 text-stone-500'
                    }`}
                  >
                    <div className="font-bold text-amber-950">{t.client.bulkOrder}</div>
                    <div className="text-2xs text-amber-800 mt-0.5">{t.client.bulkOrderDesc}</div>
                  </button>
                </div>

                {/* BULK TOKEN MONEY SECTION (MANDATORY REQUIREMENT) */}
                {effectiveIsBulk && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded-lg space-y-2">
                    <div className="flex items-start gap-1.5 text-xs text-amber-900 font-bold">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>{t.client.bulkNotice}</span>
                    </div>

                    <div className="pt-1">
                      <div className="flex justify-between text-2xs font-semibold text-stone-700 mb-1">
                        <span>{t.client.tokenAmountTitle || 'Advance Token'} (Min 30%):</span>
                        <span className="font-bold text-amber-900">{tokenPercentage}%</span>
                      </div>
                      <div className="flex gap-2">
                        {[30, 40, 50, 100].map((pct) => (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => setTokenPercentage(pct)}
                            className={`flex-1 py-1 rounded text-xs font-bold border transition cursor-pointer ${
                              tokenPercentage === pct
                                ? 'bg-amber-600 text-white border-amber-700'
                                : 'bg-white text-stone-700 border-amber-200 hover:bg-amber-100'
                            }`}
                          >
                            {pct}% {pct === 30 ? '(Min)' : ''}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Breakdown of Token vs Remaining */}
                    <div className="bg-white/80 p-2 rounded border border-amber-200 text-2xs space-y-1">
                      <div className="flex justify-between text-stone-600">
                        <span>{t.client.cartSummary}:</span>
                        <span className="font-bold">₹{cartTotalAmount}</span>
                      </div>
                      <div className="flex justify-between font-bold text-emerald-800">
                        <span>{t.client.tokenAmountTitle} ({tokenPercentage}%):</span>
                        <span>₹{tokenAmount}</span>
                      </div>
                      <div className="flex justify-between text-amber-900 font-semibold">
                        <span>{t.client.tokenRemainingTitle}:</span>
                        <span>₹{remainingBalance}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Details Form */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-stone-800">Delivery Address</div>
                  <span className="text-2xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                    Next-Day Locality Route
                  </span>
                </div>

                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Scheduled Slot: Tomorrow Morning (7:00 AM – 11:00 AM)</div>
                    <div className="text-2xs text-emerald-700">Evening fresh farm harvest, morning doorstep delivery for the entire locality.</div>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    id="client-name-input"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full text-xs p-2 rounded border border-stone-300 bg-white"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    id="client-phone-input"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Mobile Number"
                    className="w-full text-xs p-2 rounded border border-stone-300 bg-white"
                  />
                </div>
                <div>
                  <textarea
                    required
                    id="client-address-input"
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Complete Delivery Address (House/Flat, Landmark, Village/City)"
                    className="w-full text-xs p-2 rounded border border-stone-300 bg-white resize-none"
                  />
                </div>
              </div>

              {/* Payment Mode Selector: Prepaid vs COD */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="text-xs font-bold text-stone-800 mb-2">
                  {t.client.paymentMethod}
                </div>

                <div className="space-y-2">
                  <label
                    className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition ${
                      paymentMode === 'prepaid'
                        ? 'bg-white border-emerald-600 ring-1 ring-emerald-600'
                        : 'bg-stone-100 border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymode"
                      checked={paymentMode === 'prepaid'}
                      onChange={() => setPaymentMode('prepaid')}
                      className="text-emerald-700"
                    />
                    <CreditCard className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <div className="font-bold text-stone-900">{t.client.prepaid}</div>
                      <div className="text-2xs text-stone-500">{t.client.prepaidDesc}</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition ${
                      paymentMode === 'cod'
                        ? 'bg-white border-emerald-600 ring-1 ring-emerald-600'
                        : 'bg-stone-100 border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymode"
                      checked={paymentMode === 'cod'}
                      onChange={() => setPaymentMode('cod')}
                      className="text-emerald-700"
                    />
                    <Banknote className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <div className="font-bold text-stone-900">{t.client.cod}</div>
                      <div className="text-2xs text-stone-500">
                        {effectiveIsBulk
                          ? 'Pay 30% Token online now, remaining balance in cash to rider on delivery.'
                          : t.client.codDesc}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Drawer Footer Checkout Button */}
            <div className="p-4 bg-stone-100 border-t border-stone-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-stone-600">Total Vegetables ({cartTotalKg} kg)</span>
                <span className="text-lg font-black text-stone-900">
                  ₹{effectiveIsBulk ? `${tokenAmount} Token Now (Total ₹${cartTotalAmount})` : cartTotalAmount}
                </span>
              </div>

              <button
                id="checkout-confirm-order-btn"
                onClick={handlePlaceOrder}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.client.checkoutBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Care Modal */}
      <CustomerCareModal
        isOpen={isCareModalOpen}
        onClose={() => setIsCareModalOpen(false)}
        defaultOrderId={careDefaultOrderId}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={trackedOrder !== null}
        order={trackedOrder}
        onClose={() => setTrackedOrder(null)}
        onOpenCare={(ordId) => {
          setCareDefaultOrderId(ordId);
          setIsCareModalOpen(true);
        }}
      />
    </div>
  );
};
