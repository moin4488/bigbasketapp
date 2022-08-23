import React, { useState } from "react";
import "../../css/login.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fs } from "../../Firebase/config";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  //   localStorage.setItem("logged", "false");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = (evt) => {
    evt.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("login Successfull");

        getDoc(doc(fs, "demoUsers", res.user.uid)).then((snapshot) => {
          setSuccessMsg("Login Successfull");
          setEmail("");
          setPassword("");
          setErrorMsg("");
          if (snapshot.data()?.Admin === "true") {
            navigate("/admin-dashboard");
          } else {
            navigate("/checkout");
          }
        });
        // localStorage.setItem("logged","true")
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <div>
      <div className="loginmainDiv">
        <div className="logindivForm">
          <form className="loginForm" onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <button className="btn btn-success btn-md" type="submit">
              Login
            </button>
          </form>
        </div>
        {successMsg && (
          <>
            <br />
            <div className="bg-danger text-center">{successMsg}</div>
          </>
        )}
        {errorMsg && (
          <>
            <br />
            <div className="bg-danger text-center">{errorMsg}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
