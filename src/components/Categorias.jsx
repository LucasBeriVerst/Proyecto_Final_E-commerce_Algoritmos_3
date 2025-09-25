import "./Categorias.css";
import { useState } from "react";

const categoriasIniciales = [
  { nombre: "Ficción", total: 14 },
  { nombre: "No ficción", total: 0 },
  { nombre: "Programación", total: 13 },
  { nombre: "Educación", total: 9 }
];

const Categorias = () => {
  const [categorias, setCategorias] = useState(categoriasIniciales);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [editandoIdx, setEditandoIdx] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [confirmar, setConfirmar] = useState({ mostrar: false, idx: null });

  const agregarCategoria = () => {
    if (nuevaCategoria.trim() === "") return;
    setCategorias([...categorias, { nombre: nuevaCategoria, total: 0 }]);
    setNuevaCategoria("");
  };

  const eliminarCategoria = (idx) => {
    setConfirmar({ mostrar: true, idx });
  };

  const confirmarEliminar = () => {
    setCategorias(categorias.filter((_, i) => i !== confirmar.idx));
    if (editandoIdx === confirmar.idx) {
      setEditandoIdx(null);
      setEditNombre("");
    }
    setConfirmar({ mostrar: false, idx: null });
  };

  const cancelarEliminar = () => {
    setConfirmar({ mostrar: false, idx: null });
  };

  const iniciarEdicion = (idx) => {
    setEditandoIdx(idx);
    setEditNombre(categorias[idx].nombre);
  };

  const guardarEdicion = (idx) => {
    if (editNombre.trim() === "") return;
    setCategorias(
      categorias.map((cat, i) =>
        i === idx ? { ...cat, nombre: editNombre } : cat
      )
    );
    setEditandoIdx(null);
    setEditNombre("");
  };

  const cancelarEdicion = () => {
    setEditandoIdx(null);
    setEditNombre("");
  };

  return (
    <div className="categorias-panel">
      <h1>Panel de Administración</h1>
      <div className="panel-header">
        <h2>Categorías</h2>
        <div className="panel-actions">
          <input
            type="text"
            placeholder="Nueva categoría"
            value={nuevaCategoria}
            onChange={e => setNuevaCategoria(e.target.value)}
          />
          <button className="agregar" onClick={agregarCategoria}>
            + Agregar
          </button>
        </div>
      </div>
      <table className="categorias-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Total libros</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat, idx) => (
            <tr key={idx}>
              <td>
                {editandoIdx === idx ? (
                  <input
                    type="text"
                    value={editNombre}
                    onChange={e => setEditNombre(e.target.value)}
                    style={{ width: "90%" }}
                  />
                ) : (
                  cat.nombre
                )}
              </td>
              <td className="total">{cat.total}</td>
              <td className="actions">
                {editandoIdx === idx ? (
                  <>
                    <button className="icon-btn edit" title="Guardar" onClick={() => guardarEdicion(idx)}>
                      <span role="img" aria-label="save">💾</span>
                    </button>
                    <button className="icon-btn delete" title="Cancelar" onClick={cancelarEdicion}>
                      <span role="img" aria-label="cancel">❌</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="icon-btn edit" title="Editar" onClick={() => iniciarEdicion(idx)}>
                      <span role="img" aria-label="edit">✏️</span>
                    </button>
                    <button className="icon-btn delete" title="Eliminar" onClick={() => eliminarCategoria(idx)}>
                      <span role="img" aria-label="delete">🗑️</span>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {confirmar.mostrar && (
        <div className="modal-confirm-bg">
          <div className="modal-confirm">
            <div className="modal-confirm-title">¿Seguro que desea eliminar esta categoría?</div>
            <div className="modal-confirm-actions">
              <button className="button danger" onClick={confirmarEliminar}>Sí, eliminar</button>
              <button className="button" onClick={cancelarEliminar}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;