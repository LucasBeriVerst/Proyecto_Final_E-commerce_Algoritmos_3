/**
 * SERVICIO API PARA CONEXIÓN CON BACKEND
 * 
 * Este archivo contiene todas las funciones para comunicarse con la API del backend
 * de Hilet Lib. Maneja las peticiones HTTP y el manejo de errores.
 */

/**
 * SERVICIO API PARA CONEXIÓN CON BACKEND
 * 
 * Este archivo contiene todas las funciones para comunicarse con la API del backend
 * de Hilet Lib. Maneja las peticiones HTTP y el manejo de errores.
 */

import { API_CONFIG, MESSAGES } from '../config/appConfig';

/**
 * Función auxiliar para realizar peticiones HTTP
 * @param {string} endpoint - Endpoint de la API
 * @param {object} options - Opciones de la petición (método, body, etc.)
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: API_CONFIG.TIMEOUT
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error HTTP: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error en petición API:', error);
    throw error;
  }
}

/**
 * SERVICIOS DE LIBROS
 */
export const librosService = {
  /**
   * Obtiene todos los libros disponibles
   */
  async getAll() {
    return await apiRequest('/libros');
  },

  /**
   * Obtiene un libro específico por ID
   * @param {number} id - ID del libro
   */
  async getById(id) {
    return await apiRequest(`/libros/${id}`);
  },

  /**
   * Obtiene libros por categoría
   * @param {number} categoriaId - ID de la categoría
   */
  async getByCategoria(categoriaId) {
    return await apiRequest(`/libros/categoria/${categoriaId}`);
  },

  /**
   * Obtiene los libros más vendidos
   */
  async getBestSellers() {
    return await apiRequest('/libros/bestsellers');
  },

  /**
   * Busca libros por término
   * @param {string} termino - Término de búsqueda
   */
  async buscar(termino) {
    return await apiRequest(`/libros/buscar?termino=${encodeURIComponent(termino)}`);
  }
};

/**
 * SERVICIOS DE CATEGORÍAS
 */
export const categoriasService = {
  /**
   * Obtiene todas las categorías activas
   */
  async getAll() {
    return await apiRequest('/categorias');
  }
};

/**
 * SERVICIOS DE VENTAS
 */
export const ventasService = {
  /**
   * Procesa una venta de libro
   * @param {number} libroId - ID del libro
   * @param {number} cantidad - Cantidad a vender
   */
  async procesarVenta(libroId, cantidad) {
    return await apiRequest('/venta', {
      method: 'POST',
      body: JSON.stringify({
        LibroId: libroId,
        Cantidad: cantidad
      })
    });
  }
};

/**
 * SERVICIO PRINCIPAL DE LA API
 * Contiene todos los servicios organizados
 */
export const apiService = {
  libros: librosService,
  categorias: categoriasService,
  ventas: ventasService
};

/**
 * FUNCIONES AUXILIARES PARA EL FRONTEND
 */

/**
 * Formatea un libro para el frontend
 * @param {object} libro - Libro desde la API
 */
export function formatearLibro(libro) {
  return {
    id: libro.Id,
    titulo: libro.Titulo,
    autor: libro.Autor,
    isbn: libro.ISBN,
    precio: parseFloat(libro.Precio),
    stock: parseInt(libro.Stock),
    esFisico: Boolean(libro.EsFisico),
    categoriaId: parseInt(libro.CategoriaId),
    categoriaNombre: libro.CategoriaNombre || 'Sin categoría',
    descripcion: libro.Descripcion || '',
    fechaPublicacion: libro.FechaPublicacion,
    imagen: libro.Imagen || '/placeholder-book.jpg' // Imagen por defecto
  };
}

/**
 * Formatea una categoría para el frontend
 * @param {object} categoria - Categoría desde la API
 */
export function formatearCategoria(categoria) {
  return {
    id: categoria.Id,
    nombre: categoria.Nombre,
    descripcion: categoria.Descripcion || '',
    cantidadLibros: parseInt(categoria.CantidadLibros || 0),
    fechaCreacion: categoria.FechaCreacion
  };
}

/**
 * Maneja errores de la API de forma consistente
 * @param {Error} error - Error capturado
 * @param {string} contexto - Contexto donde ocurrió el error
 */
export function manejarErrorAPI(error, contexto = '') {
  console.error(`Error en ${contexto}:`, error);
  
  // Retorna un mensaje de error amigable para el usuario
  if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
    return MESSAGES.ERRORS.NETWORK;
  }
  
  if (error.message.includes('404')) {
    return MESSAGES.ERRORS.NOT_FOUND;
  }
  
  if (error.message.includes('500')) {
    return MESSAGES.ERRORS.SERVER;
  }
  
  return error.message || MESSAGES.ERRORS.GENERIC;
}

export default apiService;
