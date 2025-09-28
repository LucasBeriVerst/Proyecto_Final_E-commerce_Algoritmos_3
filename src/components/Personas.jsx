import React, { useState, useEffect } from "react";
import { personaService } from "../services/personaService.js";
import "./Personas.css";

const Personas = () => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nuevaPersona, setNuevaPersona] = useState({ Nombre: "", Email: "", Telefono: "" });
  const [editando, setEditando] = useState(null);
  const [editPersona, setEditPersona] = useState({});
  const [confirmar, setConfirmar] = useState({ mostrar: false, id: null });

  // Cargar personas al montar el componente
  useEffect(() => {
    cargarPersonas();
  }, []);

  const cargarPersonas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await personaService.getAllPersonas();
      if (response.success) {
        setPersonas(response.data || []);
      } else {
        setError(response.message || 'Error al cargar personas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const agregarPersona = async () => {
    if (!nuevaPersona.Nombre.trim()) return;
    
    setLoading(true);
    try {
      await personaService.createPersona(nuevaPersona);
      setNuevaPersona({ Nombre: "", Email: "", Telefono: "" });
      cargarPersonas(); // Recargar la lista
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (persona) => {
    setEditando(persona.Id);
    setEditPersona({ ...persona });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setEditPersona({});
  };

  const guardarEdicion = async () => {
    setLoading(true);
    try {
      await personaService.updatePersona({
        Id: editPersona.Id,
        Nombre: editPersona.Nombre,
        Email: editPersona.Email,
        Telefono: editPersona.Telefono
      });
      setEditando(null);
      setEditPersona({});
      cargarPersonas(); // Recargar la lista
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const eliminarPersona = (id) => {
    setConfirmar({ mostrar: true, id });
  };

  const confirmarEliminar = async () => {
    setLoading(true);
    try {
      await personaService.deletePersona(confirmar.id);
      setConfirmar({ mostrar: false, id: null });
      cargarPersonas(); // Recargar la lista
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
    <section className="personas-panel">
      <h2>Gestión de Personas</h2>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="agregar-persona">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevaPersona.Nombre}
          onChange={(e) => setNuevaPersona({ ...nuevaPersona, Nombre: e.target.value })}
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          value={nuevaPersona.Email}
          onChange={(e) => setNuevaPersona({ ...nuevaPersona, Email: e.target.value })}
          disabled={loading}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={nuevaPersona.Telefono}
          onChange={(e) => setNuevaPersona({ ...nuevaPersona, Telefono: e.target.value })}
          disabled={loading}
        />
        <button 
          className="button" 
          onClick={agregarPersona}
          disabled={loading || !nuevaPersona.Nombre.trim()}
        >
          {loading ? 'Agregando...' : 'Agregar'}
        </button>
        <button 
          className="button secondary" 
          onClick={cargarPersonas}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {loading && personas.length === 0 ? (
        <div className="loading">Cargando personas...</div>
      ) : (
        <table className="table personas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personas.map((persona) =>
              editando === persona.Id ? (
                <tr key={persona.Id}>
                  <td>{persona.Id}</td>
                  <td>
                    <input
                      type="text"
                      value={editPersona.Nombre}
                      onChange={(e) => setEditPersona({ ...editPersona, Nombre: e.target.value })}
                      disabled={loading}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editPersona.Email}
                      onChange={(e) => setEditPersona({ ...editPersona, Email: e.target.value })}
                      disabled={loading}
                    />
                  </td>
                  <td>
                    <input
                      type="tel"
                      value={editPersona.Telefono}
                      onChange={(e) => setEditPersona({ ...editPersona, Telefono: e.target.value })}
                      disabled={loading}
                    />
                  </td>
                  <td>
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
                  </td>
                </tr>
              ) : (
                <tr key={persona.Id}>
                  <td>{persona.Id}</td>
                  <td>{persona.Nombre}</td>
                  <td>{persona.Email}</td>
                  <td>{persona.Telefono}</td>
                  <td>
                    <button 
                      className="button" 
                      onClick={() => iniciarEdicion(persona)}
                      disabled={loading}
                    >
                      Editar
                    </button>
                    <button 
                      className="button danger" 
                      onClick={() => eliminarPersona(persona.Id)}
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

      {personas.length === 0 && !loading && (
        <div className="no-data">No hay personas registradas</div>
      )}

      {confirmar.mostrar && (
        <div className="modal-confirm-bg">
          <div className="modal-confirm">
            <div className="modal-confirm-title">¿Seguro que desea eliminar esta persona?</div>
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

export default Personas;
