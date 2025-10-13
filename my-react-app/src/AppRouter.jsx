import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CategoryView from './components/CategoryView';
import CategoriesView from './components/CategoriesView';
import BooksView from './components/BooksView';
import BestSellersView from './components/BestSellersView';

/**
 * COMPONENTE ROUTER - Manejo de rutas de la aplicación
 * 
 * Este componente maneja:
 * - Ruta principal de la aplicación
 * - Rutas de categorías específicas
 * - Navegación entre páginas
 */
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />
        
        {/* Rutas de categorías */}
        <Route path="/categoria/:id" element={<CategoryView />} />
        
        {/* Rutas de vistas específicas */}
        <Route path="/categorias" element={<CategoriesView />} />
        <Route path="/libros" element={<BooksView />} />
        <Route path="/bestsellers" element={<BestSellersView />} />
        
        {/* Ruta por defecto */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
