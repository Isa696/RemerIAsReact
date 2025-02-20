import React from "react";
import "./HomeInfo.css";
import { Link } from "react-router-dom";

function HomeInfo() {
  return (
    <article className="home-info">
      <div className="info-txt">
        <h2>
        Santería “El Paraíso”
        </h2>
        <p>
        Es una tienda multireligiosa con mas de 15 años de trayectoria en la
        ciudad de General Pacheco.<br />Reconocida en la zona por el amplio surtido de productos religiosos,
esotéricos, holísticos, aromáticos, de decoración y por tener el precio mas
bajo en artículos de parafina, además de la variedad de colores, formas y
tamaños.
        </p>
      </div>
      <button className="explore-clothing_btn">
        <Link to="explore/all">Nuestros productos</Link>
      </button>
    </article>
  );
}

export default HomeInfo;
