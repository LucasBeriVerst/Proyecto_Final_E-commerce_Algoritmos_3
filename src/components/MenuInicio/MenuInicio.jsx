/*import "./MenuInicio.css";

function MenuInicio() {
  // Ejemplo de libros, después importar desde la base de datos
  const libros = [
    {
      id: 1,
      titulo: "Cien Años de Soledad",
      autor: "Gabriel García Márquez",
      categoria: "Novela",
      portada: "https://covers.openlibrary.org/b/id/8775261-L.jpg",
    },
    {
      id: 2,
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      categoria: "Infantil",
      portada: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
    },
    {
      id: 3,
      titulo: "1984",
      autor: "George Orwell",
      categoria: "Ciencia Ficción",
      portada: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    },
  ];

  return (
    <div className="menu-inicio">
      <h2>📚 Catálogo de Libros</h2>
      <div className="libros-grid">
        {libros.map((libro) => (
          <div key={libro.id} className="libro-card">
            <img src={libro.portada} alt={libro.titulo} />
            <h3>{libro.titulo}</h3>
            <p><strong>Autor:</strong> {libro.autor}</p>
            <p><strong>Categoría:</strong> {libro.categoria}</p>
            <button>Ver más</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuInicio;*/

import React, { useState } from 'react';
import './MenuInicio.css';

const allBooks = [
  {
    id: 1,
    title: "Amanecer en la cosecha",
    author: "Suzanne Collins",
    price: 500,
    img: "https://acdn-us.mitiendanube.com/stores/004/088/117/products/728193-69662bdbae29d4383417418495680010-1024-1024.webp"
  },
  {
    id: 2,
    title: "Biopausia",
    author: "Gisela Gilges",
    price: 1500,
    img: "https://acdn-us.mitiendanube.com/stores/004/088/117/products/731828-ac9e01d76e2e8678b317510423500145-1024-1024.webp"
  },
  {
    id: 3,
    title: "El Último Secreto",
    author: "Dan Brown",
    price: 3000,
    img: "https://acdn-us.mitiendanube.com/stores/004/088/117/products/9789504992646-fa94573a9da113db7217489635173738-1024-1024.webp"
  },
  {
    id: 4,
    title: "El buen mal",
    author: "Samanta Schweblin",
    price: 2000,
    img: "https://acdn-us.mitiendanube.com/stores/004/088/117/products/726109-cf89d0ca2f92ee376d17371898746195-1024-1024.webp"
  },
  {
    id: 5,
    title: "Mi nombre es Emilia del Valle",
    author: "Isabel Allende",
    price: 1200,
    img: "https://acdn-us.mitiendanube.com/stores/004/088/117/products/9789500771870-fed79e022f6c93e35617439852336174-1024-1024.webp"
  },
  {
    id: 6,
    title: "El Instituto",
    author: "Stephen King",
    price: 5000,
    img: "https://books.google.com.ar/books/publisher/content?id=ha6hDwAAQBAJ&pg=PA1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U06CjBtnRttD5KnmyPqEPDMVCPXNw&w=1280"
  },
  {
    id: 7,
    title: "Shingeki No Kyojin Vol.1",
    author: "Hajime Isayama",
    price: 3000,
    img: "https://acdn-us.mitiendanube.com/stores/004/088/117/products/687218-b689ef29c3df8cc97017329028889771-1024-1024.webp"
  },
  {
    id: 8,
    title: "En Agosto Nos Vemos",
    author: "Gabriel García Márquez",
    price: 4000,
    img: "https://acdn-us.mitiendanube.com/stores/004/088/117/products/713619-5dd14beffb9df0f90d17272072117702-1024-1024.webp"
  }
];

export default function MenuInicio() {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(allBooks);

  const handleFilter = () => {
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;

    const filtered = allBooks.filter(book => book.price >= min && book.price <= max);
    setFilteredBooks(filtered);
  };

  return (
    <div className="menu-inicio">
      <h2>Libros</h2>

      <div className="filtros-precio">
        <label>
          Desde:
          <input
            type="number"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            placeholder="Precio mínimo"
          />
        </label>
        <label>
          Hasta:
          <input
            type="number"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            placeholder="Precio máximo"
          />
        </label>
        <button onClick={handleFilter}>Aplicar</button>
      </div>

      <div className="libros-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div key={book.id} className="libro-card">
              <img src={book.img} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p><b>${book.price}</b></p>
            </div>
          ))
        ) : (
          <p>No hay libros que coincidan con el filtro.</p>
        )}
      </div>
    </div>
  );
}