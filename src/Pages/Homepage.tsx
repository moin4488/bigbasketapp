import React from "react";
import BestSeller from "../Components/BestSeller";
import Footer from "../Components/Footer";
import Slider from "../Components/Slider";

//first component to be displayed after the application loads
const Homepage = () => {
  return (
    <div>
      {/* slider component displays banners in homepage */}
      <Slider/>
      <div className="container p-5">
        {/* BestSeller render all the products present in the database */}
        <BestSeller />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
