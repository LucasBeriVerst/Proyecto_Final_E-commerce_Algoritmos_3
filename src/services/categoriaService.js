import apiClient from './api.js';
import { ENDPOINTS } from '../config/apiConfig.js';

export const categoriaService = {
  // Obtener todas las categorías
  getAllCategorias: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.CATEGORIAS_GET_ALL);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  },

  // Obtener una categoría por ID
  getCategoriaById: async (id) => {
    try {
      const response = await apiClient.get(ENDPOINTS.CATEGORIAS_GET_ONE, {
        params: { id: id }
      });
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al obtener categoría:', error);
      throw error;
    }
  },

  // Crear nueva categoría
  createCategoria: async (categoriaData) => {
    try {
      const response = await apiClient.post(ENDPOINTS.CATEGORIAS_CREATE, categoriaData);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al crear categoría:', error);
      throw error;
    }
  },

  // Editar categoría existente
  updateCategoria: async (categoriaData) => {
    try {
      const response = await apiClient.patch(ENDPOINTS.CATEGORIAS_UPDATE, categoriaData);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al editar categoría:', error);
      throw error;
    }
  }
};
