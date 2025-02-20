import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartActions } from "../../store/Store";
import "./ProductCard.css";

function ProductCard({ product }) {
  let { addToCart } = useCartActions();

  function handleAddToCart() {
    addToCart(product);
    toast.success("Added to Cart");
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
          Ir a
          <img
            src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/favicon.svg"
            className="ml-logo"
          />
          </button>
          <b className="product-card_price">${product?.price}</b>
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
