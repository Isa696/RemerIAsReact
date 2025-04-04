import { useCart, useCartActions } from "../../store/Store";
import {
  ArrowLeft,
  Pencil,
  ShoppingCart,
  Trash,
  CaretLeft,
  CaretRight,
} from "phosphor-react";
import "./ProductView.css";
import toast from "react-hot-toast";
import { useAdmin } from "../../hooks/useAdmin";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../explore/ConfirmDialog";
import { useState } from "react";

function ProductView({ productData }) {
  const { isAdmin } = useAdmin();
  const { deleteProduct } = useProducts();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Array.isArray(productData.image)
    ? productData.image
    : [productData.image];
  const { addToCart } = useCartActions();
  const cart = useCart();
  if (!productData) {
    return null;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  function handleAddToCart() {
    if (productData.title.toLowerCase().includes("remera")) {
      if (!selectedColor) {
        toast.error("Por favor selecciona un color");
        return;
      }
      if (!selectedSize) {
        toast.error("Por favor selecciona un talle");
        return;
      }
      const newProduct = {
        ...productData,
        newColor: productData.newColor
          ? [...productData.newColor, selectedColor]
          : [selectedColor],
        size: productData.size
          ? [...productData.size, selectedSize]
          : [selectedSize],
      };
      addToCart(newProduct);
      // Limpiar selecciones
      setSelectedColor("");
      setSelectedSize("");
    } else {
      addToCart(productData);
    }
    toast.success("Añadido al carrito");
  }

  const handleEdit = () => {
    navigate(`/product/edit/${productData.id}`);
  };

  const handleDelete = async () => {
    toast.custom(
      (t) => (
        <ConfirmDialog
          title="Confirmar eliminación"
          message="¿Estás seguro de eliminar este producto?"
          onConfirm={async () => {
            const deleted = await deleteProduct(productData.id);
            if (deleted) {
              navigate("/explore/all");
            }
            toast.dismiss(t.id);
          }}
          onCancel={() => toast.dismiss(t.id)}
        />
      ),
      {
        duration: 2000,
        position: "center",
      }
    );
  };

  // Find the quantity of this product in the cart
  const productInCart = cart.find((item) => item.id === productData.id);
  const quantityInCart = productInCart ? productInCart.qty : 0;
  return (
    <div className="product-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={24} weight="bold" />
        Volver
      </button>
      {isAdmin() && (
        <div className="product-card_admin-buttons">
          <>
            <button
              className="admin-btn edit-btn"
              onClick={handleEdit}
              title="Editar producto"
            >
              <Pencil size={20} />
            </button>
            <button
              className="admin-btn delete-btn"
              onClick={handleDelete}
              title="Eliminar producto"
            >
              <Trash size={20} />
            </button>
          </>
        </div>
      )}

      <div className="product-img_wrapper">
        {images.length > 1 && (
          <button className="slider-btn prev" onClick={prevImage}>
            <CaretLeft size={24} weight="bold" />
          </button>
        )}

        <img src={images[currentImageIndex]} alt={productData.title} />

        {images.length > 1 && (
          <button className="slider-btn next" onClick={nextImage}>
            <CaretRight size={24} weight="bold" />
          </button>
        )}
      </div>

      <div className="product-info">
        <h2 className="product-name">{productData.title}</h2>
        <p className="product-description">{productData.description}</p>
        <p className="product-price">${productData.price}</p>

        {productData.color && (
          <div className="form-row">
            <div className="form-group">
              <label>Talle</label>
              <select
                name="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="size-select"
              >
                <option value="">Seleccionar talle</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            <div className="form-group">
              <label>Colores Disponibles</label>
              <div className="color-options">
                {productData.color.map((color) => (
                  <label
                    key={color}
                    className={`color-radio ${color.toLowerCase()}`}
                  >
                    <input
                      type="radio"
                      name="productColor"
                      value={color}
                      checked={selectedColor === color}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    />
                    {color}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* <p className="product-price">Stock: {productData.stock}</p> */}
        <button
          className="product-cart_btn"
          onClick={handleAddToCart}
          disabled={20 <= quantityInCart}
        >
          Agregar al
          <ShoppingCart size={22} />
        </button>

        <p className="product-price">Categorías:</p>
<ul className="product-categories">
  {productData.category.map((cat) => {
    // Convertimos la categoría a un formato de clase válido
    const className = `product-category ${cat
      .normalize("NFD") // Elimina tildes
      .replace(/[\u0300-\u036f]/g, "") // Remueve diacríticos
      .replace(/\s+/g, "") // Elimina espacios
      .replace(/\//g, "-") // Reemplaza "/" por "-"
      .toLowerCase()}`;

    return (
      <li key={cat} className={className}>
        {cat}
      </li>
    );
  })}
</ul>

      </div>
    </div>
  );
}

export default ProductView;
