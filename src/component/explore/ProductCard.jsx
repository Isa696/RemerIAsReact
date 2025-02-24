import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartActions } from "../../store/Store";
import "./ProductCard.css";
import { ShoppingCart } from "phosphor-react";

function ProductCard({ product }) {
  let { addToCart } = useCartActions();

  function handleAddToCart() {
    addToCart(product);
    toast.success("Añadido al carrito");
  }

  return (
    <div className="product-card_wrapper">
      <Link to={`/product/${product.id}`}>
        <div className="product-card_img">
          <img src={product?.image} />
        </div>
      </Link>
      <div className="product-card_description">
        <h3>{product.title}</h3>
        <p>{product?.description}</p>
        <span className="product-card_bottom">
          <button className="add-cart_btn" onClick={handleAddToCart}>
          Agregar al
          <ShoppingCart size={22} />
          </button>
          <b className="product-card_price">${product?.price}</b>
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
