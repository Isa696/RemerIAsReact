import { useState } from "react";
import { useCart } from "../../store/Store";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import SlidingCart from "./SlidingCart";
import "./Navbar.css";
import logoNav from "../../assets/images/logo-nav.jpg";
import useUserStore from "../../store/User";
import toast from "react-hot-toast";

function Navbar() {
  const [showCart, setShowCart] = useState(false);

  function toggleShowCart() {
    setShowCart(!showCart);
  }
  return (
    <header className={`header ${showCart ? "visible" : ""}`}>
      <Navigations toggleShowCart={toggleShowCart} />
      <SlidingCart toggleShowCart={toggleShowCart} />
      <CartSliderOverlay />
    </header>
  );
}

function CartButton({ toggleShowCart }) {
  const cart = useCart();

  const totalCartQty = cart.reduce((totalQty, current) => {
    return totalQty + current.qty;
  }, 0);

  return (
    <span onClick={toggleShowCart} className="cart-icon">
      <ShoppingCart size={22} />
      <div className="cart-counter">{totalCartQty}</div>
    </span>
  );
}

function Navigations({ toggleShowCart }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { logout, user } = useUserStore(state => ({
    logout: state.logout,
    user: state.user
  }));

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Sesión cerrada exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  function handleOpenNavigation() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <nav className={`nav container ${isNavOpen ? "nav-open" : ""}`}>
      <span className="brand-name">
        <NavLink to="/">
          <img src={logoNav} alt="Santeria el paraiso" className="brand-name" />
          </NavLink>
      </span>
      <ul className="nav-link_container">
        <li className="nav-link"
          onClick={() => setIsNavOpen(false)}
          >
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li className="nav-link"
            onClick={() => setIsNavOpen(false)}
          >
          <NavLink to="/explore/all">Productos</NavLink>
        </li>
        <li className="nav-link"
            onClick={() => setIsNavOpen(false)}
          >
          {user?.email ? (
            <NavLink to="/login" onClick={handleLogout}>
              Cerrar Sesión
            </NavLink>
          ) : (
            <NavLink to="/login">Iniciar Sesión</NavLink>
          )}
        </li>
          {(user?.email && user?.isAdmin) &&
            <li className="nav-link"
            onClick={() => setIsNavOpen(false)}
            >
            <NavLink to="/product/new">
              New Product
            </NavLink>
                </li>
            }
      </ul>
      <div className="nav-secondary_btn" onClick={handleOpenNavigation}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="nav-secondary">
        <CartButton toggleShowCart={toggleShowCart} />
      </div>
      <div className="nav-overlay"></div>
    </nav>
  );
}

function CartSliderOverlay() {
  return <div className="cart-slide_overlay"></div>;
}

export default Navbar;
