/**
 * CONFIGURACIÓN DE LA APLICACIÓN
 * 
 * Este archivo contiene todas las configuraciones globales de la aplicación,
 * incluyendo URLs de API, configuraciones de desarrollo, etc.
 */

// Configuración de la API
export const API_CONFIG = {
  // URL base de la API del backend
  BASE_URL: 'http://localhost:5068/api/ecommerce',
  
  // Timeout para las peticiones (en milisegundos)
  TIMEOUT: 10000,
  
  // Configuración de reintentos
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

// Configuración de la aplicación
export const APP_CONFIG = {
  // Nombre de la aplicación
  APP_NAME: 'Hilet Lib',
  
  // Versión de la aplicación
  VERSION: '1.0.0',
  
  // Configuración de desarrollo
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  
  // Configuración de imágenes por defecto
  DEFAULT_IMAGES: {
    BOOK_PLACEHOLDER: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    USER_AVATAR: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
};

// Configuración de moneda
export const CURRENCY_CONFIG = {
  SYMBOL: '$',
  LOCALE: 'es-AR',
  DECIMAL_PLACES: 0
};

// Configuración de paginación
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50
};

// Configuración de validación
export const VALIDATION_CONFIG = {
  MIN_SEARCH_LENGTH: 2,
  MAX_SEARCH_LENGTH: 100,
  MAX_CART_ITEMS: 10
};

// Mensajes de la aplicación
export const MESSAGES = {
  LOADING: {
    BOOKS: 'Cargando libros...',
    CATEGORIES: 'Cargando categorías...',
    BEST_SELLERS: 'Cargando best sellers...',
    SEARCH: 'Buscando...'
  },
  ERRORS: {
    NETWORK: 'Error de conexión. Verifica tu conexión a internet.',
    NOT_FOUND: 'No se encontró el recurso solicitado.',
    SERVER: 'Error interno del servidor. Intenta más tarde.',
    GENERIC: 'Ocurrió un error inesperado.'
  },
  SUCCESS: {
    ADDED_TO_CART: 'Libro agregado al carrito',
    REMOVED_FROM_CART: 'Libro eliminado del carrito',
    ORDER_PLACED: 'Pedido realizado exitosamente'
  }
};

// Configuración de temas
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: 'indigo',
    SECONDARY: 'gray',
    SUCCESS: 'green',
    WARNING: 'yellow',
    ERROR: 'red'
  }
};

export default {
  API_CONFIG,
  APP_CONFIG,
  CURRENCY_CONFIG,
  PAGINATION_CONFIG,
  VALIDATION_CONFIG,
  MESSAGES,
  THEME_CONFIG
};
