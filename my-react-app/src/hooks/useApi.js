/**
 * HOOK PERSONALIZADO PARA MANEJO DE ESTADO DE API
 * 
 * Este hook proporciona un estado consistente para las peticiones a la API,
 * incluyendo loading, error y data states.
 */

import { useState, useEffect } from 'react';

/**
 * Hook para manejar el estado de peticiones a la API
 * @param {Function} apiFunction - Función de la API a ejecutar
 * @param {Array} dependencies - Dependencias para re-ejecutar la función
 * @param {boolean} executeOnMount - Si ejecutar la función al montar el componente
 */
export function useApiState(apiFunction, dependencies = [], executeOnMount = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (executeOnMount) {
      execute();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    execute,
    setData,
    setError
  };
}

/**
 * Hook específico para libros
 */
export function useLibros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarLibros = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { librosService } = await import('../services/apiService');
      const response = await librosService.getAll();
      
      if (response.code === 200) {
        const librosFormateados = response.data.map(libro => ({
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
          imagen: libro.Imagen || '/placeholder-book.jpg'
        }));
        setLibros(librosFormateados);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err);
      console.error('Error cargando libros:', err);
    } finally {
      setLoading(false);
    }
  };

  const buscarLibros = async (termino) => {
    if (!termino.trim()) {
      cargarLibros();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { librosService } = await import('../services/apiService');
      const response = await librosService.buscar(termino);
      
      if (response.code === 200) {
        const librosFormateados = response.data.map(libro => ({
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
          imagen: libro.Imagen || '/placeholder-book.jpg'
        }));
        setLibros(librosFormateados);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err);
      console.error('Error buscando libros:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtrarPorCategoria = async (categoriaId) => {
    if (!categoriaId) {
      cargarLibros();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { librosService } = await import('../services/apiService');
      const response = await librosService.getByCategoria(categoriaId);
      
      if (response.code === 200) {
        const librosFormateados = response.data.map(libro => ({
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
          imagen: libro.Imagen || '/placeholder-book.jpg'
        }));
        setLibros(librosFormateados);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err);
      console.error('Error filtrando libros por categoría:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    libros,
    loading,
    error,
    cargarLibros,
    buscarLibros,
    filtrarPorCategoria
  };
}

/**
 * Hook específico para categorías
 */
export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarCategorias = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { categoriasService } = await import('../services/apiService');
      const response = await categoriasService.getAll();
      
      if (response.code === 200) {
        const categoriasFormateadas = response.data.map(categoria => ({
          id: categoria.Id,
          nombre: categoria.Nombre,
          descripcion: categoria.Descripcion || '',
          cantidadLibros: parseInt(categoria.CantidadLibros || 0),
          fechaCreacion: categoria.FechaCreacion
        }));
        setCategorias(categoriasFormateadas);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err);
      console.error('Error cargando categorías:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
    cargarCategorias
  };
}

/**
 * Hook específico para best sellers
 */
export function useBestSellers() {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarBestSellers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { librosService } = await import('../services/apiService');
      const response = await librosService.getBestSellers();
      
      if (response.code === 200) {
        const bestSellersFormateados = response.data.map(libro => ({
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
          imagen: libro.Imagen || '/placeholder-book.jpg',
          totalVendidos: parseInt(libro.TotalVendidos || 0)
        }));
        setBestSellers(bestSellersFormateados);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      setError(err);
      console.error('Error cargando best sellers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBestSellers();
  }, []);

  return {
    bestSellers,
    loading,
    error,
    cargarBestSellers
  };
}

export default {
  useApiState,
  useLibros,
  useCategorias,
  useBestSellers
};
