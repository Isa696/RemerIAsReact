import { useState } from "react";
import "./SelectCategory.css";

function SelectCategory({ categories, checkBoxState, handleCheckBox, products }) {
  const [isOpen, setIsOpen] = useState(false);

  const activeCategories = categories.filter(category =>
    products.some(product =>
      product.category === category && !product.deleted
    )
  );

  function handleCategoryClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="select-category_container">
      <h4 onClick={handleCategoryClick}>Categorias</h4>
      <div className={isOpen ? "open" : ""}>
      {activeCategories.map((category) => (
          <span key={category} className="category-option">
            <input
              type="checkbox"
              id={`category-${category.toLowerCase()}`}
              name={category.toLowerCase()}
              checked={checkBoxState[category.toLowerCase()] || false}
              onChange={handleCheckBox}
            />
            <label htmlFor={`category-${category.toLowerCase()}`}>
              {category}
            </label>
          </span>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
