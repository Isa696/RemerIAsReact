import { useEffect, useState } from "react";
import { useOrders } from "../hooks/useOrders";
import "./Orders.css";
import OrderModal from "../component/orders/OrderModal";
import { useAdmin } from "../hooks/useAdmin";
import { useLocation, useNavigate } from 'react-router-dom';

function Orders({orders: ordersProp}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { getOrders } = useOrders();
  const {isAdmin} = useAdmin();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState(Array.isArray(ordersProp) ? ordersProp : []);

  
  useEffect(() => {
    
    const authorized = isAdmin();
    setIsAuthorized(authorized);
    
    if (!authorized && location.pathname === '/orders') {
      navigate('/');
    }
    if (authorized && orders.length === 0) {
      const loadOrders = async () => {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      };
      loadOrders();
    }
  }, [isAdmin, location.pathname]);

  if (!isAuthorized && orders.length === 0) {
    return (
      <div className="orders-page">
        <h1>Historial de compras</h1>
        <h2>No hay órdenes para mostrar :(</h2>
      </div>
    );
  }

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset selectedOrder after modal closes
    setTimeout(() => setSelectedOrder(null), 300);
  };

  return (
    <div className="orders-page">
      <h1>Historial de compras</h1>
      <div className="orders-container">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h2>Orden #{order.id}</h2>
            <div className="order-details">
              <p>
                <span>
                  <strong>Fecha:</strong>
                </span>{" "}
                {order.createdAt}
              </p>
              <p>
                <span>
                  <strong>Estado:</strong>
                </span>{" "}
                {order.status}
              </p>
              <p>
                <span>
                  <strong>Total:</strong>
                </span>{" "}
                ${order.totalPrice}
              </p>
              <button onClick={() => handleOpenModal(order)}>
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

        <OrderModal
          isOpen={isModalOpen}
          order={selectedOrder}
          onClose={handleCloseModal}
        />
    </div>
  );
}

export default Orders;
