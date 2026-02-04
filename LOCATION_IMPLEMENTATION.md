# Implementación de Google Maps y Ubicación en Camaron

## Características Implementadas

### 1. Pantalla de Mapa (MapScreen)
- **Google Maps integrado** con `react-native-maps` usando `PROVIDER_GOOGLE`
- **Ubicación del usuario** mostrada con marcador personalizado
- **Solicitud automática de permisos** de ubicación con manejo de errores
- **Seguimiento de ubicación en tiempo real** con actualizaciones cada 10 segundos
- **Botón para centrar mapa** en la ubicación del usuario
- **Estados de carga** y manejo de errores de ubicación

### 2. Servicio de Ubicación (LocationService)
- **Singleton pattern** para gestión centralizada de ubicación
- **Gestión de permisos** de ubicación con solicitudes automáticas
- **Obtención de ubicación actual** con alta precisión
- **Seguimiento de cambios de ubicación** en tiempo real
- **Cálculo de distancias** entre coordenadas usando fórmula Haversine
- **Filtrado de proveedores por distancia** con ordenamiento automático
- **Creación de regiones de mapa** con zoom apropiado

### 3. Lista de Proveedores Actualizada (ProviderListScreen)
- **Título dinámico** que cambia a "Colaboradores cercanos a ti"
- **Indicador de carga** mientras se obtiene la ubicación
- **Mostrar distancia** de cada proveedor al usuario (ej: "2.5km", "850m")
- **Ordenamiento automático** por distancia (más cercanos primero)
- **Radio de búsqueda** de 50km configurable
- **Manejo de errores** de ubicación con mensaje informativo
- **Contador** de colaboradores encontrados

### 4. Tipos y Interfaces Extendidas
- `UserLocation`: Coordenadas con timestamp
- `MapRegion`: Región del mapa con deltas de zoom
- `LocationPermissionStatus`: Estado de permisos de ubicación
- Extensión de `ServiceProvider` con información de ubicación

## Características Técnicas

### Permisos y Seguridad
- Solicitud automática de permisos de ubicación foreground
- Manejo de denegación de permisos con opciones para el usuario
- Verificación de estado de permisos antes de operaciones
- Mensajes informativos sobre requerimientos de ubicación

### Rendimiento
- Cacheo de ubicación actual para evitar solicitudes repetidas
- Actualizaciones de ubicación con intervalos inteligentes (10s o 100m)
- Filtrado eficiente de proveedores por distancia
- Carga asíncrona de datos de ubicación

### Experiencia de Usuario
- Estados de carga claros y informativos
- Mensajes de error comprensibles en español
- Botones de reintento para errores recuperables
- Información visual de distancia en la lista
- Indicadores visuales de estado de ubicación

## Configuración Requerida

### Google Maps API
Para usar Google Maps en producción, necesitas:
1. API Key de Google Maps en Google Cloud Console
2. Configurar el API key en `app.json`:
```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    },
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_GOOGLE_MAPS_API_KEY"
      }
    }
  }
}
```

### Permisos de Ubicación
Los permisos ya están configurados automáticamente por expo-location.

## Uso

### En MapScreen
```typescript
// Automático - se inicializa al montar el componente
// Usuario ve su ubicación en el mapa
// Puede centrar el mapa usando el botón flotante
```

### En ProviderListScreen
```typescript
// Automático - muestra proveedores ordenados por distancia
// Título cambia a "Colaboradores cercanos a ti"
// Cada proveedor muestra su distancia (ej: "1.2km")
```

### Usando LocationService directamente
```typescript
import LocationService from '../services/locationService';

// Obtener ubicación actual
const location = await LocationService.getCurrentLocation();

// Filtrar proveedores por distancia
const nearby = LocationService.filterProvidersByDistance(providers, userLocation, 20);

// Calcular distancia entre dos puntos
const distance = LocationService.calculateDistance(lat1, lon1, lat2, lon2);
```

## Datos de Prueba

Los proveedores incluyen ubicaciones en Costa Rica:
- San José (9.9281, -84.0907)
- Escazú (9.9355, -84.0825)
- Santa Ana (9.9250, -84.1125)

Esto permite probar el cálculo de distancias y filtrado con datos realistas.