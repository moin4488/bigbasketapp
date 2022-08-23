import { Link, useNavigate } from "react-router-dom";
import "../css/header.css";
import { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useShoppingCart } from "../context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
// import items from "../data/items.json";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/config";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RegisterPopup from "../Pages/Authentication/RegisterPopup";
import Register from "../Pages/Authentication/Register";
import getProducts from "../API/GetProductAPI";

const Header = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [options, setOptions] = useState<Array<any>>([]);
  const ulRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<any>([]);

  

  useEffect(() => {
    getProducts(setProducts)
    inputRef.current?.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("clicked");
      ulRef.current!.style.display = "flex";
    });
    document.addEventListener("click", (event) => {
      ulRef.current!.style.display = "none";
    });
    onAuthStateChanged(auth, (data) => {
      console.log(data?.email);
      if (data?.email) {
        setUserEmail(data.email);
        // console.log(userEmail);
      }
    });
  }, []);

  const Logout = async () => {
    await signOut(auth);
    setUserEmail("");
  };

  const handleChange = (evt) => {
    const options: Array<any> = products.filter((i) =>
      i.nickname.includes(evt.target.value)
    );
    const opArr: Array<any> = [];
    options.map((op, i) => {
      opArr.push(op.nickname);
    });
    // console.log(opArr);
    setOptions(opArr);
  };

  const openSearch = () => {
    navigate(`/search/${inputRef.current?.value}`, {
      state: { name: inputRef.current?.value },
    });
    inputRef.current!.value = "";
  };
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <div>
      <div className="container-fluid shadow fixed-top bg-white">
        <div className="row align-items-center px-5">
          <div className="col-sm-2 col-md-3 align-self-center d-flex align-items-center justify-content-end">
            <Link to="/">
              <img
                style={{ height: "50px", width: "51px" }}
                src="https://www.adgully.com/img/800/201808/bigbasket.jpg"
                alt=""
              />
            </Link>
            <Dropdown style={{ width: "120px" }}>
              <Dropdown.Toggle
                id="dropBtn"
                style={{ backgroundColor: "#5E9400" }}
                variant="success"
              >
                Category
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark">
                <Dropdown.Item className="text-white" href="/category/fruits">
                  Fruits & vegetable
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-white"
                  href="/category/beverages"
                >
                  Beverages
                </Dropdown.Item>
                <Dropdown.Item className="text-white" href="/category/snacks">
                  Snacks
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-white"
                  href="/category/foodgrains"
                >
                  Foodgrains
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-sm-6 col-md-6">
            <input
              id="inputSearch"
              className="w-75 px-3"
              placeholder="search for products"
              type="text"
              ref={inputRef}
              // value={m}
              onChange={handleChange}
            />
            <ul
              style={{ position: "absolute", width: "298px" }}
              className="list-group"
              ref={ulRef}
            >
              {options.map((item, i) => {
                return (
                  <button
                    key={i}
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      inputRef.current!.value = item;
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </ul>
            <Button
              onClick={() => openSearch()}
              style={{ backgroundColor: "#5E9400" }}
              className="m-2"
              variant="contained"
            >
              <SearchIcon />
            </Button>
          </div>
          <div className="d-flex col-sm-4 col-md-3">
            <button
              onClick={() => openCart()}
              id="cartBtn"
              style={{ backgroundColor: "#fae6e6", border: "solid 1px" }}
              className="btn"
            >
              {cartQuantity}
              <ShoppingCartIcon /> Items
            </button>
            {userEmail === "" ? (
              // <button className="btn" style={{ backgroundColor: "#fae6e6", border:"solid 1px" }}>
              //   <AccountCircleIcon />
              //   {/* <Link
              //     style={{ textDecoration: "none", color: "black" }}
              //     to="/Register"
              //   >
              //     Log In
              //   </Link> */}
              // </button>
              <RegisterPopup name="homeRegister">
                <Register />
              </RegisterPopup>
            ) : (
              <button
                className="btn"
                style={{
                  backgroundColor: "#fae6e6",
                  border: "solid 1px",
                  marginLeft: "10px",
                }}
                onClick={Logout}
              >
                <AccountCircleIcon />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
