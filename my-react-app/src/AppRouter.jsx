import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CategoryView from './components/CategoryView';

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
        
        {/* Ruta por defecto */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
