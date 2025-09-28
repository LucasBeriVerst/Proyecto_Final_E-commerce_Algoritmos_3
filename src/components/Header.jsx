import "./Header.css";

const Header = ({ setSeccion, seccion }) => (
  <aside className="admin-header">
    <div className="admin-title">
      <span className="status-dot"></span>
      <span>Admin Librería</span>
    </div>
    <nav className="admin-nav">
      <button className={`btn-admin${seccion === "inicio" ? " active" : ""}`} onClick={() => setSeccion("inicio")}>Inicio</button>
      <button className={`btn-admin${seccion === "personas" ? " active" : ""}`} onClick={() => setSeccion("personas")}>Personas</button>
      <button className={`btn-admin${seccion === "libros" ? " active" : ""}`} onClick={() => setSeccion("libros")}>Libros</button>
      <button className={`btn-admin${seccion === "categorias" ? " active" : ""}`} onClick={() => setSeccion("categorias")}>Categorías</button>
      <button className={`btn-admin${seccion === "finanzas" ? " active" : ""}`} onClick={() => setSeccion("finanzas")}>Finanzas</button>
    </nav>
    <div className="admin-footer">
      <span className="footer-flag">AR</span>
      <span>
        Conectado al <b>Backend API</b>.<br />
        React + .NET Core
      </span>
    </div>
  </aside>
);

export default Header;