import { useCart } from "../../store/Store";
import "./UserInfo.css";
import toast from "react-hot-toast";
import { useCheckoutStore } from "../../store/Checkout";
import { provinces } from "../../utils/provinces";
// import Loader from "../loader/Loader";
import MPBtn from "../MPBtn/MPBtn";
import generateOrderId from "../../utils/generateOrderId";
import { useEffect, useState } from "react";
import imgCheckout from "../../assets/images/img-checkout.png";
import { X } from "phosphor-react";
import { ref, get } from "firebase/database";
import { db } from "../../utils/firebaseConfig";


function UserInfo() {
  const [deliveryOption, setDeliveryOption] = useState("envio");
  const { formData, errors, setFormData, validateForm, resetForm } =
    useCheckoutStore();
  const [showMPBtn, setShowMPBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cart = useCart();
  const [shippingCost, setShippingCost] = useState(0);

  let totalPrice = cart.reduce((acc, cur) => {
    return acc + cur.qty * cur.price;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  async function checkoutHandler() {
    // Check stock for each item in cart
    // const stockError = cart.some(item => item.qty > item.stock);

    // if (stockError) {
    //   toast.error("No hay stock suficiente para uno o más productos seleccionados");
    //   return;
    // }

    if (deliveryOption === "envio" && !validateForm("envio")) {
      toast.error("Por favor completa todos los campos correctamente");
      return;
    }
    if (deliveryOption === "retiro" && !validateForm("retiro")) {
      toast.error(
        "Por favor completa la información de contacto correctamente"
      );
      return;
    }

    // if (!validateForm()) {
    //   toast.error("Por favor completa todos los campos correctamente");
    //   return;
    // }
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
      deliveryOption,
      id: generateOrderId(),
      createdAt: new Date().toLocaleString("es-AR"),
    };

    setShowModal(true);
    try {
      localStorage.setItem("pendingOrder", JSON.stringify({
        ...orderData,
        processed: false
      }));
    } catch (error) {
      console.error("Error saving order to localStorage:", error);
      toast.error("Error al procesar la orden");
    } finally {
      resetForm();
    }
  }

  const handleProceedToPayment = () => {
    setShowModal(false);
    setShowMPBtn(true);
  };

  const handleDeliveryChange = (option) => {
    setDeliveryOption(option);
    setShowMPBtn(false);
    option === "retiro" && setShippingCost(0);
  };
  return (
    <div className="user-info_container">
      <ContactInformation />

      {/* Opción de entrega */}
      <div className="delivery-options_wrapper">
        <label
          className={`label-delivery ${
            deliveryOption === "envio" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="deliveryOption"
            value="envio"
            checked={deliveryOption === "envio"}
            onChange={() => handleDeliveryChange("envio")}
          />
          Envío a domicilio
        </label>

        <label
          className={`label-delivery ${
            deliveryOption === "retiro" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="deliveryOption"
            value="retiro"
            checked={deliveryOption === "retiro"}
            onChange={() => handleDeliveryChange("retiro")}
          />
          Retiro en punto de venta
        </label>
      </div>

      {/* Mostrar ShippingAddress solo si el usuario elige "Envío a domicilio" */}
      {deliveryOption === "envio" && (
        <ShippingAddress
          deliveryOption={deliveryOption}
          showMPBtn={showMPBtn}
          setShowMPBtn={setShowMPBtn}
          formData={formData}
          errors={errors}
          setFormData={setFormData}
          validateForm={validateForm}
          resetForm={resetForm}
          cart={cart}
          totalPrice={totalPrice}
          handleChange={handleChange}
          shippingCost={shippingCost}
          setShippingCost={setShippingCost}
        />
      )}

      {!showMPBtn && (
        <button className="checkout-btn" onClick={checkoutHandler}>
          Comprar
        </button>
      )}

{showModal && (
  <div className="checkout-modal-overlay">
    <div className="checkout-modal">
      <button className="modal-close" onClick={() => setShowModal(false)}>
        <X size={24} />
      </button>
      <img src={imgCheckout} alt="Checkout information" />
      <button className="proceed-btn" onClick={handleProceedToPayment}>
        Continuar al pago
      </button>
    </div>
  </div>
)}

      {showMPBtn && <MPBtn totalPrice={totalPrice + shippingCost} />}
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
        <div className="input-group">
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "error" : ""}
            required
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ShippingAddress({
  deliveryOption,
  showMPBtn,
  setShowMPBtn,
  formData,
  errors,
  setFormData,
  validateForm,
  resetForm,
  cart,
  totalPrice,
  handleChange,
  shippingCost,
  setShippingCost,
}) {

  useEffect(() => {
    const fetchShippingCost = async () => {
      if (formData.province) {
        try {
          const provinceKey = formData.province.trim(); // aseguramos sin espacios accidentales          
          const snapshot = await get(ref(db, `shipping_costs/${provinceKey}`));
          
          if (snapshot.exists()) {
            const data = snapshot.val();
            toast.success("Costo de envío obtenido: $" +  data.cost);
            setShippingCost(data.cost);
          } else {
            setShippingCost(null);
          }
        } catch (error) {
          toast.error("Error al obtener el costo de envío:", error);
          setShippingCost(null);
        }
      }
    };

    fetchShippingCost();
  }, [formData.province]);
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
            required={deliveryOption === "envio"}
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
          required={deliveryOption === "envio"}
        />
        {errors.city && <span className="error-message">{errors.city}</span>}

        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          className={errors.address ? "error" : ""}
          required={deliveryOption === "envio"}
        />
        {errors.address && (
          <span className="error-message">{errors.address}</span>
        )}

        <input
          type="text"
          name="postalCode"
          placeholder="Codigo Postal"
          value={formData.postalCode}
          onChange={handleChange}
          className={errors.postalCode ? "error" : ""}
          required={deliveryOption === "envio"}
        />
        {errors.postalCode && (
          <span className="error-message">{errors.postalCode}</span>
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

        <p className="user-info-note" style={{ textAlign: "center" }}>
          <strong>Aclaración:</strong> <br /> El costo de envio depende de la ubicación de entrega. <br /> Tiempo estimado de 2 a 5 dias habiles
        </p>
        {shippingCost !== 0 && (
          <h3 className="user-info-note">Costo de envío: ${shippingCost}</h3>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
