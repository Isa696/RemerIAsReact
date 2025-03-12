import "./HomeInfo.css";
import "./HomeMain.css";
import "./HomeAdress.css";
import "./HomeServices.css";
import fists from "../../assets/images/home-fists.jpg";
import candles from "../../assets/images/home-candle.jpg";
import leaf from "../../assets/images/home-leaf.jpg";

function HomeServices() {
  return (
    <section className="home-services">

      <div className="tarot-readings info-txt container home-main">
        <h2>Lecturas de Tarot</h2>
        <div className="container-tarot">

    <div className="col-md-4">
      <img src={leaf} alt="Predictivas y Evolutivas" className="img-fluid" />
      <p>Predictivas y Evolutivas</p>
    </div>

    <div className="col-md-4">
      <p>Sesiones totalmente personalizadas.</p>
      <img src={fists} alt="Sesiones personalizadas" className="img-fluid" />
    </div>

    <div className="col-md-4">
      <img src={candles} alt="Una hora dónde podrás recibir incluso mensajes guías" className="img-fluid" />
      <p>Una hora dónde podrás recibir incluso mensajes guías</p>
    </div>
</div>
        <h3>Oráculos y Numerología</h3>
        <ul>
          <li>Abre caminos</li>
          <li>Amor</li>
          <li>Dinero</li>
          <li>Armonizaciones</li>
          <li>Limpiezas</li>
          <li>Quitabrujeria</li>
        </ul>
      </div>
    </section>
  );
}

export default HomeServices;
