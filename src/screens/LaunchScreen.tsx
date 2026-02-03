import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../types';
import { AppDispatch, RootState } from '../store';
import { bypassLogin } from '../store/slices/authSlice';
import { authService } from '../services/authService';

type LaunchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LaunchScreen'>;

const { width, height } = Dimensions.get('window');

export default function LaunchScreen() {
  const navigation = useNavigation<LaunchScreenNavigationProp>();
  const dispatch = useDispatch() as any;
  const isAuthenticated = useSelector((state: RootState) => (state.auth as any).isAuthenticated);
  const authUser = useSelector((state: RootState) => (state.auth as any).user);

  // Debug auth state changes
  useEffect(() => {
    console.log('🏁 LaunchScreen - Auth state changed:', { 
      isAuthenticated, 
      user: authUser?.name || 'No user'
    });
  }, [isAuthenticated, authUser]);

  useEffect(() => {
    // No navegar automáticamente si está autenticado
    if (!isAuthenticated) {
      // Solo navegar a AuthStack si NO está autenticado después de 3 segundos
      const timer = setTimeout(() => {
        // Verificar nuevamente antes de navegar
        if (!isAuthenticated) {
          navigation.replace('AuthStack');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
    // Si ya está autenticado, no hacer nada - el RootNavigator manejará la navegación
  }, [navigation]); // Removí isAuthenticated de las dependencias para evitar loops

  // Función de bypass rápido para desarrollo
  const handleQuickBypass = () => {
    console.log('🚧 Bypass button clicked - Starting bypass process');
    console.log('🚧 Current auth state before bypass:', { isAuthenticated, user: (useSelector((state: RootState) => state.auth) as any).user?.name });
    
    try {
      // Crear usuario de prueba
      const testUser = authService.createTestUser();
      console.log('👤 Test user created:', testUser);
      
      // Dispatch bypass action
      dispatch(bypassLogin(testUser));
      console.log('✅ Bypass login dispatched');
      
      // Check state after a small delay
      setTimeout(() => {
        const newAuthState = (global as any).store?.getState()?.auth || 'State not accessible';
        console.log('🔍 Auth state after bypass:', newAuthState);
      }, 100);
      
      // Confirmar con alert
      Alert.alert(
        '✅ ¡Bypass Exitoso!', 
        `Accediendo como: ${testUser.name}\nEmail: ${testUser.email}`,
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('🚀 User confirmed bypass');
            }
          }
        ]
      );
      
    } catch (error) {
      console.error('❌ Error in bypass:', error);
      Alert.alert('❌ Error', `No se pudo hacer bypass: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          {/* Placeholder for Camaron mascot/logo */}
          <Text style={styles.logoEmoji}>🦐</Text>
        </View>
        <Text style={styles.appName}>Camaron</Text>
        <Text style={styles.tagline}>Tu marketplace de servicios</Text>
        
        {/* Debug info */}
        {isAuthenticated && (
          <Text style={styles.debugInfo}>
            ✅ Usuario autenticado
          </Text>
        )}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.version}>v1.0.0</Text>
        
        {/* Development Quick Access */}
        <View style={styles.quickAccessContainer}>
          <Button
            mode="contained"
            onPress={handleQuickBypass}
            style={styles.quickAccessButton}
            buttonColor="#FF9800"
            textColor="white"
            icon="flash"
            compact={false}
          >
            🚧 Dev: Acceso Rápido
          </Button>
          <Text style={styles.quickAccessDescription}>
            Tap para acceso directo de desarrollo
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoEmoji: {
    fontSize: 64,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
  version: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  quickAccessContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  quickAccessButton: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 8,
  },
  quickAccessDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  debugInfo: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 8,
    textAlign: 'center',
  },
});