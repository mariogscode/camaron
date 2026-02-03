// API Service para conectar con Firebase o Backend
import { User, ServiceProvider, Service, ServiceCategory, Booking } from '../../types';

// Configuración de la API
const API_CONFIG = {
  // Firebase Config (cuando estés listo para Firebase)
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  },
  // O Backend REST API
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://your-api.com/api',
};

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.baseURL;
  }

  // ====== AUTHENTICATION ======
  async loginUser(email: string, password: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Error en el login' };
      }

      return {
        success: true,
        user: data.user,
        token: data.token,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión',
      };
    }
  }

  async registerUser(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    isServiceProvider: boolean;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || 'Error en el registro' };
      }

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión',
      };
    }
  }

  // ====== SERVICES ======
  async getServiceCategories(): Promise<{ success: boolean; categories?: ServiceCategory[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/services/categories`);
      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message };
      }

      return {
        success: true,
        categories: data.categories,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error cargando categorías',
      };
    }
  }

  async getServicesByCategoryId(categoryId: string): Promise<{ success: boolean; services?: Service[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/services/category/${categoryId}`);
      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message };
      }

      return {
        success: true,
        services: data.services,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error cargando servicios',
      };
    }
  }

  // ====== SERVICE PROVIDERS ======
  async getProvidersByCategory(
    categoryId: string,
    filters?: {
      location?: { latitude: number; longitude: number; radius?: number };
      priceRange?: { min: number; max: number };
      rating?: number;
      availability?: { date: string; time?: string };
    }
  ): Promise<{ success: boolean; providers?: ServiceProvider[]; error?: string }> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.location) {
        queryParams.append('lat', filters.location.latitude.toString());
        queryParams.append('lng', filters.location.longitude.toString());
        if (filters.location.radius) {
          queryParams.append('radius', filters.location.radius.toString());
        }
      }
      if (filters?.priceRange) {
        queryParams.append('minPrice', filters.priceRange.min.toString());
        queryParams.append('maxPrice', filters.priceRange.max.toString());
      }
      if (filters?.rating) {
        queryParams.append('minRating', filters.rating.toString());
      }

      const response = await fetch(`${this.baseUrl}/providers/category/${categoryId}?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message };
      }

      return {
        success: true,
        providers: data.providers,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error cargando colaboradores',
      };
    }
  }

  async getProviderById(providerId: string): Promise<{ success: boolean; provider?: ServiceProvider; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/providers/${providerId}`);
      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message };
      }

      return {
        success: true,
        provider: data.provider,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error cargando colaborador',
      };
    }
  }

  // ====== BOOKINGS ======
  async createBooking(bookingData: {
    providerId: string;
    serviceId: string;
    clientId: string;
    date: string;
    time: string;
    notes?: string;
  }): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`, // Implementar auth token
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message };
      }

      return {
        success: true,
        booking: data.booking,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error creando reserva',
      };
    }
  }

  async getUserBookings(userId: string): Promise<{ success: boolean; bookings?: Booking[]; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/bookings/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message };
      }

      return {
        success: true,
        bookings: data.bookings,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error cargando reservas',
      };
    }
  }

  // ====== UTILITIES ======
  private getAuthToken(): string {
    // Implementar lógica para obtener token de autenticación
    // Por ahora retorna string vacío
    return '';
  }

  // Método para establecer el token de autenticación
  setAuthToken(token: string): void {
    // Guardar token en AsyncStorage o contexto seguro
    console.log('Setting auth token:', token);
  }
}

export const apiService = new ApiService();