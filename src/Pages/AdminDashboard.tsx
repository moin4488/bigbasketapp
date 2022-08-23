import { Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
import "../css/adminDashboard.css";
import { auth } from "../Firebase/config";

const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      console.log(data?.email);
      if (!data) {
        navigate("/");
      }
    });
  }, []);
  return (
    <div style={{ margin: "100px 0 0" }}>
      <h2 className="text-center">Admin Panel</h2>
      <div
        className="d-flex justify-content-evenly mt-5 bg-success align-items-center"
        id="adminMainDiv"
      >
        {/* <Button variant="contained">Add Product</Button>
        <Button>Manage Banner</Button> */}
        <Link id="link" to="/admin-dashboard/add-product">
          <Button id="NavBtn" variant="contained">
            Add Product
          </Button>
        </Link>
        <Link id="link" to="/admin-dashboard/add-banner">
          <Button id="NavBtn" variant="contained">
            Add Banner
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
