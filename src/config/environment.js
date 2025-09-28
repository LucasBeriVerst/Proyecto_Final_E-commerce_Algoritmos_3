// Configuración de entorno
export const ENV_CONFIG = {
  // URLs de la API
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7229/api',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  
  // Configuración de la aplicación
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'Admin Librería',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Modo de desarrollo
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
};

// Función para obtener la URL completa de un endpoint
export const getApiUrl = (endpoint) => {
  const baseUrl = ENV_CONFIG.API_BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Función para loggear en desarrollo
export const devLog = (...args) => {
  if (ENV_CONFIG.IS_DEVELOPMENT) {
    console.log('[DEV]', ...args);
  }
};
