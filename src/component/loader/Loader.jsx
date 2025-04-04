import { Hourglass  } from 'phosphor-react';
import "./Loader.css";

function Loader({sizeLoader, colorLoader}) {

  return (
    <div className="loader-container">
    <Hourglass size={sizeLoader || 96} color={colorLoader || "#a4a9ad"} className="animate-spin"/>
    <p>Cargando...</p>
  </div>
  )
}

export default Loader
