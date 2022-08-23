
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Homepage from "./Pages/Homepage";
import { ShoppingCartProvider } from "./context/CartContext";
import ShoppingCart from "./Pages/ShoppingCart";
import Header from "./Components/Header";
import EachItem from "./Pages/EachItem";
import SearchPage from "./Pages/SearchPage";
import Category from "./Pages/Category";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import AddProduct from "./Pages/AddProduct";
import RegisterPopup from "./Pages/Authentication/RegisterPopup";
import Checkout from "./Pages/Checkout";
import AdminDashboard from "./Pages/AdminDashboard";
import AddBanner from "./Pages/AddBanner";

function App() {
  return (
    
    //contains all the routes in the application
    <ShoppingCartProvider>
      {/* header is present in all the pages so rendered directly in app.tsx */}
      <Header/>   
      <Container fluid>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/Login" element={<RegisterPopup><Login/></RegisterPopup>} /> */}
          <Route path="/Register" element={<RegisterPopup name="Register"><Register/></RegisterPopup>}/>
          <Route path="/basket" element={<ShoppingCart/>}/>
          <Route path="/product/:id" element={<EachItem/>}></Route>
          <Route path="/search/:id" element={<SearchPage/>}></Route>
          <Route path="/category/:id" element={<Category/>}></Route>
          <Route path="/admin-dashboard/add-product" element={<AddProduct/>}></Route>
          <Route path="/admin-dashboard/add-banner" element={<AddBanner/>}></Route>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
          
        </Routes>
       </Container>
     </ShoppingCartProvider>
  ); 
}

export default App;
