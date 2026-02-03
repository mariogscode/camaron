import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { Card, Text, Button, Avatar, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useDebugAuth } from '../../utils/useDebugAuth';
import { HomeStackParamList, MainTabParamList } from '../../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'HomeMain'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();
  const { authState, getAllUsers } = useDebugAuth();

  const handleSearchService = () => {
    // Navigate to service search/booking flow
    console.log('🔍 HomeScreen - Buscar Servicio clicked');
    // Navigate to the Search tab, which will then navigate to ServiceSelection
    navigation.navigate('Search');
  };

  const handleProvideService = () => {
    // TODO: Navigate to service provider registration/dashboard
    console.log('Dar Servicio');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const showDebugInfo = () => {
    const users = getAllUsers();
    const userType = authState.user?.isServiceProvider ? 'Proveedor de Servicios' : 'Cliente';
    Alert.alert(
      '🚧 Información de Debug', 
      `👤 Usuario: ${authState.user?.name || 'N/A'}\n` +
      `📧 Email: ${authState.user?.email || 'N/A'}\n` +
      `🎭 Tipo: ${userType}\n` +
      `⭐ Rating: ${authState.user?.rating || 'N/A'}\n` +
      `🔐 Autenticado: ${authState.isAuthenticated ? 'Sí' : 'No'}\n` +
      `👥 Total usuarios: ${users.length}\n\n` +
      `Este usuario fue creado con el botón de bypass para desarrollo.`,
      [
        { text: 'OK' },
        { text: 'Ver Todos los Usuarios', onPress: () => console.log('Usuarios:', users) }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🦐</Text>
        </View>
        {authState.user && (
          <Text style={styles.welcomeUser}>
            ¡Hola, {authState.user.name}! {authState.user.profileImage}
          </Text>
        )}
        <Text style={styles.greeting}>¿Qué quieres hacer?</Text>
        <Text style={styles.subtitle}>Elige una opción para continuar</Text>
      </View>

      {/* Service Options */}
      <View style={styles.optionsContainer}>
        {/* Search Service Option */}
        <Surface style={styles.serviceCard} elevation={4}>
          <View style={styles.cardContent}>
            <View style={styles.serviceIconContainer}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceEmoji}>🔍</Text>
              </View>
              <View style={styles.mascotContainer}>
                <Text style={styles.mascotEmoji}>🦐</Text>
              </View>
            </View>
            <Text style={styles.serviceTitle}>BUSCAR SERVICIO</Text>
            <Text style={styles.serviceDescription}>
              Encuentra el profesional perfecto para tu necesidad
            </Text>
            <Button
              mode="contained"
              onPress={handleSearchService}
              style={styles.serviceButton}
              contentStyle={styles.buttonContent}
              buttonColor="#4285F4"
            >
              Buscar Servicios
            </Button>
          </View>
        </Surface>

        {/* Provide Service Option */}
        <Surface style={styles.serviceCard} elevation={4}>
          <View style={styles.cardContent}>
            <View style={styles.serviceIconContainer}>
              <View style={[styles.serviceIcon, styles.providerIcon]}>
                <Text style={styles.serviceEmoji}>🛠️</Text>
              </View>
              <View style={[styles.mascotContainer, styles.providerMascot]}>
                <Text style={styles.mascotEmoji}>🦐</Text>
              </View>
            </View>
            <Text style={styles.serviceTitle}>DAR SERVICIO</Text>
            <Text style={styles.serviceDescription}>
              Ofrece tus habilidades y gana dinero extra
            </Text>
            <Button
              mode="contained"
              onPress={handleProvideService}
              style={styles.serviceButton}
              contentStyle={styles.buttonContent}
              buttonColor="#34A853"
            >
              Ofrecer Servicios
            </Button>
          </View>
        </Surface>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
        <View style={styles.quickActions}>
          <Surface style={styles.quickActionCard} elevation={2}>
            <Text style={styles.quickActionIcon}>📍</Text>
            <Text style={styles.quickActionText}>Cerca de ti</Text>
          </Surface>
          <Surface style={styles.quickActionCard} elevation={2}>
            <Text style={styles.quickActionIcon}>⭐</Text>
            <Text style={styles.quickActionText}>Mejor valorados</Text>
          </Surface>
          <Surface style={styles.quickActionCard} elevation={2}>
            <Text style={styles.quickActionIcon}>💰</Text>
            <Text style={styles.quickActionText}>Mejor precio</Text>
          </Surface>
          <Surface style={styles.quickActionCard} elevation={2}>
            <Text style={styles.quickActionIcon}>🕐</Text>
            <Text style={styles.quickActionText}>Disponible ahora</Text>
          </Surface>
        </View>
      </View>

      {/* Debug Section */}
      <View style={styles.debugContainer}>
        <Button mode="outlined" onPress={showDebugInfo} style={styles.debugButton}>
          🐛 Debug Info
        </Button>
        <Button mode="text" onPress={handleLogout} style={styles.debugButton}>
          Cerrar Sesión
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 32,
  },
  welcomeUser: {
    fontSize: 18,
    color: '#4285F4',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 32,
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 24,
    alignItems: 'center',
  },
  serviceIconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  serviceIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerIcon: {
    backgroundColor: '#E8F5E8',
  },
  serviceEmoji: {
    fontSize: 32,
  },
  mascotContainer: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  providerMascot: {
    backgroundColor: '#34A853',
  },
  mascotEmoji: {
    fontSize: 20,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  serviceButton: {
    width: '100%',
  },
  buttonContent: {
    height: 48,
  },
  quickActionsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 48 - 12) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  debugContainer: {
    marginTop: 20,
    gap: 8,
  },
  debugButton: {
    marginVertical: 4,
  },
});