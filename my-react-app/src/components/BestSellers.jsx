import { useBestSellers } from '../hooks/useApi';

/**
 * COMPONENTE BESTSELLERS - Sección de libros más vendidos
 * 
 * Este componente muestra:
 * - Lista de los libros más populares (desde API)
 * - Numeración del ranking (#1, #2, #3...)
 * - Información completa de cada libro
 * - Botones de compra y favoritos
 * - Fondo gris para diferenciación visual
 * 
 * @param {function} onAddToCart - Función para agregar productos al carrito
 */
const BestSellers = ({ onAddToCart }) => {
  // Hook para obtener best sellers del backend
  const { bestSellers, loading, error } = useBestSellers();

  // Función para renderizar estrellas (rating simulado)
  const renderStars = (rating = 4.5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

  // Mostrar loading
  if (loading) {
    return (
      <section id="bestsellers" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando best sellers...</p>
          </div>
        </div>
      </section>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <section id="bestsellers" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo más vendido
            </h2>
            <p className="text-xl text-gray-600">
              Los títulos más populares de nuestra librería
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg max-w-md mx-auto">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-semibold mb-2">Servicio temporalmente no disponible</h3>
              <p className="text-sm">
                Los best sellers no están disponibles en este momento. 
                Por favor, intenta nuevamente más tarde.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="bestsellers" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Lo más vendido
          </h2>
          <p className="text-xl text-gray-600">
            Los títulos más populares de nuestra librería
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay best sellers disponibles</h3>
              <p className="text-gray-500">Los libros más vendidos aparecerán aquí</p>
            </div>
          ) : (
            bestSellers.map((book, index) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
              >
                {/* Number Badge */}
                <div className="relative">
                  <img
                    src={book.imagen}
                    alt={book.titulo}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-sm px-2 py-1 rounded-full font-bold">
                    #{index + 1}
                  </span>
                  {book.totalVendidos > 0 && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {book.totalVendidos} vendidos
                    </span>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 uppercase">
                    {book.titulo}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3 uppercase font-medium">{book.autor}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {renderStars()}
                    </div>
                    <span className="ml-2 text-xs text-gray-600">
                      4.5
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                    {book.descripcion || 'Sin descripción disponible'}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${book.precio.toLocaleString('es-AR')}
                      </span>
                      <span className="text-xs text-gray-500">
                        Stock: {book.stock}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      Precio sin impuestos Nacionales: ${book.precio.toLocaleString('es-AR')}
                    </p>
                    
                    <button
                      onClick={() => onAddToCart(book)}
                      disabled={book.stock === 0}
                      className={`w-full py-2 px-3 rounded text-sm font-semibold transition-colors ${
                        book.stock > 0
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {book.stock > 0 ? 'Comprar' : 'Sin Stock'}
                    </button>
                    
                    <div className="flex justify-between text-xs">
                      <button className="text-indigo-600 hover:text-indigo-800">
                        Agregar a Favoritos
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
