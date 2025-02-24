import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchFromApi from "../utils/fetchFromApi";
import ProductView from "../component/product/ProductView";
import "./Product.css";

function Product() {
  const [productData, setProductData] = useState(null); // Cambiado de [] a null
  const { productId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchFromApi("products");
        // Buscar el producto específico por ID
        const product = data.find(prod => prod.id === parseInt(productId));
        if (product) {
          setProductData(product);
        } else {
          console.error("Producto no encontrado");
        }
      } catch (error) {
        console.error("Error loading product:", error);
      }
    }
    getData();
  }, [productId]);

  // Mostrar loading o mensaje si no hay datos
  if (!productData) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="product-view_main container">
      <ProductView productData={productData} />
    </main>
  );
}

export default Product;