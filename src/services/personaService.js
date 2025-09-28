import apiClient from './api.js';
import { ENDPOINTS } from '../config/apiConfig.js';

export const personaService = {
  // Obtener todas las personas
  getAllPersonas: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.PERSONAS_GET_ALL);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al obtener personas:', error);
      throw error;
    }
  },

  // Obtener una persona por ID
  getPersonaById: async (id) => {
    try {
      const response = await apiClient.get(ENDPOINTS.PERSONAS_GET_ONE, {
        params: { id: id }
      });
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al obtener persona:', error);
      throw error;
    }
  },

  // Crear nueva persona
  createPersona: async (personaData) => {
    try {
      const response = await apiClient.post(ENDPOINTS.PERSONAS_CREATE, personaData);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al crear persona:', error);
      throw error;
    }
  },

  // Editar persona existente
  updatePersona: async (personaData) => {
    try {
      const response = await apiClient.patch(ENDPOINTS.PERSONAS_UPDATE, personaData);
      return response.data.data; // Acceder a la propiedad data de BaseResponse
    } catch (error) {
      console.error('Error al editar persona:', error);
      throw error;
    }
  }
};
