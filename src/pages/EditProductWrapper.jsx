import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductEdit from "./ProductEdit";
import fetchFromApi from "../utils/fetchFromApi";
import { useRouteProtection } from "../hooks/useRouteProtection";

function EditProductWrapper() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
    const {checkAdminAccess } = useRouteProtection();
  
    useEffect(() => {
      const authorized = checkAdminAccess();
      if (!authorized) {
        return;
      }
    }, []);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchFromApi("products");
        const foundProduct = products.find(p => p.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) return <div>Cargando...</div>;

  return <ProductEdit product={product} />;
}

export default EditProductWrapper;