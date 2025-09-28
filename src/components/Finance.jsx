import React, { useState, useEffect } from "react";
import { finanzaService } from "../services/finanzaService.js";
import "./Finance.css";

const Finance = () => {
  const [finanzas, setFinanzas] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarFinanzas();
    cargarResumen();
  }, []);

  const cargarFinanzas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await finanzaService.getAllFinanzas();
      // Filtrar solo ingresos automáticos de ventas
      const ingresosVentas = (response || []).filter(f => f.Tipo === "Ingreso" && f.Categoria === "Ventas de Libros");
      setFinanzas(ingresosVentas);
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const cargarResumen = async () => {
    try {
      const response = await finanzaService.getResumenFinanciero();
      setResumen(response);
    } catch (err) {
      console.error('Error al cargar resumen:', err);
    }
  };

  return (
    <section className="finance-panel">
      <h2>Análisis Financiero</h2>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Resumen Financiero */}
      {resumen && (
        <div className="resumen-financiero">
          <h3>Resumen del Negocio</h3>
          <div className="resumen-grid">
            <div className="resumen-card ingresos">
              <div className="resumen-content">
                <h4>Ingresos Totales</h4>
                <p className="resumen-monto">${resumen.Ingresos?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
            <div className="resumen-card gastos">
              <div className="resumen-content">
                <h4>Gastos Totales</h4>
                <p className="resumen-monto">${resumen.Gastos?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
            <div className="resumen-card balance">
              <div className="resumen-content">
                <h4>Balance</h4>
                <p className={`resumen-monto ${(resumen.Balance || 0) >= 0 ? 'positivo' : 'negativo'}`}>
                  ${resumen.Balance?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
            <div className="resumen-card transacciones">
              <div className="resumen-content">
                <h4>Total Ventas</h4>
                <p className="resumen-monto">{resumen.TotalTransacciones || 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón de actualización */}
      <div className="finance-actions">
        <button 
          className="button" 
          onClick={() => {
            cargarFinanzas();
            cargarResumen();
          }}
          disabled={loading}
        >
          {loading ? 'Actualizando...' : 'Actualizar Datos'}
        </button>
      </div>

      {/* Lista de Ingresos por Ventas */}
      <div className="finanzas-section">
        <h3>Ingresos por Ventas de Libros</h3>
        
        {loading && finanzas.length === 0 ? (
          <div className="loading">Cargando ingresos...</div>
        ) : (
          <div className="finanzas-list">
            {finanzas.length === 0 ? (
              <div className="no-data">
                <p>No hay ventas registradas aún</p>
                <p>Las ventas aparecerán automáticamente cuando vendas libros</p>
              </div>
            ) : (
              finanzas.map((finanza) => (
                <div key={finanza.Id} className="finanza-card ingreso">
                  <div className="finanza-header">
                    <div className="finanza-concepto">
                      <h4>{finanza.Concepto}</h4>
                      <span className="finanza-categoria">{finanza.Categoria}</span>
                    </div>
                    <div className="finanza-monto">
                      <span className="monto-simbolo">+</span>
                      <span className="monto-valor">${finanza.Monto.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="finanza-body">
                    <p className="finanza-descripcion">{finanza.Descripcion}</p>
                    <div className="finanza-meta">
                      <span className="finanza-fecha">
                        {new Date(finanza.Fecha).toLocaleDateString()}
                      </span>
                      <span className="finanza-id">ID: {finanza.Id}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Finance;