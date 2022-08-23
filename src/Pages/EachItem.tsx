import { Card, CardContent, CardMedia, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShoppingCart } from "../context/CartContext";
// import items from "../data/items.json";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import { collection, getDocs } from "firebase/firestore";
// import { fs } from "../Firebase/config";
import getProducts from "../API/GetProductAPI";

const EachItem = () => {
  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    cartItems,
    getItemQuantity,
  } = useShoppingCart();

  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    getProducts(setProducts);
    // console.log(products);
  }, []);

  let params = useParams();
  var id = params.id; //this will return id in the string form
  var eId: number = parseInt(id!);
  const quantity: number = getItemQuantity(eId);
  const item = products.find((i) => i.id === eId);
  return (
    <div
      className="d-flex justify-content-around   "
      style={{ margin: "100px 0 0" }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          image={item?.imgUrl}
          height="300"
          width="300"
        />
        <CardContent>{item?.desc}</CardContent>
      </Card>
      <div>
        <div className="d-flex flex-column">
          <p>{item?.name}</p>

          <p>
            <CurrencyRupeeIcon />
            {item?.price}
          </p>
        </div>
        {quantity === 0 ? (
          <p>
            <Button
              id="addToCart"
              size="small"
              variant="outlined"
              className="text-danger border-danger"
              onClick={() => increaseCartQuantity(eId)}
            >
              Add to cart
            </Button>
          </p>
        ) : (
          <div>
            <Button
              className=" rounded-0 border border-dark text-dark"
              style={{
                maxWidth: "40px",
                maxHeight: "40px",
                minWidth: "40px",
                minHeight: "30px",
              }}
              size="small"
              variant="outlined"
              onClick={() => increaseCartQuantity(eId)}
            >
              +
            </Button>
            <Button
              variant="outlined"
              className="rounded-0 border border-dark text-dark"
              style={{
                maxWidth: "40px",
                maxHeight: "40px",
                minWidth: "40px",
                minHeight: "30px",
              }}
              size="small"
            >
              {quantity}
            </Button>
            <Button
              className="rounded-0 border border-dark text-dark"
              style={{
                maxWidth: "40px",
                maxHeight: "40px",
                minWidth: "40px",
                minHeight: "30px",
              }}
              size="small"
              variant="outlined"
              onClick={() => decreaseCartQuantity(eId)}
            >
              -
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EachItem;
