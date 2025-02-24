import { useEffect, useState } from "react";
import ProductCard from "../component/explore/ProductCard";
import fetchFromApi from "../utils/fetchFromApi";
import SelectCategory from "../component/explore/SelectCategory";
import PriceFilter from "../component/explore/PriceFilter";
import "./ExploreProducts.css";
import { useParams } from "react-router-dom";
import Shimmer from "../component/shimmer/Shimmer";

function ExploreProduct() {
  const [products, setProducts] = useState([]);
  const [priceFlter, setPriceFilter] = useState("default");
  const [checkBoxState, setCheckBoxState] = useState({
    men: false,
    women: false,
  });
  let { category } = useParams();

  useEffect(() => {
    let resetCheckBoxState = {
      men: false,
      women: false,
    };
    if (category === "all") {
      setCheckBoxState(resetCheckBoxState);
      return;
    }
    setCheckBoxState({ ...resetCheckBoxState, [category]: true });
  }, [category]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetchFromApi("products");
        if (Array.isArray(res)) {
          setProducts(res);
        } else {
          console.error("Data is not an array:", res);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      }
    }
    getData();
  }, [checkBoxState]);

  function handleCategoryCheckBox(e) {
    let { name, checked } = e.target;
    setCheckBoxState({ ...checkBoxState, [name]: checked });
  }

  function handlePriceFilter(e) {
    let filter = e.target.value;
    if (filter === "low-to-high") {
      let priceFilteredData = products
        .slice()
        .sort((a, b) => a.price - b.price);
      setProducts(priceFilteredData);
    }
    if (filter === "high-to-low") {
      let priceFilteredData = products
        .slice()
        .sort((a, b) => b.price - a.price);
      setProducts(priceFilteredData);
    }
    setPriceFilter(filter);
  }

  return (
    <main className="product-main">
      <PriceFilter
        priceFlter={priceFlter}
        handlePriceFilter={handlePriceFilter}
      />
      <SelectCategory
        checkBoxState={checkBoxState}
        handleCheckBox={handleCategoryCheckBox}
      />
      <div className="products-container">
        <AllProducts products={products} />
      </div>
    </main>
  );
}

function AllProducts({ products }) {
  let productCards = products.length ? (
    products?.map((product) => {
      return <ProductCard product={product} key={product.id} />;
    })
  ) : (
    <Skeleton />
  );

  return productCards;
}

function Skeleton() {
  let a = [];
  for (let i = 0; i < 4; i++) {
    a.push(<Shimmer key={i} />);
  }
  return a;
}

export default ExploreProduct;
