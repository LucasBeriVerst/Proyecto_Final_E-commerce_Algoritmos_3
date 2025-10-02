import "./MenuInicio.css";

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

export default MenuInicio;