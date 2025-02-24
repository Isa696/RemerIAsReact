import { useCartActions } from "../../store/Store";
import { useCart } from "../../store/Store";
import "./UserInfo.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  return (
    <div className="user-info_container">
      <ContactInformation />
      <ShippingAddress />
    </div>
  );
}

function ContactInformation() {
  return (
    <div className="contact-info_container">
      <h3>Información de Contacto</h3>
      <input type="email" placeholder="Email" />
    </div>
  );
}

function ShippingAddress() {
  const { emptyCart } = useCartActions();
  const cart = useCart();

  let navigate = useNavigate();

  function checkoutHandler() {
    if (cart.length < 1) {
      toast.error("No hay productos.");
      return;
    }
    let totalPrice = cart.reduce((acc, cur) => {
      return acc + cur.qty * cur.price;
    }, 0);
    if (totalPrice < 1) {
      toast.error("No hay productos.");
      return;
    }

    emptyCart();
    toast.success("Compra exitosa :D");
    navigate("/");
  }

  return (
    <div className="shipping-address_container">
      <h3>Dirección de Entrega</h3>
      <div className="shipping-address_wrapper">
        <input type="name" placeholder="Nombre" id="firstname" />
        <input type="name" placeholder="Apellido" id="lastname" />
        <input type="name" placeholder="Dirección" id="address" />
        <input type="name" placeholder="Ciudad" id="city" />
        <button className="checkout-btn" onClick={checkoutHandler}>
          Comprar
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
