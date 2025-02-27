import Modal from 'react-modal';
import { X } from "phosphor-react";
import "./OrderModal.css";

// Bind modal to your app element
Modal.setAppElement('#root');

const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '90%',
      maxHeight: '90vh',
      padding: '2rem',
      borderRadius: '8px'
    }
  };

function OrderModal({ order, onClose, isOpen }) {

      if (!order) return null;
    
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Order Details"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <h2>Orden #{order.id}</h2>
        <div className="modal-details">
          <h3>Información del Cliente</h3>
          <p><strong>Nombre:</strong> {order.customerInfo.firstname} {order.customerInfo.lastname}</p>
          <p><strong>Email:</strong> {order.customerInfo.email}</p>
          <p><strong>Teléfono:</strong> {order.customerInfo.phone}</p>
          
          <h3>Dirección de Entrega</h3>
          <p><strong>Provincia:</strong> {order.customerInfo.province}</p>
          <p><strong>Ciudad:</strong> {order.customerInfo.city}</p>
          <p><strong>Dirección:</strong> {order.customerInfo.address}</p>
          
          <h3>Productos</h3>
          <div className="order-items">
            {order.items.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>Cantidad: {item.qty}</p>
                  <p>Precio: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-summary">
            <p><strong>Total:</strong> ${order.totalPrice}</p>
            <p><strong>Estado:</strong> {order.status}</p>
            <p><strong>Fecha:</strong> {order.createdAt}</p>
            {order.customerInfo.notes && (
              <>
                <p><strong>Notas:</strong></p>
                <p>{order.customerInfo.notes}</p>
              </>
            )}
          </div>
        </div>

    </Modal>
  );
}

export default OrderModal;