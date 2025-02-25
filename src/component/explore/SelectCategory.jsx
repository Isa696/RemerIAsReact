import { useState } from "react";
import "./SelectCategory.css";

function SelectCategory({ categories, checkBoxState, handleCheckBox }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCategoryClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="select-category_container">
      <h4 onClick={handleCategoryClick}>Categorias</h4>
      <div className={isOpen ? "open" : ""}>
      {categories.map((category) => (
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
