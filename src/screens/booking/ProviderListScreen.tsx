import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { IconButton, Checkbox } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BookingStackParamList } from '../../types';

type ProviderListScreenNavigationProp = StackNavigationProp<BookingStackParamList, 'ProviderList'>;
type ProviderListScreenRouteProp = RouteProp<BookingStackParamList, 'ProviderList'>;

interface ServiceProvider {
  id: string;
  name: string;
  title: string;
  rating: number;
  description: string;
  jobsCompleted: number;
  hourlyRate: number;
  profileImage: string;
  isElite: boolean;
  badges: string[];
}

const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Sadico Timido',
    title: 'Elite tasker',
    rating: 5.0,
    description: 'Soy un técnico especializado en servicios de mantenimiento general. Ofrezco reparaciones eléctricas, plomería, pintura, instalación de equipos, carpintería y más.',
    jobsCompleted: 5,
    hourlyRate: 15,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    isElite: true,
    badges: ['Elite tasker']
  },
  {
    id: '2', 
    name: 'Elizabeth Bailey',
    title: 'Elite tasker',
    rating: 5.0,
    description: 'Brindo soluciones completas para el mantenimiento de tu hogar, oficina o negocio.',
    jobsCompleted: 3,
    hourlyRate: 8,
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    isElite: true,
    badges: ['Elite tasker']
  },
  {
    id: '3',
    name: 'Ashley Robinson', 
    title: 'Regular tasker',
    rating: 4.5,
    description: 'Especialista en mantenimiento y reparaciones, ofrezco servicios de calidad que incluyen arreglos eléctricos, plomería, pintura, montaje de muebles y más.',
    jobsCompleted: 2,
    hourlyRate: 6.5,
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    isElite: false,
    badges: ['Regular tasker']
  }
];

export default function ProviderListScreen() {
  const navigation = useNavigation<ProviderListScreenNavigationProp>();
  const route = useRoute<ProviderListScreenRouteProp>();
  const { categoryId, categoryName } = route.params || { categoryId: 'maintenance', categoryName: 'Mantenimiento' };
  
  const [filters, setFilters] = useState({
    thisWeek: false,
    flexible: false,
    tools: false
  });
  const [priceRange, setPriceRange] = useState([0, 15]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleProviderSelect = (provider: ServiceProvider) => {
    console.log('Selected provider:', provider.name);
    navigation.navigate('ProviderDetails', { providerId: provider.id });
  };

  const toggleFilter = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating));
  };

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
        <Text style={styles.headerTitle}>Selecciona tu colaborador</Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.checkboxFilters}>
          <View style={styles.checkboxRow}>
            <Checkbox
              status={filters.thisWeek ? 'checked' : 'unchecked'}
              onPress={() => toggleFilter('thisWeek')}
            />
            <Text style={styles.checkboxLabel}>Esta Semana</Text>
          </View>
          
          <View style={styles.checkboxRow}>
            <Checkbox
              status={filters.flexible ? 'checked' : 'unchecked'}
              onPress={() => toggleFilter('flexible')}
            />
            <Text style={styles.checkboxLabel}>Flexible</Text>
          </View>
          
          <View style={styles.checkboxRow}>
            <Checkbox
              status={filters.tools ? 'checked' : 'unchecked'}
              onPress={() => toggleFilter('tools')}
            />
            <Text style={styles.checkboxLabel}>Herramientas</Text>
          </View>
        </View>

        {/* Price Range Slider */}
        <View style={styles.priceRangeContainer}>
          <Text style={styles.priceLabel}>${priceRange[0]}$ — {priceRange[1]}$</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>0$</Text>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderThumb, { left: `${(priceRange[1] / 15) * 80}%` }]} />
            </View>
            <Text style={styles.sliderLabel}>15$</Text>
          </View>
        </View>
      </View>

      {/* Providers List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.providersList}>
          {mockProviders.map((provider) => (
            <TouchableOpacity
              key={provider.id}
              style={styles.providerCard}
              onPress={() => handleProviderSelect(provider)}
              activeOpacity={0.8}
            >
              <View style={styles.providerHeader}>
                <Image
                  source={{ uri: provider.profileImage }}
                  style={styles.providerImage}
                />
                <View style={styles.providerInfo}>
                  <View style={styles.providerBadgeContainer}>
                    <Text style={[
                      styles.providerBadge,
                      provider.isElite ? styles.eliteBadge : styles.regularBadge
                    ]}>
                      {provider.title}
                    </Text>
                    <Text style={styles.providerRating}>
                      {renderStars(provider.rating)} {provider.rating}
                    </Text>
                  </View>
                  <Text style={styles.providerName}>{provider.name}</Text>
                </View>
              </View>
              
              <Text style={styles.providerDescription} numberOfLines={3}>
                {provider.description}
              </Text>
              
              <View style={styles.providerFooter}>
                <View style={styles.jobsCompleted}>
                  <Text style={styles.jobsIcon}>✓</Text>
                  <Text style={styles.jobsText}>{provider.jobsCompleted} overall jobs</Text>
                </View>
                <Text style={styles.hourlyRate}>${provider.hourlyRate}/hr</Text>
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
  },
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  filtersContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  checkboxFilters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  priceRangeContainer: {
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginHorizontal: 12,
    position: 'relative',
  },
  sliderThumb: {
    width: 20,
    height: 20,
    backgroundColor: '#4285F4',
    borderRadius: 10,
    position: 'absolute',
    top: -8,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  providersList: {
    padding: 16,
  },
  providerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  providerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  providerInfo: {
    flex: 1,
  },
  providerBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  providerBadge: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  eliteBadge: {
    backgroundColor: '#E8F5E8',
    color: '#2E7D2E',
  },
  regularBadge: {
    backgroundColor: '#F0F0F0',
    color: '#666',
  },
  providerRating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  providerDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  providerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobsCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobsIcon: {
    fontSize: 16,
    color: '#4285F4',
    marginRight: 4,
  },
  jobsText: {
    fontSize: 14,
    color: '#666',
  },
  hourlyRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285F4',
  },
});