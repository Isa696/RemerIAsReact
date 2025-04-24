import { useState } from "react";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import toast from "react-hot-toast";
import "./MPBtn.css";

const MPBtn = ({ totalPrice }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [mpButtonRendered, setMpButtonRendered] = useState(false);
  const numericTotalPrice = Number(totalPrice);

  // Validar que numericTotalPrice sea un número positivo
  if (isNaN(numericTotalPrice) || numericTotalPrice <= 0) {
    console.error("Invalid totalPrice:", totalPrice);
    toast.error("El precio total es inválido. Por favor, verifica el monto.");
    return null;
  }

  const checkAdBlocker = async () => {
    try {
      const response = await fetch("https://api.mercadolibre.com/tracks", {
        method: "GET",
      });

      // Even if we get a 403, as long as the request completed, MercadoPago can work
      if (response.status === 403) {
        setIsBlocked(false);
        return false;
      }

      setIsBlocked(false);
      return false;
    } catch (error) {
      // This is the actual ad blocker case - request was blocked entirely
      setIsBlocked(true);
      return true;
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
  
    const blocked = await checkAdBlocker();
    if (blocked) {
      toast.error(
        "Por favor desactiva el bloqueador de anuncios para continuar con el pago",
        { duration: 5000 }
      );
      setIsLoading(false);
      return;
    }
  
    try {
      await loadMercadoPago();
    } catch (initError) {
      toast.error("Error al inicializar Mercado Pago");
      console.warn("MP init error:", initError);
      setIsLoading(false);
      return;
    }
  
    const mp = new window.MercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, {
      locale: "es-AR",
    });
  
    try {
      // 👉 Llamada a la Serverless Function que crea la preferencia
      const response = await fetch("/api/createPreference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: numericTotalPrice }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Error creando preferencia:", data);
        toast.error("Error al generar la preferencia de pago");
        return;
      }
  
      // 👇 Ahora tenemos el preferenceId del backend
      const preferenceId = data.preference_id;
  
      mp.checkout({
        preference: {
          id: preferenceId,
        },
        render: {
          container: ".cho-container",
          label: "Continuar en Mercado Pago",
        },
        autoOpen: true,
      });
  
      setMpButtonRendered(true);
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      toast.error("Error al procesar el pago");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="mp-container">
      {!mpButtonRendered ? (
        <button
          className="mp-button"
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? "Procesando..." : "Pagar con Mercado Pago"}
        </button>
      ) : (
        <span className="cho-container"></span>
      )}
      {isBlocked && (
        <div className="mp-warning">
          <p>⚠️ Detectamos un bloqueador de anuncios activo</p>
          <small>
            Para proceder con el pago, por favor:
            <ol>
              <li>Desactiva tu bloqueador de anuncios</li>
              <li>Recarga la página</li>
              <li>Intenta el pago nuevamente</li>
            </ol>
          </small>
        </div>
      )}
    </div>
  );
};

export default MPBtn;
