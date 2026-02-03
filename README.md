# Camaron 🦐

**Tu marketplace de servicios móvil** - Una aplicación React Native construida con Expo que conecta a usuarios con proveedores de servicios locales.

## 📱 Acerca del Proyecto

Camaron es una aplicación móvil de marketplace de servicios que permite a los usuarios:
- **Buscar servicios**: Encontrar profesionales locales para sus necesidades
- **Ofrecer servicios**: Monetizar habilidades y generar ingresos extra
- **Gestionar reservas**: Sistema completo de programación y pago
- **Calificar experiencias**: Sistema de reviews y ratings

## 🛠️ Stack Tecnológico

- **Framework**: React Native con Expo
- **Lenguaje**: TypeScript
- **Navegación**: React Navigation 6
- **Estado**: Redux Toolkit
- **UI**: React Native Paper
- **Mapas**: React Native Maps
- **Calendario**: React Native Calendars

## 🏗️ Estructura del Proyecto

```
camaron/
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── navigation/          # Configuración de navegación
│   │   └── AppNavigator.tsx
│   ├── screens/             # Pantallas de la aplicación
│   │   ├── auth/           # Autenticación
│   │   ├── main/           # Pantallas principales
│   │   ├── booking/        # Flujo de reservas
│   │   ├── profile/        # Configuración de usuario
│   │   └── map/            # Pantallas de mapa
│   ├── services/           # Servicios API
│   ├── store/              # Estado global (Redux)
│   │   ├── index.ts
│   │   └── slices/
│   ├── types/              # Tipos de TypeScript
│   └── utils/              # Utilidades
├── assets/                 # Imágenes y recursos
└── App.tsx                 # Componente principal
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- Expo CLI: `npm install -g expo-cli`
- Para desarrollo móvil: Expo Go app en tu dispositivo

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd camaron
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   # o para plataformas específicas:
   npm run web      # Navegador web
   npm run ios      # Simulador iOS
   npm run android  # Emulador Android
   ```

## 📱 Pantallas Implementadas

### Autenticación
- ✅ **Pantalla de Lanzamiento**: Splash screen con logo
- ✅ **Inicio de Sesión**: Login con email/contraseña + redes sociales
- ✅ **Registro**: Creación de cuenta con opción de proveedor

### Principal
- ✅ **Inicio**: Selección entre buscar o dar servicios
- 🚧 **Búsqueda**: Filtros y resultados de servicios
- 🚧 **Mis Reservas**: Historial y estado de reservas
- 🚧 **Perfil**: Configuración de usuario

### Flujo de Reservas
- 🚧 **Selección de Servicio**: Categorías disponibles
- 🚧 **Lista de Proveedores**: Resultados con ratings
- 🚧 **Detalles del Proveedor**: Perfil y reviews
- 🚧 **Calendario**: Selección de fecha y hora
- 🚧 **Revisión**: Confirmación y pago
- 🚧 **Confirmación**: Detalles finales

### Funcionalidades
- 🚧 **Mapa**: Ubicación de servicios
- 🚧 **Configuración**: Perfil y preferencias
- 🚧 **Notificaciones**: Alertas y recordatorios

## 🎯 Características Principales

### Para Usuarios (Clientes)
- Búsqueda de servicios por categoría y ubicación
- Comparación de proveedores con ratings y precios
- Sistema de reservas con calendario integrado
- Pagos seguros integrados
- Sistema de reviews y calificaciones

### Para Proveedores de Servicios
- Registro como profesional verificado
- Gestión de servicios ofrecidos
- Calendario de disponibilidad
- Dashboard de ganancias
- Gestión de clientes y reviews

### Funcionalidades Técnicas
- Autenticación segura
- Geolocalización y mapas
- Notificaciones push
- Modo offline parcial
- Optimización de rendimiento

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start                    # Inicia Expo CLI
npm run web                  # Inicia en navegador
npm run ios                  # Inicia en simulador iOS
npm run android             # Inicia en emulador Android

# Construcción
npx expo build:web          # Build para web
npx eas build --platform ios   # Build para iOS
npx eas build --platform android # Build para Android
```

## 📝 Comandos VS Code

Tareas disponibles en VS Code (Cmd/Ctrl + Shift + P → "Tasks: Run Task"):
- `Start Expo Web`: Desarrollo en navegador
- `Start Expo iOS`: Simulador iOS
- `Start Expo Android`: Emulador Android
- `Start Expo Development Server`: Servidor principal

## 🏪 Deployment

### Expo Application Services (EAS)

1. **Configurar EAS**
   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   ```

2. **Build para producción**
   ```bash
   eas build --platform ios
   eas build --platform android
   ```

3. **Enviar a stores**
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

## 🚧 Estado del Desarrollo

- [x] Configuración inicial del proyecto
- [x] Estructura de navegación
- [x] Sistema de autenticación (UI)
- [x] Pantalla principal
- [x] Redux store configurado
- [ ] Integración con Firebase/Backend
- [ ] Implementación completa de reservas
- [ ] Sistema de pagos
- [ ] Notificaciones push
- [ ] Tests unitarios
- [ ] CI/CD pipeline

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Proyecto**: Camaron Service Marketplace
- **Versión**: 1.0.0
- **Plataformas**: iOS, Android, Web

---

**¡Construyamos el futuro de los servicios locales juntos! 🦐✨**