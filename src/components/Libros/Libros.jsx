import React, { useState } from "react";
import "./Libros.css";

const tiposLibro = [
  { value: "fisico", label: "Físico" },
  { value: "virtual", label: "Virtual" }
];

const Libros = () => {
  const [libros, setLibros] = useState([
    { id: 1, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", stock: 10, tipo: "fisico" },
    { id: 2, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", stock: 5, tipo: "fisico" },
    { id: 3, titulo: "Clean Code", autor: "Robert C. Martin", stock: 3, tipo: "virtual" },
  ]);
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: "", autor: "", stock: 0, tipo: "fisico" });
  const [editando, setEditando] = useState(null);
  const [editLibro, setEditLibro] = useState({});
  const [confirmar, setConfirmar] = useState({ mostrar: false, id: null });

  const agregarLibro = () => {
    if (!nuevoLibro.titulo.trim() || !nuevoLibro.autor.trim()) return;
    const libroAgregar = {
      ...nuevoLibro,
      stock: nuevoLibro.tipo === "virtual" ? Infinity : nuevoLibro.stock
    };
    setLibros([...libros, { id: Date.now(), ...libroAgregar }]);
    setNuevoLibro({ titulo: "", autor: "", stock: 0, tipo: "fisico" });
  };

  const eliminarLibro = (id) => {
    setConfirmar({ mostrar: true, id });
  };

  const confirmarEliminar = () => {
    setLibros(libros.filter((libro) => libro.id !== confirmar.id));
    setConfirmar({ mostrar: false, id: null });
  };

  const cancelarEliminar = () => {
    setConfirmar({ mostrar: false, id: null });
  };

  const iniciarEdicion = (libro) => {
    setEditando(libro.id);
    setEditLibro({ ...libro });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setEditLibro({});
  };

  const guardarEdicion = (id) => {
    const libroEditado = {
      ...editLibro,
      stock: editLibro.tipo === "virtual" ? Infinity : editLibro.stock
    };
    setLibros(libros.map((libro) => libro.id === id ? libroEditado : libro));
    setEditando(null);
    setEditLibro({});
  };

  return (
    <section className="libros-panel">
      <h2>📚 Gestión de Libros</h2>
      <div className="agregar-libro">
        <input
          type="text"
          placeholder="Título"
          value={nuevoLibro.titulo}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Autor"
          value={nuevoLibro.autor}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, autor: e.target.value })}
        />
        <select
          value={nuevoLibro.tipo}
          onChange={e => {
            const tipo = e.target.value;
            setNuevoLibro({
              ...nuevoLibro,
              tipo,
              stock: tipo === "virtual" ? Infinity : 0
            });
          }}
        >
          {tiposLibro.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {nuevoLibro.tipo === "fisico" ? (
          <input
            type="number"
            placeholder="Stock"
            min={0}
            value={nuevoLibro.stock}
            onChange={(e) =>
              setNuevoLibro({ ...nuevoLibro, stock: parseInt(e.target.value) || 0 })
            }
          />
        ) : (
          <input
            type="text"
            value="∞"
            disabled
            style={{ background: "#222", color: "#00b894", fontWeight: "bold", textAlign: "center" }}
            title="Stock infinito para libros virtuales"
          />
        )}
        <button className="button" onClick={agregarLibro}>Agregar</button>
      </div>
      <table className="table libros-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Tipo</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) =>
            editando === libro.id ? (
              <tr key={libro.id}>
                <td>
                  <input
                    type="text"
                    value={editLibro.titulo}
                    onChange={e => setEditLibro({ ...editLibro, titulo: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={editLibro.autor}
                    onChange={e => setEditLibro({ ...editLibro, autor: e.target.value })}
                  />
                </td>
                <td>
                  <select
                    value={editLibro.tipo}
                    onChange={e => {
                      const tipo = e.target.value;
                      setEditLibro({
                        ...editLibro,
                        tipo,
                        stock: tipo === "virtual" ? Infinity : (editLibro.stock === Infinity ? 0 : editLibro.stock)
                      });
                    }}
                  >
                    {tiposLibro.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </td>
                <td>
                  {editLibro.tipo === "fisico" ? (
                    <input
                      type="number"
                      min={0}
                      value={editLibro.stock}
                      onChange={e => setEditLibro({ ...editLibro, stock: parseInt(e.target.value) || 0 })}
                    />
                  ) : (
                    <input
                      type="text"
                      value="∞"
                      disabled
                      style={{ background: "#222", color: "#00b894", fontWeight: "bold", textAlign: "center" }}
                      title="Stock infinito para libros virtuales"
                    />
                  )}
                </td>
                <td>
                  <button className="button" onClick={() => guardarEdicion(libro.id)}>Guardar</button>
                  <button className="button danger" onClick={cancelarEdicion}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={libro.id}>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>
                  <span className={`badge ${libro.tipo}`}>
                    {libro.tipo === "fisico" ? "Físico" : "Virtual"}
                  </span>
                </td>
                <td>
                  {libro.tipo === "virtual" ? "∞" : libro.stock}
                </td>
                <td>
                  <button className="button" onClick={() => iniciarEdicion(libro)}>Editar</button>
                  <button className="button danger" onClick={() => eliminarLibro(libro.id)}>Eliminar</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {confirmar.mostrar && (
        <div className="modal-confirm-bg">
          <div className="modal-confirm">
            <div className="modal-confirm-title">¿Seguro que desea eliminar este libro?</div>
            <div className="modal-confirm-actions">
              <button className="button danger" onClick={confirmarEliminar}>Sí, eliminar</button>
              <button className="button" onClick={cancelarEliminar}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Libros;