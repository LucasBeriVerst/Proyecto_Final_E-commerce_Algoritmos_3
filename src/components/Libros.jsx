import React, { useState, useEffect } from "react";
import { libroService } from "../services/libroService.js";
import { categoriaService } from "../services/categoriaService.js";
import "./Libros.css";

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nuevoLibro, setNuevoLibro] = useState({ 
    Titulo: "", 
    Autor: "", 
    ISBN: "", 
    Precio: 0, 
    Stock: 0, 
    EsFisico: true,
    CategoriaId: 1,
    Descripcion: ""
  });
  const [editando, setEditando] = useState(null);
  const [editLibro, setEditLibro] = useState({});
  const [confirmar, setConfirmar] = useState({ mostrar: false, id: null });

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarLibros();
    cargarCategorias();
  }, []);

  const cargarLibros = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await libroService.getAllLibros();
      setLibros(response || []);
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const cargarCategorias = async () => {
    try {
      const response = await categoriaService.getAllCategorias();
      setCategorias(response || []);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const agregarLibro = async () => {
    if (!nuevoLibro.Titulo.trim() || !nuevoLibro.Autor.trim()) return;
    
    setLoading(true);
    try {
      await libroService.createLibro(nuevoLibro);
      setNuevoLibro({ 
        Titulo: "", 
        Autor: "", 
        ISBN: "", 
        Precio: 0, 
        Stock: 0, 
        EsFisico: true,
        CategoriaId: 1,
        Descripcion: ""
      });
      cargarLibros();
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (libro) => {
    setEditando(libro.Id);
    setEditLibro({ ...libro });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setEditLibro({});
  };

  const guardarEdicion = async (id) => {
    setLoading(true);
    try {
      await libroService.updateLibro(id, editLibro);
      setEditando(null);
      setEditLibro({});
      cargarLibros();
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const eliminarLibro = (id) => {
    setConfirmar({ mostrar: true, id });
  };

  const confirmarEliminar = async () => {
    setLoading(true);
    try {
      await libroService.deleteLibro(confirmar.id);
      setConfirmar({ mostrar: false, id: null });
      cargarLibros();
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

  const venderLibro = async (libroId, cantidad = 1) => {
    setLoading(true);
    try {
      const resultado = await libroService.venderLibro(libroId, cantidad);
      alert(`Venta exitosa!\nLibro: ${resultado.Titulo}\nTipo: ${resultado.Tipo}\nCantidad: ${resultado.Cantidad}\nTotal: $${resultado.PrecioTotal}\n\n✅ Ingreso registrado automáticamente en Finanzas`);
      cargarLibros(); // Recargar para actualizar stock
    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar la venta');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const obtenerNombreCategoria = (categoriaId) => {
    const categoria = categorias.find(c => c.Id === categoriaId);
    return categoria ? categoria.Nombre : 'Sin categoría';
  };

  return (
    <section className="libros-panel">
      <h2>Gestión de Libros</h2>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="agregar-libro">
        <input
          type="text"
          placeholder="Título"
          value={nuevoLibro.Titulo}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, Titulo: e.target.value })}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Autor"
          value={nuevoLibro.Autor}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, Autor: e.target.value })}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={nuevoLibro.ISBN}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, ISBN: e.target.value })}
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Precio"
          min="0"
          step="0.01"
          value={nuevoLibro.Precio}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, Precio: parseFloat(e.target.value) || 0 })}
          disabled={loading}
        />
        <input
          type="number"
          placeholder="Stock"
          min="0"
          value={nuevoLibro.Stock}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, Stock: parseInt(e.target.value) || 0 })}
          disabled={loading}
        />
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={nuevoLibro.EsFisico}
              onChange={(e) => setNuevoLibro({ ...nuevoLibro, EsFisico: e.target.checked })}
              disabled={loading}
            />
            Libro Físico
          </label>
        </div>
        <select
          value={nuevoLibro.CategoriaId}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, CategoriaId: parseInt(e.target.value) })}
          disabled={loading}
        >
          {categorias.map(categoria => (
            <option key={categoria.Id} value={categoria.Id}>
              {categoria.Nombre}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Descripción"
          value={nuevoLibro.Descripcion}
          onChange={(e) => setNuevoLibro({ ...nuevoLibro, Descripcion: e.target.value })}
          disabled={loading}
        />
        <button 
          className="button" 
          onClick={agregarLibro}
          disabled={loading || !nuevoLibro.Titulo.trim() || !nuevoLibro.Autor.trim()}
        >
          {loading ? 'Agregando...' : 'Agregar'}
        </button>
        <button 
          className="button secondary" 
          onClick={cargarLibros}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {loading && libros.length === 0 ? (
        <div className="loading">Cargando libros...</div>
      ) : (
        <table className="table libros-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>ISBN</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Tipo</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro) =>
              editando === libro.Id ? (
                <tr key={libro.Id}>
                  <td>{libro.Id}</td>
                  <td>
                    <input
                      type="text"
                      value={editLibro.Titulo}
                      onChange={(e) => setEditLibro({ ...editLibro, Titulo: e.target.value })}
                      disabled={loading}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editLibro.Autor}
                      onChange={(e) => setEditLibro({ ...editLibro, Autor: e.target.value })}
                      disabled={loading}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editLibro.ISBN}
                      onChange={(e) => setEditLibro({ ...editLibro, ISBN: e.target.value })}
                      disabled={loading}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={editLibro.Precio}
                      onChange={(e) => setEditLibro({ ...editLibro, Precio: parseFloat(e.target.value) || 0 })}
                      disabled={loading}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={editLibro.Stock}
                      onChange={(e) => setEditLibro({ ...editLibro, Stock: parseInt(e.target.value) || 0 })}
                      disabled={loading}
                    />
                  </td>
                  <td>
                    <select
                      value={editLibro.CategoriaId}
                      onChange={(e) => setEditLibro({ ...editLibro, CategoriaId: parseInt(e.target.value) })}
                      disabled={loading}
                    >
                      {categorias.map(categoria => (
                        <option key={categoria.Id} value={categoria.Id}>
                          {categoria.Nombre}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button 
                      className="button" 
                      onClick={() => guardarEdicion(libro.Id)}
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
                  </td>
                </tr>
              ) : (
                <tr key={libro.Id}>
                  <td>{libro.Id}</td>
                  <td>{libro.Titulo}</td>
                  <td>{libro.Autor}</td>
                  <td>{libro.ISBN}</td>
                  <td>${libro.Precio.toFixed(2)}</td>
                  <td>{libro.Stock}</td>
                  <td>
                    <span className={`tipo-badge ${libro.EsFisico ? 'fisico' : 'digital'}`}>
                      {libro.EsFisico ? 'Físico' : 'Digital'}
                    </span>
                  </td>
                  <td>{obtenerNombreCategoria(libro.CategoriaId)}</td>
                  <td>
                    <button 
                      className="button" 
                      onClick={() => iniciarEdicion(libro)}
                      disabled={loading}
                    >
                      Editar
                    </button>
                    <button 
                      className="button success" 
                      onClick={() => venderLibro(libro.Id)}
                      disabled={loading}
                    >
                      Vender
                    </button>
                    <button 
                      className="button danger" 
                      onClick={() => eliminarLibro(libro.Id)}
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {libros.length === 0 && !loading && (
        <div className="no-data">No hay libros registrados</div>
      )}

      {confirmar.mostrar && (
        <div className="modal-confirm-bg">
          <div className="modal-confirm">
            <div className="modal-confirm-title">¿Seguro que desea eliminar este libro?</div>
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

export default Libros;