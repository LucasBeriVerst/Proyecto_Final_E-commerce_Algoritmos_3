import { useState } from 'react';

/**
 * COMPONENTE PRODUCTGRID - Grid de productos con filtros
 * 
 * Este componente muestra:
 * - Lista de libros disponibles para compra
 * - Filtros por categoría
 * - Información detallada de cada libro (precio, stock, rating)
 * - Botones de compra y favoritos
 * - Diseño responsive en grid
 * 
 * @param {function} onAddToCart - Función para agregar productos al carrito
 */
const ProductGrid = ({ onAddToCart }) => {
  // Estado para la categoría seleccionada en los filtros
  const [selectedCategory, setSelectedCategory] = useState('all');

  /**
   * CATÁLOGO DE LIBROS
   * Array con todos los libros disponibles en la librería
   * Cada libro incluye: id, título, autor, precio, imagen, categoría, rating, descripción, stock, badges
   */
  const books = [
    {
      id: 1,
      title: "NO TENGAS MIEDO",
      author: "KING, STEPHEN",
      price: 41999,
      originalPrice: 45000,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "terror",
      rating: 4.8,
      description: "Nueva novela del maestro del terror",
      inStock: true,
      isBestSeller: true
    },
    {
      id: 2,
      title: "CRIMEN DE AÑO NUEVO, EL",
      author: "BALMACEDA, DANIEL",
      price: 34999,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "policial",
      rating: 4.7,
      description: "Thriller policial argentino",
      inStock: true,
      isBestSeller: true
    },
    {
      id: 3,
      title: "MI NOMBRE ES EMILIA DEL VALLE",
      author: "ALLENDE, ISABEL",
      price: 34499,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "ficcion",
      rating: 4.6,
      description: "Nueva novela de la reconocida autora",
      inStock: true,
      isBestSeller: true
    },
    {
      id: 4,
      title: "SILVERCLOAK",
      author: "STEVEN, L. K.",
      price: 34900,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "ciencia-ficcion",
      rating: 4.5,
      description: "Aventura de ciencia ficción",
      inStock: true,
      isNew: true
    },
    {
      id: 5,
      title: "MENU DEL DIA",
      author: "REICH, RODO",
      price: 15000,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "cocina",
      rating: 4.4,
      description: "Recetas para el día a día",
      inStock: true,
      isNew: true
    },
    {
      id: 6,
      title: "WILDER",
      author: "YARROS, REBECCA",
      price: 37000,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "romance",
      rating: 4.8,
      description: "Nueva novela romántica",
      inStock: false,
      isNew: true
    },
    {
      id: 7,
      title: "32 HISTORIAS QUE TODO LIDER DEBERIA LEER",
      author: "ZUCHOVICKI, CLAUDIO",
      price: 35900,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "autoayuda",
      rating: 4.3,
      description: "Desarrollo personal y liderazgo",
      inStock: true,
      isBestSeller: true
    },
    {
      id: 8,
      title: "ETERNAUTA, EL",
      author: "OESTERHELD",
      price: 34900,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "comics",
      rating: 4.9,
      description: "Clásico de la historieta argentina",
      inStock: true,
      isBestSeller: true
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', icon: '📚' },
    { id: 'terror', name: 'Terror', icon: '👻' },
    { id: 'policial', name: 'Policiales', icon: '🕵️‍♂️' },
    { id: 'ficcion', name: 'Ficción', icon: '📖' },
    { id: 'ciencia-ficcion', name: 'Ciencia Ficción', icon: '🚀' },
    { id: 'romance', name: 'Romance', icon: '💕' },
    { id: 'autoayuda', name: 'Autoayuda', icon: '💪' },
    { id: 'cocina', name: 'Cocina', icon: '🍳' },
    { id: 'comics', name: 'Comics', icon: '📗' }
  ];

  const filteredBooks = selectedCategory === 'all' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
            >
              {/* Badges */}
              <div className="relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                {book.isNew && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    NUEVO
                  </span>
                )}
                {book.isBestSeller && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    MÁS VENDIDO
                  </span>
                )}
                {!book.inStock && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    SIN STOCK
                  </span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 uppercase">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 mb-3 uppercase font-medium">{book.author}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {renderStars(book.rating)}
                  </div>
                  <span className="ml-2 text-xs text-gray-600">
                    {book.rating}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                  {book.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    {book.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        ${book.originalPrice.toLocaleString('es-AR')}
                      </span>
                    )}
                    <span className="text-lg font-bold text-gray-900">
                      ${book.price.toLocaleString('es-AR')}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    Precio sin impuestos Nacionales: ${book.price.toLocaleString('es-AR')}
                  </p>
                  
                  <button
                    onClick={() => onAddToCart(book)}
                    disabled={!book.inStock}
                    className={`w-full py-2 px-3 rounded text-sm font-semibold transition-colors ${
                      book.inStock
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {book.inStock ? 'Comprar' : 'Sin Stock'}
                  </button>
                  
                  <div className="flex justify-between text-xs">
                    <button className="text-indigo-600 hover:text-indigo-800">
                      Agregar a Favoritos
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-800">
                      Añadir para comparar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
