import React from "react";
import student1 from "../../../assets/TopStudent/student-1.jpg";
import student2 from "../../../assets/TopStudent/student-2.jpg";
import student3 from "../../../assets/TopStudent/student-3.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import Tilt from "react-parallax-tilt";
import TextGlitch from "react-text-glitch";

const TopStudent = () => {
  AOS.init();
  return (
    <div className="container mx-auto my-20">
      <h1 className="section-title" data-aos="fade-down-left">
        Our{" "}
        <span className="text-[#267E23]">
          <TextGlitch> Top Student</TextGlitch>
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto px-5">
        <div
          className="border w-full md:w-2/3 px-3 py-4 mx-auto rounded-md"
          data-aos="flip-left"
        >
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.9}
            glareColor="#267e2386"
            glarePosition="all"
          >
            <div className="relative">
              <img
                src={student1}
                className="w-60 h-60 rounded-full mx-auto"
                alt=""
              />
              <p className="bg-[#267E23] inline absolute top-[10%] right-[10%] p-3 text-white rounded-full">
                1ST
              </p>
            </div>
            <div className="pt-5 pb-1 space-y-2 ps-7">
              <h1 className="card-title">Name: Noah Wilson</h1>
              <p>Age: 18 </p>
              <p>Gender: Male </p>
              <p>Top ID: 56789012</p>
              <p>Class Name: Digital Art</p>
            </div>
          </Tilt>
        </div>

        <div
          className="border w-full md:w-2/3 px-3 py-4 mx-auto rounded-md"
          data-aos="zoom-in"
        >
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.9}
            glareColor="#267e2386"
            glarePosition="all"
          >
            <div className="relative">
              <img
                src={student2}
                className="w-60 h-60 rounded-full mx-auto"
                alt=""
              />
              <p className="bg-[#267E23] inline absolute top-[10%] right-[10%] px-3 py-[14px]  text-white rounded-full">
                2nd
              </p>
            </div>
            <div className="pt-5 pb-1 space-y-2 ps-7">
              <h1 className="card-title">Name: Emma Thompson</h1>
              <p>Age: 16 </p>
              <p>Gender: Female </p>
              <p>Top ID: 12345678</p>
              <p>Class Name: Drawing</p>
            </div>
          </Tilt>
        </div>
        <div
          className="border w-full md:w-2/3 px-3 py-4 mx-auto rounded-md "
          data-aos="flip-right"
        >
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.9}
            glareColor="#267e2386"
            glarePosition="all"
          >
            <div className="relative">
              <img
                src={student3}
                className="w-60 h-60 rounded-full mx-auto"
                alt=""
              />
              <p className="bg-[#267E23] inline absolute top-[10%] right-[10%] p-3 text-white rounded-full">
                3rd
              </p>
            </div>
            <div className="pt-5 pb-1 space-y-2 ps-7">
              <h1 className="card-title">Name: Sophia Davis</h1>
              <p>Age: 17 </p>
              <p>Gender: Female </p>
              <p>Top ID: 98765432</p>
              <p>Class Name: Drawing</p>
            </div>
          </Tilt>
        </div>
      </div>
    </div>
  );
};

export default TopStudent;
