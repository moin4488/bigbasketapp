import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, fs } from "../Firebase/config";
import "../css/checkout.css";
import { useShoppingCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cardSecurityCode, setCardSecurityCode] = useState("");
  const [cardBillingAdd, setCardBillingAdd] = useState("");
  const { cartItems } = useShoppingCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("Order Placed Successfully :)");
    setCardBillingAdd("");
    setCardExpiryDate("");
    setCardHolderName("");
    setCardNumber("");
    setCardSecurityCode("");
    setTimeout(() => {
      setSuccessMsg("");
    }, 4000);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (data) => {
      console.log(data?.email);
      if (!data) {
        navigate("/basket");
      }
      if (data) {
        await getDoc(doc(fs, "demoUsers", data!.uid)).then((res) => {
          setUserName(res.data()?.Name);
          setUserEmail(res.data()?.Email);
          setUserPhone(res.data()?.Phone);
        });
      }
    });
  }, []);

  return (
    <div style={{ margin: "80px 0px 20px" }}>
      {cartItems.length === 0 ? (
        <div
          className="d-flex align-items-center justify-content-center text-center bg-dark text-white"
          style={{ height: "100px", fontSize: "30px" }}
        >
          Continue Shopping
        </div>
      ) : (
        <>
          <div style={{ margin: "0px 250px 0px" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center" colSpan={2}>
                    User Details
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <th>Name</th>
                  <td>{userName}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{userEmail}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{userPhone}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div id="cardDiv">
            <div id="cardDiv2">
              <form
                className="d-flex flex-column"
                id="formDiv"
                onSubmit={handleSubmit}
              >
                <h4 className="text-center">Enter card details</h4>
                <label>Card Number:</label>
                <input
                  type="number"
                  value={cardNumber}
                  required
                  onChange={(evt) => setCardNumber(evt.target.value)}
                />
                <label>Cardholder name:</label>
                <input
                  type="text"
                  required
                  value={cardHolderName}
                  onChange={(evt) => setCardHolderName(evt.target.value)}
                />
                <label>Expiry Date:</label>
                <input
                  type="text"
                  required
                  placeholder="mm/yy"
                  value={cardExpiryDate}
                  onChange={(evt) => setCardExpiryDate(evt.target.value)}
                />
                <label>Security Code:</label>
                <input
                  type="password"
                  placeholder="cvv"
                  required
                  value={cardSecurityCode}
                  onChange={(evt) => setCardSecurityCode(evt.target.value)}
                />
                <label>Billing Address:</label>
                <input
                  type="address"
                  required
                  value={cardBillingAdd}
                  onChange={(evt) => setCardBillingAdd(evt.target.value)}
                />
                <br />
                <button type="submit">Place Order</button>
              </form>
            </div>
          </div>
          {successMsg && (
            <>
              <h3 id="successMsg" className="bg-success text-center mt-3">
                {successMsg}
              </h3>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;
