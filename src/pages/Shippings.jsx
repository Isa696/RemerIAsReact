import { provinces } from "../utils/provinces";
import { useEffect, useState } from "react";
import "./Shippings.css";
import { ref, set } from "firebase/database";
import { db } from "../utils/firebaseConfig";
import toast from "react-hot-toast";
import { useRouteProtection } from "../hooks/useRouteProtection";


const ShippingRatesPage = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const {checkAdminAccess } = useRouteProtection();

  useEffect(() => {
    const authorized = checkAdminAccess();
    if (!authorized) {
      return;
    }
  }, []);

  const handleSave = async () => {
    if (!selectedProvince || !shippingCost) {
      toast.error("Completá todos los campos");
      return;
    }
  
    try {
      const provinceRef = ref(db, `shipping_costs/${selectedProvince}`);
      await set(provinceRef, {
        cost: Number(shippingCost),
        createdAt: new Date().toISOString()
      });
  
      toast.success("Costo guardado correctamente");
      setSelectedProvince("");
      setShippingCost("");
    } catch (error) {
      console.error("Error al guardar:", error);
      toast.error("Hubo un error al guardar el costo");
    }
  };
  

  return (
    <div className="shipping-page-container">
      <h2>Configuración de Envíos</h2>

      <div className="form-group">
        <label htmlFor="province">Provincia</label>
        <select
          id="province"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
        >
          <option value="">Seleccioná una provincia</option>
          {provinces.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="cost">Costo de envío ($)</label>
        <input
          type="number"
          id="cost"
          value={shippingCost}
          onChange={(e) => setShippingCost(e.target.value)}
          placeholder="Ej: 1500"
        />
      </div>

      <button className="save-btn" onClick={handleSave}>
        Guardar
      </button>
    </div>
  );
};

export default ShippingRatesPage;
