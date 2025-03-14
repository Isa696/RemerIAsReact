import { Link } from 'react-router-dom'
import "./Success.css"

function Failure() {
  return (
    <div className='home-info success-container home-main container'>
        <h2>Error al procesar tu pago</h2>
      <h3>Lo sentimos. </h3>

      <p className="success-p">
      Tu pago no pudo ser procesado
      Por favor, intenta de nuevo.
      </p>

      <h3>
      <Link to="/">Volver al Inicio</Link>
      </h3>

    </div>
  )
}

export default Failure
