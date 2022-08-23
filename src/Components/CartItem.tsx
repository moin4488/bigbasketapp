import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../context/CartContext";
// import items from "../data/items.json";
// import { Card } from "react-bootstrap";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import getProducts from "../API/GetProductAPI";

type CartItmeProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItmeProps) => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    getProducts(setProducts);
    // console.log(products);
  }, []);
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();
  const item = products.find((i) => i.id === id);
  if (item == null) return <div></div>;

  return (
    <div className="d-flex justify-content-between align-items-center mt-3 px-3 shadow">
      <div className="d-flex align-items-center">
        <Link to={`/product/${id}`}>
          <img
            src={item.imgUrl}
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </Link>
        <div>
          <div style={{ width: "200px" }}>{item.name}</div>
          <div>
            <CurrencyRupeeIcon />
            {item.price}
          </div>
        </div>
      </div>
      <div className="text-center">
        {
          <div className="d-flex align-items-center flex-column">
            <div className="d-flex align-items-center justify-content-center">
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
                onClick={() => increaseCartQuantity(id)}
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
                onClick={() => decreaseCartQuantity(id)}
              >
                -
              </Button>
            </div>
          </div>
        }
      </div>
      <div>
        <CurrencyRupeeIcon />
        {item.price * quantity}
      </div>
    </div>
  );
};

export default CartItem;
