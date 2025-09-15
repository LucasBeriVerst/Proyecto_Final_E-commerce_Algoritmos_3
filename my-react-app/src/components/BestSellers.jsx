/**
 * COMPONENTE BESTSELLERS - Sección de libros más vendidos
 * 
 * Este componente muestra:
 * - Lista de los 12 libros más populares
 * - Numeración del ranking (#1, #2, #3...)
 * - Información completa de cada libro
 * - Botones de compra y favoritos
 * - Fondo gris para diferenciación visual
 * 
 * @param {function} onAddToCart - Función para agregar productos al carrito
 */
const BestSellers = ({ onAddToCart }) => {
  /**
   * LISTA DE MÁS VENDIDOS
   * Array con los 12 libros más populares ordenados por ranking
   * Incluye títulos reconocidos como Stephen King, Isabel Allende, etc.
   */
  const bestSellers = [
    {
      id: 1,
      title: "NO TENGAS MIEDO",
      author: "KING, STEPHEN",
      price: 41999,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      description: "Nueva novela del maestro del terror",
      inStock: true
    },
    {
      id: 2,
      title: "CRIMEN DE AÑO NUEVO, EL",
      author: "BALMACEDA, DANIEL",
      price: 34999,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      description: "Thriller policial argentino",
      inStock: true
    },
    {
      id: 3,
      title: "INOCENTES",
      author: "GRISHAM, JOHN",
      price: 37499,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      description: "Nueva novela del maestro del thriller legal",
      inStock: true
    },
    {
      id: 4,
      title: "MI NOMBRE ES EMILIA DEL VALLE",
      author: "ALLENDE, ISABEL",
      price: 34499,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      description: "Nueva novela de la reconocida autora",
      inStock: true
    },
    {
      id: 5,
      title: "32 HISTORIAS QUE TODO LIDER DEBERIA LEER",
      author: "ZUCHOVICKI, CLAUDIO",
      price: 35900,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.3,
      description: "Desarrollo personal y liderazgo",
      inStock: true
    },
    {
      id: 6,
      title: "MUERTE AJENA, LA",
      author: "PIÑEIRO, CLAUDIA",
      price: 38299,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.4,
      description: "Nueva novela de la reconocida escritora argentina",
      inStock: true
    },
    {
      id: 7,
      title: "RECETAS PARA VIVIR MEJOR Y MAS TIEMPO",
      author: "LOPEZ ROSETTI, DANIEL",
      price: 39900,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.2,
      description: "Salud y bienestar",
      inStock: true
    },
    {
      id: 8,
      title: "BUEN MAL, EL",
      author: "SCHWEBLIN, SAMANTHA",
      price: 26999,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      description: "Nueva novela de la autora argentina",
      inStock: true
    },
    {
      id: 9,
      title: "FELICIDAD, LA",
      author: "ROLON, GABRIEL",
      price: 39900,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.1,
      description: "Psicología y desarrollo personal",
      inStock: true
    },
    {
      id: 10,
      title: "ETERNAUTA, EL",
      author: "OESTERHELD",
      price: 34900,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      description: "Clásico de la historieta argentina",
      inStock: true
    },
    {
      id: 11,
      title: "CUANDO SAN PEDRO VIAJO EN TREN",
      author: "BODOC, LILIANA",
      price: 15999,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      description: "Literatura infantil y juvenil",
      inStock: true
    },
    {
      id: 12,
      title: "GATURRO 40",
      author: "NIK",
      price: 12499,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      description: "Nueva aventura del gato más famoso",
      inStock: true
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

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
          {bestSellers.map((book, index) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
            >
              {/* Number Badge */}
              <div className="relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-sm px-2 py-1 rounded-full font-bold">
                  #{index + 1}
                </span>
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
                    <span className="text-lg font-bold text-gray-900">
                      ${book.price.toLocaleString('es-AR')}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    Precio sin impuestos Nacionales: ${book.price.toLocaleString('es-AR')}
                  </p>
                  
                  <button
                    onClick={() => onAddToCart(book)}
                    className="w-full py-2 px-3 rounded text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    Comprar
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
      </div>
    </section>
  );
};

export default BestSellers;
