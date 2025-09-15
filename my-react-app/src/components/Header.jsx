import { useState, useEffect, useRef } from 'react';

/**
 * COMPONENTE HEADER - Barra de navegación principal
 * 
 * Este componente maneja:
 * - Navegación principal del sitio
 * - Dropdown de categorías con carrito y login integrados
 * - Barra promocional superior
 * - Menú responsive para móviles
 * - Estado de sesión del usuario
 * 
 * @param {Array} cartItems - Array de productos en el carrito
 * @param {boolean} isLoggedIn - Estado de autenticación del usuario
 * @param {string} userEmail - Email del usuario logueado
 * @param {function} onLoginClick - Función para abrir modal de login
 * @param {function} onCartClick - Función para abrir carrito de compras
 */
const Header = ({ cartItems, isLoggedIn, userEmail, onLoginClick, onCartClick }) => {
  // Estados para controlar la apertura/cierre de menús
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menú móvil
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // Dropdown categorías
  const dropdownRef = useRef(null); // Referencia para detectar clics fuera del dropdown

  // Calcular total de productos en el carrito
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  /**
   * Efecto para cerrar el dropdown al hacer clic fuera de él
   * Mejora la experiencia de usuario al cerrar automáticamente menús abiertos
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * CATEGORÍAS DE LIBROS
   * Array que define las categorías principales de la librería
   * Cada categoría incluye: id, nombre, icono emoji y descripción
   */
  const categories = [
    { id: 1, name: "Ficción", icon: "📚", description: "Novelas y cuentos de ficción" },
    { id: 2, name: "No Ficción", icon: "📖", description: "Biografías, ensayos y libros informativos" },
    { id: 3, name: "Ciencia Ficción", icon: "🚀", description: "Explora mundos futuros y tecnología" },
    { id: 4, name: "Fantasía", icon: "🧙‍♂️", description: "Magia, dragones y aventuras épicas" },
    { id: 5, name: "Romance", icon: "💕", description: "Historias de amor y pasión" },
    { id: 6, name: "Misterio", icon: "🕵️‍♂️", description: "Suspenso y casos por resolver" },
    { id: 7, name: "Historia", icon: "🏛️", description: "Eventos históricos y civilizaciones" },
    { id: 8, name: "Autoayuda", icon: "💪", description: "Desarrollo personal y motivación" }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* BARRA PROMOCIONAL SUPERIOR
          Muestra ofertas importantes como envío gratis y cuotas sin interés
          Fondo rojo para llamar la atención */}
      <div className="bg-red-600 text-white text-center py-1 text-sm">
        <span className="font-semibold">ENVÍO GRATIS</span> para compras mayores a $59.000 | 
        <span className="font-semibold"> 3 CUOTAS SIN INTERÉS</span> Visa y Master
      </div>
      
      {/* CONTENEDOR PRINCIPAL DEL HEADER
          Máximo ancho de 7xl (1280px) con padding responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* LOGO DE LA EMPRESA */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">📚 Hilet Lib</h1>
          </div>

          {/* NAVEGACIÓN PRINCIPAL - SOLO VISIBLE EN DESKTOP */}
          <nav className="hidden md:flex space-x-6">
            {/* Enlace de inicio */}
            <a href="#home" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Inicio
            </a>
            
            {/* DROPDOWN DE CATEGORÍAS
                Contiene todas las categorías de libros, carrito y login
                Se cierra automáticamente al hacer clic fuera */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center font-medium"
              >
                Todos los libros
                <span className="ml-1">▼</span>
              </button>
              
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50">
                  <div className="grid grid-cols-3 gap-4 px-4">
                    {/* Left Column - Account & Cart */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 mb-3">Mi Cuenta</h4>
                      
                      {/* Login/Account Section */}
                      <div className="space-y-2">
                        {isLoggedIn ? (
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-green-600">✅</span>
                              <span className="font-medium text-green-800">Sesión iniciada</span>
                            </div>
                            <p className="text-sm text-green-600 truncate">{userEmail}</p>
                            <button className="text-xs text-green-700 hover:text-green-800 mt-1">
                              Ver perfil →
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              onLoginClick();
                              setIsCategoriesOpen(false);
                            }}
                            className="w-full flex items-center space-x-2 p-3 bg-indigo-50 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors"
                          >
                            <span className="text-indigo-600">🔐</span>
                            <div className="text-left">
                              <p className="font-medium text-indigo-800">Iniciar Sesión</p>
                              <p className="text-xs text-indigo-600">Accede a tu cuenta</p>
                            </div>
                          </button>
                        )}
                      </div>

                      {/* Cart Section */}
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            onCartClick();
                            setIsCategoriesOpen(false);
                          }}
                          className="w-full flex items-center space-x-2 p-3 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors relative"
                        >
                          <span className="text-orange-600">🛒</span>
                          <div className="text-left flex-1">
                            <p className="font-medium text-orange-800">Carrito</p>
                            <p className="text-xs text-orange-600">
                              {cartItemsCount > 0 
                                ? `${cartItemsCount} producto${cartItemsCount > 1 ? 's' : ''}`
                                : 'Vacío'
                              }
                            </p>
                          </div>
                          {cartItemsCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {cartItemsCount}
                            </span>
                          )}
                        </button>
                      </div>

                      {/* Quick Actions */}
                      <div className="pt-2">
                        <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                          Acciones Rápidas
                        </h5>
                        <div className="space-y-1">
                          <button className="w-full text-left text-sm text-gray-600 hover:text-indigo-600 py-1">
                            📋 Mis Pedidos
                          </button>
                          <button className="w-full text-left text-sm text-gray-600 hover:text-indigo-600 py-1">
                            ❤️ Lista de Deseos
                          </button>
                          <button className="w-full text-left text-sm text-gray-600 hover:text-indigo-600 py-1">
                            ⭐ Mis Reseñas
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Middle & Right Columns - Categories */}
                    <div className="col-span-2">
                      <h4 className="font-semibold text-gray-900 mb-3">Categorías</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <a
                            key={category.id}
                            href={`#category-${category.id}`}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                            onClick={() => setIsCategoriesOpen(false)}
                          >
                            <span className="text-lg">{category.icon}</span>
                            <div>
                              <p className="font-medium text-gray-900 group-hover:text-indigo-600 text-sm">
                                {category.name}
                              </p>
                              <p className="text-xs text-gray-500 line-clamp-1">
                                {category.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                      
                      {/* Featured Categories */}
                      <div className="border-t border-gray-200 mt-3 pt-3">
                        <h5 className="font-medium text-gray-900 mb-2 text-sm">Destacadas</h5>
                        <div className="flex flex-wrap gap-2">
                          <a href="#bestsellers" className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full hover:bg-yellow-200">
                            🏆 Best Sellers
                          </a>
                          <a href="#new" className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full hover:bg-green-200">
                            🆕 Nuevos
                          </a>
                          <a href="#recommended" className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200">
                            ⭐ Recomendados
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <a href="#promociones" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Promociones
            </a>
            <a href="#sucursales" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Sucursales
            </a>
            <a href="#packs" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
              Packs
            </a>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Search bar */}
            <div className="hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar libros..."
                  className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600">
                  🔍
                </button>
              </div>
            </div>

            {/* Cart button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              🛒
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Login button */}
            <button
              onClick={onLoginClick}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isLoggedIn ? 'Mi Cuenta' : 'Iniciar Sesión'}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-indigo-600"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t">
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">
                Inicio
              </a>
              
              {/* Mobile Categories */}
              <div>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="text-gray-700 hover:text-indigo-600 transition-colors py-2 flex items-center"
                >
                  Categorías
                  <span className="ml-1">{isCategoriesOpen ? '▲' : '▼'}</span>
                </button>
                
                {isCategoriesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {categories.map((category) => (
                      <a
                        key={category.id}
                        href={`#category-${category.id}`}
                        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-indigo-600 py-1"
                        onClick={() => {
                          setIsCategoriesOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              <a href="#books" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">
                Libros
              </a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">
                Nosotros
              </a>
              <div className="pt-4">
                <input
                  type="text"
                  placeholder="Buscar libros..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
