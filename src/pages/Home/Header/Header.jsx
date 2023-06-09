import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../../assets/heroImg/hero-1.jpg";
import img2 from "../../../assets/heroImg/hero-2.jpg";
import img3 from "../../../assets/heroImg/hero-3.jpg";

const Header = () => {
  return (
    <div>
      <Carousel autoPlay className="text-center">
        <div>
          <img src={img1} alt="" />
          <div className="absolute top-1/2 w-full">
            <p className="text-center text-3xl md:text-7xl font-semibold text-white  md:w-2/3 mx-auto">
              We will Find you The best nanny for your little one
            </p>
          </div>
        </div>
        <div>
          <img src={img2} alt="" />{" "}
          <div className="absolute top-1/2 w-full">
            <p className="text-center text-3xl md:text-7xl font-semibold text-white md:w-2/3 mx-auto">
              Providng best Quality child care Since 1985
            </p>
          </div>
        </div>
        <div>
          <img src={img3} alt="" />{" "}
          <div className="absolute top-1/2 w-full">
            {" "}
            <p className="text-center text-3xl md:text-7xl font-semibold text-white md:w-2/3 mx-auto">
              Find Your Dreams
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Header;
