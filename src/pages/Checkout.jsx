import "./Checkout.css";
import UserInfo from "../component/checkout/UserInfo";
import OrderSummary from "../component/checkout/OrderSummary";
import { useRouteProtection } from '../hooks/useRouteProtection';
import { Navigate } from 'react-router-dom';

function Checkout() {
  const { checkAccess } = useRouteProtection();

  // Check access when component mounts
  if (!checkAccess()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container checkout-container">
      <UserInfo />
      <OrderSummary />
    </div>
  );
}

export default Checkout;
