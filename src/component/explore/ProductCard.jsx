import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartActions } from "../../store/Store";
import "./ProductCard.css";
import { Pencil, ShoppingCart, Trash, X } from "phosphor-react";
import { useAdmin } from "../../hooks/useAdmin";
import { useProducts } from "../../hooks/useProducts";
import ConfirmDialog from "./ConfirmDialog";

function ProductCard({ product }) {
  let { addToCart } = useCartActions();
  const { isAdmin } = useAdmin();
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();

  function handleAddToCart() {
    addToCart(product);
    toast.success("Añadido al carrito");
  }

  const handleEdit =  () => {
    navigate(`/product/edit/${product.id}`);
  };

  const handleDelete = async () => {
    toast.custom((t) => (
      <ConfirmDialog
        title="Confirmar eliminación"
        message="¿Estás seguro de eliminar este producto?"
        onConfirm={async () => {
          const deleted = await deleteProduct(product.id);
          if (deleted) {
            navigate('/');
          }
          toast.dismiss(t.id);
        }}
        onCancel={() => toast.dismiss(t.id)}
      />
    ), {
      duration: Infinity,
      position: 'center'
    });
  };

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
          <img src={product?.image} />
        </div>
      </Link>
      <div className="product-card_description">
        <h3>{product.title}</h3>
        <span className="product-card_bottom">
          <button className="add-cart_btn" onClick={handleAddToCart}>
          Agregar al
          <ShoppingCart size={22} />
          </button>
          <b className="product-card_price">Stock: {product?.stock}</b>
          <b className="product-card_price">${product?.price}</b>
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
