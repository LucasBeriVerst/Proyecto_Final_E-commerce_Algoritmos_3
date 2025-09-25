import "./AdminInicio.css";
import { useState } from "react";

const resumen = [
  {
    title: "Ingresos",
    value: "$ 64.000,00",
    desc: "—",
    icon: "💰"
  },
  {
    title: "Costos",
    value: "$ 0,00",
    desc: "Costo de bienes vendidos",
    icon: "📦"
  },
  {
    title: "Ganancia Neta",
    value: "$ 49.000,00",
    desc: "Ingresos – COGS – Gastos",
    icon: "📈"
  },
  {
    title: "Valor de Inventario",
    value: "$ 5.284.000,00",
    desc: "1 con stock bajo",
    icon: "🏷️"
  }
];

const accionesRapidas = [
  { label: "Agregar libro", icon: "➕", seccion: "libros" },
  { label: "Ver finanzas", icon: "💹", seccion: "finanzas" },
  { label: "Nueva categoría", icon: "📂", seccion: "categorias" }
];

const estadisticas = [
  { label: "Libros físicos", value: 18 },
  { label: "Libros virtuales", value: 9 },
  { label: "Categorías", value: 4 },
  { label: "Usuarios", value: 2 }
];

const alertas = [
  { tipo: "stock", mensaje: "1 libro con stock bajo" },
  { tipo: "ventas", mensaje: "Sin ventas hoy" }
];

const ayuda = [
  { label: "¿Cómo agregar un libro?", url: "#" },
  { label: "¿Cómo ver reportes?", url: "#" },
  { label: "Soporte técnico", url: "#" }
];

const AdminInicio = ({ setSeccion }) => {
  const [usuario] = useState("Administrador");

  return (
    <section>
      <h1>Panel de Administración</h1>
      <div style={{ marginBottom: 24, color: "#bfc9db", fontSize: "1.15rem" }}>
        ¡Bienvenido, <b>{usuario}</b>! Gestiona tu librería de forma simple y rápida.
      </div>
      <div className="inicio-summary">
        {resumen.map((r, i) => (
          <div className="summary-card" key={i}>
            <span className="summary-title">{r.icon} {r.title}</span>
            <span className="summary-value">{r.value}</span>
            <span className="summary-desc">{r.desc}</span>
          </div>
        ))}
      </div>
      <div className="inicio-extra">
        <div className="extra-col">
          <h3>Acciones rápidas</h3>
          <div className="acciones-rapidas">
            {accionesRapidas.map((a, i) => (
              <button
                key={i}
                className="btn-accion"
                onClick={() => setSeccion && setSeccion(a.seccion)}
              >
                <span>{a.icon}</span> {a.label}
              </button>
            ))}
          </div>
        </div>
        <div className="extra-col">
          <h3>Estadísticas</h3>
          <ul className="estadisticas-lista">
            {estadisticas.map((e, i) => (
              <li key={i}>
                <span className="stat-label">{e.label}</span>
                <span className="stat-value">{e.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="extra-col">
          <h3>Alertas</h3>
          <ul className="alertas-lista">
            {alertas.map((a, i) => (
              <li key={i} className={`alerta alerta-${a.tipo}`}>
                {a.mensaje}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AdminInicio;