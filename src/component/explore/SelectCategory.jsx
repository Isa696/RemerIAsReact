import { useState } from "react";
import "./SelectCategory.css";
import { Eraser } from "phosphor-react";

function SelectCategory({ categories, checkBoxState, setCheckBoxState, handleCheckBox, products }) {
  const [isOpen, setIsOpen] = useState(false);

  // Determinar qué categorías tienen productos activos
  const activeCategories = new Set(
    products.flatMap(product => (Array.isArray(product.category) ? product.category : [product.category]))
  );

  function handleCategoryClick() {
    setIsOpen(!isOpen);
  }

  const clearFilters = () => {
    setCheckBoxState({});
  };

  return (
    <div className="select-category_container">
      <h4 onClick={handleCategoryClick}>Categorías</h4>
      <div className={isOpen ? "open" : ""}>
        {categories.map((category) => (
          <span key={category} className="category-option">
            <input
              type="checkbox"
              id={`category-${category.toLowerCase()}`}
              name={category.toLowerCase()}
              checked={checkBoxState[category.toLowerCase()] || false}
              onChange={handleCheckBox}
              disabled={!activeCategories.has(category)}
            />
            <label htmlFor={`category-${category.toLowerCase()}`}>
              {category}
            </label>
          </span>
        ))}
        <hr />
              {/* Botón de limpiar filtros */}
              <button className="clear-filters-btn" onClick={clearFilters}>
  <Eraser size={18} weight="light" />
  Limpiar Filtros
</button>
      </div>
    </div>
  );
}

export default SelectCategory;
