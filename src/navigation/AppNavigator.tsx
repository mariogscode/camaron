import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { store, RootState } from '../store/index';

// Import screens
import LaunchScreen from '../screens/LaunchScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/main/HomeScreen';
import ServiceSelectionScreen from '../screens/booking/ServiceSelectionScreen';
import ProviderListScreen from '../screens/booking/ProviderListScreen';
import ProviderDetailsScreen from '../screens/booking/ProviderDetailsScreen';
import BookingCalendarScreen from '../screens/booking/BookingCalendarScreen';
import BookingReviewScreen from '../screens/booking/BookingReviewScreen';
import BookingConfirmationScreen from '../screens/booking/BookingConfirmationScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import BookingsScreen from '../screens/main/BookingsScreen';
import SearchScreen from '../screens/main/SearchScreen';
import AccountSettingsScreen from '../screens/profile/AccountSettingsScreen';
import MapScreen from '../screens/map/MapScreen';

import { RootStackParamList, AuthStackParamList, MainTabParamList, BookingStackParamList } from '../types';

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabParamList>();
const BookingStack = createStackNavigator<BookingStackParamList>();

// Auth Stack Navigator
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// Main Tabs Navigator
function MainTabsNavigator() {
  return (
    <MainTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4285F4',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <MainTabs.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />
      <MainTabs.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🔍</Text>
          ),
        }}
      />
      <MainTabs.Screen 
        name="Bookings" 
        component={BookingsScreen}
        options={{
          tabBarLabel: 'Reservas',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📅</Text>
          ),
        }}
      />
      <MainTabs.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
    </MainTabs.Navigator>
  );
}

// Booking Stack Navigator
function BookingStackNavigator() {
  return (
    <BookingStack.Navigator>
      <BookingStack.Screen 
        name="ServiceSelection" 
        component={ServiceSelectionScreen}
        options={{ title: 'Selecciona un Servicio' }}
      />
      <BookingStack.Screen 
        name="ProviderList" 
        component={ProviderListScreen}
        options={{ title: 'Colaboradores' }}
      />
      <BookingStack.Screen 
        name="ProviderDetails" 
        component={ProviderDetailsScreen}
        options={{ title: 'Perfil Colaborador' }}
      />
      <BookingStack.Screen 
        name="BookingCalendar" 
        component={BookingCalendarScreen}
        options={{ title: 'Seleccionar Horario' }}
      />
      <BookingStack.Screen 
        name="BookingReview" 
        component={BookingReviewScreen}
        options={{ title: 'Revisar y Confirmar' }}
      />
      <BookingStack.Screen 
        name="BookingConfirmation" 
        component={BookingConfirmationScreen}
        options={{ title: 'Confirmación' }}
      />
    </BookingStack.Navigator>
  );
}

// Root Navigator
function RootNavigator() {
  // Get authentication status from Redux
  const isAuthenticated = useSelector((state: RootState) => (state.auth as any).isAuthenticated);
  const user = useSelector((state: RootState) => (state.auth as any).user);
  
  // Debug log the auth state
  console.log('🧭 RootNavigator - isAuthenticated:', isAuthenticated, 'user:', user?.name);
  
  React.useEffect(() => {
    console.log('🧭 RootNavigator - Auth state changed, rendering screens for authenticated user');
  }, [isAuthenticated]);
  
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <>
          <RootStack.Screen name="LaunchScreen" component={LaunchScreen} />
          <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
        </>
      ) : (
        <>
          <RootStack.Screen name="MainTabs" component={MainTabsNavigator} />
          <RootStack.Screen name="ServiceSelection" component={ServiceSelectionScreen} />
          <RootStack.Screen name="BookingStack" component={BookingStackNavigator} />
          <RootStack.Screen name="MapScreen" component={MapScreen} />
          <RootStack.Screen name="AccountSettings" component={AccountSettingsScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}