import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../store/User";
import "./Login.css";
import toast from "react-hot-toast";

function LoginForm() {
  const navigate = useNavigate();
  const { login, error: loginError, loading: loginLoading } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Validaciones
    let valid = true;

    if (!email) {
      setEmailError("El correo electrónico es obligatorio.");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("El formato del correo electrónico es inválido.");
      valid = false;
    }

    if (!password) {
      setPasswordError("La contraseña es obligatoria.");
      valid = false;
    }

    if (valid) {
      try {
        await login(email, password);
        navigate("/explore/all");
        toast.success("Inicio de sesión exitoso");
      } catch (error) {
        console.error("Error en login:", error);
        toast.error("Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 style={{ color: "black" }}>Iniciar Sesión</h2>

        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <p className="error-message">{emailError}</p>

        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="error-message">{passwordError}</p>

        <button type="submit" className="login-btn" disabled={loginLoading || !email || !password}>
          {loginLoading ? "Cargando..." : "Ingresar"}
        </button>

        <p className="error-message">
          {loginError ? "Error al iniciar sesión ❌" : ""}
        </p>
        <Link to="/register" className="register-link">
          ¿No tienes cuenta? Regístrate aquí
        </Link>
        <Link to="/reset-password" className="register-link">Olvidaste tu contraseña? Recuperar Contraseña</Link>
      </form>
    </div>
  );
}

export default LoginForm;
