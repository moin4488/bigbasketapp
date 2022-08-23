import React, { Component, useEffect, useState } from "react";
// import items from "../data/items.json";
import getProducts from "../API/GetProductAPI";
import BestSellerStore from "./BestSellerStore";

const BestSeller = () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    //getProducts is api which retrieves products from the firestore database
    getProducts(setProducts);
    // console.log(products);
  }, []);

  return (
    <div
      style={{ backgroundColor: "#f7f7f7", margin: "0px 50px 0px" }}
      className="border rounded p-4"
    >
      <h3>All Products</h3>
      <div className="d-flex flex-wrap justify-content-between">
        {products.map((item) => (
          <div
            className="p-2 mt-3"
            style={{ backgroundColor: "white", width: "200px" }}
            key={item.id}
          >
            <BestSellerStore {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
