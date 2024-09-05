import React, { useEffect, useState } from "react";

import AddNewProduct from "../Components/AddNewProduct";
import ProductsTable from "../Components/ProductsTable";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://66a7a18753c13f22a3d08204.mockapi.io/product"
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setAllProducts(data);
        } else if (data && typeof data === "object") {
          setAllProducts(Object.values(data));
        } else {
          setAllProducts([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };
  return (
    <>
      <AddNewProduct getAllProducts={getAllProducts} />

      <ProductsTable allProducts={allProducts} getAllProducts={getAllProducts} />
    </>
  );
}


