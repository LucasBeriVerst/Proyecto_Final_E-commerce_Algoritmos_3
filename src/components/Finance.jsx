import React from 'react'
import './Finance.css'

const data = [
  { label: "Ingresos", value: 64000, color: "#4f8cff" },
  { label: "Costos", value: 0, color: "#ff4f4f" },
  { label: "Ganancia Neta", value: 49000, color: "#00b894" }
];

function maxValue(arr) {
  return Math.max(...arr.map(d => d.value));
}

export default function Finance() {
  const max = maxValue(data);

  return (
    <section className="card">
      <h2>📊 Finanzas</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>Ingresos</th>
            <td>$64.000,00</td>
          </tr>
          <tr>
            <th>Costos</th>
            <td>$0,00</td>
          </tr>
          <tr>
            <th>Ganancia Neta</th>
            <td>$49.000,00</td>
          </tr>
          <tr>
            <th>Valor de Inventario</th>
            <td>$5.284.000,00</td>
          </tr>
        </tbody>
      </table>
      <div style={{ margin: "32px 0 16px 0" }}>
        <h3 style={{ color: "#bfc9da", fontSize: "1.1rem", marginBottom: 12 }}>Gráfico de Finanzas</h3>
        <div style={{ width: "100%", maxWidth: 420, background: "#20283a", borderRadius: 12, padding: 24 }}>
          {data.map((d, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ color: d.color, fontWeight: 600, marginBottom: 4 }}>{d.label}</div>
              <div style={{ background: "#29304a", borderRadius: 8, height: 22, position: "relative" }}>
                <div
                  style={{
                    width: `${(d.value / max) * 100}%`,
                    background: d.color,
                    height: "100%",
                    borderRadius: 8,
                    transition: "width 0.5s"
                  }}
                ></div>
                <span
                  style={{
                    position: "absolute",
                    left: 10,
                    top: 0,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: 15
                  }}
                >
                  ${d.value.toLocaleString("es-AR")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}