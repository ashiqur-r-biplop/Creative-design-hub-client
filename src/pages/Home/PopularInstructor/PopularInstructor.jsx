import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("https://creativa-design-hub-server-site.vercel.app/TopInstructor")
      .then((res) => res.json())
      .then((data) => setInstructors(data));
  }, []);
  return (
    <div className="container mx-auto my-20">
      <h1 className="section-title">
        Our <span className="text-[#267E23]">Popular instructor</span>
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
                alt="Shoes"
                className="rounded-xl w-full h-60"
              />
            </figure>
            <div className="lg:absolute static lg:top-[65%] lg:-right-[30%] lg:bg-white lg:w-[300px] shadow-md rounded-lg  lg:shadow-[#267e2363] lg:px-5 lg:py-3 px-[40px] py-[40px]">
              <p className="bg-[#267E23] text-white px-2 py-1 inline-block rounded-lg">
                {instructor?.role}
              </p>
              <h2 className="card-title">{instructor?.name}</h2>
              <p> Contact: {instructor?.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
