import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import {
  Bike,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  Wheat,
  Scale,
  DollarSign,
  AlertCircle,
  Truck,
  Navigation,
  User,
  ShieldCheck,
  ChevronRight,
  Receipt,
  ArrowRight,
} from 'lucide-react';

export const RiderApp: React.FC = () => {
  const {
    t,
    orders,
    riders,
    selectedRiderId,
    setSelectedRiderId,
    riderUpdateOrderStatus,
  } = useApp();

  const [simulatedCallNumber, setSimulatedCallNumber] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'assigned' | 'history'>('assigned');

  const currentRider = riders.find((r) => r.id === selectedRiderId) || riders[0];

  // Filter orders for this rider
  const assignedOrders = orders.filter((o) => {
    if (o.status === 'delivered' || o.status === 'cancelled') return false;
    // For regular bike rider (r-1), matches non-bulk or assigned
    if (selectedRiderId === 'r-1') {
      return (
        o.riderId === 'r-1' ||
        (!o.isBulk && (o.status === 'placed' || o.status === 'rider_assigned' || o.status === 'out_for_delivery' || o.status === 'picked_up'))
      );
    }
    // For bulk electric loader rider (r-2), matches bulk orders
    return (
      o.riderId === 'r-2' ||
      (o.isBulk && (o.status === 'admin_allocated' || o.status === 'rider_assigned' || o.status === 'out_for_delivery' || o.status === 'picked_up'))
    );
  });

  const completedOrders = orders.filter(
    (o) => o.status === 'delivered' && (o.riderId === selectedRiderId || !o.riderId)
  );

  const getNextAction = (status: OrderStatus) => {
    if (status === 'placed' || status === 'admin_allocated') {
      return {
        nextStatus: 'rider_assigned' as OrderStatus,
        label: t.rider.actions.accept,
        stepColor: 'bg-emerald-700 text-white',
      };
    }
    if (status === 'rider_assigned') {
      return {
        nextStatus: 'picked_up' as OrderStatus,
        label: t.rider.actions.reachedFarm + ' → ' + t.rider.actions.pickedUp,
        stepColor: 'bg-amber-600 text-white',
      };
    }
    if (status === 'picked_up') {
      return {
        nextStatus: 'out_for_delivery' as OrderStatus,
        label: t.rider.actions.outForDelivery,
        stepColor: 'bg-indigo-700 text-white',
      };
    }
    if (status === 'out_for_delivery') {
      return {
        nextStatus: 'delivered' as OrderStatus,
        label: t.rider.actions.delivered,
        stepColor: 'bg-green-700 text-white',
      };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Rider Header Bar */}
      <div className="bg-stone-900 text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-100">
                  {currentRider.name}
                </span>
                <span className="text-2xs bg-emerald-800 text-emerald-200 font-bold px-1.5 py-0.2 rounded">
                  {t.rider.dutyStatus}
                </span>
              </div>
              <p className="text-2xs text-stone-400">
                {currentRider.vehicleType} ({currentRider.vehicleNo}) • Hub: {currentRider.currentHub}
              </p>
            </div>
          </div>

          {/* Switch Active Rider Simulation */}
          <div className="flex items-center gap-2">
            <span className="text-2xs text-stone-400 font-medium">Switch Rider:</span>
            <div className="flex bg-stone-800 p-1 rounded-lg border border-stone-700">
              {riders.map((r) => (
                <button
                  key={r.id}
                  id={`switch-rider-${r.id}`}
                  onClick={() => setSelectedRiderId(r.id)}
                  className={`px-2.5 py-1 rounded text-2xs font-bold transition cursor-pointer ${
                    selectedRiderId === r.id
                      ? 'bg-emerald-700 text-white'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {r.name} {r.id === 'r-2' ? '(Bulk Loader)' : '(Bike)'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="bg-white border-b border-stone-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-3 gap-2 text-center divide-x divide-stone-200 text-xs">
          <div>
            <div className="text-2xs text-stone-500 font-medium">{t.rider.activeTasks}</div>
            <div className="text-lg font-black text-stone-900 mt-0.5">
              {assignedOrders.length}
            </div>
          </div>
          <div>
            <div className="text-2xs text-stone-500 font-medium">{t.rider.todayTrips}</div>
            <div className="text-lg font-black text-stone-900 mt-0.5">
              {currentRider.completedTripsToday}
            </div>
          </div>
          <div>
            <div className="text-2xs text-stone-500 font-medium">{t.rider.todayEarnings}</div>
            <div className="text-lg font-black text-emerald-800 mt-0.5">
              ₹{currentRider.earningsToday}
            </div>
          </div>
        </div>
      </div>

      {/* Main Delivery Task Area */}
      <main className="max-w-7xl mx-auto px-4 py-5 flex-1 w-full space-y-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
          <button
            onClick={() => setActiveTab('assigned')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'assigned'
                ? 'bg-emerald-800 text-white'
                : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            Assigned Pickups & Deliveries ({assignedOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'history'
                ? 'bg-emerald-800 text-white'
                : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            Completed Trip History ({completedOrders.length})
          </button>
        </div>

        {activeTab === 'assigned' ? (
          assignedOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-stone-200 shadow-2xs">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-bold text-sm text-stone-800">
                All Deliveries Cleared!
              </h3>
              <p className="text-2xs text-stone-500 mt-1 max-w-sm mx-auto">
                No active pickup runs assigned. New orders from the customer store or allocations from the Local Admin Hub will appear here instantly.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {assignedOrders.map((ord) => {
                const nextStep = getNextAction(ord.status);
                const isBulk = ord.isBulk;

                return (
                  <div
                    key={ord.id}
                    id={`rider-order-card-${ord.id}`}
                    className="bg-white rounded-xl border border-stone-300 shadow-xs overflow-hidden"
                  >
                    {/* Card Top Strip */}
                    <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-stone-900">
                          {ord.orderNumber}
                        </span>
                        {isBulk ? (
                          <span className="bg-amber-400 text-amber-950 font-black text-2xs px-2 py-0.5 rounded">
                            BULK CONSIGNMENT ({ord.totalKg} KG)
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-900 font-bold text-2xs px-2 py-0.5 rounded">
                            NEXT-DAY LOCALITY ROUTE
                          </span>
                        )}
                        <span className="bg-stone-200 text-stone-800 font-bold text-2xs px-1.5 py-0.5 rounded uppercase">
                          {ord.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="text-2xs text-stone-500 font-medium flex items-center gap-2">
                        <span>Placed {ord.placedAt}</span>
                        {ord.deliverySlot && (
                          <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {ord.deliverySlot}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content Grid */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Step 1: Farm Pickup Location */}
                      <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-200 text-xs">
                        <div className="font-bold text-emerald-900 flex items-center gap-1 mb-2">
                          <Wheat className="w-4 h-4 text-emerald-700" />
                          <span>1. {t.rider.pickupLocation}</span>
                        </div>

                        <div className="space-y-1 text-stone-700 text-2xs">
                          {ord.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center py-1 border-b border-emerald-100 last:border-0"
                            >
                              <div>
                                <span className="font-bold text-stone-900">
                                  {item.vegetableName}
                                </span>
                                <span className="text-stone-500 ml-1">
                                  (Farmer: {item.farmerName})
                                </span>
                              </div>
                              <span className="font-mono font-bold text-emerald-900">
                                {item.quantityKg} kg [Grade {item.grade}]
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 pt-2 border-t border-emerald-200 flex items-center justify-between">
                          <span className="text-2xs font-semibold text-emerald-800">
                            Total Produce to Load: {ord.totalKg} kg
                          </span>
                          <button
                            onClick={() =>
                              setSimulatedCallNumber(`+91 98261 44102 (${ord.items[0]?.farmerName})`)
                            }
                            className="text-2xs px-2 py-1 rounded bg-white border border-emerald-300 text-emerald-800 font-bold hover:bg-emerald-100 flex items-center gap-1 cursor-pointer"
                          >
                            <Phone className="w-3 h-3" />
                            {t.rider.callFarmer}
                          </button>
                        </div>
                      </div>

                      {/* Step 2: Customer Delivery Doorstep */}
                      <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs">
                        <div className="font-bold text-stone-900 flex items-center gap-1 mb-2">
                          <MapPin className="w-4 h-4 text-stone-700" />
                          <span>2. {t.rider.deliveryLocation}</span>
                        </div>

                        <div className="text-2xs space-y-1 text-stone-700">
                          <div>
                            <strong>Customer:</strong> {ord.customerName}
                          </div>
                          <div>
                            <strong>Contact:</strong> {ord.customerPhone}
                          </div>
                          <div className="text-stone-600 bg-white p-1.5 rounded border border-stone-200 mt-1">
                            <strong>Address:</strong> {ord.customerAddress}
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between">
                          <span className="text-2xs text-stone-600 font-medium">
                            Route Slot: {ord.deliverySlot || 'Next-Day Morning (7:00 AM - 11:00 AM)'}
                          </span>
                          <button
                            onClick={() =>
                              setSimulatedCallNumber(`${ord.customerPhone} (${ord.customerName})`)
                            }
                            className="text-2xs px-2 py-1 rounded bg-white border border-stone-300 text-stone-800 font-bold hover:bg-stone-100 flex items-center gap-1 cursor-pointer"
                          >
                            <Phone className="w-3 h-3" />
                            {t.rider.callCustomer}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* PAYMENT TO COLLECT GUIDANCE (CRITICAL FOR PREPAID, COD, OR BULK TOKEN) */}
                    <div className="px-4 py-2.5 bg-amber-50/80 border-t border-b border-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-amber-950">
                          {t.rider.paymentToCollect}:
                        </span>
                        <div className="text-2xs text-amber-900 mt-0.5">
                          {isBulk ? (
                            <span>
                              ✓ <strong>30%+ Advance Token</strong> of ₹{ord.tokenPaid} was already collected online.{' '}
                              <strong>Collect Remaining Balance: ₹{ord.remainingBalance}</strong> from buyer.
                            </span>
                          ) : ord.paymentMode === 'prepaid' ? (
                            <span className="text-emerald-800 font-bold">
                              ✓ {t.rider.alreadyPrepaid}
                            </span>
                          ) : (
                            <span className="text-stone-900 font-bold">
                              • Cash on Delivery: Collect full amount ₹{ord.totalAmount}
                              {ord.smallCartCharge ? ` (incl. ₹${ord.smallCartCharge} small cart fee)` : ''}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-black text-amber-950">
                          Due on Doorstep:{' '}
                          <span className="text-base text-emerald-900 font-black">
                            ₹{isBulk ? ord.remainingBalance : ord.paymentMode === 'prepaid' ? 0 : ord.totalAmount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Step Button */}
                    <div className="p-3 bg-white flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setSimulatedCallNumber('+91 94250 09911 (Hub Officer Rameshwar Patel)')
                          }
                          className="text-2xs text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                          {t.rider.callAdmin}
                        </button>
                      </div>

                      {nextStep && (
                        <button
                          id={`rider-step-btn-${ord.id}`}
                          onClick={() => riderUpdateOrderStatus(ord.id, nextStep.nextStatus)}
                          className={`px-5 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-xs transition cursor-pointer ${nextStep.stepColor}`}
                        >
                          <span>{nextStep.label}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* Trip History Tab */
          <div className="bg-white rounded-xl border border-stone-200 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-stone-200 font-bold text-xs text-stone-800">
              Completed Doorstep Runs Today ({completedOrders.length})
            </div>
            <div className="divide-y divide-stone-100 text-xs">
              {completedOrders.map((ord) => (
                <div key={ord.id} className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-mono font-bold text-stone-900">
                      {ord.orderNumber}
                    </div>
                    <div className="text-2xs text-stone-500">
                      {ord.customerName} • {ord.totalKg} kg • ₹{ord.totalAmount}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xs bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded">
                      DELIVERED & SETTLED
                    </span>
                    <div className="text-2xs text-emerald-700 font-semibold mt-0.5">
                      +₹75 trip fee credited
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Simulated Phone Call Popup */}
      {simulatedCallNumber && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-4 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6 animate-bounce" />
            </div>
            <h3 className="font-bold text-sm text-stone-900">Connecting Call</h3>
            <div className="font-mono text-xs font-bold text-emerald-800">
              {simulatedCallNumber}
            </div>
            <p className="text-2xs text-stone-500">
              In live mobile operation, this dials direct via telephony without masking farmer or officer identity.
            </p>
            <button
              onClick={() => setSimulatedCallNumber(null)}
              className="w-full py-2 bg-stone-800 text-white rounded text-xs font-bold hover:bg-stone-900 cursor-pointer"
            >
              End Call / Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
