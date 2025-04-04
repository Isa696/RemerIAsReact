import React from "react";
import "./PriceFilter.css";

function PriceFilter({ priceFilter, handlePriceFilter }) {
  return (
    <div className="price-filter_wrapper">
      <label htmlFor="price-filter">Ordenar por:</label>
      <select id="price-filter" value={priceFilter} onChange={handlePriceFilter}>
        <option value="default" disabled hidden>
          Elige una opción
        </option>
        <option value="high-to-low">Remeras</option>
        <option value="low-to-high">Tazas</option>
      </select>
    </div>
  );
}

export default PriceFilter;
