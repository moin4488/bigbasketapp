import { Card, CardContent, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getProducts from "../API/GetProductAPI";
import BestSellerStore from "../Components/BestSellerStore";
// import items from "../data/items.json";

const Category = () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    getProducts(setProducts);
    // console.log(products);
  }, []);
  let params = useParams();
  var cat = params.id;
  const allItems: Array<any> = products.filter((i) => i.category === cat);
  return (
    <div className="p-5">
      {allItems.length === 0 ? (
        <div
          className="text-center bg-dark text-white p-3 mt-4"
          style={{ height: "100px", fontSize: "30px" }}
        >
          Product not found!!!
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#f7f7f7", margin: "50px 75px 0px" }}
          className="border rounded p-4"
        >
          <h3>Result for {cat}</h3>
          <div className="d-flex flex-wrap justify-content-around">
            {allItems.map((item, i) => {
              return (
                <div
                  key={i}
                  className="p-2 mt-3"
                  style={{ backgroundColor: "white", width: "200px" }}
                >
                  <BestSellerStore {...item} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
