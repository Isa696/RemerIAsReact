import { useEffect, useState } from "react";
import ProductCard from "../component/explore/ProductCard";
import fetchFromApi from "../utils/fetchFromApi";
import fetchCategories from "../utils/fetchCategories";
import SelectCategory from "../component/explore/SelectCategory";
import PriceFilter from "../component/explore/PriceFilter";
import "./ExploreProducts.css";
import { useParams } from "react-router-dom";
import Shimmer from "../component/shimmer/Shimmer";

function ExploreProduct() {
  const [products, setProducts] = useState([]);
  const [priceFlter, setPriceFilter] = useState("default");
  const [categories, setCategories] = useState([]);
  const [checkBoxState, setCheckBoxState] = useState({});
  let { category } = useParams();
  // Fetch categories and set initial state
  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      
      // Initialize checkBoxState with all categories set to false
      const initialCheckBoxState = fetchedCategories.reduce((acc, cat) => {
        acc[cat.toLowerCase()] = false;
        return acc;
      }, {});
      setCheckBoxState(initialCheckBoxState);
    };
    getCategories();
  }, []);

    // Handle category from URL params
  useEffect(() => {
    if (!categories.length) return;

    const resetCheckBoxState = categories.reduce((acc, cat) => {
      acc[cat.toLowerCase()] = false;
      return acc;
    }, {});

    if (category === "all") {
      setCheckBoxState(resetCheckBoxState);
      return;
    }
    setCheckBoxState({ ...resetCheckBoxState, [category]: true });
  }, [category, categories]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetchFromApi("products");
        if (Array.isArray(res)) {
          // Filter products based on selected categories
          const filteredProducts = res.filter(product => {
            const selectedCategories = Object.entries(checkBoxState)
              .filter(([_, isChecked]) => isChecked)
              .map(([category]) => category);

            // If no categories selected, show all products
            if (selectedCategories.length === 0) return true;

            // Return products that match selected categories
            return selectedCategories.includes(product.category.toLowerCase());
          });

          setProducts(filteredProducts);
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
    const { name, checked } = e.target;
    setCheckBoxState(prev => ({ ...prev, [name]: checked }));
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
        categories={categories}
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
