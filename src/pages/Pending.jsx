import { Link } from "react-router-dom"
import "./Success.css"
import useSendMessage from '../hooks/useSendMessage ';
import { useEffect } from "react";
import { useCartActions } from '../store/Store';
import { useOrders } from '../hooks/useOrders';
import toast from 'react-hot-toast';

function Pending() {
  const { emptyCart } = useCartActions();
  const { createOrder } = useOrders();
const { sendMessage, loadingMsg } = useSendMessage();


useEffect(() => {
const processPendingOrder = async () => {
 try {
   // Recuperar datos del localStorage
   const orderDataString = localStorage.getItem('pendingOrder');
   if (!orderDataString) {
     toast.error('No se encontró la orden pendiente, Comuniquese con el vendedor');
     return;
   }

   const orderData = JSON.parse(orderDataString);
   
   // Crear la orden
   const success = await createOrder(orderData);

   if (success) {
     // Limpiar localStorage y carrito
     localStorage.removeItem('pendingOrder');
     emptyCart();
     toast.success('¡Compra exitosa! :D');
       handleSendMessage(orderData);
       sendMessage()
   }

 } catch (error) {
   console.error('Error processing order:', error);
   toast.error('Error al procesar la orden');
 }
};

processPendingOrder();
}, []);

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
     order.cart.forEach((item) => {
       message += `${item.title}\n`;
       message += `Cantidad: ${item.qty}\n`;
       message += `Precio: $${item.price}\n`;
       message += `Subtotal: $${item.qty * item.price}\n\n`;
     });

     // Order Summary
     message += `Total: $${order.totalPrice}\n`;
     message += `Estado: pending\n`;
     message += `Fecha: ${new Date().toLocaleString("es-AR", {
       day: "2-digit",
       month: "2-digit",
       year: "2-digit",
       hour: "2-digit",
       minute: "2-digit",
       hour12: false,
     })}\n`;

     // Notes (if any)
     if (order.customerInfo.notes) {
       message += `\nNotas:\n${order.customerInfo.notes} \n \n Pago pendiente!\n \n Comuniquese con el comprador para Verificar el pago`;
     }
     console.log(message);
     return message;
   };

   const formattedMessage = formatOrderMessage(order);
   console.log(formattedMessage);
   // sendMessage(formattedMessage); // Uncomment when ready to send
 }

  return (
    <div className='home-info success-container home-main container'>
        <h2>Pago pendiente ⏳</h2>
      <h3>Su pago está siendo procesado. 🤔</h3>
      <p className="success-p">
        Por favor, espere.
        Podrás revisar tu compra en la pestaña Historial
        Ya enviamos el ticket al vendedor.
        </p>
        <h3>
              <Link to="/">Volver al Inicio</Link>
        </h3>

    </div>
  )
}

export default Pending
