import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      onLogin({ rol: "admin", nombre: "Administrador" });
    } else if (username === "usuario" && password === "1234") {
      onLogin({ rol: "user", nombre: "Usuario" });
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar sesión</h2>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="button" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;