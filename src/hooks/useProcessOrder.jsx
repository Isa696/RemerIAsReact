import { useCartActions } from "../store/Store";
import sendConfirmationEmail from "../utils/sendConfirmationEmail";
import { useOrders } from "./useOrders";
import toast from "react-hot-toast";

export const useProcessOrder = ({ paymentStatus }) => {
  const { emptyCart } = useCartActions();
  const { createOrder } = useOrders();

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

  const formatOrderHTML = (order, paymentStatus) => {
    const customer = order.customerInfo;
    const date = new Date().toLocaleString("es-AR", {
      day: "2-digit", month: "2-digit", year: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: false
    });
  
    // Cabecera y datos del cliente
    let html = `
      <div style="font-family:Arial,sans-serif; color:#333; line-height:1.4;">
        <h2 style="color:#092d72;">Orden #${order.id}</h2>
        <h3>Información del Cliente</h3>
        <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
          <tr>
            <td style="padding:4px 8px; border:1px solid #ddd;"><strong>Nombre</strong></td>
            <td style="padding:4px 8px; border:1px solid #ddd;">
              ${customer.firstname} ${customer.lastname}
            </td>
          </tr>
          <tr>
            <td style="padding:4px 8px; border:1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding:4px 8px; border:1px solid #ddd;">${customer.email}</td>
          </tr>
          <tr>
            <td style="padding:4px 8px; border:1px solid #ddd;"><strong>Teléfono</strong></td>
            <td style="padding:4px 8px; border:1px solid #ddd;">${customer.phone}</td>
          </tr>
        </table>
    `;
  
    // Dirección o retiro
    if (order.deliveryOption === "envio") {
      html += `
        <h3>Dirección de Entrega</h3>
        <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
          <tr>
            <td style="padding:4px 8px; border:1px solid #ddd;"><strong>Provincia</strong></td>
            <td style="padding:4px 8px; border:1px solid #ddd;">${customer.province}</td>
          </tr>
          <tr>
            <td style="padding:4px 8px; border:1px solid #ddd;"><strong>Ciudad</strong></td>
            <td style="padding:4px 8px; border:1px solid #ddd;">${customer.city}</td>
          </tr>
          <tr>
            <td style="padding:4px 8px; border:1px solid #ddd;"><strong>Dirección</strong></td>
            <td style="padding:4px 8px; border:1px solid #ddd;">${customer.address}</td>
          </tr>
          <tr>
            <td style="padding:4px 8px; border:1px solid #ddd;"><strong>CP</strong></td>
            <td style="padding:4px 8px; border:1px solid #ddd;">${customer.postalCode}</td>
          </tr>
        </table>
      `;
    } else {
      html += `<p><strong>Retiro en punto de venta</strong></p>`;
    }
  
    // Lista de productos
    html += `
      <h3>Productos</h3>
      <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
        <thead>
          <tr style="background:#f0f0f0;">
            <th style="padding:6px 8px; border:1px solid #ddd; text-align:left;">Título</th>
            <th style="padding:6px 8px; border:1px solid #ddd;">Color</th>
            <th style="padding:6px 8px; border:1px solid #ddd;">Talle</th>
            <th style="padding:6px 8px; border:1px solid #ddd;">Cantidad</th>
            <th style="padding:6px 8px; border:1px solid #ddd;">Precio</th>
            <th style="padding:6px 8px; border:1px solid #ddd;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    order.cart.forEach(item => {
      const subtotal = item.qty * item.price;
      html += `
        <tr>
          <td style="padding:4px 8px; border:1px solid #ddd;">${item.title}</td>
          <td style="padding:4px 8px; border:1px solid #ddd;">${item.newColor||"--"}</td>
          <td style="padding:4px 8px; border:1px solid #ddd;">${item.size||"--"}</td>
          <td style="padding:4px 8px; border:1px solid #ddd; text-align:center;">${item.qty}</td>
          <td style="padding:4px 8px; border:1px solid #ddd; text-align:right;">$${item.price}</td>
          <td style="padding:4px 8px; border:1px solid #ddd; text-align:right;">$${subtotal}</td>
        </tr>
      `;
    });
  
    html += `
        </tbody>
      </table>
    `;
  
    // Totales y pie
    html += `
        <p><strong>Total:</strong> $${order.totalPrice}</p>
        <p><strong>Pago:</strong> ${paymentStatus}</p>
        <p><strong>Fecha:</strong> ${date}</p>
    `;
  
    if (order.customerInfo.notes) {
      html += `
        <h4>Notas del cliente</h4>
        <p>${order.customerInfo.notes}</p>
      `;
    }
  
    html += `
      <p style="font-size:0.9rem; color:#777; margin-top:30px;">
        Este es un correo automático de RemerIAs.
      </p>
      </div>
    `;
  
    return html;
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
        const orderHtml = formatOrderHTML(orderData, paymentStatus);
        sendConfirmationEmail(orderHtml);
        const formattedMessage = formatOrderMessage(orderData);
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