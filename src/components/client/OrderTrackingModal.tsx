import React from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import {
  X,
  Clock,
  CheckCircle2,
  Bike,
  User,
  Phone,
  MapPin,
  Wheat,
  ShieldCheck,
  AlertTriangle,
  Receipt,
} from 'lucide-react';

interface Props {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCare: (orderId?: string) => void;
}

export const OrderTrackingModal: React.FC<Props> = ({
  order,
  isOpen,
  onClose,
  onOpenCare,
}) => {
  const { t } = useApp();

  if (!isOpen || !order) return null;

  const stages: { key: OrderStatus; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      key: 'placed',
      label: 'Order Placed & Scheduled',
      desc: order.isBulk
        ? 'Bulk order registered. Sent to Local Mandi Admin for evening quota allocation.'
        : 'Order registered for tomorrow morning locality delivery run (7:00 AM - 11:00 AM).',
      icon: <Clock className="w-4 h-4" />,
    },
    {
      key: 'admin_allocated',
      label: 'Allocated & Quality Verified',
      desc: 'Local Admin verified crop quality and allocated evening harvest quotas to local farmers.',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      key: 'picked_up',
      label: 'Morning Farm Pickup & Weighed',
      desc: `${order.riderName || 'Rider'} collected freshly harvested sacks at village hub.`,
      icon: <Wheat className="w-4 h-4" />,
    },
    {
      key: 'out_for_delivery',
      label: 'Out on Locality Delivery Route',
      desc: `${order.riderName || 'Rider'} is completing morning doorstep runs across your locality (${order.riderVehicle || 'Vehicle'}).`,
      icon: <Bike className="w-4 h-4" />,
    },
    {
      key: 'delivered',
      label: 'Delivered Fresh to Doorstep',
      desc: 'Handed over at customer address with 100% farm-fresh guarantee.',
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
  ];

  const getStageIndex = (status: OrderStatus) => {
    if (status === 'cancelled') return -1;
    if (status === 'placed') return 0;
    if (status === 'admin_allocated' || status === 'rider_assigned') return 1;
    if (status === 'picked_up') return 2;
    if (status === 'out_for_delivery') return 3;
    if (status === 'delivered') return 4;
    return 0;
  };

  const currentIdx = getStageIndex(order.status);
  const isCancelled = order.status === 'cancelled';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-stone-300">
        {/* Header */}
        <div className="bg-emerald-800 text-white px-5 py-3.5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight">
                {t.client.liveTracker}
              </span>
              <span className="font-mono bg-emerald-900 px-2 py-0.5 rounded text-xs text-amber-300 font-semibold">
                {order.orderNumber}
              </span>
              {order.isBulk && (
                <span className="text-2xs bg-amber-400 text-amber-950 font-extrabold px-1.5 py-0.5 rounded">
                  BULK 50KG+
                </span>
              )}
            </div>
            <p className="text-2xs text-emerald-200 mt-0.5">
              Placed {order.placedAt} • Next-Day Delivery Route: {order.deliverySlot || 'Tomorrow Morning (7:00 AM - 11:00 AM)'} • Total {order.totalKg} kg
            </p>
          </div>
          <button
            id="tracking-modal-close-btn"
            onClick={onClose}
            className="p-1 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Status Alert if Cancelled */}
          {isCancelled && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Order Cancelled by Local Admin:</span>{' '}
                {order.cancelReason || 'Requested harvest volume unavailable today due to seasonal limits.'}
                {order.tokenPaid && (
                  <div className="font-semibold text-emerald-800 mt-1">
                    Advance Token of ₹{order.tokenPaid} has been queued for immediate 100% refund.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timeline Tracker */}
          {!isCancelled && (
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="space-y-4">
                {stages.map((stage, idx) => {
                  const isDone = currentIdx > idx;
                  const isCurrent = currentIdx === idx;
                  return (
                    <div key={stage.key} className="flex items-start gap-3 relative">
                      {/* Vertical line connecting steps */}
                      {idx < stages.length - 1 && (
                        <div
                          className={`absolute left-3.5 top-7 bottom-0 w-0.5 ${
                            isDone ? 'bg-emerald-600' : 'bg-stone-200'
                          }`}
                        />
                      )}

                      {/* Icon bubble */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-emerald-700 text-white ring-4 ring-emerald-100 animate-pulse'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {stage.icon}
                      </div>

                      {/* Text */}
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-emerald-900'
                                : isDone
                                ? 'text-stone-800'
                                : 'text-stone-400'
                            }`}
                          >
                            {stage.label}
                          </span>
                          {isCurrent && (
                            <span className="text-2xs bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-2xs mt-0.5 ${
                            isCurrent
                              ? 'text-stone-700 font-medium'
                              : 'text-stone-500'
                          }`}
                        >
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Delivery Rider & Contact Box */}
          {order.riderName && !isCancelled && (
            <div className="p-3 bg-white border border-stone-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold">
                  <Bike className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">
                    {order.riderName}
                  </div>
                  <div className="text-2xs text-stone-500 flex items-center gap-1.5">
                    <span>{order.riderVehicle} • Delivery Partner</span>
                    <span className="text-2xs font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">Locality Morning Run</span>
                  </div>
                  {order.riderCurrentLocation && (
                    <div className="text-2xs text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      {order.riderCurrentLocation}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <a
                  href={`tel:${order.riderPhone}`}
                  className="px-3 py-1.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1 border border-stone-300"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-600" />
                  Call Rider
                </a>
              </div>
            </div>
          )}

          {/* Order Items & Farmer Provenance */}
          <div className="border border-stone-200 rounded-lg overflow-hidden">
            <div className="bg-stone-100 px-3 py-2 text-xs font-bold text-stone-700 flex justify-between">
              <span>Vegetables & Chosen Grades</span>
              <span>Total: ₹{order.totalAmount}</span>
            </div>
            <div className="divide-y divide-stone-100 text-xs p-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-2 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-stone-900">
                      {item.vegetableName}
                    </div>
                    <div className="text-2xs text-stone-500 flex items-center gap-2">
                      <span>🌾 Farmer: {item.farmerName}</span>
                      <span>•</span>
                      <span className="font-bold text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                        Grade {item.grade} (₹{item.pricePerKg}/kg)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-stone-900">
                      ₹{item.itemTotal}
                    </div>
                    <div className="text-2xs text-stone-500">
                      {item.quantityKg} kg
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown: Regular vs Bulk Token */}
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs space-y-1.5">
            <div className="flex justify-between text-stone-600">
              <span>Order Value ({order.totalKg} kg)</span>
              <span className="font-semibold">₹{order.totalAmount}</span>
            </div>

            {order.isBulk && order.tokenPaid !== undefined ? (
              <>
                <div className="flex justify-between text-emerald-800 font-semibold bg-emerald-50 p-1.5 rounded border border-emerald-200">
                  <span>Advance Token Paid ({order.tokenPercentage}%)</span>
                  <span>₹{order.tokenPaid} (Prepaid ✓)</span>
                </div>
                <div className="flex justify-between text-amber-900 font-bold p-1">
                  <span>Balance Due on Delivery</span>
                  <span>₹{order.remainingBalance} (Pay to Rider)</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-stone-800 font-semibold">
                <span>Payment Mode</span>
                <span className="uppercase text-2xs bg-stone-200 px-2 py-0.5 rounded font-bold">
                  {order.paymentMode === 'prepaid' ? 'Online Prepaid (Settled)' : 'Cash on Delivery (Pending)'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenCare(order.id);
            }}
            className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            Need Help? Contact Local Admin Desk
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 text-white rounded text-xs font-semibold hover:bg-stone-900 cursor-pointer"
          >
            {t.common.close}
          </button>
        </div>
      </div>
    </div>
  );
};
