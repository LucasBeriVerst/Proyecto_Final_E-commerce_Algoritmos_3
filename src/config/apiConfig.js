import { ENV_CONFIG } from './environment.js';

// Configuración de la API
export const API_CONFIG = {
  // URL base del backend
  BASE_URL: ENV_CONFIG.API_BASE_URL,
  
  // Timeout para las peticiones (en milisegundos)
  TIMEOUT: ENV_CONFIG.API_TIMEOUT,
  
  // Configuración de reintentos
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  }
};

// Función para obtener la URL completa de un endpoint
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Endpoints disponibles
export const ENDPOINTS = {
  // Personas
  PERSONAS_GET_ALL: '/Persona/getAll',
  PERSONAS_GET_ONE: '/Persona/get',
  PERSONAS_CREATE: '/Persona/create',
  PERSONAS_UPDATE: '/Persona/edit',
  
  // Libros
  LIBROS_GET_ALL: '/Libro/getAll',
  LIBROS_GET_ONE: '/Libro/get',
  LIBROS_CREATE: '/Libro/create',
  LIBROS_UPDATE: '/Libro/edit',
  LIBROS_VENDER: '/Libro/vender',
  
  // Categorías
  CATEGORIAS_GET_ALL: '/Categoria/getAll',
  CATEGORIAS_GET_ONE: '/Categoria/get',
  CATEGORIAS_CREATE: '/Categoria/create',
  CATEGORIAS_UPDATE: '/Categoria/edit',
  
  // Finanzas
  FINANZAS_GET_ALL: '/Finanza/getAll',
  FINANZAS_GET_ONE: '/Finanza/get',
  FINANZAS_CREATE: '/Finanza/create',
  FINANZAS_UPDATE: '/Finanza/edit',
  FINANZAS_RESUMEN: '/Finanza/resumen',
};
