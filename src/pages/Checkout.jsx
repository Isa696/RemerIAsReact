import "./Checkout.css";
import UserInfo from "../component/checkout/UserInfo";
import OrderSummary from "../component/checkout/OrderSummary";
import { useRouteProtection } from '../hooks/useRouteProtection';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function Checkout() {
  const { checkAccess } = useRouteProtection();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const auth = checkAccess();
    setIsAuthenticated(auth);
  }, []);

  if (!isAuthenticated) {
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
