import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../../assets/heroImg/hero-1.jpg";
import img2 from "../../../assets/heroImg/hero-2.jpg";
import img3 from "../../../assets/heroImg/hero-3.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  AOS.init({
    offset: 120, // offset (in px) from the original trigger point
    delay: 500, // values from 0 to 3000, with step 50ms
    duration: 500, // values from 0 to 3000, with step 50ms
    easing: "ease-in",
    animatedClassName: "aos-animate",
  });
  return (
    <div>
      <Carousel autoPlay className="text-center">
        <div>
          <img src={img1} alt="" data-aos="fade-down-left" />
          <div className="absolute lg:top-[45%] md:top-[30%] top-[20%] w-full">
            <p
              className="text-center text-3xl md:text-7xl font-semibold text-white  md:w-2/3 mx-auto"
              data-aos="fade-down-left"
            >
              We will Find you The best nanny for your little one
            </p>
          </div>
        </div>
        <div>
          <img src={img2} alt="" />{" "}
          <div className="absolute lg:top-[45%] md:top-[30%] top-[25%] w-full">
            <p data-aos="fade-down-left" className="text-center text-3xl md:text-7xl font-semibold text-white md:w-2/3 mx-auto">
              Providng best Quality child care Since 1985
            </p>
          </div>
        </div>
        <div>
          <img src={img3} alt="" />{" "}
          <div className="absolute lg:top-[45%] md:top-[30%] top-[40%] w-full">
            {" "}
            <p data-aos="fade-down-left" className="text-center text-3xl md:text-7xl font-semibold text-white md:w-2/3 mx-auto">
              Find Your Dreams
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Header;
