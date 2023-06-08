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
        <div
          style={{
            backgroundImage: `url(${img1})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backgroundBlendMode: "multiply",
          }}
          className="bg-[#9184847e]"
        >
          <img src={img1} alt="" />
          <p
            style={{ height: "100vh" }}
            className="text-white flex justify-center items-center text-3xl font-bold md:text-6xl md:w-1/2 md:mx-auto p-2"
          >
            We will Find you The best nanny for your little one
          </p>
        </div>
        <div
          style={{
            backgroundImage: `url(${img2})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backgroundBlendMode: "multiply",
          }}
          className="bg-[#9184847e]"
        >
          <img src={img2} alt="" />{" "}
          <p
            style={{ height: "100vh" }}
            className="text-white flex justify-center items-center text-3xl font-bold md:text-6xl md:w-1/2 md:mx-auto p-2"
          >
            Providng best Quality child care Since 1985
          </p>
        </div>
        <div
          style={{
            backgroundImage: `url(${img3})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backgroundBlendMode: "multiply",
          }}
          className="bg-[#9184847e]"
        >
          <img src={img3} alt="" />{" "}
          <p
            style={{ height: "100vh" }}
            className="text-white flex justify-center items-center text-3xl font-bold md:text-6xl md:w-1/2 md:mx-auto p-2"
          >
            Find Your Dreams
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default Header;
