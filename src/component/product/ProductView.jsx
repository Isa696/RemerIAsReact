import { useCartActions } from "../../store/Store";
import { Pencil, ShoppingCart, Trash } from "phosphor-react";
import "./ProductView.css";
import toast from "react-hot-toast";
import { useAdmin } from "../../hooks/useAdmin";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../explore/ConfirmDialog";

function ProductView({ productData }) {
    const { isAdmin } = useAdmin();
    const { deleteProduct } = useProducts();
    const navigate = useNavigate();
  const { addToCart } = useCartActions();
  if (!productData) {
    return null;
  }

  function handleAddToCart() {
    addToCart(productData);
    toast.success("Añadido al carrito");
  }

  const handleEdit = () => {
    // TODO: Implementar edición
    console.log('Editar producto:', productData.id);
  };

  const handleDelete = async () => {
    toast.custom((t) => (
      <ConfirmDialog
        title="Confirmar eliminación"
        message="¿Estás seguro de eliminar este producto?"
        onConfirm={async () => {
          const deleted = await deleteProduct(productData.id);
          if (deleted) {
            navigate('/explore/all');
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
    <div className="product-container">
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
        <img src={productData.image} />
      </div>
      <div className="product-info">
        <h2 className="product-name">{productData.title}</h2>
        <p className="product-price">Stock: {productData.stock}</p>
        <p className="product-price">${productData.price}</p>
        <p className="product-description">{productData.description}</p>

        <button className="product-cart_btn" onClick={handleAddToCart}>
          Agregar al
          <ShoppingCart size={22} />
        </button>
      </div>
    </div>
  );
}

export default ProductView;
