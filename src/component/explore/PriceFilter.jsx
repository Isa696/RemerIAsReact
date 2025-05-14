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
        <option value="high-to-low">mayor precio</option>
        <option value="low-to-high">menor precio</option>
      </select>
    </div>
  );
}

export default PriceFilter;
