import { StarRate } from "@mui/icons-material";
import { Card, CardContent, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
// import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getProducts from "../API/GetProductAPI";
import BestSellerStore from "../Components/BestSellerStore";
// import items from "../data/items.json";

interface StateType {
  name: string;
}

// type SearchItem = {
//   id: number;
//   nickname: string;
//   name: string;
//   imgUrl: string;
//   price: number;
//   desc: string;
// };

//displays searched item
const SearchPage = () => {
  const location = useLocation();

  // get the product name that is searched
  const { name } = location.state as StateType;

  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    getProducts(setProducts);
    // console.log(products);
  }, []);
  const allItems: Array<any> = products.filter((i) => i.nickname === name);

  return (
    <div className="p-5">
      {allItems.length === 0 ? (
        <div
          className="d-flex align-items-center justify-content-center text-center bg-dark text-white p-3 mt-4"
          style={{ height: "100px", fontSize: "30px" }}
        >
          Product not found!!!
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#f7f7f7", margin: "50px 75px 0px" }}
          className="border rounded p-4"
        >
          <h3>Result for {name}</h3>
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

export default SearchPage;
