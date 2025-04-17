import { useEffect, useState } from "react";
import { useOrders } from "../hooks/useOrders";
import "./Orders.css";
import OrderModal from "../component/orders/OrderModal";
import { useAdmin } from "../hooks/useAdmin";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../component/loader/Loader";

function Orders({ orders: ordersProp }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { getOrders, updateOrder } = useOrders();
  const { isAdmin } = useAdmin();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState(
    Array.isArray(ordersProp) ? ordersProp : []
  );
  const loadOrders = async () => {
    const fetchedOrders = await getOrders();
    setOrders(fetchedOrders);
    setLoading(false);
  };

  useEffect(() => {
    const authorized = isAdmin();
    setIsAuthorized(authorized);

    if (!authorized && location.pathname === "/orders") {
      navigate("/");
    }
    if (authorized && orders.length === 0) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [isAdmin, location.pathname]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset selectedOrder after modal closes
    setTimeout(() => setSelectedOrder(null), 300);
  };

  async function handleStatusChange(order) {
    if (!isAdmin()) {
      toast.error("No tienes permiso para cambiar el estado de esta orden.");
      return;
    }
    setUpdatingOrder(true);
    try {
      await updateOrder(
        order.id,
        order.status === "pending" ? "sent" : "pending"
      );
      setUpdatingOrder(false);
      loadOrders();
    } catch (error) {
      console.error("Error al cambiar el estado de la orden:", error);
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        (orders.length === 0) ?
            <div className="orders-page">
              <h1>Historial de compras</h1>
              <h2>No hay órdenes para mostrar :(</h2>
            </div>
                :
        <div className="orders-page">
          <h1>Historial de compras</h1>
          <div className="orders-container">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h2>Orden #{order.id}</h2>
                <div className="order-details">
                  {updatingOrder ? (
                    <Loader sizeLoader={48} colorLoader={"#851E87ff"} />
                  ) : (
                    <>
                      <p>
                        <span>
                          <strong>Fecha:</strong>
                        </span>{" "}
                        {order.createdAt}
                      </p>
                      <div>
                        <span>
                          <strong>Estado: </strong>
                        </span>
                        <button
                          id={order.status}
                          className={isAdmin() ? "" : "disabled"}
                          disabled={!isAdmin()}
                          onClick={() => handleStatusChange(order)}
                        >
                          {order.status === "pending"
                            ? "Pendiente X"
                            : "Enviado ✓"}
                        </button>
                      </div>
                      <p>
                        <span>
                          <strong>Total:</strong>
                        </span>{" "}
                        ${order.totalPrice}
                      </p>
                      <button onClick={() => handleOpenModal(order)}>
                        Ver detalles
                      </button>
                    </>
                  )}
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
      )}
    </>
  );
}

export default Orders;
