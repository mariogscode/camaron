import { User } from '../types';

// Simulated API - En producción esto se conectaría a Firebase/Backend
class AuthService {
  private users: User[] = [];
  private currentUserId = 1;

  // Simular registro de usuario
  async registerUser(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    isServiceProvider: boolean;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Validar si el email ya existe
      const existingUser = this.users.find(user => user.email === userData.email);
      if (existingUser) {
        return {
          success: false,
          error: 'El email ya está registrado'
        };
      }

      // Validar datos
      if (!this.validateUserData(userData)) {
        return {
          success: false,
          error: 'Datos inválidos. Verifica todos los campos.'
        };
      }

      // Crear nuevo usuario
      const newUser: User = {
        id: this.currentUserId.toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        isServiceProvider: userData.isServiceProvider,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date(),
      };

      this.users.push(newUser);
      this.currentUserId++;

      // Simular delay de red
      await this.simulateNetworkDelay();

      return {
        success: true,
        user: newUser
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error interno del servidor'
      };
    }
  }

  // Simular login
  async loginUser(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      await this.simulateNetworkDelay();

      const user = this.users.find(user => user.email === email);
      
      if (!user) {
        return {
          success: false,
          error: 'Usuario no encontrado'
        };
      }

      // En producción validarías la contraseña hasheada
      return {
        success: true,
        user
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al iniciar sesión'
      };
    }
  }

  // Validar datos de usuario
  private validateUserData(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,}$/;

    return (
      userData.name.trim().length >= 2 &&
      emailRegex.test(userData.email) &&
      phoneRegex.test(userData.phone.replace(/\D/g, '')) &&
      userData.password.length >= 6
    );
  }

  // Simular delay de red
  private simulateNetworkDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  }

  // Obtener todos los usuarios (para testing)
  getAllUsers(): User[] {
    return this.users;
  }

  // Limpiar datos (para testing)
  clearUsers(): void {
    this.users = [];
    this.currentUserId = 1;
  }

  // Crear usuario de prueba para bypass (solo para desarrollo)
  createTestUser(): User {
    const testUser: User = {
      id: 'test-user-dev',
      name: 'Mario Rodriguez (Dev)',
      email: 'dev@camaron.app',
      phone: '1234567890',
      isServiceProvider: true, // Usuario con perfil de proveedor para testing completo
      rating: 4.9,
      reviewCount: 47,
      createdAt: new Date(),
      profileImage: '👨‍�', // Emoji para identificar fácilmente en debug
    };
    
    // Agregar usuario de prueba si no existe
    const existingTest = this.users.find(user => user.id === testUser.id);
    if (!existingTest) {
      this.users.push(testUser);
    }
    
    return testUser;
  }
}

export const authService = new AuthService();