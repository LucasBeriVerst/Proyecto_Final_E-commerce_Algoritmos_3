import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../config/appConfig';

const CategoriesView = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.BASE_URL}/categorias`);
      const data = await response.json();
      
      if (data.succes) {
        setCategories(data.data || []);
      } else {
        setError(data.message || 'Error al cargar categorías');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
        <div className="text-red-500">{error}</div>
        <button 
          onClick={fetchCategories}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categorías de Libros</h1>
      
      {categories.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <div className="text-yellow-600 text-lg font-semibold mb-2">Sin categorías</div>
          <div className="text-yellow-500">No hay categorías disponibles en este momento.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.Id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.Nombre}</h3>
              <p className="text-gray-600 mb-4">{category.Descripcion}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {category.CantidadLibros} libros
                </span>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
                  Ver Libros
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesView;
