import { useCart } from "../../store/Store";
import "./UserInfo.css";
import toast from "react-hot-toast";
import { useCheckoutStore } from "../../store/Checkout";
import { provinces } from "../../utils/provinces";
import Loader from "../loader/Loader";
import MPBtn from "../MPBtn/MPBtn";
import generateOrderId from "../../utils/generateOrderId";
import { useState } from "react";

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
  const { formData, errors, setFormData, validateForm, resetForm } = useCheckoutStore();
  const cart = useCart();
  const [showMPBtn, setShowMPBtn] = useState(false);

  let totalPrice = cart.reduce((acc, cur) => {
    return acc + cur.qty * cur.price;
  }, 0);


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

    if (totalPrice < 1) {
      toast.error("Precio total menor a 1.");
      return;
    }
    // Guardar datos del pedido en localStorage
    const orderData = {
      cart,
      totalPrice,
      customerInfo: formData,
      id: generateOrderId(),
      createdAt: new Date().toLocaleString('es-AR')
    };

    try {
      localStorage.setItem('pendingOrder', JSON.stringify(orderData));
      setShowMPBtn(true);
    } catch (error) {
      console.error('Error saving order to localStorage:', error);
      toast.error("Error al procesar la orden");
    } finally {
      resetForm();
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

        <p className="user-info-note">Aclaración: El costo de envio es a cargo del comprador.<br/> Consultar al vendedor</p>
        {!showMPBtn && (
          <button className="checkout-btn" onClick={checkoutHandler}>
            Comprar
          </button>
        )}

        {showMPBtn && (
          <MPBtn
            totalPrice={totalPrice}
          />
        )}
      </div>
    </div>
  );
}

export default UserInfo;
