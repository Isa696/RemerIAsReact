import { Link } from "react-router-dom"
import "./Success.css"
import { useEffect } from "react";
import { useProcessOrder } from "../hooks/useProcessOrder";

function Pending() {
const { processPendingOrder } = useProcessOrder();

useEffect(() => {
processPendingOrder();
}, []);


  return (
    <div className='home-info success-container home-main container'>
        <h2>Pago pendiente ⏳</h2>
      <h3>Su pago está siendo procesado. 🤔</h3>
      <p className="success-p">
        Por favor, espere.
        Podrás revisar tu compra en la pestaña Historial
        Ya enviamos el ticket al vendedor. 📨
        </p>
        <h3>
              <Link to="/">Volver al Inicio</Link>
        </h3>

    </div>
  )
}

export default Pending
