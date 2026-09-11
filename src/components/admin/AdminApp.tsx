import React, { useState } from 'react';
import { useApp, calculateGradePrice } from '../../context/AppContext';
import {
  Farmer,
  VegetableGrade,
  FarmerStock,
  Order,
  BulkAllocation,
  CustomerCareTicket,
} from '../../types';
import {
  ShieldCheck,
  UserCheck,
  UserPlus,
  Wheat,
  Scale,
  MessageSquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  Send,
  Sparkles,
  Info,
  MapPin,
  Phone,
  FileText,
  BadgeCheck,
  Sliders,
  DollarSign,
  Truck,
  Search,
  Trash2,
  Edit3,
  Package,
  Calendar,
  RotateCcw,
} from 'lucide-react';
import { DemandForecastingPanel } from './DemandForecastingPanel';
import { FarmerStockManageModal } from './FarmerStockManageModal';

export const AdminApp: React.FC = () => {
  const {
    t,
    language,
    farmers,
    vegetables,
    stocks,
    orders,
    tickets,
    riders,
    verifyFarmer,
    addFarmer,
    addFarmerStock,
    updateFarmerStock,
    deleteFarmerStock,
    updateStockQualityAndGrade,
    adminAllocateBulkStock,
    adminCancelOrder,
    sendTicketMessage,
    resolveTicket,
    openFarmerPanel,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'farmers' | 'stocks' | 'bulk' | 'care' | 'forecast'
  >('forecast');

  // Dedicated Farmer Stock Manage Modal State (Add & Update stocks per farmer)
  const [manageStockFarmerId, setManageStockFarmerId] = useState<string | null>(null);

  // Add Farmer Modal / Form State
  const [isAddFarmerOpen, setIsAddFarmerOpen] = useState(false);
  const [newFarmerName, setNewFarmerName] = useState('');
  const [newFarmerPhone, setNewFarmerPhone] = useState('+91 ');
  const [newFarmerVillage, setNewFarmerVillage] = useState('Barkheda');
  const [newFarmerTehsil, setNewFarmerTehsil] = useState('Sehore Mandi Block');
  const [newFarmerDist, setNewFarmerDist] = useState(4.2);
  const [newFarmerKcc, setNewFarmerKcc] = useState('KCC-MP-2026-');
  const [newFarmerExp, setNewFarmerExp] = useState(15);
  const [newFarmerOrganic, setNewFarmerOrganic] = useState(false);
  const [newFarmerCrops, setNewFarmerCrops] = useState('Potatoes, Rice, Onion, Wheat');

  // Add Farmer Stock Modal State
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [newStockFarmerId, setNewStockFarmerId] = useState<string>('');
  const [newStockVegetableId, setNewStockVegetableId] = useState<string>('');
  const [newStockGrade, setNewStockGrade] = useState<VegetableGrade>('A');
  const [newStockQuantityKg, setNewStockQuantityKg] = useState<number>(300);
  const [newStockPricePerKg, setNewStockPricePerKg] = useState<number>(32);
  const [newStockQualityScore, setNewStockQualityScore] = useState<number>(95);
  const [newStockHarvestDate, setNewStockHarvestDate] = useState<string>('Today, 6:00 AM');
  const [newStockInspectionNotes, setNewStockInspectionNotes] = useState<string>(
    'Inspected at Sehore Mandi Hub: uniform size, clean dry neck, zero chemical residue'
  );
  const [newStockQualityChecked, setNewStockQualityChecked] = useState<boolean>(true);

  // Stock Filter & Search State
  const [stockSearchQuery, setStockSearchQuery] = useState('');
  const [stockFarmerFilter, setStockFarmerFilter] = useState('all');
  const [stockVegFilter, setStockVegFilter] = useState('all');
  const [stockGradeFilter, setStockGradeFilter] = useState<'all' | VegetableGrade>('all');

  // Stock Editing Comprehensive State
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [editFarmerId, setEditFarmerId] = useState<string>('');
  const [editVegetableId, setEditVegetableId] = useState<string>('');
  const [editGrade, setEditGrade] = useState<VegetableGrade>('A');
  const [editQuantityKg, setEditQuantityKg] = useState<number>(100);
  const [editQualityScore, setEditQualityScore] = useState<number>(92);
  const [editPrice, setEditPrice] = useState<number>(35);
  const [editHarvestDate, setEditHarvestDate] = useState<string>('Today, 5:30 AM');
  const [editNotes, setEditNotes] = useState<string>('');
  const [editQualityChecked, setEditQualityChecked] = useState<boolean>(true);

  // Stock Deletion Confirmation State
  const [deletingStockId, setDeletingStockId] = useState<string | null>(null);

  // Bulk Allocation State
  // { [orderId]: { farmer1Id: number, farmer2Id: number ... } }
  const [selectedBulkOrderId, setSelectedBulkOrderId] = useState<string | null>(
    orders.find((o) => o.isBulk && o.status === 'placed')?.id || null
  );
  const [cancelModalOrderId, setCancelModalOrderId] = useState<string | null>(null);
  const [cancelReasonText, setCancelReasonText] = useState('');

  // Customer Care State
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
    tickets.length > 0 ? tickets[0].id : null
  );
  const [adminReplyText, setAdminReplyText] = useState('');

  // Handlers
  const handleAddFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmerName.trim()) return;

    addFarmer({
      name: newFarmerName,
      phone: newFarmerPhone,
      village: newFarmerVillage,
      tehsil: newFarmerTehsil,
      distanceKm: Number(newFarmerDist) || 3.0,
      kisanCardNo: newFarmerKcc,
      experienceYears: Number(newFarmerExp) || 10,
      organicCertified: newFarmerOrganic,
      cropsGrown: newFarmerCrops.split(',').map((c) => c.trim()),
      photoUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    });

    setIsAddFarmerOpen(false);
    setNewFarmerName('');
  };

  const handleOpenAddStock = (preselectedFarmerId?: string) => {
    const defaultFarmerId = preselectedFarmerId || (farmers.length > 0 ? farmers[0].id : '');
    const defaultVegId = vegetables.length > 0 ? vegetables[0].id : '';
    const defaultVeg = vegetables.find((v) => v.id === defaultVegId);
    const initialPrice = defaultVeg ? calculateGradePrice(defaultVeg.basePriceGradeA, 'A') : 32;

    setNewStockFarmerId(defaultFarmerId);
    setNewStockVegetableId(defaultVegId);
    setNewStockGrade('A');
    setNewStockQuantityKg(300);
    setNewStockPricePerKg(initialPrice);
    setNewStockQualityScore(95);
    setNewStockHarvestDate('Today, 6:00 AM');
    setNewStockInspectionNotes('Mandi Kendra verified: clean sorting, firm texture, farm fresh');
    setNewStockQualityChecked(true);
    setIsAddStockOpen(true);
  };

  const handleAddStockVegChange = (vegId: string) => {
    setNewStockVegetableId(vegId);
    const veg = vegetables.find((v) => v.id === vegId);
    if (veg) {
      setNewStockPricePerKg(calculateGradePrice(veg.basePriceGradeA, newStockGrade));
    }
  };

  const handleAddStockGradeChange = (grade: VegetableGrade) => {
    setNewStockGrade(grade);
    const veg = vegetables.find((v) => v.id === newStockVegetableId);
    if (veg) {
      setNewStockPricePerKg(calculateGradePrice(veg.basePriceGradeA, grade));
    }
  };

  const handleAddStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStockFarmerId || !newStockVegetableId || newStockQuantityKg <= 0 || newStockPricePerKg <= 0) {
      return;
    }

    addFarmerStock({
      farmerId: newStockFarmerId,
      vegetableId: newStockVegetableId,
      grade: newStockGrade,
      quantityKg: Number(newStockQuantityKg),
      pricePerKg: Number(newStockPricePerKg),
      qualityScore: Number(newStockQualityScore),
      qualityChecked: newStockQualityChecked,
      harvestDate: newStockHarvestDate || 'Today, 6:00 AM',
      inspectionNotes: newStockInspectionNotes,
    });

    setIsAddStockOpen(false);
  };

  const handleStartEditStock = (stock: FarmerStock) => {
    setEditingStockId(stock.id);
    setEditFarmerId(stock.farmerId);
    setEditVegetableId(stock.vegetableId);
    setEditGrade(stock.grade);
    setEditQuantityKg(stock.quantityKg);
    setEditQualityScore(stock.qualityScore);
    setEditPrice(stock.pricePerKg);
    setEditHarvestDate(stock.harvestDate);
    setEditNotes(stock.inspectionNotes || '');
    setEditQualityChecked(stock.qualityChecked);
  };

  const handleEditGradeChange = (newGrade: VegetableGrade) => {
    setEditGrade(newGrade);
    const veg = vegetables.find((v) => v.id === editVegetableId);
    if (veg) {
      setEditPrice(calculateGradePrice(veg.basePriceGradeA, newGrade));
    }
  };

  const handleEditVegChange = (newVegId: string) => {
    setEditVegetableId(newVegId);
    const veg = vegetables.find((v) => v.id === newVegId);
    if (veg) {
      setEditPrice(calculateGradePrice(veg.basePriceGradeA, editGrade));
    }
  };

  const handleSaveStockEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStockId) return;

    updateFarmerStock(editingStockId, {
      farmerId: editFarmerId,
      vegetableId: editVegetableId,
      grade: editGrade,
      quantityKg: Math.max(0, Number(editQuantityKg)),
      qualityScore: Number(editQualityScore),
      pricePerKg: Math.max(1, Number(editPrice)),
      qualityChecked: editQualityChecked,
      harvestDate: editHarvestDate,
      inspectionNotes: editNotes,
    });

    setEditingStockId(null);
  };

  const handleConfirmDeleteStock = () => {
    if (!deletingStockId) return;
    deleteFarmerStock(deletingStockId);
    setDeletingStockId(null);
  };

  const handleAllocateOrder = (order: Order) => {
    // Generate allocation based on available farmers
    const allocations: BulkAllocation[] = [];
    order.items.forEach((item) => {
      allocations.push({
        farmerId: item.farmerId,
        farmerName: item.farmerName,
        vegetableId: item.vegetableId,
        vegetableName: item.vegetableName,
        allocatedKg: item.quantityKg,
        grade: item.grade,
      });
    });

    adminAllocateBulkStock(order.id, allocations, 'r-2');
  };

  const handleCancelOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancelModalOrderId) return;
    adminCancelOrder(
      cancelModalOrderId,
      cancelReasonText || 'Stock unavailable from local harvest cluster today.'
    );
    setCancelModalOrderId(null);
    setCancelReasonText('');
  };

  const handleSendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicketId || !adminReplyText.trim()) return;

    sendTicketMessage(
      selectedTicketId,
      'admin',
      'Rameshwar Patel (Local Mandi Officer)',
      adminReplyText
    );
    setAdminReplyText('');
  };

  const pendingBulkOrders = orders.filter((o) => o.isBulk && o.status === 'placed');
  const activeTickets = tickets.filter((tkt) => tkt.status !== 'resolved');
  const activeTicket = tickets.find((tkt) => tkt.id === selectedTicketId) || tickets[0];

  const filteredStocks = stocks.filter((s) => {
    if (stockFarmerFilter !== 'all' && s.farmerId !== stockFarmerFilter) return false;
    if (stockVegFilter !== 'all' && s.vegetableId !== stockVegFilter) return false;
    if (stockGradeFilter !== 'all' && s.grade !== stockGradeFilter) return false;
    if (stockSearchQuery.trim()) {
      const q = stockSearchQuery.toLowerCase();
      const veg = vegetables.find((v) => v.id === s.vegetableId);
      const farmer = farmers.find((f) => f.id === s.farmerId);
      const vegName = veg?.name.toLowerCase() || '';
      const farmerName = farmer?.name.toLowerCase() || '';
      const village = farmer?.village.toLowerCase() || '';
      const notes = (s.inspectionNotes || '').toLowerCase();
      if (
        !vegName.includes(q) &&
        !farmerName.includes(q) &&
        !village.includes(q) &&
        !notes.includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  const totalStockKg = stocks.reduce((sum, s) => sum + s.quantityKg, 0);
  const totalStockValue = stocks.reduce((sum, s) => sum + s.quantityKg * s.pricePerKg, 0);
  const averageQuality =
    stocks.length > 0
      ? Math.round(stocks.reduce((sum, s) => sum + s.qualityScore, 0) / stocks.length)
      : 0;

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Officer Credential Top Bar: "He/She is a local" */}
      <div className="bg-stone-900 text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-100">
                  {t.admin.title}
                </span>
                <span className="text-2xs bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded font-bold">
                  LOCAL RESIDENT OFFICER
                </span>
              </div>
              <p className="text-2xs text-stone-400">
                Officer In-Charge: <strong>Rameshwar Patel</strong> (Resident of Sehore Rural Cluster) • Hub #04
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-2xs">
            <div className="bg-stone-800 px-2.5 py-1 rounded border border-stone-700 text-stone-300">
              Farmers: <strong className="text-white">{farmers.length}</strong> ({farmers.filter((f) => f.verified).length} Verified)
            </div>
            <div className="bg-stone-800 px-2.5 py-1 rounded border border-stone-700 text-stone-300">
              Bulk Pending: <strong className="text-amber-400">{pendingBulkOrders.length}</strong>
            </div>
            <div className="bg-stone-800 px-2.5 py-1 rounded border border-stone-700 text-stone-300">
              Care Queries: <strong className="text-emerald-400">{activeTickets.length}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 flex space-x-1 overflow-x-auto">
          {[
            {
              id: 'farmers',
              label: t.admin.tabs.farmers,
              icon: <UserCheck className="w-4 h-4" />,
              count: farmers.filter((f) => !f.verified).length,
              countLabel: 'pending',
            },
            {
              id: 'stocks',
              label: t.admin.tabs.stockQuality,
              icon: <Scale className="w-4 h-4" />,
              count: stocks.length,
              countLabel: 'lots',
            },
            {
              id: 'bulk',
              label: t.admin.tabs.bulkAllocations,
              icon: <Wheat className="w-4 h-4" />,
              count: pendingBulkOrders.length,
              alert: pendingBulkOrders.length > 0,
            },
            {
              id: 'forecast',
              label: t.forecasting.tabTitle,
              icon: <Sparkles className="w-4 h-4 text-amber-500" />,
              badge: 'AI Gemini',
            },
            {
              id: 'care',
              label: t.admin.tabs.customerCare,
              icon: <MessageSquare className="w-4 h-4" />,
              count: activeTickets.length,
            },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`admin-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-emerald-700 text-emerald-900 bg-emerald-50/40'
                    : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-3xs px-1.5 py-0.5 rounded-full font-black bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 uppercase tracking-wider">
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`text-2xs px-1.5 py-0.2 rounded-full font-bold ${
                      tab.alert
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-stone-200 text-stone-800'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Admin Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-5 flex-1 w-full">
        {/* ================= TAB 1: FARMERS & VERIFICATION ================= */}
        {activeTab === 'farmers' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <div>
                <h2 className="font-bold text-sm text-stone-900">
                  {t.admin.farmerManagement}
                </h2>
                <p className="text-2xs text-stone-500 mt-0.5">
                  Local officer duty: Personally inspect farmer land records, Kisan Credit Cards, and agricultural authenticity.
                </p>
              </div>

              <button
                id="admin-add-farmer-btn"
                onClick={() => setIsAddFarmerOpen(true)}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-2xs"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t.admin.addFarmer}</span>
              </button>
            </div>

            {/* Farmers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {farmers.map((farmer) => (
                <div
                  key={farmer.id}
                  id={`farmer-admin-card-${farmer.id}`}
                  className="bg-white rounded-xl border border-stone-200 shadow-2xs p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={farmer.photoUrl}
                          alt={farmer.name}
                          className="w-12 h-12 rounded-full object-cover border border-stone-300"
                        />
                        <div>
                          <h3 className="font-bold text-sm text-stone-900">
                            {farmer.name}
                          </h3>
                          <div className="text-2xs text-stone-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            {farmer.village}, {farmer.distanceKm} km from Kendra
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-2xs font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                          farmer.verified
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800 animate-pulse'
                        }`}
                      >
                        {farmer.verified ? (
                          <>
                            <BadgeCheck className="w-3 h-3 text-green-700" />
                            Verified
                          </>
                        ) : (
                          'Needs Inspection'
                        )}
                      </span>
                    </div>

                    {/* Credential Data Points */}
                    <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-200 text-2xs space-y-1 mb-3">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Kisan Credit ID:</span>
                        <span className="font-mono font-bold text-stone-800">
                          {farmer.kisanCardNo}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Phone Contact:</span>
                        <span className="font-semibold text-stone-800">{farmer.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Farming Experience:</span>
                        <span className="font-semibold text-stone-800">
                          {farmer.experienceYears} Years
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Natural / Organic:</span>
                        <span className="font-bold text-emerald-800">
                          {farmer.organicCertified ? 'Yes (Verified Organic)' : 'Traditional Mandi Fresh'}
                        </span>
                      </div>
                    </div>

                    {/* Crops Grown */}
                    <div className="text-2xs text-stone-600 mb-2">
                      <span className="font-bold text-stone-700">Crops Supplied: </span>
                      {farmer.cropsGrown.join(', ')}
                    </div>

                    {/* Mandi Stock Lots Indicator */}
                    {(() => {
                      const farmerStockLots = stocks.filter((s) => s.farmerId === farmer.id);
                      const totalKg = farmerStockLots.reduce((acc, s) => acc + s.quantityKg, 0);
                      return (
                        <div className="flex items-center justify-between text-2xs bg-emerald-50 text-emerald-900 px-2.5 py-1.5 rounded-lg border border-emerald-200 font-semibold mb-3">
                          <span className="flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>Mandi Stock:</span>
                            <strong className="text-emerald-950 font-mono">
                              {farmerStockLots.length} {farmerStockLots.length === 1 ? 'lot' : 'lots'} ({totalKg.toLocaleString('en-IN')} kg)
                            </strong>
                          </span>
                          <button
                            type="button"
                            id={`add-stock-for-farmer-${farmer.id}`}
                            onClick={() => setManageStockFarmerId(farmer.id)}
                            className="text-2xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded transition cursor-pointer flex items-center gap-0.5"
                            title="Add & update stocks for this farmer"
                          >
                            <Plus className="w-3 h-3" />
                            Add & Update Stocks
                          </button>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Verification Duty Button & Farmer Panel Inspector */}
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    {!farmer.verified ? (
                      <button
                        id={`verify-farmer-action-${farmer.id}`}
                        onClick={() => verifyFarmer(farmer.id)}
                        className="w-full py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        {t.admin.verifyFarmerBtn}
                      </button>
                    ) : (
                      <div className="text-2xs text-green-700 font-semibold flex items-center justify-center gap-1 py-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Inspected & Verified by Rameshwar Patel
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        id={`add-stock-btn-card-${farmer.id}`}
                        onClick={() => setManageStockFarmerId(farmer.id)}
                        className="py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-2xs font-bold flex items-center justify-center gap-1 cursor-pointer border border-emerald-300 transition-colors"
                        title="Add and update stock consignments for this farmer"
                      >
                        <Scale className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Manage Stocks</span>
                      </button>

                      <button
                        id={`admin-open-farmer-panel-${farmer.id}`}
                        onClick={() => openFarmerPanel(farmer.id)}
                        className="py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-2xs font-bold flex items-center justify-center gap-1 cursor-pointer border border-stone-300 transition-colors"
                        title="Inspect farmer reviews, ratings, earnings & support tickets"
                      >
                        <Wheat className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{t.farmerPanel.title}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Farmer Modal */}
            {isAddFarmerOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-stone-300">
                  <div className="bg-emerald-800 text-white px-4 py-3 flex justify-between items-center">
                    <h3 className="font-bold text-sm">{t.admin.addFarmer}</h3>
                    <button
                      onClick={() => setIsAddFarmerOpen(false)}
                      className="text-emerald-200 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleAddFarmerSubmit} className="p-4 space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-0.5">
                        Farmer Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newFarmerName}
                        onChange={(e) => setNewFarmerName(e.target.value)}
                        placeholder="e.g. Babulal Chouhan"
                        className="w-full p-2 border border-stone-300 rounded"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-0.5">
                          Phone Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={newFarmerPhone}
                          onChange={(e) => setNewFarmerPhone(e.target.value)}
                          className="w-full p-2 border border-stone-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-0.5">
                          Village / Gaon *
                        </label>
                        <input
                          type="text"
                          required
                          value={newFarmerVillage}
                          onChange={(e) => setNewFarmerVillage(e.target.value)}
                          className="w-full p-2 border border-stone-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-0.5">
                          Distance from Hub (km) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          required
                          value={newFarmerDist}
                          onChange={(e) => setNewFarmerDist(Number(e.target.value))}
                          className="w-full p-2 border border-stone-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-0.5">
                          Kisan Credit Card (KCC) No *
                        </label>
                        <input
                          type="text"
                          required
                          value={newFarmerKcc}
                          onChange={(e) => setNewFarmerKcc(e.target.value)}
                          className="w-full p-2 border border-stone-300 rounded font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-0.5">
                        Crops Grown (comma separated)
                      </label>
                      <input
                        type="text"
                        value={newFarmerCrops}
                        onChange={(e) => setNewFarmerCrops(e.target.value)}
                        className="w-full p-2 border border-stone-300 rounded"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="organic-check"
                        checked={newFarmerOrganic}
                        onChange={(e) => setNewFarmerOrganic(e.target.checked)}
                        className="w-4 h-4 text-emerald-700"
                      />
                      <label htmlFor="organic-check" className="font-semibold text-stone-700">
                        Admin Field Verification: Farm is certified Organic / Natural
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => setIsAddFarmerOpen(false)}
                        className="px-3 py-1.5 border border-stone-300 rounded text-stone-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-emerald-700 text-white font-bold rounded hover:bg-emerald-800"
                      >
                        Save & Verify Farmer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: STOCK & QUALITY GRADING ================= */}
        {activeTab === 'stocks' && (
          <div className="space-y-4">
            {/* KPI Summary Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs">
                <div className="text-2xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-emerald-700" />
                  Active Stock Lots
                </div>
                <div className="text-xl font-extrabold text-stone-900 mt-1 font-mono">
                  {stocks.length} <span className="text-xs font-normal text-stone-500">batches</span>
                </div>
                <div className="text-3xs text-stone-400 mt-0.5">
                  Supplied by {new Set(stocks.map((s) => s.farmerId)).size} local farmers
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs">
                <div className="text-2xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-amber-700" />
                  Total Volume
                </div>
                <div className="text-xl font-extrabold text-stone-900 mt-1 font-mono">
                  {totalStockKg.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-stone-500">kg</span>
                </div>
                <div className="text-3xs text-stone-400 mt-0.5">
                  Available in Sehore Mandi Yard
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs">
                <div className="text-2xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-green-700" />
                  Total Inventory Value
                </div>
                <div className="text-xl font-extrabold text-emerald-800 mt-1 font-mono">
                  ₹{totalStockValue.toLocaleString('en-IN')}
                </div>
                <div className="text-3xs text-stone-400 mt-0.5">
                  At official Admin tariff rates
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs">
                <div className="text-2xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                  Quality Benchmark
                </div>
                <div className="text-xl font-extrabold text-stone-900 mt-1 font-mono">
                  {averageQuality}
                  <span className="text-xs font-normal text-stone-500"> / 100</span>
                </div>
                <div className="text-3xs text-stone-400 mt-0.5">
                  {stocks.filter((s) => s.qualityChecked).length} batches verified
                </div>
              </div>
            </div>

            {/* Mandatory Rule Banner */}
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-xs text-amber-950 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
              <div>
                <div className="font-bold flex items-center gap-1.5 text-sm text-amber-900">
                  <Scale className="w-4 h-4 text-amber-700" />
                  Mandatory Grading Rule: Lower the grade of the vegetable cheaper is the price
                </div>
                <p className="text-2xs text-amber-800 mt-1 max-w-3xl">
                  Local Admin authority: Record and inspect fresh harvests directly for farmers, assign Grade A, B, or C with moisture/firmness scoring, and enforce transparent Mandi pricing so buyers receive fair rates and farmers get assured, prompt payouts.
                </p>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-amber-200 text-2xs space-y-0.5 shrink-0">
                <div className="font-bold text-stone-800">Grading Tariff Guide:</div>
                <div className="text-stone-600 font-mono">• Grade A = Base Premium (100%)</div>
                <div className="text-stone-600 font-mono">• Grade B = Standard (~72%)</div>
                <div className="text-stone-600 font-mono">• Grade C = Economy (~48%)</div>
              </div>
            </div>

            {/* Stock Actions & Filter Toolbar */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-3 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-emerald-700" />
                    Farmer Harvest Stocks & Mandi Lots
                    <span className="text-2xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono font-bold">
                      {filteredStocks.length} of {stocks.length} lots
                    </span>
                  </h3>
                  <p className="text-2xs text-stone-500">
                    Add new harvest lots on behalf of local farmers or update stock weight, quality scores & pricing.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    id="admin-manage-by-farmer-btn"
                    onClick={() => {
                      if (stockFarmerFilter !== 'all') {
                        setManageStockFarmerId(stockFarmerFilter);
                      } else if (farmers.length > 0) {
                        setManageStockFarmerId(farmers[0].id);
                      }
                    }}
                    className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition shrink-0"
                    title="Add and update stocks per farmer"
                  >
                    <Wheat className="w-4 h-4 text-amber-700" />
                    <span>Manage by Farmer</span>
                  </button>

                  <button
                    type="button"
                    id="admin-add-new-stock-btn"
                    onClick={() => handleOpenAddStock()}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Farmer Stock</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-stone-100 text-xs">
                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={stockSearchQuery}
                    onChange={(e) => setStockSearchQuery(e.target.value)}
                    placeholder="Search crop, farmer, notes..."
                    className="w-full pl-8 pr-2.5 py-1.5 border border-stone-300 rounded-lg text-xs bg-stone-50 focus:bg-white focus:outline-emerald-600"
                  />
                  {stockSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setStockSearchQuery('')}
                      className="absolute right-2 top-2 text-stone-400 hover:text-stone-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Farmer Filter */}
                <div>
                  <select
                    value={stockFarmerFilter}
                    onChange={(e) => setStockFarmerFilter(e.target.value)}
                    className="w-full p-1.5 border border-stone-300 rounded-lg text-xs bg-stone-50 focus:bg-white"
                  >
                    <option value="all">All Farmers ({farmers.length})</option>
                    {farmers.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.village})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Crop Filter */}
                <div>
                  <select
                    value={stockVegFilter}
                    onChange={(e) => setStockVegFilter(e.target.value)}
                    className="w-full p-1.5 border border-stone-300 rounded-lg text-xs bg-stone-50 focus:bg-white"
                  >
                    <option value="all">All Crops ({vegetables.length})</option>
                    {vegetables.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.nameHi || ''})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grade Filter */}
                <div className="flex items-center gap-1">
                  {(['all', 'A', 'B', 'C'] as const).map((gradeVal) => (
                    <button
                      key={gradeVal}
                      type="button"
                      onClick={() => setStockGradeFilter(gradeVal)}
                      className={`flex-1 py-1 text-2xs font-bold rounded border transition cursor-pointer ${
                        stockGradeFilter === gradeVal
                          ? 'bg-emerald-700 text-white border-emerald-700'
                          : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {gradeVal === 'all' ? 'All Grades' : `Grade ${gradeVal}`}
                    </button>
                  ))}
                  {(stockSearchQuery ||
                    stockFarmerFilter !== 'all' ||
                    stockVegFilter !== 'all' ||
                    stockGradeFilter !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setStockSearchQuery('');
                        setStockFarmerFilter('all');
                        setStockVegFilter('all');
                        setStockGradeFilter('all');
                      }}
                      className="p-1 text-stone-500 hover:text-stone-800 rounded border border-stone-300 hover:bg-stone-100 cursor-pointer"
                      title="Reset filters"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stock Records Table */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="px-4 py-3 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Active Farm Harvest Stock Records ({filteredStocks.length})
                </span>
                <span className="text-2xs text-stone-500">
                  Click 'Update / Edit' to adjust quantity, grade, or price for any farmer
                </span>
              </div>

              {filteredStocks.length === 0 ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm">No Stock Records Found</h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {stocks.length === 0
                        ? 'No farmer harvest stock batches have been recorded yet.'
                        : 'No harvest lots match your search query or selected filter.'}
                    </p>
                  </div>
                  <div className="flex justify-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenAddStock()}
                      className="px-3.5 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add First Stock Lot
                    </button>
                    {(stockSearchQuery ||
                      stockFarmerFilter !== 'all' ||
                      stockVegFilter !== 'all' ||
                      stockGradeFilter !== 'all') && (
                      <button
                        type="button"
                        onClick={() => {
                          setStockSearchQuery('');
                          setStockFarmerFilter('all');
                          setStockVegFilter('all');
                          setStockGradeFilter('all');
                        }}
                        className="px-3 py-1.5 border border-stone-300 text-stone-700 rounded-lg text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-100 text-stone-700 font-semibold border-b border-stone-200">
                      <tr>
                        <th className="p-3">Vegetable / Crop</th>
                        <th className="p-3">Farmer Details</th>
                        <th className="p-3">Grade</th>
                        <th className="p-3">Quality Score</th>
                        <th className="p-3">Price / kg</th>
                        <th className="p-3">Available Stock</th>
                        <th className="p-3">Inspection & Notes</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 text-stone-800">
                      {filteredStocks.map((stock) => {
                        const veg = vegetables.find((v) => v.id === stock.vegetableId);
                        const farmer = farmers.find((f) => f.id === stock.farmerId);
                        const batchValue = stock.quantityKg * stock.pricePerKg;

                        return (
                          <tr key={stock.id} className="hover:bg-stone-50 transition-colors">
                            {/* Vegetable */}
                            <td className="p-3">
                              <div className="flex items-center gap-2.5">
                                {veg?.image && (
                                  <img
                                    src={veg.image}
                                    alt={veg.name}
                                    className="w-9 h-9 rounded-lg object-cover border border-stone-200 shrink-0"
                                    referrerPolicy="no-referrer"
                                  />
                                )}
                                <div>
                                  <div className="font-bold text-stone-900">
                                    {veg?.name || stock.vegetableId}
                                  </div>
                                  <div className="text-3xs text-stone-500 font-mono">
                                    ID: {stock.id}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Farmer */}
                            <td className="p-3">
                              <button
                                type="button"
                                onClick={() => setManageStockFarmerId(stock.farmerId)}
                                className="text-left group cursor-pointer"
                                title="Click to view, add, or update stocks for this farmer"
                              >
                                <div className="font-semibold text-stone-800 group-hover:text-emerald-700 flex items-center gap-1">
                                  <span>{farmer?.name || 'Unknown Farmer'}</span>
                                  <Edit3 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-emerald-700 transition-opacity" />
                                </div>
                                <div className="text-2xs text-stone-500 flex items-center gap-1">
                                  <MapPin className="w-2.5 h-2.5 text-stone-400" />
                                  {farmer?.village || 'Sehore'}
                                </div>
                                {farmer?.kisanCardNo && (
                                  <div className="text-3xs font-mono text-emerald-800">
                                    {farmer.kisanCardNo}
                                  </div>
                                )}
                              </button>
                            </td>

                            {/* Grade */}
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded font-extrabold text-xs inline-flex items-center gap-1 ${
                                  stock.grade === 'A'
                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                    : stock.grade === 'B'
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : 'bg-stone-200 text-stone-800 border border-stone-300'
                                }`}
                              >
                                Grade {stock.grade}
                              </span>
                              <div className="text-3xs text-stone-500 mt-0.5">
                                {stock.grade === 'A'
                                  ? 'Base Rate'
                                  : stock.grade === 'B'
                                  ? '28% off'
                                  : '52% off'}
                              </div>
                            </td>

                            {/* Quality Score */}
                            <td className="p-3">
                              <div className="flex items-center gap-1.5">
                                <div className="w-12 bg-stone-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      stock.qualityScore >= 90
                                        ? 'bg-emerald-600'
                                        : stock.qualityScore >= 75
                                        ? 'bg-amber-500'
                                        : 'bg-rose-500'
                                    }`}
                                    style={{ width: `${Math.min(100, stock.qualityScore)}%` }}
                                  />
                                </div>
                                <span className="font-bold text-stone-700">
                                  {stock.qualityScore}/100
                                </span>
                              </div>
                              <div className="text-3xs text-stone-400 mt-0.5 flex items-center gap-0.5">
                                {stock.qualityChecked ? (
                                  <>
                                    <CheckCircle2 className="w-2.5 h-2.5 text-green-600" />
                                    <span>Inspected</span>
                                  </>
                                ) : (
                                  <span>Pending check</span>
                                )}
                              </div>
                            </td>

                            {/* Price / kg */}
                            <td className="p-3">
                              <div className="font-extrabold text-stone-900 font-mono">
                                ₹{stock.pricePerKg}
                                <span className="text-3xs font-normal text-stone-500">/kg</span>
                              </div>
                            </td>

                            {/* Stock Available */}
                            <td className="p-3">
                              <div className="font-mono font-bold text-stone-900 text-sm">
                                {stock.quantityKg.toLocaleString('en-IN')} kg
                              </div>
                              <div className="text-3xs text-emerald-800 font-semibold">
                                Lot Value: ₹{batchValue.toLocaleString('en-IN')}
                              </div>
                            </td>

                            {/* Harvest & Notes */}
                            <td className="p-3 max-w-xs">
                              <div className="text-2xs text-stone-500 flex items-center gap-1 font-mono">
                                <Calendar className="w-2.5 h-2.5 text-stone-400" />
                                {stock.harvestDate}
                              </div>
                              <div className="text-2xs text-stone-700 truncate mt-0.5" title={stock.inspectionNotes}>
                                {stock.inspectionNotes || 'Standard fresh consignment'}
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="p-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  id={`edit-stock-${stock.id}`}
                                  onClick={() => handleStartEditStock(stock)}
                                  className="px-2.5 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 text-stone-800 rounded border border-stone-300 font-semibold cursor-pointer flex items-center gap-1 text-2xs transition"
                                  title="Update quantity, grade or price"
                                >
                                  <Edit3 className="w-3 h-3 text-stone-600" />
                                  <span>Update / Edit</span>
                                </button>

                                <button
                                  type="button"
                                  id={`delete-stock-${stock.id}`}
                                  onClick={() => setDeletingStockId(stock.id)}
                                  className="p-1 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-stone-600 rounded border border-stone-300 cursor-pointer transition"
                                  title="Delete stock lot"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal 1: Add New Farmer Stock */}
            {isAddStockOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-stone-300 my-8">
                  <div className="bg-emerald-800 text-white px-5 py-3.5 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-sm flex items-center gap-2">
                        <Plus className="w-4 h-4 text-emerald-300" />
                        Add New Farmer Stock Consignment
                      </h3>
                      <p className="text-3xs text-emerald-200 mt-0.5">
                        Register harvest arrival, certify quality grade & set official Mandi pricing
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAddStockOpen(false)}
                      className="text-emerald-200 hover:text-white text-base cursor-pointer p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleAddStockSubmit} className="p-5 space-y-4 text-xs">
                    {/* Farmer Selection */}
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        Select Farmer Supplier *
                      </label>
                      <select
                        required
                        value={newStockFarmerId}
                        onChange={(e) => setNewStockFarmerId(e.target.value)}
                        className="w-full p-2 border border-stone-300 rounded-lg font-medium text-xs bg-stone-50 focus:bg-white"
                      >
                        {farmers.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name} • {f.village} ({f.kisanCardNo}) {f.verified ? '✓ Verified' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Vegetable / Crop Selection */}
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        Select Vegetable / Crop *
                      </label>
                      <select
                        required
                        value={newStockVegetableId}
                        onChange={(e) => handleAddStockVegChange(e.target.value)}
                        className="w-full p-2 border border-stone-300 rounded-lg font-medium text-xs bg-stone-50 focus:bg-white"
                      >
                        {vegetables.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.name} ({v.nameHi || ''}) • Base Grade A Rate: ₹{v.basePriceGradeA}/kg
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Grade Selection & Tariff */}
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        Certified Quality Grade (Enforces Mandi Price Formula) *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['A', 'B', 'C'] as VegetableGrade[]).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => handleAddStockGradeChange(g)}
                            className={`p-2 rounded-lg border text-center font-bold transition cursor-pointer ${
                              newStockGrade === g
                                ? 'bg-amber-100 border-amber-600 text-amber-950 ring-2 ring-amber-500'
                                : 'bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            Grade {g}
                            <div className="text-3xs font-normal text-stone-500 mt-0.5">
                              {g === 'A'
                                ? 'Base 100%'
                                : g === 'B'
                                ? '28% Discount'
                                : '52% Discount'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity & Price per kg */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Harvest Quantity (kg) *
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="20000"
                          required
                          value={newStockQuantityKg}
                          onChange={(e) => setNewStockQuantityKg(Math.max(1, Number(e.target.value)))}
                          className="w-full p-2 border border-stone-300 rounded-lg font-mono font-bold text-xs"
                        />
                        <div className="flex gap-1 mt-1">
                          {[100, 250, 500, 1000].map((quickKg) => (
                            <button
                              key={quickKg}
                              type="button"
                              onClick={() => setNewStockQuantityKg(quickKg)}
                              className="text-3xs font-mono bg-stone-100 hover:bg-stone-200 text-stone-700 px-1.5 py-0.5 rounded cursor-pointer"
                            >
                              +{quickKg}kg
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Admin Mandi Price (₹ / kg) *
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="1000"
                          required
                          value={newStockPricePerKg}
                          onChange={(e) => setNewStockPricePerKg(Math.max(1, Number(e.target.value)))}
                          className="w-full p-2 border border-stone-300 rounded-lg font-mono font-bold text-xs"
                        />
                        <span className="text-3xs text-stone-500">
                          Auto-calculated by grade, adjustable if needed.
                        </span>
                      </div>
                    </div>

                    {/* Quality Score & Harvest Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Quality Score (0-100): {newStockQualityScore}
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={newStockQualityScore}
                          onChange={(e) => setNewStockQualityScore(Number(e.target.value))}
                          className="w-full accent-emerald-700 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Harvest Date / Arrival Time
                        </label>
                        <input
                          type="text"
                          value={newStockHarvestDate}
                          onChange={(e) => setNewStockHarvestDate(e.target.value)}
                          placeholder="e.g. Today, 6:00 AM"
                          className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    {/* Inspection Notes */}
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        Admin Mandi Inspection Notes
                      </label>
                      <textarea
                        rows={2}
                        value={newStockInspectionNotes}
                        onChange={(e) => setNewStockInspectionNotes(e.target.value)}
                        placeholder="e.g. Firmness inspected, uniform grading, moisture optimal, zero chemical spray"
                        className="w-full p-2 border border-stone-300 rounded-lg resize-none text-xs"
                      />
                    </div>

                    {/* Verified Checkbox */}
                    <label className="flex items-center gap-2 p-2 bg-stone-50 border border-stone-200 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newStockQualityChecked}
                        onChange={(e) => setNewStockQualityChecked(e.target.checked)}
                        className="rounded text-emerald-700 accent-emerald-700"
                      />
                      <span className="text-xs text-stone-800 font-semibold">
                        Mark consignment as verified & quality checked by Mandi Kendra
                      </span>
                    </label>

                    {/* Dynamic Batch Summary */}
                    {(() => {
                      const selectedFarmer = farmers.find((f) => f.id === newStockFarmerId);
                      const selectedVeg = vegetables.find((v) => v.id === newStockVegetableId);
                      const totalVal = (newStockQuantityKg || 0) * (newStockPricePerKg || 0);

                      return (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-2xs space-y-1">
                          <div className="font-bold text-emerald-950 flex items-center justify-between">
                            <span>Consignment Preview:</span>
                            <span className="font-mono text-xs">
                              Total Value: ₹{totalVal.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="text-emerald-900">
                            Supplier: <strong>{selectedFarmer?.name}</strong> ({selectedFarmer?.village}) • Crop:{' '}
                            <strong>{selectedVeg?.name}</strong> • Grade:{' '}
                            <strong>Grade {newStockGrade}</strong> ({newStockQuantityKg} kg @ ₹{newStockPricePerKg}/kg)
                          </div>
                        </div>
                      );
                    })()}

                    {/* Modal Actions */}
                    <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => setIsAddStockOpen(false)}
                        className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-100 font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        id="submit-add-farmer-stock-btn"
                        className="px-5 py-2 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 cursor-pointer shadow-xs"
                      >
                        Save & Add Stock Lot
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal 2: Update Existing Stock (Grade, Quantity, Price, Notes) */}
            {editingStockId && (
              <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-stone-300 my-8">
                  <div className="bg-emerald-800 text-white px-5 py-3.5 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-sm flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-emerald-300" />
                        Update Farmer Stock & Quality Inspection
                      </h3>
                      <p className="text-3xs text-emerald-200 mt-0.5">
                        Editing batch lot: <span className="font-mono">{editingStockId}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingStockId(null)}
                      className="text-emerald-200 hover:text-white text-base cursor-pointer p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveStockEdit} className="p-5 space-y-4 text-xs">
                    {/* Farmer & Crop Selectors (Allows Reassignment) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Assigned Farmer *
                        </label>
                        <select
                          required
                          value={editFarmerId}
                          onChange={(e) => setEditFarmerId(e.target.value)}
                          className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-stone-50 focus:bg-white"
                        >
                          {farmers.map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.name} ({f.village})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Vegetable / Crop *
                        </label>
                        <select
                          required
                          value={editVegetableId}
                          onChange={(e) => handleEditVegChange(e.target.value)}
                          className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-stone-50 focus:bg-white"
                        >
                          {vegetables.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.name} (Base ₹{v.basePriceGradeA}/kg)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Grade Selector */}
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        Select Vegetable Grade (A / B / C) *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['A', 'B', 'C'] as VegetableGrade[]).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => handleEditGradeChange(g)}
                            className={`p-2 rounded-lg border text-center font-bold transition cursor-pointer ${
                              editGrade === g
                                ? 'bg-amber-100 border-amber-600 text-amber-950 ring-2 ring-amber-500'
                                : 'bg-stone-50 border-stone-300 text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            Grade {g}
                            <div className="text-3xs font-normal text-stone-500 mt-0.5">
                              {g === 'A'
                                ? 'Base Price'
                                : g === 'B'
                                ? '28% Discount'
                                : '52% Discount'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Editable Quantity & Price per kg */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Available Stock (kg) *
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="50000"
                          required
                          value={editQuantityKg}
                          onChange={(e) => setEditQuantityKg(Number(e.target.value))}
                          className="w-full p-2 border border-stone-300 rounded-lg font-mono font-bold text-xs"
                        />
                        <span className="text-3xs text-stone-500">
                          Update remaining Mandi weight if consumed or restocked.
                        </span>
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Admin Mandi Price (₹ / kg) *
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="1000"
                          required
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-full p-2 border border-stone-300 rounded-lg font-mono font-bold text-xs"
                        />
                        <span className="text-3xs text-stone-500">
                          Official rule enforced: Grade C lowest, Grade A highest.
                        </span>
                      </div>
                    </div>

                    {/* Quality Score & Harvest Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Quality Score (0-100): {editQualityScore}
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={editQualityScore}
                          onChange={(e) => setEditQualityScore(Number(e.target.value))}
                          className="w-full accent-emerald-700 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">
                          Harvest Date / Time
                        </label>
                        <input
                          type="text"
                          value={editHarvestDate}
                          onChange={(e) => setEditHarvestDate(e.target.value)}
                          placeholder="e.g. Today, 5:30 AM"
                          className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    {/* Inspection Notes */}
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        Admin Inspection Notes
                      </label>
                      <textarea
                        rows={2}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="e.g. Firmness tested, size uniform, dry neck, zero fungicide spray"
                        className="w-full p-2 border border-stone-300 rounded-lg resize-none text-xs"
                      />
                    </div>

                    {/* Quality Checked toggle */}
                    <label className="flex items-center gap-2 p-2 bg-stone-50 border border-stone-200 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editQualityChecked}
                        onChange={(e) => setEditQualityChecked(e.target.checked)}
                        className="rounded text-emerald-700 accent-emerald-700"
                      />
                      <span className="text-xs text-stone-800 font-semibold">
                        Quality verified & inspected by Rameshwar Patel (Admin)
                      </span>
                    </label>

                    {/* Dynamic Batch Value Preview */}
                    <div className="bg-stone-50 border border-stone-200 rounded-lg p-2.5 flex items-center justify-between text-2xs">
                      <span className="text-stone-600 font-medium">
                        Updated Lot Value ({editQuantityKg} kg × ₹{editPrice}/kg):
                      </span>
                      <span className="font-mono font-bold text-emerald-800 text-xs">
                        ₹{((editQuantityKg || 0) * (editPrice || 0)).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Modal Buttons */}
                    <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => setEditingStockId(null)}
                        className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-100 font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        id="save-stock-edit-btn"
                        className="px-5 py-2 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 cursor-pointer shadow-xs"
                      >
                        Save & Update Stock
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal 3: Delete Stock Confirmation */}
            {deletingStockId && (
              <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-stone-300 p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">Delete Stock Batch?</h4>
                      <p className="text-2xs text-stone-500">
                        This lot will be permanently removed from active Mandi stock.
                      </p>
                    </div>
                  </div>

                  {(() => {
                    const st = stocks.find((s) => s.id === deletingStockId);
                    const veg = vegetables.find((v) => v.id === st?.vegetableId);
                    const farmer = farmers.find((f) => f.id === st?.farmerId);

                    return (
                      <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-xs space-y-1">
                        <div>
                          Crop: <strong>{veg?.name || 'Produce'}</strong> (Grade {st?.grade})
                        </div>
                        <div>
                          Farmer: <strong>{farmer?.name || 'Farmer'}</strong> ({farmer?.village})
                        </div>
                        <div>
                          Quantity: <strong>{st?.quantityKg} kg</strong> @ ₹{st?.pricePerKg}/kg
                        </div>
                      </div>
                    );
                  })()}

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setDeletingStockId(null)}
                      className="px-3.5 py-1.5 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-100 font-medium text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      id="confirm-delete-stock-btn"
                      onClick={handleConfirmDeleteStock}
                      className="px-4 py-1.5 bg-rose-700 text-white rounded-lg text-xs font-bold hover:bg-rose-800 cursor-pointer shadow-xs"
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: BULK ALLOCATION & DECISION ================= */}
        {activeTab === 'bulk' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
              <h2 className="font-bold text-sm text-stone-900">
                {t.admin.bulkDutyTitle}
              </h2>
              <p className="text-2xs text-stone-500 mt-0.5">
                {t.admin.bulkDutyDesc} Verify 30% advance token paid, allocate stock quotas across farmers, or cancel request if harvest is unavailable.
              </p>
            </div>

            {/* Bulk Orders List */}
            {orders.filter((o) => o.isBulk).length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-stone-200 text-stone-500 text-xs">
                No bulk orders currently logged. Place a bulk order from the Customer App to test!
              </div>
            ) : (
              <div className="space-y-4">
                {orders
                  .filter((o) => o.isBulk)
                  .map((ord) => {
                    const isPending = ord.status === 'placed';
                    return (
                      <div
                        key={ord.id}
                        id={`bulk-order-card-${ord.id}`}
                        className={`bg-white rounded-xl border p-5 shadow-xs transition-all ${
                          isPending
                            ? 'border-amber-400 ring-1 ring-amber-400'
                            : 'border-stone-200'
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-base text-stone-900">
                                {ord.orderNumber}
                              </span>
                              <span
                                className={`text-2xs font-extrabold px-2 py-0.5 rounded uppercase ${
                                  isPending
                                    ? 'bg-amber-100 text-amber-900 animate-pulse'
                                    : ord.status === 'cancelled'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-green-100 text-green-800'
                                }`}
                              >
                                {isPending ? 'Action Required: Allocate Stock' : ord.status}
                              </span>
                            </div>
                            <div className="text-2xs text-stone-500 mt-0.5">
                              Buyer: <strong>{ord.customerName}</strong> ({ord.customerPhone}) • Address: {ord.customerAddress} • Slot: <strong>{ord.deliverySlot || 'Tomorrow Morning (7:00 AM - 11:00 AM)'}</strong>
                            </div>
                          </div>

                          {/* Token Money Verification Box */}
                          <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-2xs">
                            <div className="text-stone-600">Total Produce: <strong className="text-stone-900">{ord.totalKg} kg</strong> (₹{ord.totalAmount})</div>
                            <div className="font-bold text-emerald-800 mt-0.5">
                              ✓ Advance Token Paid: ₹{ord.tokenPaid} ({ord.tokenPercentage}%)
                            </div>
                            <div className="text-amber-900 font-semibold">
                              Remaining on Doorstep: ₹{ord.remainingBalance}
                            </div>
                          </div>
                        </div>

                        {/* Order Items & Farmer Stock Breakdown */}
                        <div className="py-3">
                          <div className="text-xs font-bold text-stone-700 mb-2">
                            Requested Vegetable Sacks:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {ord.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs flex justify-between items-center"
                              >
                                <div>
                                  <div className="font-bold text-stone-900">
                                    {item.vegetableName}
                                  </div>
                                  <div className="text-2xs text-stone-500">
                                    Target Farmer: {item.farmerName} • Grade {item.grade} (₹{item.pricePerKg}/kg)
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-mono font-bold text-stone-800">
                                    {item.quantityKg} kg
                                  </div>
                                  <div className="text-2xs text-stone-500">
                                    ₹{item.itemTotal}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Admin Allocation or Cancellation Buttons */}
                        {isPending && (
                          <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                            <div className="text-2xs text-stone-500 flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5 text-emerald-700" />
                              Allocating will assign this bulk crate to Electric Cargo Loader Rider Dinesh Verma (MP-04-EV-901).
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                id={`cancel-bulk-order-${ord.id}`}
                                onClick={() => {
                                  setCancelModalOrderId(ord.id);
                                  setCancelReasonText('Requested harvest quantity exceeded current cluster yield.');
                                }}
                                className="px-3 py-1.5 rounded-md border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <XCircle className="w-4 h-4" />
                                {t.admin.cancelOrderBtn}
                              </button>

                              <button
                                id={`allocate-bulk-order-${ord.id}`}
                                onClick={() => handleAllocateOrder(ord)}
                                className="px-4 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                {t.admin.allocateStockBtn}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Cancel Order Confirmation Modal */}
            {cancelModalOrderId && (
              <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-stone-300 p-4 space-y-3 text-xs">
                  <h3 className="font-bold text-sm text-red-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    Cancel Bulk Order Request
                  </h3>
                  <p className="text-2xs text-stone-600">
                    As Local Admin, you have the authority to cancel a request if harvest stock is unavailable. The 30% advance token paid by the customer will be queued for immediate 100% refund.
                  </p>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Cancellation Reason (Sent to Customer)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={cancelReasonText}
                      onChange={(e) => setCancelReasonText(e.target.value)}
                      className="w-full p-2 border border-stone-300 rounded text-xs resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setCancelModalOrderId(null)}
                      className="px-3 py-1.5 border border-stone-300 rounded"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelOrderSubmit}
                      className="px-4 py-1.5 bg-red-700 text-white font-bold rounded hover:bg-red-800 cursor-pointer"
                    >
                      Confirm Cancellation
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: CUSTOMER CARE DESK ================= */}
        {activeTab === 'care' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            {/* Tickets Sidebar */}
            <div className="w-full md:w-80 bg-stone-50 border-r border-stone-200 p-3 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Customer Inquiries ({tickets.length})
                </span>
                <span className="text-2xs bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  Local Admin Desk
                </span>
              </div>

              <div className="space-y-2 flex-1 overflow-y-auto pr-1">
                {tickets.map((tkt) => {
                  const isSelected = activeTicket?.id === tkt.id;
                  return (
                    <button
                      key={tkt.id}
                      id={`admin-ticket-select-${tkt.id}`}
                      onClick={() => setSelectedTicketId(tkt.id)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition cursor-pointer ${
                        isSelected
                          ? 'bg-white border-emerald-600 shadow-xs ring-1 ring-emerald-600'
                          : 'bg-stone-100/60 border-stone-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono font-bold text-emerald-800">
                          {tkt.ticketNo}
                        </span>
                        <span
                          className={`text-2xs px-1.5 py-0.2 rounded font-bold uppercase ${
                            tkt.status === 'resolved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {tkt.status}
                        </span>
                      </div>
                      <div className="font-bold text-stone-900 line-clamp-1">
                        {tkt.subject}
                      </div>
                      <div className="text-2xs text-stone-500 mt-1 flex justify-between">
                        <span>{tkt.customerName}</span>
                        <span>{tkt.messages.length} messages</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conversation Viewer */}
            <div className="flex-1 flex flex-col bg-white">
              {activeTicket ? (
                <>
                  <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-stone-900">
                        {activeTicket.subject}
                      </div>
                      <div className="text-2xs text-stone-500 mt-0.5">
                        Customer: <strong>{activeTicket.customerName}</strong> ({activeTicket.customerPhone}) • Created {activeTicket.createdAt}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {activeTicket.status !== 'resolved' ? (
                        <button
                          id="mark-ticket-resolved-btn"
                          onClick={() => resolveTicket(activeTicket.id)}
                          className="px-3 py-1 bg-green-700 hover:bg-green-800 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t.admin.markResolved}
                        </button>
                      ) : (
                        <span className="text-xs text-green-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Resolved
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chat Stream */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50">
                    {activeTicket.messages.map((msg) => {
                      const isAdmin = msg.sender === 'admin';
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col max-w-[85%] ${
                            isAdmin ? 'ml-auto items-end' : 'mr-auto items-start'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-0.5 text-2xs text-stone-500">
                            <span className="font-semibold text-stone-700">
                              {isAdmin ? '🌾 You (Local Admin)' : '👤 ' + msg.senderName}
                            </span>
                            <span>{msg.timestamp}</span>
                          </div>
                          <div
                            className={`p-3 rounded-lg text-xs leading-relaxed ${
                              isAdmin
                                ? 'bg-emerald-700 text-white rounded-tr-xs'
                                : 'bg-white text-stone-800 border border-stone-300 rounded-tl-xs shadow-2xs'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reply Input Form */}
                  <form
                    onSubmit={handleSendAdminReply}
                    className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      id="admin-reply-input"
                      value={adminReplyText}
                      onChange={(e) => setAdminReplyText(e.target.value)}
                      placeholder="Type your official response as Local Mandi Officer..."
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-hidden focus:border-emerald-600"
                    />
                    <button
                      type="submit"
                      id="admin-reply-submit-btn"
                      className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Reply as Officer
                    </button>
                  </form>
                </>
              ) : (
                <div className="p-8 text-center text-stone-400 text-xs">
                  Select a ticket to begin responding.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 5: AI DEMAND FORECASTING ================= */}
        {activeTab === 'forecast' && <DemandForecastingPanel />}
      </main>

      {/* Dedicated Farmer Stock Management Modal (Add & Update stocks per farmer) */}
      <FarmerStockManageModal
        farmerId={manageStockFarmerId}
        isOpen={manageStockFarmerId !== null}
        onClose={() => setManageStockFarmerId(null)}
      />
    </div>
  );
};
