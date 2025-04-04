import { Link } from "react-router-dom";
import "./Success.css";
import { useEffect } from "react";
import { useProcessOrder } from "../hooks/useProcessOrder";


function Success() {
  const { processPendingOrder } = useProcessOrder();


  useEffect(() => {
    processPendingOrder();
  }, []);


  return (
    <div className="home-info home-main container success-container">
      <h2>Gracias por tu compra ✨</h2>
      <h3>Su pago fue exitoso!!! 🎉</h3>

      <p className="success-p">
        Estamos enviando el ticket al vendedor. 📨 Podras revisar tu compra en la
        pestaña Historial
      </p>
      <h3>
        <Link to="/">Volver al Inicio</Link>
      </h3>
    </div>
  );
}

export default Success;
