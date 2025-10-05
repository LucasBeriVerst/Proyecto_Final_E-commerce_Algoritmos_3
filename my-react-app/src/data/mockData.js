/**
 * DATOS MOCK PARA CATEGORÍAS Y LIBROS
 * 
 * Este archivo contiene datos simulados para que el frontend funcione
 * sin necesidad de conectarse a la base de datos del backend.
 */

// Datos mock para categorías
export const mockCategorias = [
  { id: 1, nombre: "Ficción", descripcion: "Novelas y cuentos de ficción" },
  { id: 2, nombre: "No Ficción", descripcion: "Biografías, ensayos y libros informativos" },
  { id: 3, nombre: "Ciencia Ficción", descripcion: "Explora mundos futuros y tecnología" },
  { id: 4, nombre: "Fantasía", descripcion: "Magia, dragones y aventuras épicas" },
  { id: 5, nombre: "Romance", descripcion: "Historias de amor y pasión" },
  { id: 6, nombre: "Misterio", descripcion: "Suspenso y casos por resolver" },
  { id: 7, nombre: "Historia", descripcion: "Eventos históricos y civilizaciones" },
  { id: 8, nombre: "Autoayuda", descripcion: "Desarrollo personal y motivación" }
];

// Datos mock para libros
export const mockLibros = [
  {
    id: 1,
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien",
    precio: 25000,
    descripcion: "Una épica aventura de fantasía que sigue el viaje de Frodo para destruir el Anillo Único.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 4,
    categoria_nombre: "Fantasía",
    stock: 15,
    fecha_publicacion: "1954-07-29",
    isbn: "978-0544003415",
    paginas: 1216,
    editorial: "Minotauro",
    idioma: "Español",
    formato: "Tapa blanda",
    rating: 4.8,
    ventas: 150
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    precio: 18000,
    descripcion: "Una distopía clásica que explora temas de vigilancia, control y libertad.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51W1sBPO7tL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 3,
    categoria_nombre: "Ciencia Ficción",
    stock: 8,
    fecha_publicacion: "1949-06-08",
    isbn: "978-0451524935",
    paginas: 328,
    editorial: "Debolsillo",
    idioma: "Español",
    formato: "Tapa blanda",
    rating: 4.7,
    ventas: 120
  },
  {
    id: 3,
    titulo: "Orgullo y Prejuicio",
    autor: "Jane Austen",
    precio: 16000,
    descripcion: "Una historia de amor clásica que sigue a Elizabeth Bennet y Mr. Darcy.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51Q5X1B6QZL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 5,
    categoria_nombre: "Romance",
    stock: 12,
    fecha_publicacion: "1813-01-28",
    isbn: "978-0141439518",
    paginas: 432,
    editorial: "Penguin Classics",
    idioma: "Español",
    formato: "Tapa blanda",
    rating: 4.6,
    ventas: 95
  },
  {
    id: 4,
    titulo: "El Código Da Vinci",
    autor: "Dan Brown",
    precio: 22000,
    descripcion: "Un thriller de misterio que combina historia, arte y religión.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51Q5X1B6QZL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 6,
    categoria_nombre: "Misterio",
    stock: 20,
    fecha_publicacion: "2003-03-18",
    isbn: "978-0307474278",
    paginas: 689,
    editorial: "Anchor",
    idioma: "Español",
    formato: "Tapa blanda",
    rating: 4.2,
    ventas: 200
  },
  {
    id: 5,
    titulo: "Sapiens",
    autor: "Yuval Noah Harari",
    precio: 28000,
    descripcion: "Una exploración fascinante de la historia de la humanidad.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51Q5X1B6QZL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 7,
    categoria_nombre: "Historia",
    stock: 10,
    fecha_publicacion: "2011-09-01",
    isbn: "978-0062316097",
    paginas: 443,
    editorial: "Harper",
    idioma: "Español",
    formato: "Tapa dura",
    rating: 4.5,
    ventas: 180
  },
  {
    id: 6,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 12000,
    descripcion: "Una fábula poética sobre la amistad, el amor y la pérdida.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51Q5X1B6QZL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 1,
    categoria_nombre: "Ficción",
    stock: 25,
    fecha_publicacion: "1943-04-06",
    isbn: "978-0156012195",
    paginas: 96,
    editorial: "Harcourt",
    idioma: "Español",
    formato: "Tapa blanda",
    rating: 4.9,
    ventas: 300
  },
  {
    id: 7,
    titulo: "El Arte de la Guerra",
    autor: "Sun Tzu",
    precio: 15000,
    descripcion: "Estrategias militares aplicables a la vida cotidiana y los negocios.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51Q5X1B6QZL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 8,
    categoria_nombre: "Autoayuda",
    stock: 18,
    fecha_publicacion: "500-01-01",
    isbn: "978-1590309637",
    paginas: 273,
    editorial: "Shambhala",
    idioma: "Español",
    formato: "Tapa blanda",
    rating: 4.4,
    ventas: 140
  },
  {
    id: 8,
    titulo: "Cien Años de Soledad",
    autor: "Gabriel García Márquez",
    precio: 20000,
    descripcion: "La historia épica de la familia Buendía en Macondo.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51Q5X1B6QZL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 1,
    categoria_nombre: "Ficción",
    stock: 14,
    fecha_publicacion: "1967-05-30",
    isbn: "978-0060883287",
    paginas: 417,
    editorial: "Harper Perennial",
    idioma: "Español",
    formato: "Tapa blanda",
    rating: 4.7,
    ventas: 160
  },
  // Más libros para Ciencia Ficción
  {
    id: 9,
    titulo: "Dune",
    autor: "Frank Herbert",
    precio: 32000,
    descripcion: "Una épica de ciencia ficción ambientada en el planeta desértico Arrakis.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51Q5X1B6QZL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 3,
    categoria_nombre: "Ciencia Ficción",
    stock: 7,
    fecha_publicacion: "1965-08-01",
    isbn: "978-0441013593",
    paginas: 688,
    editorial: "Ace Books",
    idioma: "Español",
    formato: "Tapa blanda",
    rating: 4.6,
    ventas: 180
  },
  {
    id: 10,
    titulo: "Fundación",
    autor: "Isaac Asimov",
    precio: 24000,
    descripcion: "La historia de la caída y reconstrucción de un imperio galáctico.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51Q5X1B6QZL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 3,
    categoria_nombre: "Ciencia Ficción",
    stock: 11,
    fecha_publicacion: "1951-05-01",
    isbn: "978-0553293357",
    paginas: 244,
    editorial: "Spectra",
    idioma: "Español",
    formato: "Tapa blanda",
    rating: 4.5,
    ventas: 220
  },
  {
    id: 11,
    titulo: "El Juego de Ender",
    autor: "Orson Scott Card",
    precio: 26000,
    descripcion: "La historia de un niño genio entrenado para liderar la defensa de la Tierra.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51Q5X1B6QZL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 3,
    categoria_nombre: "Ciencia Ficción",
    stock: 9,
    fecha_publicacion: "1985-01-15",
    isbn: "978-0812550702",
    paginas: 324,
    editorial: "Tor Books",
    idioma: "Español",
    formato: "Tapa blanda",
    rating: 4.7,
    ventas: 190
  },
  {
    id: 12,
    titulo: "Neuromante",
    autor: "William Gibson",
    precio: 28000,
    descripcion: "La novela que definió el género cyberpunk y el concepto de ciberespacio.",
    imagen: "https://images-na.ssl-images-amazon.com/images/I/51Q5X1B6QZL._SX331_BO1,204,203,200_.jpg",
    categoria_id: 3,
    categoria_nombre: "Ciencia Ficción",
    stock: 6,
    fecha_publicacion: "1984-07-01",
    isbn: "978-0441569595",
    paginas: 271,
    editorial: "Ace Books",
    idioma: "Español",
    formato: "Tapa blanda",
    rating: 4.3,
    ventas: 170
  }
];

// Función para obtener libros más vendidos (top 3 por ventas)
export const getBestSellers = () => {
  return mockLibros
    .sort((a, b) => b.ventas - a.ventas)
    .slice(0, 3);
};

// Función para obtener libros por categoría
export const getLibrosByCategoria = (categoriaId) => {
  return mockLibros.filter(libro => libro.categoria_id === parseInt(categoriaId));
};

// Función para buscar libros
export const buscarLibros = (termino) => {
  const terminoLower = termino.toLowerCase();
  return mockLibros.filter(libro => 
    libro.titulo.toLowerCase().includes(terminoLower) ||
    libro.autor.toLowerCase().includes(terminoLower) ||
    libro.descripcion.toLowerCase().includes(terminoLower)
  );
};

// Función para obtener un libro por ID
export const getLibroById = (id) => {
  return mockLibros.find(libro => libro.id === parseInt(id));
};
