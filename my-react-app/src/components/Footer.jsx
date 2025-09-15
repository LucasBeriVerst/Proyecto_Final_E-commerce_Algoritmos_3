/**
 * COMPONENTE FOOTER - Pie de página de la librería
 * 
 * Este componente incluye:
 * - Información de la empresa y contacto
 * - Lista de sucursales físicas
 * - Enlaces de navegación y ayuda
 * - Newsletter para suscripciones
 * - Sección de categorías destacadas
 * - Información de copyright y medios de pago
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* CONTENEDOR PRINCIPAL DEL FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* GRID DE INFORMACIÓN - 4 columnas en desktop, 1 en móvil */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* INFORMACIÓN DE LA EMPRESA - Ocupa 2 columnas */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">📚 Hilet Lib</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Librería especializada con más de 20 años de experiencia. Ofrecemos una amplia selección de libros 
              para todos los gustos y edades, con envío a todo el país y atención personalizada.
            </p>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                📘 Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                📷 Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                🐦 X-Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                🎵 Tik-Tok
              </a>
            </div>
            
            {/* Contact Info */}
            <div className="text-sm text-gray-300">
              <p>📧 info@librosdelaarena.com.ar</p>
              <p>📞 +54 223 4930117</p>
            </div>
          </div>

          {/* Sucursales */}
          <div>
            <h4 className="text-lg font-semibold mb-4">SUCURSALES</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Rivadavia 2724
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Güemes 2717
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Güemes 3198
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Constitución 5071
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Constitución 6137
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">NOSOTROS</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Ayuda para comprar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Empresa
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Staff
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">¡NO TE PIERDAS NINGUNA DE NUESTRAS NOVEDADES!</h4>
              <p className="text-gray-300">
                Registráte en nuestro newsletter.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors font-semibold">
                Suscribirme
              </button>
            </div>
          </div>
        </div>

        {/* Destacados */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h4 className="text-lg font-semibold mb-4">DESTACADOS</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Infantiles</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Autoayuda</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Ficción</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Novelas</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Cocina / Gastronomía</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Comics e historietas</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            Copyright © 2025 - Libros de la arena.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Pagos seguros:</span>
            <div className="flex space-x-2">
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">💳</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">🏦</span>
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">📱</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
