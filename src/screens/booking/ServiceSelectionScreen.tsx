import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type ServiceSelectionNavigationProp = StackNavigationProp<RootStackParamList>;

interface ServiceCategory {
  id: string;
  name: string;
  availableCount: number;
  image: string;
  color: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'maintenance',
    name: 'Mantenimiento',
    availableCount: 300,
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300&h=200&fit=crop',
    color: '#4285F4'
  },
  {
    id: 'cleaning',
    name: 'Limpieza', 
    availableCount: 402,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
    color: '#34A853'
  },
  {
    id: 'electrician',
    name: 'Electricista',
    availableCount: 242,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop',
    color: '#FBBC04'
  },
  {
    id: 'gardener',
    name: 'Jardinero',
    availableCount: 242,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    color: '#EA4335'
  }
];

export default function ServiceSelectionScreen() {
  const navigation = useNavigation<ServiceSelectionNavigationProp>();
  const [searchQuery, setSearchQuery] = React.useState('');

  // Debug log to see if component is mounting
  React.useEffect(() => {
    console.log('🏗️ ServiceSelectionScreen - Component mounted');
    console.log('📋 Available service categories:', serviceCategories.length);
  }, []);

  const handleServiceSelect = (serviceCategory: ServiceCategory) => {
    console.log('Selected service:', serviceCategory.name);
    // Navigate to BookingStack and pass initial route
    navigation.navigate('BookingStack', {
      screen: 'ProviderList',
      params: { 
        categoryId: serviceCategory.id,
        categoryName: serviceCategory.name 
      }
    } as any);
  };

  const handleBack = () => {
    console.log('🔙 ServiceSelectionScreen - Going back');
    navigation.goBack();
  };

  const handleLocationPress = () => {
    // TODO: Implement location selection
    console.log('📍 ServiceSelectionScreen - Location pressed');
  };

  // Simple test render first
  return (
    <View style={styles.container}>
      <Text style={styles.testText}>🦐 Service Selection Screen</Text>
      <Text style={styles.testSubtext}>Esta pantalla está funcionando!</Text>
      
      <TouchableOpacity style={styles.testButton} onPress={handleBack}>
        <Text style={styles.testButtonText}>← Regresar</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.testList}>
        {serviceCategories.map((service, index) => (
          <TouchableOpacity
            key={service.id}
            style={styles.testServiceItem}
            onPress={() => handleServiceSelect(service)}
          >
            <Text style={styles.testServiceName}>{service.name}</Text>
            <Text style={styles.testServiceCount}>{service.availableCount} disponibles</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // Original complex render commented out for testing
  /*
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header }
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={handleBack}
          style={styles.backButton}
        />
        
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Buscar servicios..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchbar}
            inputStyle={styles.searchInput}
          />
        </View>

        <IconButton
          icon="map-marker"
          size={24}
          onPress={handleLocationPress}
          style={styles.locationButton}
        />
      </View>

      {/* Services List }
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.servicesList}>
          {serviceCategories.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServiceSelect(service)}
              activeOpacity={0.8}
            >
              <View style={styles.serviceImageContainer}>
                <Image
                  source={{ uri: service.image }}
                  style={styles.serviceImage}
                  resizeMode="cover"
                />
              </View>
              
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.availableCount}>
                  {service.availableCount} availables
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={handleBack}
          style={styles.backButton}
        />
        
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Buscar servicios..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchbar}
            inputStyle={styles.searchInput}
          />
        </View>

        <IconButton
          icon="map-marker"
          size={24}
          onPress={handleLocationPress}
          style={styles.locationButton}
        />
      </View>

      {/* Services List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.servicesList}>
          {serviceCategories.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServiceSelect(service)}
              activeOpacity={0.8}
            >
              <View style={styles.serviceImageContainer}>
                <Image
                  source={{ uri: service.image }}
                  style={styles.serviceImage}
                  resizeMode="cover"
                />
              </View>
              
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.availableCount}>
                  {service.availableCount} availables
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  // Test styles
  testText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  testSubtext: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  testButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  testButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  testList: {
    flex: 1,
  },
  testServiceItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  testServiceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  testServiceCount: {
    fontSize: 14,
    color: '#666',
  },
  // Original styles (commented out)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    margin: 0,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  searchbar: {
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
  },
  locationButton: {
    margin: 0,
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  servicesList: {
    padding: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  serviceImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  availableCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
  },
});