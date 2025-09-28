# Frontend React + Backend .NET

Este proyecto conecta un frontend React con un backend .NET Core API.

## 🚀 Configuración y Ejecución

### Backend (.NET Core)
```bash
cd backend
dotnet run
```
El backend estará disponible en:
- HTTPS: `https://localhost:7229`
- HTTP: `http://localhost:5068`
- Swagger: `https://localhost:7229/swagger`

### Frontend (React + Vite)
```bash
cd lautarocampos
npm install
npm run dev
```
El frontend estará disponible en: `http://localhost:5173`

## 🔧 Configuración de Conexión

### URLs de la API
La configuración de la API se encuentra en `src/config/apiConfig.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'https://localhost:7229/api', // Cambiar según tu configuración
  TIMEOUT: 10000,
  // ...
};
```

### Endpoints Disponibles

#### Personas
- `GET /api/Personas` - Obtener todas las personas
- `GET /api/Personas/{id}` - Obtener persona por ID
- `POST /api/Personas` - Crear persona
- `PUT /api/Personas/{id}` - Editar persona
- `DELETE /api/Personas/{id}` - Eliminar persona

#### Libros
- `GET /api/Libros` - Obtener todos los libros
- `GET /api/Libros/{id}` - Obtener libro por ID
- `POST /api/Libros` - Crear libro
- `PUT /api/Libros/{id}` - Editar libro
- `DELETE /api/Libros/{id}` - Eliminar libro

#### Categorías
- `GET /api/Categorias` - Obtener todas las categorías
- `GET /api/Categorias/{id}` - Obtener categoría por ID
- `POST /api/Categorias` - Crear categoría
- `PUT /api/Categorias/{id}` - Editar categoría
- `DELETE /api/Categorias/{id}` - Eliminar categoría

#### Finanzas
- `GET /api/Finanzas` - Obtener todas las finanzas
- `GET /api/Finanzas/{id}` - Obtener finanza por ID
- `POST /api/Finanzas` - Crear finanza
- `PUT /api/Finanzas/{id}` - Editar finanza
- `DELETE /api/Finanzas/{id}` - Eliminar finanza
- `GET /api/Finanzas/resumen` - Obtener resumen financiero

## 📁 Estructura del Proyecto

```
lautarocampos/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Login.jsx        # Pantalla de autenticación
│   │   ├── Personas.jsx     # Gestión de personas
│   │   ├── Header.jsx       # Navegación
│   │   └── ...
│   ├── services/            # Servicios de API
│   │   ├── api.js          # Cliente HTTP base
│   │   ├── personaService.js # Servicio de personas
│   │   └── userService.js   # Servicio de usuarios
│   ├── config/              # Configuración
│   │   └── apiConfig.js     # Configuración de la API
│   └── App.jsx             # Componente principal
└── package.json
```

## 🛠️ Desarrollo

### Agregar Nuevos Endpoints

1. **Actualizar configuración** en `src/config/apiConfig.js`:
```javascript
export const ENDPOINTS = {
  // ... endpoints existentes
  NUEVO_ENDPOINT: '/NuevoController/action',
};
```

2. **Crear servicio** en `src/services/`:
```javascript
import apiClient from './api.js';

export const nuevoService = {
  miFuncion: async () => {
    const response = await apiClient.get(ENDPOINTS.NUEVO_ENDPOINT);
    return response.data;
  }
};
```

3. **Usar en componente**:
```javascript
import { nuevoService } from '../services/nuevoService.js';

// En tu componente
const resultado = await nuevoService.miFuncion();
```

### Manejo de Errores

El cliente HTTP incluye interceptores para:
- **Agregar token automáticamente** a todas las peticiones
- **Manejar errores 401** (token expirado) redirigiendo al login
- **Mostrar errores** de conexión al usuario

## 🔍 Debugging

### Verificar Conexión
1. Abrir DevTools (F12)
2. Ir a la pestaña "Network"
3. Hacer una petición desde la aplicación
4. Verificar que la petición llegue al backend

### Logs del Backend
Los logs del backend .NET aparecerán en la consola donde ejecutaste `dotnet run`.

### Logs del Frontend
Los errores de conexión se muestran en la consola del navegador y en la interfaz de usuario.

## 🚨 Solución de Problemas

### Error de CORS
Si ves errores de CORS, verifica que el backend tenga la configuración correcta en `Program.cs`:
```csharp
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});
```

### Error de Certificado SSL
Si hay problemas con HTTPS, puedes:
1. Usar HTTP en desarrollo: cambiar `BASE_URL` a `http://localhost:5068/api`
2. Aceptar el certificado en el navegador
3. Configurar certificados de desarrollo

### Puerto Ocupado
Si el puerto está ocupado:
1. Cambiar el puerto en `Properties/launchSettings.json`
2. Actualizar `BASE_URL` en `apiConfig.js` con el nuevo puerto