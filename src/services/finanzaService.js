import apiClient from './api.js';
import { ENDPOINTS } from '../config/apiConfig.js';

export const finanzaService = {
  // Obtener todas las finanzas
  getAllFinanzas: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.FINANZAS_GET_ALL);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al obtener finanzas:', error);
      throw error;
    }
  },

  // Obtener una finanza por ID
  getFinanzaById: async (id) => {
    try {
      const response = await apiClient.get(ENDPOINTS.FINANZAS_GET_ONE, {
        params: { id: id }
      });
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al obtener finanza:', error);
      throw error;
    }
  },

  // Crear nueva finanza
  createFinanza: async (finanzaData) => {
    try {
      const response = await apiClient.post(ENDPOINTS.FINANZAS_CREATE, finanzaData);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al crear finanza:', error);
      throw error;
    }
  },

  // Editar finanza existente
  updateFinanza: async (finanzaData) => {
    try {
      const response = await apiClient.patch(ENDPOINTS.FINANZAS_UPDATE, finanzaData);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al editar finanza:', error);
      throw error;
    }
  },

  // Obtener resumen financiero
  getResumenFinanciero: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.FINANZAS_RESUMEN);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al obtener resumen financiero:', error);
      throw error;
    }
  }
};
