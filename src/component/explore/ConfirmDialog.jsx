import { X } from "phosphor-react";
import "./ConfirmDialog.css";

function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="custom-toast show">
      <div className="toast-header">
        <h4>{title}</h4>
        <button onClick={onCancel}>
          <X size={18} />
        </button>
      </div>
      <p>{message}</p>
      <div className="toast-actions">
        <button className="cancel-btn" onClick={onCancel}>
          Cancelar
        </button>
        <button className="delete-btn" onClick={onConfirm}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ConfirmDialog;