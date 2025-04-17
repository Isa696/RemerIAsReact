import { useCartActions } from "../store/Store";
import { useOrders } from "./useOrders";
import toast from "react-hot-toast";
import useSendMessage from "./useSendMessage ";

export const useProcessOrder = ({ paymentStatus }) => {
  const { emptyCart } = useCartActions();
  const { createOrder } = useOrders();
  const { sendMessage } = useSendMessage();

  const formatOrderMessage = (order) => {
    let message = `Orden #${order.id}\n\n`;
    message += `Información del Cliente\n`;
    message += `Nombre: ${order.customerInfo.firstname} ${order.customerInfo.lastname}\n`;
    message += `Email: ${order.customerInfo.email}\n`;
    message += `Teléfono: ${order.customerInfo.phone}\n\n`;

    if (order.deliveryOption === "envio") {
      message += `Dirección de Entrega\n`;
      message += `Provincia: ${order.customerInfo.province}\n`;
      message += `Ciudad: ${order.customerInfo.city}\n`;
      message += `Dirección: ${order.customerInfo.address}\n`;
      message += `Codigo Postal: ${order.customerInfo.postalCode}\n\n`;
    } else {
      message += `Retiro en punto de venta\n\n`;
    }

    message += `Productos:\n`;
    order.cart.forEach((item) => {
      message += `${item.title}\n`;
      item?.newColor && (message += `Color: ${item.newColor}\n`);
      item?.size && (message += `Talle: ${item.size}\n`);
      message += `Cantidad: ${item.qty}\n`;
      message += `Precio: $${item.price}\n`;
      message += `Subtotal: $${item.qty * item.price}\n\n`;
    });

    message += `Total: $${order.totalPrice}\n`;
    message += `Estado: pending\n`;
    message += `Pago: ${paymentStatus}\n`;
    message += `Fecha: ${new Date().toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}\n`;

    if (order.customerInfo.notes) {
      message += `\nNotas:\n${order.customerInfo.notes}`;
    }

    return message;
  };

  const processPendingOrder = async () => {
    try {
      const orderDataString = localStorage.getItem("pendingOrder");
      if (!orderDataString) return false;
      
      const orderData = JSON.parse(orderDataString);
      // Ya se procesó esta orden
    if (orderData.processed) {
      localStorage.removeItem("pendingOrder");
      return false;
    }

      const success = await createOrder({...orderData , paymentStatus: paymentStatus});

      if (success) {
        const formattedMessage = formatOrderMessage(orderData);
        sendMessage();
        console.log(formattedMessage);
        localStorage.setItem("pendingOrder", JSON.stringify({
          ...orderData,
          processed: true
        }));
        emptyCart();
        toast.success(`Orden creada exitosamente. Pago: ${paymentStatus}`);
        return true;
      }
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Error al procesar la orden");
      return false;
    }
  };

  return { processPendingOrder };
};