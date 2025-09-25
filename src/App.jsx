import { useState } from "react";
import Header from "./components/Header";
import AdminInicio from "./components/AdminInicio";
import Categorias from "./components/Categorias";
import Libros from "./components/Libros";
import Finance from "./components/Finance";

function App() {
  const [seccion, setSeccion] = useState("inicio");

  return (
    <div style={{ display: "flex" }}>
      <Header setSeccion={setSeccion} seccion={seccion} />
      <main style={{ marginLeft: 270, padding: 32, width: "100%" }}>
        {seccion === "inicio" && <AdminInicio setSeccion={setSeccion} />}
        {seccion === "categorias" && <Categorias />}
        {seccion === "libros" && <Libros />}
        {seccion === "finanzas" && <Finance />}
      </main>
    </div>
  );
}

export default App;