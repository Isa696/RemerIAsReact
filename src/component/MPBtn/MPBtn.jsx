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
    if (await checkAdBlocker()) { /* … */ }
  
    await loadMercadoPago();
    const mp = new window.MercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY, { locale: "es-AR" });
  
    // Crear preferencia en tu backend
    const res = await fetch("/api/createPreference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: numericTotalPrice }),
    });
    const data = await res.json();
  
    if (!res.ok) {
      toast.error("Error al generar la preferencia de pago");
      setIsLoading(false);
      return;
    }
  
    // **Usa data.id, no data.preference_id**
    mp.checkout({
      preference: { id: data.id },
      render: {
        container: ".cho-container",
        label: "Continuar en Mercado Pago",
      },
      autoOpen: true,
    });
  
    setMpButtonRendered(true);
    setIsLoading(false);
  };

  return (
    <div className="mp-container">
      <button
        className="mp-button"
        onClick={handlePayment}
        disabled={isLoading || mpButtonRendered}
      >
        {isLoading
          ? "Procesando..."
          : mpButtonRendered
            ? null
            : "Pagar con Mercado Pago"}
      </button>

      {/* Contenedor siempre presente para que MercadoPago lo inyecte */}
      <div className="cho-container"></div>
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
