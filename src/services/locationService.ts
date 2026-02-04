import * as Location from 'expo-location';
import { UserLocation, LocationPermissionStatus, MapRegion } from '../types';

/**
 * Service for handling user location operations
 */
class LocationService {
  private static instance: LocationService;
  private currentLocation: UserLocation | null = null;

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  /**
   * Request location permissions from the user
   */
  async requestLocationPermissions(): Promise<LocationPermissionStatus> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      return {
        granted: status === 'granted',
        canAskAgain: status !== 'denied'
      };
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return {
        granted: false,
        canAskAgain: false
      };
    }
  }

  /**
   * Get current location permissions status
   */
  async getLocationPermissionsStatus(): Promise<LocationPermissionStatus> {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      
      return {
        granted: status === 'granted',
        canAskAgain: status !== 'denied'
      };
    } catch (error) {
      console.error('Error getting location permissions status:', error);
      return {
        granted: false,
        canAskAgain: false
      };
    }
  }

  /**
   * Get the user's current location
   */
  async getCurrentLocation(): Promise<UserLocation | null> {
    try {
      const permissionStatus = await this.getLocationPermissionsStatus();
      
      if (!permissionStatus.granted) {
        console.warn('Location permissions not granted');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
      });

      const userLocation: UserLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp,
      };

      this.currentLocation = userLocation;
      return userLocation;
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  /**
   * Watch location changes
   */
  async watchLocation(
    callback: (location: UserLocation | null) => void
  ): Promise<{ remove: () => void } | null> {
    try {
      const permissionStatus = await this.getLocationPermissionsStatus();
      
      if (!permissionStatus.granted) {
        console.warn('Location permissions not granted');
        return null;
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000, // Update every 10 seconds
          distanceInterval: 100, // Update when moved 100 meters
        },
        (location) => {
          const userLocation: UserLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            timestamp: location.timestamp,
          };
          
          this.currentLocation = userLocation;
          callback(userLocation);
        }
      );

      return subscription;
    } catch (error) {
      console.error('Error watching location:', error);
      callback(null);
      return null;
    }
  }

  /**
   * Calculate distance between two points in kilometers
   */
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Get cached current location
   */
  getCachedLocation(): UserLocation | null {
    return this.currentLocation;
  }

  /**
   * Create a map region from user location
   */
  createMapRegion(
    location: UserLocation,
    deltaDistance: number = 2 // Distance in km for zoom level
  ): MapRegion {
    const latitudeDelta = deltaDistance / 111; // 1 degree ≈ 111 km
    const longitudeDelta = deltaDistance / (111 * Math.cos(location.latitude * (Math.PI / 180)));

    return {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta,
      longitudeDelta,
    };
  }

  /**
   * Filter providers by distance
   */
  filterProvidersByDistance<T extends { location: { latitude: number; longitude: number } }>(
    providers: T[],
    userLocation: UserLocation,
    maxDistance: number = 20 // in kilometers
  ): Array<T & { distance: number }> {
    return providers
      .map(provider => ({
        ...provider,
        distance: this.calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          provider.location.latitude,
          provider.location.longitude
        )
      }))
      .filter(provider => provider.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);
  }
}

export default LocationService.getInstance();