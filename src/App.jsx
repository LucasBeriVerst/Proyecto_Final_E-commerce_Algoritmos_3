import { useState } from "react";
import Login from "./components/Login/Login.jsx";
import Header from "./components/Header/Header.jsx";
import AdminInicio from "./components/AdminInicio/AdminInicio.jsx";
import Libros from "./components/Libros/Libros.jsx";
import Categorias from "./components/Categorias/Categorias.jsx";
import Finance from "./components/Finance/Finance.jsx";

function App() {
  const [logueado, setLogueado] = useState(false);
  const [seccion, setSeccion] = useState("inicio");

  const seccionesMap = {
    inicio: <AdminInicio setSeccion={setSeccion} />,
    libros: <Libros />,
    categorias: <Categorias />,
    finance: <Finance />,
  };

  if (!logueado) {
    return <Login onLogin={() => setLogueado(true)} />;
  }

  return (
    <div className="admin-panel">
      <Header setSeccion={setSeccion} seccion={seccion} />
      <main className="main-content">
        {seccionesMap[seccion] || <AdminInicio setSeccion={setSeccion} />}
      </main>
    </div>
  );
}

export default App;