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
    // Check for ad blocker first
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
        toast.error(
          "Por favor desactiva el bloqueador de anuncios para continuar"
        );
        console.warn("MercadoPago initialization error:", initError);
        return;
      }

      const mp = new window.MercadoPago(
        import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY,
        {
          locale: "es-AR",
        }
      );

      // Create preference
      const accessToken = import.meta.env.VITE_MERCADO_PAGO_ACCESS_TOKEN;
      const response = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            items: [
              {
                title: "Compra Web Remerias",
                quantity: 1,
                unit_price: numericTotalPrice,
                currency_id: "ARS",
              },
            ],
            back_urls: {
              success: window.location.origin + "/success",
              failure: window.location.origin + "/failure",
              pending: window.location.origin + "/pending",
            },
            auto_return: "approved",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating preference:", errorData);
        throw new Error("Error creating preference");
      }

      const { id: preferenceId } = await response.json();

      try {
        // Initialize checkout with error handling
        try {
          mp.checkout({
            preference: {
              id: preferenceId,
            },
            render: {
              container: ".cho-container",
              label: "Continuar en Mercado Pago",
            },
            autoOpen: true, // Abre el checkout automáticamente
          });
    
          setMpButtonRendered(true);

        } catch (checkoutError) {
          setMpButtonRendered(false);
          toast.error("Error al procesar el pago. Por favor intenta de nuevo");
          console.warn("Checkout initialization error:", checkoutError);
        }

    } catch (error) {
      setMpButtonRendered(false);
      toast.error("Error al procesar el pago");
      console.error("Payment error:", error);
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
