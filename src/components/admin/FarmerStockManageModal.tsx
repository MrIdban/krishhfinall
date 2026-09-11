import React, { useState } from 'react';
import { useApp, calculateGradePrice } from '../../context/AppContext';
import { Farmer, FarmerStock, VegetableGrade } from '../../types';
import {
  X,
  Plus,
  Scale,
  Edit3,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Calendar,
  AlertCircle,
  Package,
  DollarSign,
  Sparkles,
  Save,
} from 'lucide-react';

interface FarmerStockManageModalProps {
  farmerId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FarmerStockManageModal: React.FC<FarmerStockManageModalProps> = ({
  farmerId,
  isOpen,
  onClose,
}) => {
  const {
    farmers,
    vegetables,
    stocks,
    addFarmerStock,
    updateFarmerStock,
    deleteFarmerStock,
    notify,
    language,
    t,
  } = useApp();

  // Selected farmer
  const farmer = farmers.find((f) => f.id === farmerId);

  // Filter farmer's stocks
  const farmerStocks = stocks.filter((s) => s.farmerId === farmerId);

  // Form state for adding new stock for this farmer
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVegId, setNewVegId] = useState(vegetables[0]?.id || '');
  const [newGrade, setNewGrade] = useState<VegetableGrade>('A');
  const [newQuantityKg, setNewQuantityKg] = useState<number>(200);
  const [newPrice, setNewPrice] = useState<number>(() => {
    const firstVeg = vegetables[0];
    return firstVeg ? calculateGradePrice(firstVeg.basePriceGradeA, 'A') : 30;
  });
  const [newQualityScore, setNewQualityScore] = useState<number>(92);
  const [newHarvestDate, setNewHarvestDate] = useState<string>('Today, 5:30 AM');
  const [newNotes, setNewNotes] = useState<string>('Sehore Mandi inspected: firm, farm fresh harvest');
  const [newQualityChecked, setNewQualityChecked] = useState<boolean>(true);

  // Local editing states for existing stocks: { [stockId]: { quantityKg, grade, pricePerKg, qualityScore, inspectionNotes, qualityChecked, isSaved } }
  const [editStates, setEditStates] = useState<
    Record<
      string,
      {
        quantityKg: number;
        grade: VegetableGrade;
        pricePerKg: number;
        qualityScore: number;
        inspectionNotes: string;
        qualityChecked: boolean;
        isSaved?: boolean;
      }
    >
  >({});

  // Confirm delete dialog state
  const [deletingStockId, setDeletingStockId] = useState<string | null>(null);

  if (!isOpen || !farmer) return null;

  // Initialize or get edit state for a stock
  const getEditState = (stock: FarmerStock) => {
    if (editStates[stock.id]) {
      return editStates[stock.id];
    }
    return {
      quantityKg: stock.quantityKg,
      grade: stock.grade,
      pricePerKg: stock.pricePerKg,
      qualityScore: stock.qualityScore,
      inspectionNotes: stock.inspectionNotes || '',
      qualityChecked: stock.qualityChecked,
      isSaved: false,
    };
  };

  const handleUpdateField = (
    stockId: string,
    field: string,
    value: any,
    stock: FarmerStock
  ) => {
    const current = getEditState(stock);
    const updated = { ...current, [field]: value, isSaved: false };

    // If grade changes, auto-recalculate recommended tariff price unless user explicitly set
    if (field === 'grade') {
      const veg = vegetables.find((v) => v.id === stock.vegetableId);
      if (veg) {
        updated.pricePerKg = calculateGradePrice(veg.basePriceGradeA, value);
      }
    }

    setEditStates((prev) => ({
      ...prev,
      [stockId]: updated,
    }));
  };

  const handleSaveStock = (stock: FarmerStock) => {
    const current = getEditState(stock);
    updateFarmerStock(stock.id, {
      farmerId: stock.farmerId,
      vegetableId: stock.vegetableId,
      grade: current.grade,
      quantityKg: Math.max(1, Number(current.quantityKg)),
      pricePerKg: Math.max(1, Number(current.pricePerKg)),
      qualityScore: Number(current.qualityScore),
      qualityChecked: current.qualityChecked,
      inspectionNotes: current.inspectionNotes,
      harvestDate: stock.harvestDate,
    });

    setEditStates((prev) => ({
      ...prev,
      [stock.id]: { ...current, isSaved: true },
    }));

    const veg = vegetables.find((v) => v.id === stock.vegetableId);
    const vegName = veg?.names[language] || veg?.name || 'Produce';
    notify(`Stock lot for ${vegName} (${farmer.name}) updated successfully!`);

    // Reset saved badge after 3 seconds
    setTimeout(() => {
      setEditStates((prev) => {
        if (!prev[stock.id]) return prev;
        return {
          ...prev,
          [stock.id]: { ...prev[stock.id], isSaved: false },
        };
      });
    }, 3000);
  };

  const handleDeleteStock = (stockId: string) => {
    deleteFarmerStock(stockId);
    setDeletingStockId(null);
    notify(`Stock lot removed from Mandi inventory.`);
  };

  // Add stock handlers
  const handleNewVegChange = (vegId: string) => {
    setNewVegId(vegId);
    const veg = vegetables.find((v) => v.id === vegId);
    if (veg) {
      setNewPrice(calculateGradePrice(veg.basePriceGradeA, newGrade));
    }
  };

  const handleNewGradeChange = (grade: VegetableGrade) => {
    setNewGrade(grade);
    const veg = vegetables.find((v) => v.id === newVegId);
    if (veg) {
      setNewPrice(calculateGradePrice(veg.basePriceGradeA, grade));
    }
  };

  const handleAddStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVegId || newQuantityKg <= 0 || newPrice <= 0) return;

    addFarmerStock({
      farmerId: farmer.id,
      vegetableId: newVegId,
      grade: newGrade,
      quantityKg: Number(newQuantityKg),
      pricePerKg: Number(newPrice),
      qualityScore: Number(newQualityScore),
      qualityChecked: newQualityChecked,
      harvestDate: newHarvestDate || 'Today, 6:00 AM',
      inspectionNotes: newNotes,
    });

    const veg = vegetables.find((v) => v.id === newVegId);
    const vegName = veg?.names[language] || veg?.name || 'Produce';
    notify(`Added ${newQuantityKg} kg of ${vegName} (Grade ${newGrade}) for ${farmer.name}!`);

    // Reset form
    setShowAddForm(false);
    setNewQuantityKg(200);
  };

  const totalFarmerKg = farmerStocks.reduce((sum, s) => sum + s.quantityKg, 0);
  const totalFarmerValue = farmerStocks.reduce(
    (sum, s) => sum + s.quantityKg * s.pricePerKg,
    0
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-stone-300 my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-emerald-800 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={farmer.photoUrl}
              alt={farmer.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/80 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base text-white">{farmer.name}</h2>
                <span
                  className={`text-3xs font-bold px-2 py-0.5 rounded-full ${
                    farmer.verified
                      ? 'bg-emerald-600 text-white border border-emerald-400'
                      : 'bg-amber-500 text-stone-900'
                  }`}
                >
                  {farmer.verified ? '✓ Verified Producer' : 'Verification Pending'}
                </span>
              </div>
              <p className="text-2xs text-emerald-100 flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-emerald-300" />
                  {farmer.village}, {farmer.tehsil} ({farmer.distanceKm} km)
                </span>
                <span>•</span>
                <span className="font-mono">KCC: {farmer.kisanCardNo}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-900 flex items-center justify-center text-emerald-200 hover:text-white cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Summary Bar */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-5">
            <div>
              <span className="text-3xs font-bold text-emerald-800 uppercase tracking-wider block">
                Active Lots
              </span>
              <span className="text-sm font-extrabold text-emerald-950 font-mono">
                {farmerStocks.length}
              </span>
            </div>
            <div className="h-6 w-px bg-emerald-200" />
            <div>
              <span className="text-3xs font-bold text-emerald-800 uppercase tracking-wider block">
                Total Mandi Volume
              </span>
              <span className="text-sm font-extrabold text-emerald-950 font-mono">
                {totalFarmerKg.toLocaleString('en-IN')} kg
              </span>
            </div>
            <div className="h-6 w-px bg-emerald-200" />
            <div>
              <span className="text-3xs font-bold text-emerald-800 uppercase tracking-wider block">
                Estimated Valuation
              </span>
              <span className="text-sm font-extrabold text-emerald-950 font-mono">
                ₹{totalFarmerValue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className={`px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
              showAddForm
                ? 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            {showAddForm ? (
              <>
                <X className="w-3.5 h-3.5" />
                <span>Close Add Form</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add New Stock</span>
              </>
            )}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Section: Add New Stock Form (Collapsible) */}
          {showAddForm && (
            <form
              onSubmit={handleAddStockSubmit}
              className="bg-stone-50 border-2 border-emerald-600/30 rounded-xl p-4 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <div className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-700" />
                  <span>Add New Stock Consignment for {farmer.name}</span>
                </div>
                <span className="text-3xs text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  Mandi Kendra Receipt
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Vegetable Selection */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Vegetable / Crop *
                  </label>
                  <select
                    value={newVegId}
                    onChange={(e) => handleNewVegChange(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white focus:outline-emerald-600"
                  >
                    {vegetables.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.names[language] || v.name} • Base Rate: ₹{v.basePriceGradeA}/kg
                      </option>
                    ))}
                  </select>
                </div>

                {/* Grade Selection */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Quality Grade * (Tariff Auto-adjusted)
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['A', 'B', 'C'] as VegetableGrade[]).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleNewGradeChange(g)}
                        className={`py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${
                          newGrade === g
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        Grade {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Quantity (kg) *
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="1"
                      required
                      value={newQuantityKg}
                      onChange={(e) => setNewQuantityKg(Math.max(1, Number(e.target.value)))}
                      className="w-full p-2 border border-stone-300 rounded-lg text-xs font-mono font-bold bg-white"
                    />
                    {[50, 100, 250].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setNewQuantityKg((prev) => prev + q)}
                        className="text-3xs font-mono px-2 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded font-semibold whitespace-nowrap cursor-pointer"
                      >
                        +{q}kg
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price / kg */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Mandi Price (₹ / kg) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-stone-400 font-bold">₹</span>
                    <input
                      type="number"
                      min="1"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Math.max(1, Number(e.target.value)))}
                      className="w-full pl-6 pr-2.5 py-2 border border-stone-300 rounded-lg text-xs font-mono font-bold bg-white"
                    />
                  </div>
                  <div className="text-3xs text-stone-500 mt-0.5">
                    {newGrade === 'A' ? 'Base Premium Rate' : newGrade === 'B' ? 'Standard (~28% off)' : 'Economy (~52% off)'}
                  </div>
                </div>

                {/* Quality Score */}
                <div>
                  <div className="flex justify-between font-bold text-stone-700 mb-1">
                    <span>Moisture & Firmness Score:</span>
                    <span className="font-mono text-emerald-800">{newQualityScore} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={newQualityScore}
                    onChange={(e) => setNewQualityScore(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                </div>

                {/* Harvest Time */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Harvest & Arrival Time
                  </label>
                  <input
                    type="text"
                    value={newHarvestDate}
                    onChange={(e) => setNewHarvestDate(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white"
                    placeholder="e.g. Today, 5:30 AM"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Mandi Officer Inspection Notes
                </label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs bg-white"
                  placeholder="e.g. Sorting verified, clean crating, pesticide-free harvest"
                />
              </div>

              {/* Verified Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={newQualityChecked}
                  onChange={(e) => setNewQualityChecked(e.target.checked)}
                  className="rounded text-emerald-700 accent-emerald-700 w-4 h-4"
                />
                <span className="font-semibold text-stone-800">
                  Certified & quality checked by Mandi Kendra officer
                </span>
              </label>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save New Stock Consignment</span>
                </button>
              </div>
            </form>
          )}

          {/* Section: Existing Stocks List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-emerald-700" />
                <span>Existing Mandi Stock Lots ({farmerStocks.length})</span>
              </h3>
              <span className="text-2xs text-stone-500">
                Update weight, grade, or price directly below
              </span>
            </div>

            {farmerStocks.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300 space-y-3">
                <Scale className="w-10 h-10 text-stone-400 mx-auto" />
                <div>
                  <h4 className="font-bold text-stone-800 text-sm">
                    No active stock lots found for {farmer.name}
                  </h4>
                  <p className="text-2xs text-stone-500 mt-0.5">
                    Click "+ Add New Stock" above to register the farmer's fresh harvest arrival.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add First Stock Consignment</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {farmerStocks.map((stock) => {
                  const veg = vegetables.find((v) => v.id === stock.vegetableId);
                  const editState = getEditState(stock);
                  const vegName = veg?.names[language] || veg?.name || stock.vegetableId;
                  const lotValuation = editState.quantityKg * editState.pricePerKg;

                  return (
                    <div
                      key={stock.id}
                      className="bg-white rounded-xl border border-stone-200 hover:border-stone-300 shadow-xs p-3.5 space-y-3 transition-colors"
                    >
                      {/* Top Row: Crop info + current valuation + delete */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-100">
                        <div className="flex items-center gap-2.5">
                          {veg?.image && (
                            <img
                              src={veg.image}
                              alt={vegName}
                              className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                            />
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-900 text-sm">{vegName}</span>
                              <span className="font-mono text-3xs text-stone-400">Lot: {stock.id}</span>
                            </div>
                            <div className="text-2xs text-stone-500 flex items-center gap-1 font-mono">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              {stock.harvestDate}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <span className="text-3xs text-stone-500 block">Lot Valuation</span>
                            <span className="font-mono font-extrabold text-emerald-800 text-sm">
                              ₹{lotValuation.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setDeletingStockId(stock.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-200 cursor-pointer transition"
                            title="Delete this stock lot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Interactive Update Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                        {/* Grade Selector */}
                        <div>
                          <label className="block text-2xs font-bold text-stone-600 mb-1">
                            Grade
                          </label>
                          <div className="grid grid-cols-3 gap-1">
                            {(['A', 'B', 'C'] as VegetableGrade[]).map((g) => (
                              <button
                                key={g}
                                type="button"
                                onClick={() => handleUpdateField(stock.id, 'grade', g, stock)}
                                className={`py-1 text-2xs font-bold rounded border transition cursor-pointer ${
                                  editState.grade === g
                                    ? g === 'A'
                                      ? 'bg-emerald-700 text-white border-emerald-700'
                                      : g === 'B'
                                      ? 'bg-amber-600 text-white border-amber-600'
                                      : 'bg-stone-700 text-white border-stone-700'
                                    : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                                }`}
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quantity (kg) */}
                        <div>
                          <label className="block text-2xs font-bold text-stone-600 mb-1">
                            Stock Weight (kg)
                          </label>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="0"
                              value={editState.quantityKg}
                              onChange={(e) =>
                                handleUpdateField(
                                  stock.id,
                                  'quantityKg',
                                  Math.max(0, Number(e.target.value)),
                                  stock
                                )
                              }
                              className="w-full p-1.5 border border-stone-300 rounded font-mono font-bold text-xs bg-stone-50 focus:bg-white"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateField(
                                  stock.id,
                                  'quantityKg',
                                  editState.quantityKg + 50,
                                  stock
                                )
                              }
                              className="text-3xs font-mono px-1.5 py-1.5 bg-stone-200 hover:bg-stone-300 rounded text-stone-800 font-semibold cursor-pointer shrink-0"
                            >
                              +50
                            </button>
                          </div>
                        </div>

                        {/* Price (₹/kg) */}
                        <div>
                          <label className="block text-2xs font-bold text-stone-600 mb-1">
                            Price (₹ / kg)
                          </label>
                          <div className="relative">
                            <span className="absolute left-2 top-1.5 text-stone-400 font-bold">₹</span>
                            <input
                              type="number"
                              min="1"
                              value={editState.pricePerKg}
                              onChange={(e) =>
                                handleUpdateField(
                                  stock.id,
                                  'pricePerKg',
                                  Math.max(1, Number(e.target.value)),
                                  stock
                                )
                              }
                              className="w-full pl-5 pr-2 py-1.5 border border-stone-300 rounded font-mono font-bold text-xs bg-stone-50 focus:bg-white"
                            />
                          </div>
                        </div>

                        {/* Quality Score */}
                        <div>
                          <div className="flex justify-between text-2xs font-bold text-stone-600 mb-1">
                            <span>Score:</span>
                            <span className="font-mono text-emerald-800">{editState.qualityScore}/100</span>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={editState.qualityScore}
                            onChange={(e) =>
                              handleUpdateField(
                                stock.id,
                                'qualityScore',
                                Number(e.target.value),
                                stock
                              )
                            }
                            className="w-full accent-emerald-700 cursor-pointer h-5"
                          />
                        </div>
                      </div>

                      {/* Notes & Save Button */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-2 border-t border-stone-100">
                        <input
                          type="text"
                          value={editState.inspectionNotes}
                          onChange={(e) =>
                            handleUpdateField(
                              stock.id,
                              'inspectionNotes',
                              e.target.value,
                              stock
                            )
                          }
                          placeholder="Mandi Kendra inspection remarks..."
                          className="flex-1 p-1.5 text-2xs border border-stone-300 rounded bg-stone-50 focus:bg-white"
                        />

                        <button
                          type="button"
                          id={`save-stock-btn-${stock.id}`}
                          onClick={() => handleSaveStock(stock)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition shrink-0 ${
                            editState.isSaved
                              ? 'bg-green-700 text-white'
                              : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                          }`}
                        >
                          {editState.isSaved ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Updated ✓</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" />
                              <span>Update Lot</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 border-t border-stone-200 px-5 py-3 flex items-center justify-between shrink-0">
          <span className="text-2xs text-stone-500">
            Changes are saved directly into the local Mandi registry and updated in real-time.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold cursor-pointer transition shadow-xs"
          >
            Done
          </button>
        </div>

        {/* Delete Confirmation Popup */}
        {deletingStockId && (
          <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-3">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-4 space-y-3 border border-stone-300">
              <div className="flex items-center gap-2.5 text-rose-700">
                <AlertCircle className="w-5 h-5" />
                <h4 className="font-bold text-sm text-stone-900">Remove Stock Lot?</h4>
              </div>
              <p className="text-xs text-stone-600">
                Are you sure you want to delete this batch from {farmer.name}'s active Mandi inventory? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setDeletingStockId(null)}
                  className="px-3.5 py-1.5 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-100 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteStock(deletingStockId)}
                  className="px-4 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold cursor-pointer shadow-xs"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
