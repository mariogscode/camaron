import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function SearchScreen() {
  const navigation = useNavigation<SearchScreenNavigationProp>();

  const handleSearchServices = () => {
    console.log('🔍 SearchScreen - Navigating to ServiceSelection');
    // Navigate to the service selection screen
    navigation.navigate('ServiceSelection');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Buscar Servicios</Text>
      <Text style={styles.subtitle}>Encuentra el servicio que necesitas</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSearchServices}
          style={styles.searchButton}
          buttonColor="#4285F4"
          textColor="white"
          icon="magnify"
        >
          Ver Servicios Disponibles
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  searchButton: {
    paddingVertical: 8,
    borderRadius: 25,
  },
});