import { useState } from "react";
import Login from "./components/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import AdminInicio from "./components/AdminInicio/AdminInicio.jsx";
import Libros from "./components/Libros/Libros.jsx";
import Categorias from "./components/Categorias/Categorias.jsx";
import Finance from "./components/Finance/Finance.jsx";
import MenuInicio from "./components/MenuInicio/MenuInicio.jsx";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [seccion, setSeccion] = useState("inicio");

  // Secciones que ve el ADMIN
  const seccionesAdmin = {
    inicio: <AdminInicio setSeccion={setSeccion} />,
    libros: <Libros />,
    categorias: <Categorias />,
    finance: <Finance />,
  };

  // Secciones que ve el USUARIO (solo el catálogo)
  const seccionesUser = {
    inicio: <MenuInicio />,
  };

  if (!usuario) {
    return <Login onLogin={(user) => setUsuario(user)} />;
  }

  const seccionesMap = usuario.rol === "admin" ? seccionesAdmin : seccionesUser;

  return (
    <div className="admin-panel">
      {/* el Header solo se muestra al admin */}
      {usuario.rol === "admin" && (
        <Header setSeccion={setSeccion} seccion={seccion} />
      )}

      <main className="main-content">
        {seccionesMap[seccion] || seccionesMap["inicio"]}
      </main>
    </div>
  );
}

export default App;