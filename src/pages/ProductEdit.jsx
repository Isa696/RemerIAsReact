import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductEdit.css";
import toast from "react-hot-toast";
import { X } from "phosphor-react";
import { useProducts } from "../hooks/useProducts";
import fetchCategories from "../utils/fetchCategories";
import ImageInputList from "../component/ImageInputList";
import { useRouteProtection } from "../hooks/useRouteProtection";

function ProductEdit({ product }) {
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const { createProduct, addCategory, updateProduct } = useProducts();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: product?.title || "",
    category: Array.isArray(product?.category) ? product?.category : [product?.category || ""],
    description: product?.description || "",
    image: Array.isArray(product?.image) ? product?.image : [product?.image || ""],
    price: product?.price || "",
    color: product?.color ? [product.color] : [],
  });
    const {checkAdminAccess } = useRouteProtection();
  
    useEffect(() => {
      const authorized = checkAdminAccess();
      if (!authorized) {
        return;
      }
    }, []);

  useEffect(() => {
    if (product) {
      setProductData({
        title: product.title || "",
        category: product.category || "",
        description: product.description || "",
        image: product.image || "",
        price: product.price || "",
        color: product.color || "",
      });
    }
  }, [product]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    loadCategories();
  }, []);

  const handleNewCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Por favor ingresa una categoría válida");
      return;
    }

    const success = await addCategory(newCategory);
    if (success) {
      setCategories((prev) => [...prev, newCategory]);
      setProductData((prev) => ({
        ...prev,
        category: [...prev.category, newCategory],
      }));
      setShowNewCategory(false);
      setNewCategory("");
    }
  };

  const handleCategoryChange = (category) => {
    setProductData((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
    setShowNewCategory(false);
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
      productData.category.length === 0 ||
      !productData.description ||
      !productData.image
    ) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    try {
      const formattedData = {
        ...productData,
        price: Number(productData.price),
      };

      let success;
      if (product) {
        // Modo edición
        success = await updateProduct(product.id, formattedData);
      } else {
        // Modo creación
        success = await createProduct(formattedData);
      }

      if (success) {
        toast.success(product ? "Producto actualizado" : "Producto creado");
        navigate("/explore/all");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(product ? "Error al actualizar" : "Error al crear");
    }
  };

  const handleImageChange = (index, value) => {
    setProductData(prev => {
      const newImages = [...prev.image];
      newImages[index] = value;
      return {
        ...prev,
        image: newImages
      };
    });
  };

  const addNewImage = () => {
    setProductData(prev => ({
      ...prev,
      image: [...prev.image, ""]
    }));
  };
  
  const removeImage = (index) => {
    setProductData(prev => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index)
    }));
  };

  const handleColorChange = (color) => {
    setProductData((prev) => ({
      ...prev,
      color: prev.color.includes(color)
        ? prev.color.filter((c) => c !== color)
        : [...prev.color, color],
    }));
  };

  return (
    <div className="product-edit">
      <button className="close-btn" onClick={() => navigate("/explore/all")}>
        <X size={24} />
      </button>

      <h2>{product ? "Editar Producto" : "Crear Producto"}</h2>

      <form onSubmit={handleSubmit} className="product-edit-form">
      <div className="form-group">
      <label>Imágenes del Producto</label>

<ImageInputList
  images={productData.image}
  setImages={(newImages) =>
    setProductData((prev) => ({ ...prev, image: newImages }))
  }
/>


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
  <label>Categorías*</label>
  <div className="categories-grid">
    {categories.map((category) => (
      <div
        key={category}
        className={`category-card ${
          productData.category.includes(category) ? "selected" : ""
        }`}
        onClick={() => handleCategoryChange(category)}
      >
        {category}
      </div>
    ))}
    <div
      className={`category-card add-new ${
        showNewCategory ? "selected" : ""
      }`}
      onClick={() => setShowNewCategory(!showNewCategory)}
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
            <label>Colores Disponibles</label>
            <div className="color-options">
              {["Blanco", "Negro", "Gris"].map((color) => (
                <label key={color} className="color-checkbox">
                  <input
                    type="checkbox"
                    checked={productData.color.includes(color)}
                    onChange={() => handleColorChange(color)}
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          {product ? "Actualizar Producto" : "Crear Producto"}
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;
