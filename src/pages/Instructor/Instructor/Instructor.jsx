import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useTitle from "../../../Hook/UseTitle";
import AOS from "aos";
import "aos/dist/aos.css";
import Tilt from "react-parallax-tilt";


const Instructor = () => {
  AOS.init();
  useTitle("All Instructor");
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://creativa-design-hub-server-site.vercel.app/allInstructor")
      .then((res) => res.json())
      .then((data) => {
        setInstructors(data);
        setIsLoading(false);
      });
  }, []);
  // console.log(instructors);
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="pb-20 overflow-x-hidden">
      <div className="container mx-auto pb-10">
        <h2 className="text-4xl font-semibold text-center py-5 "></h2>
        <h1 className="section-title">
          Our <span className="text-[#267E23] ">instructor</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto">
          {instructors.map((instructor) => (
            <div
              key={instructor?._id}
              className="card md:w-96 mx-3 relative lg:bg-transparent shadow lg:shadow-none rounded-lg lg:rounded-none"
            >
              <figure className="px-10 pt-10">
                <img
                  src={instructor?.photo}
                  alt="instructor Photos"
                  className="rounded-xl w-full h-60"
                  data-aos="fade-right"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                />
              </figure>
              <div
                data-aos="fade-left"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                className="lg:absolute static lg:top-[65%] lg:-right-[30%] lg:bg-white lg:w-[300px] shadow-md rounded-lg  lg:shadow-[#267e2363] lg:px-5 lg:py-3 px-[40px] py-[40px]"
              >
                <Tilt
                  glareEnable={true}
                  glareMaxOpacity={0.9}
                  glareColor="lightblue"
                  glarePosition="all"
                >
                  <p className="bg-[#267E23] text-white px-2 py-1 inline-block rounded-lg">
                    {instructor?.role}
                  </p>
                  <h2 className="card-title">{instructor?.name}</h2>
                  <p> Contact: {instructor?.email}</p>
                </Tilt>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructor;
