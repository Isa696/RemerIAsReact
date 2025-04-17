import Orders from "../../pages/Orders";
import { useParams } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import { useEffect, useState } from "react";
import { useRouteProtection } from "../../hooks/useRouteProtection";
import Loader from "../loader/Loader";


function OrderWrapper() {
    const { userId } = useParams();
    const [orders, setOrders] = useState(null);
      const { checkAccess } = useRouteProtection();
      const { getOrders } = useOrders();
      const [loading, setLoading] = useState(true);

    
  useEffect(() => {
    const authorized = checkAccess();

    if (authorized) {
      const loadOrders = async () => {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders.filter(order => order.userId === userId));
        setLoading(false);
      };
      loadOrders();
    }
  }, []);


    return (
        <>
         {loading ? (
            <Loader />
      ) : (
            <Orders orders={orders} />
      )}
        </>
    )
}

export default OrderWrapper
