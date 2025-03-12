import { useOrders } from "../../hooks/useOrders";
import { useCartActions } from "../../store/Store";
import { useCart } from "../../store/Store";
import "./UserInfo.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCheckoutStore } from "../../store/Checkout";
import { provinces } from "../../utils/provinces";
import useSendMessage from "../../hooks/useSendMessage ";
import Loader from "../loader/Loader";

function UserInfo() {
  return (
    <div className="user-info_container">
      <ContactInformation />
      <ShippingAddress />
    </div>
  );
}

function ContactInformation() {
  const { formData, errors, setFormData } = useCheckoutStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  return (
    <div className="contact-info_container">
      <h3>Información de Contacto</h3>
      <div className="contact-info_wrapper">
        <div className="input-group">
          <input
            type="text"
            name="firstname"
            placeholder="Nombre"
            value={formData.firstname}
            onChange={handleChange}
            className={errors.firstname ? "error" : ""}
            required
          />
          {errors.firstname && (
            <span className="error-message">{errors.firstname}</span>
          )}
        </div>

        <div className="input-group">
          <input
            type="text"
            name="lastname"
            placeholder="Apellido"
            value={formData.lastname}
            onChange={handleChange}
            className={errors.lastname ? "error" : ""}
            required
          />
          {errors.lastname && (
            <span className="error-message">{errors.lastname}</span>
          )}
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
            required
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ShippingAddress() {
  const { formData, errors, setFormData, validateForm, resetForm } =
    useCheckoutStore();
  const { emptyCart } = useCartActions();
  const { createOrder } = useOrders();
  const cart = useCart();
  const navigate = useNavigate();
  const { sendMessage, loadingMsg } = useSendMessage();

  function handleSendMessage(order) {
    const formatOrderMessage = (order) => {
      // Customer Info Section
      let message = `Orden #${order.id}\n\n`;
      message += `Información del Cliente\n`;
      message += `Nombre: ${order.customerInfo.firstname} ${order.customerInfo.lastname}\n`;
      message += `Email: ${order.customerInfo.email}\n`;
      message += `Teléfono: ${order.customerInfo.phone}\n\n`;
  
      // Delivery Address Section
      message += `Dirección de Entrega\n`;
      message += `Provincia: ${order.customerInfo.province}\n`;
      message += `Ciudad: ${order.customerInfo.city}\n`;
      message += `Dirección: ${order.customerInfo.address}\n\n`;
  
      // Products Section
      message += `Productos:\n`;
      order.cart.forEach(item => {
        message += `${item.title}\n`;
        message += `Cantidad: ${item.qty}\n`;
        message += `Precio: $${item.price}\n`;
        message += `Subtotal: $${item.qty * item.price}\n\n`;
      });
  
      // Order Summary
      message += `Total: $${order.totalPrice}\n`;
      message += `Estado: pending\n`;
      message += `Fecha: ${new Date().toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })}\n`;
  
      // Notes (if any)
      if (order.customerInfo.notes) {
        message += `\nNotas:\n${order.customerInfo.notes}`;
      }
  
      return message;
    };
  
    const formattedMessage = formatOrderMessage(order);
    console.log(formattedMessage);
    // sendMessage(formattedMessage); // Uncomment when ready to send
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  async function checkoutHandler() {

    if (!validateForm()) {
      toast.error("Por favor completa todos los campos correctamente");
      return;
    }
    if (cart.length < 1) {
      toast.error("No hay productos.");
      return;
    }
    let totalPrice = cart.reduce((acc, cur) => {
      return acc + cur.qty * cur.price;
    }, 0);
    if (totalPrice < 1) {
      toast.error("Precio total menor a 1.");
      return;
    }

    // Crear la orden
    const orderData = {
      cart,
      totalPrice,
      customerInfo: formData,
    };

    const success = await createOrder(orderData);
    
    if (success) {
      handleSendMessage(orderData);
      resetForm();
      emptyCart();
      toast.success("Compra exitosa :D");
      navigate("/");
    }
  }

  return (
    <div className="shipping-address_container">
      <h3>Dirección de Entrega</h3>
      <div className="shipping-address_wrapper">
        <div className="input-group">
          <select
            name="province"
            value={formData.province}
            onChange={handleChange}
            className={errors.province ? "error" : ""}
            required
          >
            <option value="">Selecciona una provincia</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          {errors.province && (
            <span className="error-message">{errors.province}</span>
          )}
        </div>
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={formData.city}
          onChange={handleChange}
          className={errors.city ? "error" : ""}
        />
        {errors.city && <span className="error-message">{errors.city}</span>}
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "error" : ""}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          className={errors.address ? "error" : ""}
        />
        {errors.address && (
          <span className="error-message">{errors.address}</span>
        )}
        <h3>Notas (opcional)</h3>
        <div className="textarea-wrapper">
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Escribe aquí datos adicionales que quieras agregar..."
            maxLength={200}
          />
          <small className="char-count">
            {formData.notes?.length || 0}/200 caracteres
          </small>
        </div>
        {loadingMsg ? (
          <Loader sizeLoader={24} colorLoader={"#851E87ff"} />
        ) : (
          <button className="checkout-btn" onClick={checkoutHandler}>
            Comprar
          </button>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
