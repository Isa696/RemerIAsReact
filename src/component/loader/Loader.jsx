import { Hourglass  } from 'phosphor-react';
import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
    <Hourglass size={96} color="#c2a8d8" className="animate-spin"/>
    <p>Cargando...</p>
  </div>
  )
}

export default Loader
