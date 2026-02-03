import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, TextInput, Text, Card, Switch, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { AuthStackParamList } from '../../types';
import { RootState, AppDispatch } from '../../store';
import { registerUser, clearError, bypassLogin } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth as {
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    user: any;
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isServiceProvider, setIsServiceProvider] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  // Limpiar errores al montar el componente
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Mostrar errores del servidor
  useEffect(() => {
    if (error) {
      Alert.alert('Error de Registro', error);
    }
  }, [error]);

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    // Validar nombre
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Ingresa un email válido';
    }

    // Validar teléfono
    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Ingresa un teléfono válido (10 dígitos mínimo)';
    }

    // Validar contraseña
    if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validar términos
    if (!acceptTerms) {
      errors.terms = 'Debes aceptar los términos y condiciones';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    const userData = {
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      phone: formData.phone.replace(/\D/g, ''),
      password: formData.password,
      isServiceProvider,
    };

    try {
      const result = await dispatch(registerUser(userData));
      
      if (registerUser.fulfilled.match(result) && result.payload) {
        Alert.alert(
          '¡Registro Exitoso!', 
          `Bienvenido ${result.payload.name}. Tu cuenta ha sido creada correctamente.`,
          [
            {
              text: 'OK',
              onPress: () => {
                // La navegación se manejará automáticamente por el estado de autenticación
              }
            }
          ]
        );
      }
    } catch (err) {
      console.error('Error en registro:', err);
    }
  };

  // Función de bypass para desarrollo
  const handleBypassLogin = () => {
    const testUser = authService.createTestUser();
    dispatch(bypassLogin(testUser));
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoEmoji}>🦐</Text>
          </View>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Únete a la comunidad Camarón</Text>
        </View>

        {/* Registration Form */}
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Nombre completo"
              value={formData.name}
              onChangeText={(text) => updateFormData('name', text)}
              mode="outlined"
              style={styles.input}
              error={!!formErrors.name}
            />
            {formErrors.name && <Text style={styles.errorText}>{formErrors.name}</Text>}
            
            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              error={!!formErrors.email}
            />
            {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}
            
            <TextInput
              label="Teléfono"
              value={formData.phone}
              onChangeText={(text) => updateFormData('phone', text)}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
              error={!!formErrors.phone}
            />
            {formErrors.phone && <Text style={styles.errorText}>{formErrors.phone}</Text>}
            
            <TextInput
              label="Contraseña"
              value={formData.password}
              onChangeText={(text) => updateFormData('password', text)}
              mode="outlined"
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon 
                  icon={showPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={styles.input}
              error={!!formErrors.password}
            />
            {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}
            
            <TextInput
              label="Confirmar contraseña"
              value={formData.confirmPassword}
              onChangeText={(text) => updateFormData('confirmPassword', text)}
              mode="outlined"
              secureTextEntry={!showConfirmPassword}
              right={
                <TextInput.Icon 
                  icon={showConfirmPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
              style={styles.input}
              error={!!formErrors.confirmPassword}
            />
            {formErrors.confirmPassword && <Text style={styles.errorText}>{formErrors.confirmPassword}</Text>}

            {/* Service Provider Switch */}
            <View style={styles.switchContainer}>
              <View style={styles.switchContent}>
                <Text style={styles.switchLabel}>¿Quieres ofrecer servicios?</Text>
                <Text style={styles.switchSubtext}>Puedes cambiar esto después</Text>
              </View>
              <Switch
                value={isServiceProvider}
                onValueChange={setIsServiceProvider}
              />
            </View>

            {/* Terms and Conditions */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={acceptTerms ? 'checked' : 'unchecked'}
                onPress={() => setAcceptTerms(!acceptTerms)}
              />
              <Text style={styles.checkboxText}>
                Acepto los{' '}
                <Text style={styles.link}>términos y condiciones</Text>
                {' '}y la{' '}
                <Text style={styles.link}>política de privacidad</Text>
              </Text>
            </View>
            {formErrors.terms && <Text style={styles.errorText}>{formErrors.terms}</Text>}
            
            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={!acceptTerms}
              style={styles.registerButton}
              contentStyle={styles.buttonContent}
            >
              Crear Cuenta
            </Button>
          </Card.Content>
        </Card>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>¿Ya tienes cuenta? </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('SignIn')}
            contentStyle={styles.signInButtonContent}
          >
            Inicia sesión
          </Button>
        </View>

        {/* Development Bypass Button */}
        <View style={styles.bypassContainer}>
          <Text style={styles.bypassLabel}>🚧 Acceso de Desarrollo</Text>
          <Button
            mode="outlined"
            onPress={handleBypassLogin}
            style={styles.bypassButton}
            buttonColor="rgba(255, 152, 0, 0.1)"
            textColor="#FF9800"
            icon="flash"
          >
            Entrar Directamente
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
    marginLeft: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 16,
  },
  switchContent: {
    flex: 1,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  switchSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginLeft: 8,
  },
  link: {
    color: '#4285F4',
    textDecorationLine: 'underline',
  },
  registerButton: {
    marginTop: 8,
  },
  buttonContent: {
    height: 48,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#666',
  },
  signInButtonContent: {
    height: 40,
  },
  // Bypass styles for development
  bypassContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: 'rgba(255, 152, 0, 0.05)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.2)',
    alignItems: 'center',
  },
  bypassLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 8,
  },
  bypassButton: {
    width: '100%',
  },
});