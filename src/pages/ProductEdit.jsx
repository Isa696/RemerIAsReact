import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductEdit.css";
import toast from "react-hot-toast";
import { X } from "phosphor-react";
import { useProducts } from "../hooks/useProducts";
import fetchCategories from "../utils/fetchCategories";

function ProductEdit() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const { createProduct, addCategory } = useProducts();
  const [productData, setProductData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    loadCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "new") {
      setShowNewCategory(true);
    } else {
      setShowNewCategory(false);
      setProductData((prev) => ({
        ...prev,
        category: value,
      }));
    }
  };

  const handleNewCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Por favor ingresa una categoría válida");
      return;
    }

    const success = await addCategory(newCategory);
    if (success) {
      setCategories(prev => [...prev, newCategory]);
      setProductData(prev => ({
        ...prev,
        category: newCategory
      }));
      setShowNewCategory(false);
      setNewCategory("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !productData.title ||
      !productData.price ||
      !productData.stock ||
      !productData.category ||
      !productData.description ||
      !productData.image
    ) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    try {
      const created = await createProduct({
        ...productData,
        price: Number(productData.price),
        stock: Number(productData.stock),
      });

      if (created) {
        navigate("/explore/all");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al crear el producto");
    }
  };

  return (
    <div className="product-edit">
      <button className="close-btn" onClick={() => navigate("/explore/all")}>
        <X size={24} />
      </button>

      <form onSubmit={handleSubmit} className="product-edit-form">
        <div className="form-group">
          <label>Imagen del Producto (URL)</label>
          <input
            type="url"
            name="image"
            value={productData.image}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {productData.image && (
            <img
              src={productData.image}
              alt="Preview"
              className="image-preview"
            />
          )}
        </div>

        <div className="form-group">
          <label>Título*</label>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleChange}
            required
            placeholder="Nombre del producto"
          />
        </div>

        <div className="form-group category-container">
          <label>Categoría*</label>
          <div className="categories-grid">
          {categories.map((category) => (
  <div
    key={category}
    className={`category-card ${
      productData.category === category ? "selected" : ""
    }`}
    onClick={() => {
      setProductData((prev) => ({
        ...prev,
        category: prev.category === category ? "" : category,
      }));
      setShowNewCategory(false); // Desactivar nueva categoría al seleccionar una existente
    }}
  >
    {category}
  </div>
))}
<div
  className={`category-card add-new ${
    showNewCategory ? "selected" : ""
  }`}
  onClick={() => {
    setShowNewCategory(!showNewCategory);
    if (!showNewCategory) {
      setProductData((prev) => ({
        ...prev,
        category: "",
      }));
    }
  }}
>
  + Nueva categoría
</div>
          </div>

          {showNewCategory && (
            <div className="new-category-input">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nueva categoría"
              />
              <button
                type="button"
                className="add-category-btn"
                onClick={handleNewCategory}
              >
                Agregar
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Descripción detallada del producto"
            rows={4}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Precio*</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              maxLength={12}
            />
          </div>

          <div className="form-group">
            <label>Stock*</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
              maxLength={6}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Crear Producto
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;
