import React, { useEffect, useState } from "react";
import CartItem from "../Components/CartItem";
import { useShoppingCart } from "../context/CartContext";
// import items from "../data/items.json";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/config";
import RegisterPopup from "./Authentication/RegisterPopup";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import getProducts from "../API/GetProductAPI";

interface LoginStateType {
  isLogin: string;
}

const ShoppingCart = () => {
  const [user, setUser] = useState<string>();
  const [products, setProducts] = useState<any>([]);
  // const [openLogin, setOpenLogin] = useState("");
  const navigate = useNavigate();
  // var location = useLocation();
  // var { isLogin } = location.state as LoginStateType;
  // var userEmail = location.state as string;
  // var logVar = false;
  const { cartItems } = useShoppingCart();
  // logVar = flag;
  // console.log(logVar);

  const handleclick = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    // var localLog = localStorage.getItem("logged");
    // if (!logVar && localLog == "false") {
    //   console.log("moin");

    //   navigate("/Register");
    // }
    // console.log(userEmail);
    
    onAuthStateChanged(auth, (data) => {
      console.log(data?.email);

      if (data?.email) {
        setUser(data?.email);
      }
    });

    getProducts(setProducts)
  }, []);

  return (
    <div style={{ margin: "100px 200px 20px", backgroundColor: "#f7f7f7" }}>
      {cartItems.length === 0 ? (
        <div
          className="d-flex align-items-center justify-content-center text-center bg-dark text-white"
          style={{ height: "100px", fontSize: "30px" }}
        >
          Continue Shopping
        </div>
      ) : (
        <>
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <div
            className="d-flex align-items-center justify-content-between bg-dark text-white p-2 mt-2"
            style={{ height: "100px", fontSize: "20px" }}
          >
            <div>
              Total: <CurrencyRupeeIcon />
              {cartItems.reduce((total, cartItem) => {
                const item = products.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)}
            </div>
            <div>
              {/* {user === "" ? (
                <RegisterPopup>
                  <Register />
                </RegisterPopup>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleclick}
                >
                  CheckOut
                </Button>
              )} */}

              {user && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleclick}
                  >
                    CheckOut
                  </Button>
                </>
              )}
              {!user && (
                <>
                  <RegisterPopup name="Register">
                    <Register />
                  </RegisterPopup>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
