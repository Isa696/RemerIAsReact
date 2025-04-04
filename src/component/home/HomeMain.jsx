import "./HomeMain.css";
import HomeAdress from "./HomeAdress";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { Lock, PaintBrush, Palette, Tree  , TShirt, Truck } from "phosphor-react";

const Hero = () => (
  <section className="hero-section">
    <div className="container text-center">
      <h1 className="title">Remeras y Tazas <br /> diseñadas con Inteligencia Artificial</h1>
      <p className="subtitle">Arte + Tecnología en cada prenda</p>
      <button className="cta-button">
        <Link to="explore/all">Ver Colección</Link>
      </button>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="how-it-works-section">
  <div className="container text-center">
    <h2 className="section-title">Ahora También Tazas: Más Creatividad, Más Estilo</h2>
    <div className="grid">
      <div className="card">
        <PaintBrush size={32} weight="bold"/>
        <h3>
          Diseño con IA</h3>
        <p>Creaciones únicas generadas por algoritmos de inteligencia artificial.</p>
      </div>
      <div className="card">
        <TShirt size={32} weight="bold" />
        <h3>Personalización</h3>
        <p>Elige tu talle y color entre blanco, negro y gris.</p>
      </div>
      <div className="card">
        <Truck size={32} weight="bold" />
        <h3>Compra Fácil</h3>
        <p>Envío rápido desde Villa Adelina a todo el país.</p>
      </div>
    </div>
  </div>
</section>
);

const Collection = () => (
  <section className="collection-section">
    <div className="container text-center">
      <h2 className="section-title">Explora la Colección</h2>
      <div className="grid">
        {["Diseño 1", "Diseño 2", "Diseño 3"].map((design, index) => (
          <div key={index} className="card">
            <div className="image-placeholder"></div>
            <h3>{design}</h3>
            <button className="cta-button">
              <Link to="explore/all">Comprar Ahora</Link></button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ValueAdded = () => (
  <section className="value-added-section">
    <div className="container text-center">
      <h2 className="section-title">Dale un Toque Único a Tu Estilo</h2>
      <div className="grid">
        <div className="card">
          <Lock size={32} weight="bold" />
          <h3>Exclusividad</h3>
          <p>Cada diseño es único, creado por IA.</p>
        </div>
        <div className="card">
        <Tree size={32} weight="bold" />
          <h3>Sostenibilidad</h3>
          <p>Remeras de algodón premium con producción responsable.</p>
        </div>
        <div className="card">
        <Palette size={32} weight="bold" />
          <h3>Ediciones Limitadas</h3>
          <p>Stock reducido por cada diseño.</p>
        </div>
      </div>
    </div>
  </section>
);

function HomeMain() {
  return (
    <>
    <main>

    <div>
      <Hero />
      <HowItWorks />
      <Collection />
      <ValueAdded />
    </div>
  
      <HomeAdress />
    </main>
    <Footer />
    </>
  );
}

export default HomeMain;
