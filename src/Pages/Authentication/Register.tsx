import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import "../../css/register.css";
import { auth, fs } from "../../Firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
// import LoginPopup from "./LoginPopup";
import Login from "./Login";
import RegisterPopup from "./RegisterPopup";

const Register = () => {
  const navigate = useNavigate();
  //   localStorage.setItem("logged", "false");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [check, setCheck] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // const handleLoginClick = ()=>{
  //   navigate("/Basket", {state:{isLogin:"true"}})
  // }

  const onSubmit = async (evt) => {
    evt.preventDefault();
    console.log(evt);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        await setDoc(doc(fs, "demoUsers", res.user.uid), {
          Name: name,
          Phone: phone,
          Email: email,
          Password: password,
          Admin: check,
        })
          .then(() => {
            console.log("success");
            setEmail("");
            setPassword("");
            setName("");
            setPhone("");
            navigate("/checkout");
            // if (check === "true") {
            //   navigate("/Add-Product");
            // } else {
            //
            // }
          })
          .catch((error) => {
            console.log(error.message);
          });
        console.log(res);
        // localStorage.setItem("logged","true")
        // navigate("/Basket", { state: { userEmail: email } });
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <div>
      <div className="mainDiv">
        <div className="divForm">
          <form autoComplete="off" className="registerForm" onSubmit={onSubmit}>
            <div className="d-flex flex-column align-items-stretch">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(evt) => setName(evt.target.value)}
              />
            </div>
            <div className="d-flex flex-column align-items-stretch">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                className="form-control"
                value={phone}
                onChange={(evt) => setPhone(evt.target.value)}
              />
            </div>
            <div className="d-flex flex-column align-items-stretch">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                required
              />
            </div>
            <div className="">
              <input
                id="checkbox"
                style={{ width: "20px" }}
                type="checkbox"
                required
              />
              <label htmlFor="checkbox">
                I agree to these <a href="#">Terms and Conditions</a>.
              </label>
            </div>

            <button className="btn btn-success btn-md" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
      <div
        style={{ margin: "10px 0 0" }}
        className="d-flex text-center align-items-center"
      >
        Already have an account?{" "}
        <RegisterPopup name="Login">
          <Login />
        </RegisterPopup>
      </div>
      {errorMsg && (
        <>
          <br />
          <div className="bg-danger text-center">{errorMsg}</div>
        </>
      )}
    </div>
  );
};

export default Register;
