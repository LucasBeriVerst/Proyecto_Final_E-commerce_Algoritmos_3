import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLibros, useCategorias } from '../hooks/useApi';
import { 
  mockLibros, 
  mockCategorias, 
  getLibrosByCategoria 
} from '../data/mockData';

/**
 * COMPONENTE CATEGORYVIEW - Vista de libros por categoría
 * 
 * Este componente muestra:
 * - Lista de libros filtrados por categoría específica
 * - Información detallada de cada libro (precio, stock, autor)
 * - Botones de compra y favoritos
 * - Paginación y filtros
 * - Diseño similar a librosdelaarena.com.ar
 * 
 * @param {string} categoriaId - ID de la categoría a mostrar
 * @param {function} onAddToCart - Función para agregar productos al carrito
 */
const CategoryView = ({ onAddToCart = () => {} }) => {
  const { id: categoriaId } = useParams();
  const [libros, setLibros] = useState([]);
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ordenamiento, setOrdenamiento] = useState('ultimos');
  const [paginaActual, setPaginaActual] = useState(1);
  const [librosPorPagina, setLibrosPorPagina] = useState(24);

  // Hooks para obtener datos
  const { libros: todosLosLibros, loading: librosLoading, error: librosError, filtrarPorCategoria } = useLibros();
  const { categorias, loading: categoriasLoading, error: categoriasError } = useCategorias();

  // Cargar datos cuando cambie la categoría
  useEffect(() => {
    if (categoriaId) {
      // Intentar usar datos del backend primero
      if (categorias.length > 0 && !categoriasError) {
        const categoriaEncontrada = categorias.find(cat => cat.id === parseInt(categoriaId));
        setCategoria(categoriaEncontrada);
        
        if (todosLosLibros.length > 0 && !librosError) {
          const librosFiltrados = todosLosLibros.filter(libro => libro.categoria_id === parseInt(categoriaId));
          setLibros(librosFiltrados);
        } else {
          // Usar datos mock si hay error con el backend
          const librosMock = getLibrosByCategoria(categoriaId);
          setLibros(librosMock);
        }
      } else {
        // Usar datos mock si hay error con el backend
        const categoriaMock = mockCategorias.find(cat => cat.id === parseInt(categoriaId));
        setCategoria(categoriaMock);
        const librosMock = getLibrosByCategoria(categoriaId);
        setLibros(librosMock);
      }
      setLoading(false);
    }
  }, [categoriaId, categorias, todosLosLibros, categoriasError, librosError]);

  // Función para manejar ordenamiento
  const handleOrdenamiento = (tipo) => {
    setOrdenamiento(tipo);
    let librosOrdenados = [...libros];
    
    switch (tipo) {
      case 'precio':
        librosOrdenados.sort((a, b) => a.precio - b.precio);
        break;
      case 'titulo':
        librosOrdenados.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'stock':
        librosOrdenados.sort((a, b) => b.stock - a.stock);
        break;
      default:
        // Últimos ingresados (orden por ID)
        librosOrdenados.sort((a, b) => b.id - a.id);
    }
    
    setLibros(librosOrdenados);
  };

  // Calcular paginación
  const totalPaginas = Math.ceil(libros.length / librosPorPagina);
  const inicio = (paginaActual - 1) * librosPorPagina;
  const fin = inicio + librosPorPagina;
  const librosPagina = libros.slice(inicio, fin);

  // Mostrar loading solo si realmente está cargando y no hay datos mock
  if (loading && libros.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando libros...</p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar error solo si no hay datos mock disponibles
  if ((error || librosError || categoriasError) && libros.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg max-w-md mx-auto">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-semibold mb-2">Servicio temporalmente no disponible</h3>
              <p className="text-sm">
                Los libros de esta categoría no están disponibles en este momento. 
                Por favor, intenta nuevamente más tarde.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de la categoría */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {categoria?.nombre || 'Categoría'}
              </h1>
              <p className="text-gray-600 mt-2">
                Artículos {inicio + 1}-{Math.min(fin, libros.length)} de {libros.length}
              </p>
            </div>
            
            {/* Controles de ordenamiento */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
              <select
                value={ordenamiento}
                onChange={(e) => handleOrdenamiento(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="ultimos">Últimos ingresados</option>
                <option value="stock">Stock disponible</option>
                <option value="precio">Precio</option>
                <option value="titulo">Título</option>
              </select>
              
              <label className="text-sm font-medium text-gray-700">Mostrar:</label>
              <select
                value={librosPorPagina}
                onChange={(e) => setLibrosPorPagina(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={24}>24</option>
                <option value={36}>36</option>
                <option value={48}>48</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de libros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {librosPagina.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay libros en esta categoría</h3>
            <p className="text-gray-500">Los libros aparecerán aquí cuando estén disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {librosPagina.map((libro, index) => (
              <div
                key={libro.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
              >
                {/* Imagen del libro */}
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={libro.imagen}
                    alt={libro.titulo}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>
                
                <div className="p-4">
                  {/* Título y autor */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {libro.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    {libro.autor}
                  </p>
                  
                  {/* Precio */}
                  <div className="mb-4">
                    <p className="text-xl font-bold text-gray-900">
                      ${libro.precio.toLocaleString('es-AR')}
                    </p>
                    <p className="text-xs text-gray-500">
                      Precio sin impuestos Nacionales: ${libro.precio.toLocaleString('es-AR')}
                    </p>
                  </div>
                  
                  {/* Botones */}
                  <div className="space-y-2">
                    <button
                      onClick={() => onAddToCart(libro)}
                      disabled={libro.stock === 0}
                      className={`w-full py-2 px-4 rounded text-sm font-semibold transition-colors ${
                        libro.stock > 0
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {libro.stock > 0 ? 'Comprar' : 'Sin Stock'}
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
        )}

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
                disabled={paginaActual === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                <button
                  key={pagina}
                  onClick={() => setPaginaActual(pagina)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    pagina === paginaActual
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pagina}
                </button>
              ))}
              
              <button
                onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
                disabled={paginaActual === totalPaginas}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
