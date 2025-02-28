// react router
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// layout
import RootLayout from "./layout/RootLayout";
// pages
import Home from "./pages/Home";
import ExploreProduct from "./pages/ExploreProducts";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

// react toast
import { Toaster } from "react-hot-toast";
import FloatingWhatsApp from "./component/FloatingWhatsApp";
import ProductEdit from "./pages/ProductEdit";
import EditProductWrapper from "./pages/EditProductWrapper";
import Orders from "./pages/Orders";
import OrderWrapper from "./component/orders/OrderWrapper";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/explore/:category" element={<ExploreProduct />}></Route>
        <Route path="/product/:productId" element={<Product />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/product/new" element={<ProductEdit />} />
        <Route path="/product/edit/:id" element={<EditProductWrapper />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:userId" element={<OrderWrapper />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <FloatingWhatsApp />
      <Toaster
        toastOptions={{
          style: {
            padding: "16px",
            fontSize: "1.6rem",
          },
        }}
      />
    </>
  );
}

export default App;
