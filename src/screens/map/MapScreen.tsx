import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import { IconButton } from 'react-native-paper';
import LocationService from '../../services/locationService';
import { UserLocation, MapRegion } from '../../types';

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [mapRegion, setMapRegion] = useState<MapRegion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState<{ remove: () => void } | null>(null);

  useEffect(() => {
    initializeLocation();
    
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const initializeLocation = async () => {
    try {
      setIsLoading(true);

      // Check current permissions
      const currentPermissions = await LocationService.getLocationPermissionsStatus();
      
      if (!currentPermissions.granted) {
        // Request permissions
        const newPermissions = await LocationService.requestLocationPermissions();
        setHasLocationPermission(newPermissions.granted);
        
        if (!newPermissions.granted) {
          Alert.alert(
            'Permisos de Ubicación',
            'Para mostrarte el mapa y proveedores cercanos, necesitamos acceso a tu ubicación.',
            [
              {
                text: 'Configuración',
                onPress: () => {
                  // Here you could open app settings
                  console.log('Open app settings');
                }
              },
              {
                text: 'Cancelar',
                style: 'cancel'
              }
            ]
          );
          setIsLoading(false);
          return;
        }
      } else {
        setHasLocationPermission(true);
      }

      // Get current location
      const location = await LocationService.getCurrentLocation();
      
      if (location) {
        setUserLocation(location);
        const region = LocationService.createMapRegion(location);
        setMapRegion(region);
        
        // Start watching location changes
        const subscription = await LocationService.watchLocation((newLocation) => {
          if (newLocation) {
            setUserLocation(newLocation);
            // Don't automatically update map region unless user wants it
          }
        });
        
        setLocationSubscription(subscription);
      } else {
        Alert.alert(
          'Error de Ubicación',
          'No pudimos obtener tu ubicación. Verifica que el GPS esté activado.',
          [
            {
              text: 'Reintentar',
              onPress: () => initializeLocation()
            },
            {
              text: 'Cancelar',
              style: 'cancel'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error initializing location:', error);
      Alert.alert(
        'Error',
        'Ocurrió un error al inicializar la ubicación.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const centerMapOnUser = () => {
    if (userLocation) {
      const region = LocationService.createMapRegion(userLocation);
      setMapRegion(region);
    }
  };

  const handleRegionChange = (region: Region) => {
    setMapRegion(region);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Obteniendo tu ubicación...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!hasLocationPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Permisos de Ubicación Requeridos</Text>
          <Text style={styles.errorMessage}>
            Para usar esta función, necesitamos acceso a tu ubicación.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={initializeLocation}>
            <Text style={styles.retryButtonText}>Solicitar Permisos</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!mapRegion || !userLocation) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error de Ubicación</Text>
          <Text style={styles.errorMessage}>
            No pudimos obtener tu ubicación actual.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={initializeLocation}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapa</Text>
      </View>
      
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={mapRegion}
          onRegionChange={handleRegionChange}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
          mapType="standard"
        >
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Tu ubicación"
              description="Estás aquí"
              pinColor="#007bff"
            />
          )}
        </MapView>

        <View style={styles.mapControls}>
          <TouchableOpacity
            style={styles.centerButton}
            onPress={centerMapOnUser}
          >
            <IconButton 
              icon="crosshairs-gps" 
              size={24} 
              iconColor="#007bff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  centerButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});