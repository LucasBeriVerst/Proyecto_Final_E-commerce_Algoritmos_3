import apiClient from './api.js';
import { ENDPOINTS } from '../config/apiConfig.js';

export const libroService = {
  // Obtener todos los libros
  getAllLibros: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.LIBROS_GET_ALL);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al obtener libros:', error);
      throw error;
    }
  },

  // Obtener un libro por ID
  getLibroById: async (id) => {
    try {
      const response = await apiClient.get(ENDPOINTS.LIBROS_GET_ONE, {
        params: { id: id }
      });
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al obtener libro:', error);
      throw error;
    }
  },

  // Crear nuevo libro
  createLibro: async (libroData) => {
    try {
      const response = await apiClient.post(ENDPOINTS.LIBROS_CREATE, libroData);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al crear libro:', error);
      throw error;
    }
  },

  // Editar libro existente
  updateLibro: async (libroData) => {
    try {
      const response = await apiClient.patch(ENDPOINTS.LIBROS_UPDATE, libroData);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al editar libro:', error);
      throw error;
    }
  },

  // Vender libro
  venderLibro: async (libroId, cantidad = 1) => {
    try {
      const response = await apiClient.post(ENDPOINTS.LIBROS_VENDER, {
        LibroId: libroId,
        Cantidad: cantidad
      });
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al vender libro:', error);
      throw error;
    }
  }
};
