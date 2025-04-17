import { ShoppingCart, X } from "phosphor-react";
import { Link } from "react-router-dom";
import { useCartActions } from "../../store/Store";
import { useCart } from "../../store/Store";
import toast from "react-hot-toast";
import "./SlidingCart.css";
import { useRef } from "react";

function SlidingCart({ toggleShowCart }) {
  let cart = useCart();
  let { addProductQuantity, removeFromCart } = useCartActions();

  return (
    <div className={`sliding-cart_container`}>
      <CartTop toggleShowCart={toggleShowCart} />
      <CartMain
        cart={cart}
        addProductQuantity={addProductQuantity}
        removeFromCart={removeFromCart}
      />
      <CartCheckOut cart={cart} toggleShowCart={toggleShowCart} />
    </div>
  );
}

function CartTop({ toggleShowCart }) {
  return (
    <div className="cart-top">
      <ShoppingCart size={22} />
      <h2>Tu carrito</h2>
      <div className="close-shopping-cart" onClick={toggleShowCart}>
        <X size="22px" />
      </div>
    </div>
  );
}

function CartMain({ cart, addProductQuantity, removeFromCart }) {
  const products = cart.map((product) => {
    return (
      <CartProducts
        product={product}
        addProductQuantity={addProductQuantity}
        removeFromCart={removeFromCart}
        key={product.id}
      />
    );
  });

  return (
    <div className="cart-main_container">
      {products.length < 1 ? (
        <div style={{ textAlign: "center", fontSize: "1.6rem" }}>
          Tu carrito esta vacio :({" "}
        </div>
      ) : (
        products
      )}
    </div>
  );
}

function CartProducts({ product, addProductQuantity, removeFromCart }) {
  const inputRef = useRef(null);
  console.log('Product in cart:', {
    id: product.id,
    title: product.title,
    size: product.size,
    newColor: product.newColor
  });
  function inputHandler(e) {
    let newQty;
    
    // Handle direct input
    if (e.target.value === '') {
      newQty = 1;
    } else {
      // Parse input as integer
      newQty = parseInt(e.target.value, 10);
      
      // Validate the number
      if (isNaN(newQty)) {
        newQty = 1;
      }
    }

    // Apply limits
    if (newQty > product.stock) {
      newQty = product.stock;
      toast.error(`Stock máximo disponible: ${product.stock}`);
    } else if (newQty < 1) {
      newQty = 1;
    }

    // Update input and cart
    if (inputRef.current) {
      inputRef.current.value = newQty;
    }
    addProductQuantity(product.id, newQty);
  }

  function removeProduct() {
    removeFromCart(product.id);
    toast.error("Eliminado del carrito");
  }

  return (
    <div className="cart-product">
      <img src={product.image[0]} />
      <div className="cart-product_info">
        <h3>{product.title}</h3>
        <p>Categoría: {product.category}</p>
        {product.size && <p>Talle: {product.size.join(", ")}</p>}
        {product.newColor && <p className={`${product.newColor.join(" ").toLowerCase()}`}>
          Color: {product.newColor.join(", ")}</p>}

        {(product.title.toLowerCase().includes("remera")) ?
        <p className="qty">
          Cantidad: {product.qty}
        </p>
        :
        <p className="qty">
          Cantidad:
          <input
            type="number"
            value={product.qty}
            max={20}
            min={1}
            onChange={inputHandler}
            onKeyDown={(e) => {
              // Prevent 'e' character input
              if (e.key === 'e' || e.key === 'E') {
                e.preventDefault();
              }
            }}
            id="qty"
            ref={inputRef}
            />
        </p>
          }
      </div>
      <p className="cart-product_price">
        ${(product.price * product.qty).toFixed(2)}
      </p>
      <span className="cart-product_x" onClick={removeProduct}>
        <X size="16px" />
      </span>
    </div>
  );
}

function CartCheckOut({ cart, toggleShowCart }) {
  const totalPrice = cart.reduce((accumulator, current) => {
    return accumulator + current.price * current.qty;
  }, 0);

  return (
    <div className="cart-checkout_container">
      <h3>Precio Total</h3>
      <p>${totalPrice.toFixed(2)}</p>
      <Link to="checkout" onClick={toggleShowCart}>
        Ir a Checkout
      </Link>
    </div>
  );
}

export default SlidingCart;
