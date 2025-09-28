import React, { useState, useEffect } from "react";
import { categoriaService } from "../services/categoriaService.js";
import "./Categorias.css";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({ 
    Nombre: "", 
    Descripcion: ""
  });
  const [editando, setEditando] = useState(null);
  const [editCategoria, setEditCategoria] = useState({});
  const [confirmar, setConfirmar] = useState({ mostrar: false, id: null });

  // Cargar categorías al montar el componente
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await categoriaService.getAllCategorias();
      setCategorias(response || []);
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const agregarCategoria = async () => {
    if (!nuevaCategoria.Nombre.trim()) return;
    
    setLoading(true);
    try {
      await categoriaService.createCategoria(nuevaCategoria);
      setNuevaCategoria({ Nombre: "", Descripcion: "" });
      cargarCategorias();
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (categoria) => {
    setEditando(categoria.Id);
    setEditCategoria({ ...categoria });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setEditCategoria({});
  };

  const guardarEdicion = async () => {
    setLoading(true);
    try {
      await categoriaService.updateCategoria({
        Id: editCategoria.Id,
        Nombre: editCategoria.Nombre,
        Descripcion: editCategoria.Descripcion
      });
      setEditando(null);
      setEditCategoria({});
      cargarCategorias();
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const eliminarCategoria = (id) => {
    setConfirmar({ mostrar: true, id });
  };

  const confirmarEliminar = async () => {
    setLoading(true);
    try {
      await categoriaService.deleteCategoria(confirmar.id);
      setConfirmar({ mostrar: false, id: null });
      cargarCategorias();
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const cancelarEliminar = () => {
    setConfirmar({ mostrar: false, id: null });
  };

  return (
    <section className="categorias-panel">
      <h2>Gestión de Categorías</h2>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="agregar-categoria">
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={nuevaCategoria.Nombre}
          onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, Nombre: e.target.value })}
          disabled={loading}
        />
        <textarea
          placeholder="Descripción"
          value={nuevaCategoria.Descripcion}
          onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, Descripcion: e.target.value })}
          disabled={loading}
        />
        <button 
          className="button" 
          onClick={agregarCategoria}
          disabled={loading || !nuevaCategoria.Nombre.trim()}
        >
          {loading ? 'Agregando...' : 'Agregar'}
        </button>
        <button 
          className="button secondary" 
          onClick={cargarCategorias}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {loading && categorias.length === 0 ? (
        <div className="loading">Cargando categorías...</div>
      ) : (
        <div className="categorias-grid">
          {categorias.map((categoria) =>
            editando === categoria.Id ? (
              <div key={categoria.Id} className="categoria-card editing">
                <div className="categoria-header">
                  <input
                    type="text"
                    value={editCategoria.Nombre}
                    onChange={(e) => setEditCategoria({ ...editCategoria, Nombre: e.target.value })}
                    disabled={loading}
                    className="categoria-title-input"
                  />
                </div>
                <div className="categoria-body">
                  <textarea
                    value={editCategoria.Descripcion}
                    onChange={(e) => setEditCategoria({ ...editCategoria, Descripcion: e.target.value })}
                    disabled={loading}
                    className="categoria-desc-input"
                  />
                </div>
                <div className="categoria-actions">
                  <button 
                    className="button" 
                    onClick={guardarEdicion}
                    disabled={loading}
                  >
                    {loading ? 'Guardando...' : 'Guardar'}
                  </button>
                  <button 
                    className="button danger" 
                    onClick={cancelarEdicion}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div key={categoria.Id} className="categoria-card">
                <div className="categoria-header">
                  <h3 className="categoria-title">{categoria.Nombre}</h3>
                </div>
                <div className="categoria-body">
                  <p className="categoria-desc">{categoria.Descripcion}</p>
                  <div className="categoria-meta">
                    <span className="categoria-id">ID: {categoria.Id}</span>
                    <span className="categoria-fecha">
                      {new Date(categoria.FechaCreacion).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="categoria-actions">
                  <button 
                    className="button" 
                    onClick={() => iniciarEdicion(categoria)}
                    disabled={loading}
                  >
                    Editar
                  </button>
                  <button 
                    className="button danger" 
                    onClick={() => eliminarCategoria(categoria.Id)}
                    disabled={loading}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {categorias.length === 0 && !loading && (
        <div className="no-data">No hay categorías registradas</div>
      )}

      {confirmar.mostrar && (
        <div className="modal-confirm-bg">
          <div className="modal-confirm">
            <div className="modal-confirm-title">¿Seguro que desea eliminar esta categoría?</div>
            <div className="modal-confirm-actions">
              <button className="button danger" onClick={confirmarEliminar}>
                Sí, eliminar
              </button>
              <button className="button" onClick={cancelarEliminar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Categorias;