// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  rating: number;
  reviewCount: number;
  isServiceProvider: boolean;
  createdAt: Date;
}

// Service Provider Types
export interface ServiceProvider {
  id: string;
  userId: string;
  services: Service[];
  availability: Availability[];
  location: Location;
  bio: string;
  portfolio: string[];
  pricing: PricingInfo;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  basePrice: number;
  duration: number; // in minutes
  icon: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// Booking Types
export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  scheduledDate: Date;
  scheduledTime: string;
  location: Location;
  status: BookingStatus;
  totalPrice: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'in-progress' 
  | 'completed' 
  | 'cancelled';

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

// Review Types
export interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Availability Types
export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isAvailable: boolean;
}

// Pricing Types
export interface PricingInfo {
  baseRate: number;
  currency: string;
  rateType: 'hourly' | 'fixed' | 'per-service';
}

// Navigation Types
export type RootStackParamList = {
  LaunchScreen: undefined;
  AuthStack: undefined;
  MainTabs: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type SearchStackParamList = {
  SearchMain: undefined;
  ServiceSelection: undefined;
  ProviderList: { 
    categoryId: string;
    categoryName: string;
    serviceId?: string; 
  };
  ProviderDetails: { providerId: string };
  BookingCalendar: { providerId: string; serviceId: string };
  BookingReview: { 
    providerId: string; 
    serviceId: string; 
    date: string; 
    time: string; 
  };
  BookingConfirmation: { bookingId: string };
};

export type HomeStackParamList = {
  HomeMain: undefined;
};

export type BookingsStackParamList = {
  BookingsMain: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  AccountSettings: undefined;
};

// Mantener compatibilidad con el código existente
export type BookingStackParamList = SearchStackParamList;

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Search Types
export interface SearchFilters {
  category?: string;
  location?: Location;
  radius?: number; // in kilometers
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  availability?: {
    date: Date;
    time?: string;
  };
}

export interface SearchResult {
  providers: ServiceProvider[];
  total: number;
  page: number;
  totalPages: number;
}