import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "@mui/material";
import { useShoppingCart } from "../context/CartContext";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import "../css/store.css";

type BestSellerStoreProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

function BestSellerStore({ id, name, price, imgUrl }: BestSellerStoreProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity: number = getItemQuantity(id);
  return (
    <Card  style={{ height: "350px" }}>
      <Link to={`/product/${id}`}>
        <Card.Img
          variant="top"
          src={imgUrl}
          height="max-content"
          style={{ objectFit: "cover" }}
        ></Card.Img>
      </Link>

      <Card.Body>
        <div style={{height:"90px"}} className="d-flex flex-row flex-wrap">
          <p>{name}</p>
          <br/>
          <p>
            <CurrencyRupeeIcon /> {price}
          </p>
        </div>

        <div className="d-flex align-items-center justify-content-center">
          {quantity === 0 ? (
            <p>
              <Button
                id="addToCart"
                size="small"
                variant="outlined"
                className="text-danger border-danger" 
                onClick={() => increaseCartQuantity(id)}
              >
                Add to cart
              </Button>
            </p>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <Button
                id="addToCartPlus"
                className="bg-danger rounded-0"
                style={{
                  maxWidth: "40px",
                  maxHeight: "40px",
                  minWidth: "40px",
                  minHeight: "30px",
                }}
                size="small"
                variant="contained"
                onClick={() => increaseCartQuantity(id)}
              >
                +
              </Button>
              <Button
                id="addToCartPlus"
                variant="outlined"
                className="text-danger border-danger rounded-0"
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
                id="addToCartPlus"
                className="bg-danger rounded-0"
                style={{
                  maxWidth: "40px",
                  maxHeight: "40px",
                  minWidth: "40px",
                  minHeight: "30px",
                }}
                size="small"
                variant="contained"
                onClick={() => decreaseCartQuantity(id)}
              >
                -
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default BestSellerStore;
