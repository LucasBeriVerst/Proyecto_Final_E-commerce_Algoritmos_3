import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../config/appConfig';

const BestSellersView = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_CONFIG.BASE_URL}/libros/bestsellers`);
      const data = await response.json();
      
      if (data.succes) {
        setBestSellers(data.data || []);
      } else {
        setError(data.message || 'Error al cargar best sellers');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
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
          onClick={fetchBestSellers}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">🏆 Best Sellers</h1>
      
      {bestSellers.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <div className="text-yellow-600 text-lg font-semibold mb-2">Sin best sellers</div>
          <div className="text-yellow-500">No hay best sellers disponibles en este momento.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((book, index) => (
            <div key={book.Id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative">
              {/* Badge de ranking */}
              <div className="absolute top-4 left-4 bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm z-10">
                #{index + 1}
              </div>
              
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {book.Url_Portada ? (
                  <img 
                    src={book.Url_Portada} 
                    alt={book.Titulo}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-4xl">📚</div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {book.Titulo}
                </h3>
                
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Autor:</span> {book.Autor || 'No especificado'}
                </p>
                
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Categoría:</span> {book.CategoriaNombre || 'Sin categoría'}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">
                    {formatPrice(book.Precio)}
                  </span>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Vendidos</div>
                    <div className="text-lg font-semibold text-green-600">
                      {book.TotalVendidos || 0}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors">
                    Agregar al Carrito
                  </button>
                  <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors">
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSellersView;
