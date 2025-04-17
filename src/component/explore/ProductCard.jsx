import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../store/Store";
import "./ProductCard.css";
import { Pencil, Trash } from "phosphor-react";
import { useAdmin } from "../../hooks/useAdmin";
import { useProducts } from "../../hooks/useProducts";
import ConfirmDialog from "./ConfirmDialog";

function ProductCard({ product }) {
  const cart = useCart();
  const { isAdmin } = useAdmin();
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/product/edit/${product.id}`);
  };

  const handleDelete = async () => {
    toast.custom(
      (t) => (
        <ConfirmDialog
          title="Confirmar eliminación"
          message="¿Estás seguro de eliminar este producto?"
          onConfirm={async () => {
            const deleted = await deleteProduct(product.id);
            if (deleted) {
              navigate("/");
            }
            toast.dismiss(t.id);
          }}
          onCancel={() => toast.dismiss(t.id)}
        />
      ),
      {
        duration: Infinity,
        position: "center",
      }
    );
  };

  // Find the quantity of this product in the cart
  const productInCart = cart.find((item) => item.id === product.id);
  const quantityInCart = productInCart ? productInCart.qty : 0;
  return (
    <div className="product-card_wrapper">
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
      <Link to={`/product/${product.id}`}>
        <div className="product-card_img">
          <img src={product?.image[0]} />
        </div>
      </Link>
      <div className="product-card_description">
        <h3>{product.title}</h3>
        <span className="product-card_bottom">
            <button
              className="add-cart_btn"
              disabled={20 <= quantityInCart}
            >
              <Link to={`/product/${product.id}`}>
              Ver Detalles
              </Link>
            </button>
          {/* <b className="product-card_price">Stock: {product?.stock}</b> */}
          <b className="product-card_price">${product?.price}</b>
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
