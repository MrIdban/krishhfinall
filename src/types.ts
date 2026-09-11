export type Language = 'en' | 'hi' | 'bn' | 'mr' | 'pa';

export type UserRole = 'farmer' | 'admin' | 'buyer' | 'rider';

export type WebsiteView = 'choose' | 'farmer_login' | 'admin_login' | 'rider_login' | 'client' | 'admin' | 'rider' | 'farmer';

export interface AuthUser {
  role: UserRole;
  id: string;
  name: string;
  phoneOrId: string;
  hubOrVillage?: string;
  avatarUrl?: string;
}

export type VegetableGrade = 'A' | 'B' | 'C';

export interface GradeInfo {
  grade: VegetableGrade;
  title: string;
  description: string;
  priceDiscountPercent: number; // e.g. 0% for A, 28% for B, 52% for C
  badgeColor: string;
}

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  village: string;
  tehsil: string;
  distanceKm: number;
  kisanCardNo: string;
  verified: boolean;
  rating: number;
  photoUrl: string;
  joinedDate: string;
  experienceYears: number;
  cropsGrown: string[];
  organicCertified: boolean;
}

export interface VegetableProduct {
  id: string;
  name: string;
  names: {
    en: string;
    hi: string;
    bn: string;
    mr: string;
    pa?: string;
  };
  category: 'staples' | 'grains' | 'roots' | 'leafy' | 'gourds' | 'spices';
  basePriceGradeA: number; // Base price for Grade A per kg
  image: string;
  defaultUnit: string;
  nutritionalHighlight: string;
}

export interface FarmerStock {
  id: string;
  farmerId: string;
  vegetableId: string;
  grade: VegetableGrade;
  quantityKg: number;
  pricePerKg: number; // Calculated or adjusted by admin based on grade
  qualityChecked: boolean;
  qualityScore: number; // 0 - 100
  harvestDate: string;
  inspectionNotes?: string;
}

export interface CartItem {
  vegetableId: string;
  farmerId: string;
  grade: VegetableGrade;
  quantityKg: number;
  pricePerKg: number;
}

export interface OrderItem {
  vegetableId: string;
  vegetableName: string;
  farmerId: string;
  farmerName: string;
  grade: VegetableGrade;
  quantityKg: number;
  pricePerKg: number;
  itemTotal: number;
}

export interface BulkAllocation {
  farmerId: string;
  farmerName: string;
  vegetableId: string;
  vegetableName: string;
  allocatedKg: number;
  grade: VegetableGrade;
}

export type OrderStatus =
  | 'placed'
  | 'admin_allocated'
  | 'rider_assigned'
  | 'picked_up'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalKg: number;
  totalAmount: number;
  isBulk: boolean;
  tokenPercentage?: number; // e.g. 30%, 50%, 100%
  tokenPaid?: number; // Token money advance for bulk orders (>= 30%)
  remainingBalance?: number; // Due on delivery
  paymentMode: 'prepaid' | 'cod';
  paymentStatus: 'paid' | 'token_paid' | 'pending_cod';
  status: OrderStatus;
  cancelReason?: string;
  placedAt: string;
  deliveryExpectedMin: number; // e.g. 30 mins
  deliverySlot?: string; // e.g. 'Tomorrow Morning (7:00 AM - 11:00 AM)'
  allocatedStock?: BulkAllocation[];
  riderId?: string;
  riderName?: string;
  riderPhone?: string;
  riderVehicle?: string;
  riderCurrentLocation?: string;
}

export interface CustomerCareMessage {
  id: string;
  sender: 'customer' | 'admin';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface CustomerCareTicket {
  id: string;
  ticketNo: string;
  orderId?: string;
  customerName: string;
  customerPhone: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  messages: CustomerCareMessage[];
}

export interface RiderProfile {
  id: string;
  name: string;
  phone: string;
  vehicleType: string;
  vehicleNo: string;
  rating: number;
  completedTripsToday: number;
  earningsToday: number;
  status: 'online' | 'busy' | 'offline';
  currentHub: string;
}

export interface FarmerReview {
  id: string;
  farmerId: string;
  customerName: string;
  customerLocation: string;
  cropName: string;
  grade: VegetableGrade;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  verifiedBuyer: boolean;
  farmerReply?: string;
}

export interface FarmerPayoutTransaction {
  id: string;
  farmerId: string;
  orderNumber?: string;
  cropName: string;
  quantityKg: number;
  grade: VegetableGrade;
  ratePerKg: number;
  totalAmount: number;
  date: string;
  status: 'settled' | 'processing' | 'pending';
  payoutMethod: string;
}

export interface FarmerSupportMessage {
  id: string;
  sender: 'farmer' | 'admin';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface FarmerSupportTicket {
  id: string;
  farmerId: string;
  ticketNo: string;
  subject: string;
  category: 'payment' | 'quota' | 'grading_dispute' | 'crate_supply' | 'crop_advisory';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  messages: FarmerSupportMessage[];
}

export interface CropDemandForecast {
  cropName: 'Potatoes' | 'Rice' | 'Onion' | 'Wheat';
  hindiName: string;
  predictedDemandKg: number;
  changePercent: number;
  gradeBreakdown: {
    A: number;
    B: number;
    C: number;
  };
  currentStockKg: number;
  deficitKg: number;
  urgency: 'normal' | 'high' | 'critical';
  assignedFarmers: string[];
  recommendedAction: string;
  fairPriceGuidance: string;
}

export interface FarmerHarvestQuota {
  farmerId: string;
  farmerName: string;
  village: string;
  crop: string;
  recommendedHarvestKg: number;
  suggestedReadyTime: string;
  cratesNeeded: number;
  reason: string;
  allocated?: boolean;
}

export interface AIDemandForecastResult {
  forecastDate: string;
  summary: string;
  confidenceScore: number;
  marketSentiment: string;
  weatherImpact: string;
  cropForecasts: CropDemandForecast[];
  farmerQuotas: FarmerHarvestQuota[];
  strategicAdvisories: string[];
}
