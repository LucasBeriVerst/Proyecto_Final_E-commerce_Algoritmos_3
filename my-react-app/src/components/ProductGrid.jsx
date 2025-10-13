import { useState, useEffect } from 'react';
import { useLibros, useCategorias } from '../hooks/useApi';

/**
 * COMPONENTE PRODUCTGRID - Grid de productos con filtros
 * 
 * Este componente muestra:
 * - Lista de libros disponibles para compra (desde API)
 * - Filtros por categoría (desde API)
 * - Información detallada de cada libro (precio, stock, rating)
 * - Botones de compra y favoritos
 * - Diseño responsive en grid
 * 
 * @param {function} onAddToCart - Función para agregar productos al carrito
 */
const ProductGrid = ({ onAddToCart }) => {
  // Estado para la categoría seleccionada en los filtros
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Hooks para obtener datos del backend
  const { libros, loading: librosLoading, error: librosError, buscarLibros, filtrarPorCategoria } = useLibros();
  const { categorias, loading: categoriasLoading, error: categoriasError } = useCategorias();

  // Manejar cambios en filtros
  useEffect(() => {
    if (terminoBusqueda.trim()) {
      buscarLibros(terminoBusqueda);
    } else if (selectedCategory === 'all') {
      // Recargar todos los libros
      buscarLibros('');
    } else {
      // Filtrar por categoría
      const categoriaId = parseInt(selectedCategory);
      if (!isNaN(categoriaId)) {
        filtrarPorCategoria(categoriaId);
      }
    }
  }, [selectedCategory, terminoBusqueda]);

  // Manejar búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (terminoBusqueda.trim()) {
      buscarLibros(terminoBusqueda);
    }
  };

  // Función para manejar cambio de categoría
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setTerminoBusqueda(''); // Limpiar búsqueda al cambiar categoría
  };

  // Función para renderizar estrellas (rating simulado)
  const renderStars = (rating = 4.5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

  // Mostrar loading
  if (librosLoading || categoriasLoading) {
    return (
      <section id="books" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando libros...</p>
          </div>
        </div>
      </section>
    );
  }

  // Mostrar error
  if (librosError || categoriasError) {
    return (
      <section id="books" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Novedades
            </h2>
            <p className="text-xl text-gray-600">
              Descubre los últimos títulos disponibles
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg max-w-md mx-auto">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-semibold mb-2">Servicio temporalmente no disponible</h3>
              <p className="text-sm">
                Los libros no están disponibles en este momento. 
                Por favor, intenta nuevamente más tarde.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="books" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Novedades
          </h2>
          <p className="text-xl text-gray-600">
            Los últimos lanzamientos y títulos más populares
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              placeholder="Buscar libros por título, autor..."
              className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              🔍
            </button>
          </form>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
            }`}
          >
            <span className="text-lg">📚</span>
            <span className="font-medium">Todos</span>
          </button>
          {categorias.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                selectedCategory === category.id.toString()
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
            >
              <span className="text-lg">📖</span>
              <span className="font-medium">{category.nombre}</span>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {category.cantidadLibros}
              </span>
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {libros.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron libros</h3>
              <p className="text-gray-500">
                {terminoBusqueda ? 'Intenta con otros términos de búsqueda' : 'No hay libros disponibles en esta categoría'}
              </p>
            </div>
          ) : (
            libros.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
              >
                {/* Badges */}
                <div className="relative">
                  <img
                    src={book.imagen}
                    alt={book.titulo}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  {book.stock <= 5 && book.stock > 0 && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      ÚLTIMAS UNIDADES
                    </span>
                  )}
                  {book.stock === 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      SIN STOCK
                    </span>
                  )}
                  {book.esFisico && (
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      FÍSICO
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

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
            Ver Más Libros
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
