import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import toast from "react-hot-toast";
import { useState } from "react";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const resetPassword = async (email) => {
        try {
          await sendPasswordResetEmail(auth, email)
          {
            console.log("Email de recuperación enviado" + status);
            toast.success("Email de recuperación enviado. Revisa tu bandeja de entrada.");
            return {success: true};
          }
        } catch (error) {
          console.error("Error enviando email de recuperación:", error);
          setError(error.message);
          toast.error("Error enviando email de recuperación:");
          return { success: false,
            error: error.message };
          } finally {
            setEmail("");
          }
        };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword(email);
    if (res.success) {
      setStatus("Email enviado. Revisa tu bandeja.");
    } else {
      setStatus("Error: " + res.error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}  className="login-form">
      <h2 style={{ color: "black" }}>¿Olvidaste tu contraseña?</h2>
      <div className="form-group">
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
          </div>
        <button type="submit" className="login-btn">Enviar email de recuperación</button>
      {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
