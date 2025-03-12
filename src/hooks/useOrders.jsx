import { ref, set, get, update } from 'firebase/database';
import { db } from '../utils/firebaseConfig';
import toast from 'react-hot-toast';
import useUserStore from '../store/User';

export const useOrders = () => {

  const user = useUserStore(state => state.user);
    const generateOrderId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const length = 8;
        let result = '';
        
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        
        return result;
      };

      const dateOptions = {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };

  const createOrder = async (orderData) => {
    try {
      if (!user?.uid) {
        toast.error('Usuario no autenticado');
        return false;
      }
      // Crear referencia para la nueva orden
      const orderId = generateOrderId();
      const newOrderRef = ref(db, `orders/${orderId}`);

      // Formatear la orden
      const order = {
        id: orderId,
        userId: user.uid,
        items: orderData.cart,
        totalPrice: orderData.totalPrice,
        customerInfo: orderData.customerInfo,
        status: 'pending',
        createdAt: new Date().toLocaleString('es-AR', dateOptions),
        notes: orderData.notes || '',
      };

      // Guardar en Firebase
      await set(newOrderRef, order);
      
      toast.success('Orden creada exitosamente');
      return true;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error al crear la orden');
      return false;
    }
  };

  const getOrders = async () => {
    try {
      const ordersRef = ref(db, 'orders');
      const snapshot = await get(ordersRef);

      if (snapshot.exists()) {
        const orders = Object.values(snapshot.val());
        // Ordenar por fecha, más recientes primero
        return orders.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error al cargar las órdenes');
      return [];
    }
  };

  const updateOrder = async (orderId, newStatus) => {
    try {
      const orderRef = ref(db, `orders/${orderId}`);
      await update(orderRef, { status: newStatus });
      
      toast.success('Orden actualizada exitosamente');
      return true;
    } catch (error) {
      console.error('Error al actualizar orden:', error);
      toast.error('Error al actualizar la orden');
      return false;
    }
  };

  return {
    createOrder,
    getOrders,
    updateOrder
  };
};