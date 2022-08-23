import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import getBanner from "../API/BannerAPI";
// import Item from './Item'
import "../css/slider.css";

const Slider = () => {
  const [banner, setBanner] = useState<any>([]);
  useEffect(() => {
    getBanner(setBanner);
  }, []);
  return (
    <Carousel variant="dark" className="Banner">
      {banner.map((i) => (
        <Carousel.Item key={i.id}>
          <Link to={`/product/${i.ProductURL}`}>
            <img className="d-block w-100" src={i.imgUrl} alt="First slide" />
            <Carousel.Caption>
              {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
