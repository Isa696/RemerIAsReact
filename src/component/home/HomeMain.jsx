import "./HomeMain.css";
import HomeAdress from "./HomeAdress";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { Lock, PaintBrush, Palette, Tree, TShirt, Truck } from "phosphor-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import bannerImg1 from "../../assets/images/banner-1.png";
import bannerImg2 from "../../assets/images/banner-2.png";
import bannerImg3 from "../../assets/images/banner-3.png";
import hand from "../../assets/images/hand.png";

const Hero = () => (
  <section className="hero-section">
    {/* Swiper de fondo */}
    <Swiper
      modules={[Autoplay]}
      className="hero-swiper"
      autoplay={{ delay: 2000 }}
      loop
    >
      <SwiperSlide>
        <img src={bannerImg1} alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={bannerImg2} alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={bannerImg3} alt="Slide 3" />
      </SwiperSlide>
    </Swiper>
    {/* Texto encima */}
    <div className="containerBanner text-center">
      <h1 className="title">
        Remeras<br /> diseñadas con Inteligencia Artificial
      </h1>
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
      {/* <h2 className="section-title">Ahora También Tazas: Más Creatividad, Más Estilo</h2> */}
      <h2 className="section-title">Solicita tu diseño personalizado</h2>
      <div className="how-it-works-content">
        <p className="subtitle">
          ¡Es fácil y rápido!
          <br />
          Comunicate con nosotros y podras crear tu remera personalizada con tu
          propio diseño
        </p>
        <img src={hand} alt="Diseños con Inteligencia Artificial" />
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
          <PaintBrush size={32} weight="bold" />
          <h3>Diseño con IA</h3>
          <p>
            Creaciones únicas generadas por algoritmos de inteligencia
            artificial.
          </p>
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
        {/* </div>
      <div className="grid"> */}
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
          <ValueAdded />
        </div>

        <HomeAdress />
      </main>
      <Footer />
    </>
  );
}

export default HomeMain;
