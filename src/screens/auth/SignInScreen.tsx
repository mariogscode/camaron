import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput, Text, Card, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { AuthStackParamList } from '../../types';
import { AppDispatch } from '../../store';
import { bypassLogin } from '../../store/slices/authSlice';
import { authService } from '../../services/authService';

type SignInScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignIn'>;

export default function SignInScreen() {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    // TODO: Implement authentication logic
    setTimeout(() => {
      setLoading(false);
      // Navigate to main app
    }, 2000);
  };

  // Función de bypass para desarrollo
  const handleBypassLogin = () => {
    const testUser = authService.createTestUser();
    dispatch(bypassLogin(testUser));
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
          <Text style={styles.welcomeTitle}>¡Bienvenido!</Text>
          <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>
        </View>

        {/* Sign In Form */}
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon 
                  icon={showPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={styles.input}
            />
            
            <Button
              mode="contained"
              onPress={handleSignIn}
              loading={loading}
              style={styles.signInButton}
              contentStyle={styles.buttonContent}
            >
              Iniciar Sesión
            </Button>

            <Divider style={styles.divider} />
            
            {/* Social Login */}
            <View style={styles.socialContainer}>
              <Text style={styles.socialText}>O continúa con</Text>
              <View style={styles.socialButtons}>
                <Button
                  mode="outlined"
                  icon="google"
                  onPress={() => {/* TODO: Google Sign In */}}
                  style={styles.socialButton}
                >
                  Google
                </Button>
                <Button
                  mode="outlined"
                  icon="facebook"
                  onPress={() => {/* TODO: Facebook Sign In */}}
                  style={styles.socialButton}
                >
                  Facebook
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes cuenta? </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Register')}
            contentStyle={styles.registerButtonContent}
          >
            Regístrate
          </Button>
        </View>

        {/* Development Bypass Button */}
        <View style={styles.bypassContainer}>
          <Divider style={styles.bypassDivider} />
          <Text style={styles.bypassLabel}>🚧 Modo Desarrollo</Text>
          <Button
            mode="outlined"
            onPress={handleBypassLogin}
            style={styles.bypassButton}
            buttonColor="rgba(255, 152, 0, 0.1)"
            textColor="#FF9800"
            icon="flash"
          >
            Entrar Sin Registro
          </Button>
          <Text style={styles.bypassDescription}>
            Botón de prueba para acceder directamente a la app
          </Text>
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
  welcomeTitle: {
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
  signInButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  buttonContent: {
    height: 48,
  },
  divider: {
    marginVertical: 16,
  },
  socialContainer: {
    alignItems: 'center',
  },
  socialText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialButton: {
    flex: 0.45,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerButtonContent: {
    height: 40,
  },
  // Bypass styles for development
  bypassContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: 'rgba(255, 152, 0, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.2)',
  },
  bypassDivider: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 152, 0, 0.3)',
  },
  bypassLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    textAlign: 'center',
    marginBottom: 12,
  },
  bypassButton: {
    marginBottom: 8,
  },
  bypassDescription: {
    fontSize: 12,
    color: '#FF9800',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});