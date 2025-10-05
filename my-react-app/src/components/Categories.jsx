import { useCategorias } from '../hooks/useApi';

const Categories = () => {
  // Hook para obtener categorías del backend
  const { categorias, loading, error } = useCategorias();

  // Colores para las categorías
  const colors = [
    "bg-blue-100 hover:bg-blue-200",
    "bg-green-100 hover:bg-green-200", 
    "bg-purple-100 hover:bg-purple-200",
    "bg-yellow-100 hover:bg-yellow-200",
    "bg-pink-100 hover:bg-pink-200",
    "bg-gray-100 hover:bg-gray-200",
    "bg-amber-100 hover:bg-amber-200",
    "bg-emerald-100 hover:bg-emerald-200"
  ];

  // Iconos para las categorías
  const icons = ["📚", "📖", "🚀", "🧙‍♂️", "💕", "🕵️‍♂️", "🏛️", "💪"];

  // Mostrar loading
  if (loading) {
    return (
      <section id="categories" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando categorías...</p>
          </div>
        </div>
      </section>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <section id="categories" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explora por Categorías
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra el libro perfecto para ti navegando por nuestras categorías cuidadosamente seleccionadas
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg max-w-md mx-auto">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-semibold mb-2">Servicio temporalmente no disponible</h3>
              <p className="text-sm">
                Las categorías no están disponibles en este momento. 
                Por favor, intenta nuevamente más tarde.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explora por Categorías
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra el libro perfecto para ti navegando por nuestras categorías cuidadosamente seleccionadas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categorias.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay categorías disponibles</h3>
              <p className="text-gray-500">Las categorías aparecerán aquí cuando estén disponibles</p>
            </div>
          ) : (
            categorias.map((category, index) => (
              <div
                key={category.id}
                className={`${colors[index % colors.length]} p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{icons[index % icons.length]}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {category.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {category.descripcion || 'Descubre libros de esta categoría'}
                  </p>
                  <div className="text-xs text-gray-500 bg-white bg-opacity-50 px-2 py-1 rounded-full inline-block">
                    {category.cantidadLibros} libros
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Featured categories section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Categorías Destacadas
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🏆</div>
              <h4 className="text-xl font-semibold mb-2">Best Sellers</h4>
              <p className="text-gray-600 mb-4">
                Los libros más vendidos y populares del momento
              </p>
              <button className="text-indigo-600 font-semibold hover:text-indigo-800">
                Ver Lista →
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">🆕</div>
              <h4 className="text-xl font-semibold mb-2">Nuevos Lanzamientos</h4>
              <p className="text-gray-600 mb-4">
                Las últimas novedades editoriales y autores emergentes
              </p>
              <button className="text-indigo-600 font-semibold hover:text-indigo-800">
                Descubrir →
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-4">⭐</div>
              <h4 className="text-xl font-semibold mb-2">Recomendados</h4>
              <p className="text-gray-600 mb-4">
                Selección especial de nuestro equipo de expertos
              </p>
              <button className="text-indigo-600 font-semibold hover:text-indigo-800">
                Ver Selección →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
