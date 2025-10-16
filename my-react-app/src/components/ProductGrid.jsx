import { useState } from "react";

/**
 * PRODUCTGRID — versión funcional con libros mock y animación Tailwind.
 * Muestra los libros aunque no haya conexión con el backend.
 */

const ProductGrid = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 📚 Libros mock siempre visibles
  const mockLibros = [
    {
      id: 1,
      titulo: "Cien Años de Soledad",
      autor: "Gabriel García Márquez",
      descripcion: "Una obra maestra del realismo mágico ambientada en Macondo.",
      precio: 8500,
      stock: 10,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/004/088/117/products/725865-3fe5b2fc0395fe892217513906652764-1024-1024.webp",
    },
    {
      id: 2,
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      descripcion:
        "Un clásico de la literatura infantil y filosófica que todos deberían leer.",
      precio: 4200,
      stock: 5,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/004/088/117/products/712575-d7f357e8e95722eb9c17277036657687-1024-1024.webp",
    },
    {
      id: 3,
      titulo: "1984",
      autor: "George Orwell",
      descripcion:
        "Distopía sobre un régimen totalitario y la vigilancia masiva.",
      precio: 7500,
      stock: 8,
      imagen:
        "https://acdn-us.mitiendanube.com/stores/004/088/117/products/714756-eb73372292df5bcd5217272111422800-1024-1024.webp",
    },
    {
      id: 4,
      titulo: "El Alquimista",
      autor: "Paulo Coelho",
      descripcion:
        "Una novela sobre la búsqueda de los sueños y el destino personal.",
      precio: 6900,
      stock: 12,
      imagen:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT-ywRDaE36cBsdWq3pDexODgL9gLfiikU-j1CJuBsS7FArp-ksS9Y7H0dkHwNdw0Y_UQhaTAmJ05auRRV5-cLKdsQ3ixmeXmlsyjF5ER3v-njnNqUQHi6IHw",
    },
  ];

  const renderStars = (rating = 4.5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
        ⭐
      </span>
    ));
  };

  return (
    <section id="books" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Novedades
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Los libros más recientes y recomendados para vos
          </p>
        </div>

        {/* Grid de libros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockLibros.map((book, index) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 opacity-0 animate-fadeIn"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="relative">
                <img
                  src={book.imagen}
                  alt={book.titulo}
                  className="w-full h-56 object-cover"
                />
                {book.stock === 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    SIN STOCK
                  </span>
                )}
                {book.stock <= 5 && book.stock > 0 && (
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    ¡Últimas unidades!
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                  {book.titulo}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{book.autor}</p>

                <div className="flex items-center mb-3">
                  <div>{renderStars()}</div>
                  <span className="ml-2 text-xs text-gray-500">4.5</span>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {book.descripcion}
                </p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-indigo-700">
                    ${book.precio.toLocaleString("es-AR")}
                  </span>
                  <span className="text-xs text-gray-500">Stock: {book.stock}</span>
                </div>

                <button
                  onClick={() => onAddToCart && onAddToCart(book)}
                  disabled={book.stock === 0}
                  className={`w-full py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                    book.stock > 0
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {book.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;