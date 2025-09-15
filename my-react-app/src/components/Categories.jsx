const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Ficción",
      icon: "📚",
      description: "Novelas y cuentos de ficción",
      color: "bg-blue-100 hover:bg-blue-200"
    },
    {
      id: 2,
      name: "No Ficción",
      icon: "📖",
      description: "Biografías, ensayos y libros informativos",
      color: "bg-green-100 hover:bg-green-200"
    },
    {
      id: 3,
      name: "Ciencia Ficción",
      icon: "🚀",
      description: "Explora mundos futuros y tecnología",
      color: "bg-purple-100 hover:bg-purple-200"
    },
    {
      id: 4,
      name: "Fantasía",
      icon: "🧙‍♂️",
      description: "Magia, dragones y aventuras épicas",
      color: "bg-yellow-100 hover:bg-yellow-200"
    },
    {
      id: 5,
      name: "Romance",
      icon: "💕",
      description: "Historias de amor y pasión",
      color: "bg-pink-100 hover:bg-pink-200"
    },
    {
      id: 6,
      name: "Misterio",
      icon: "🕵️‍♂️",
      description: "Suspenso y casos por resolver",
      color: "bg-gray-100 hover:bg-gray-200"
    },
    {
      id: 7,
      name: "Historia",
      icon: "🏛️",
      description: "Eventos históricos y civilizaciones",
      color: "bg-amber-100 hover:bg-amber-200"
    },
    {
      id: 8,
      name: "Autoayuda",
      icon: "💪",
      description: "Desarrollo personal y motivación",
      color: "bg-emerald-100 hover:bg-emerald-200"
    }
  ];

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
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${category.color} p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
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
