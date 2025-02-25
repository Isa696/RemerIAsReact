import "./Checkout.css";
import UserInfo from "../component/checkout/UserInfo";
import OrderSummary from "../component/checkout/OrderSummary";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/tokenValid';
import toast from 'react-hot-toast';

function Checkout() {

  const navigate = useNavigate();

  useEffect(() => {
    const isValidToken = validateToken();
    
    if (!isValidToken) {
      toast.error('Tu sesión ha expirado, por favor inicia sesión nuevamente');
      navigate('/login');
    }
  }, []);

  return (
    <div className="container checkout-container">
      <UserInfo />
      <OrderSummary />
    </div>
  );
}

export default Checkout;
