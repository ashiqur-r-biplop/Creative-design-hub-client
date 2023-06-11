import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/TopInstructor")
      .then((res) => res.json())
      .then((data) => setInstructors(data));
  }, []);
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold my-5 md:mt-20 mb-12">
        Our <span className="text-[#1dcdbc]">Popular instructor</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {instructors.map((instructor) => (
          <div
            key={instructor?._id}
            className="card md:w-96 mx-3 bg-base-100 shadow-xl"
          >
            <figure className="px-10 pt-10">
              <img
                src={instructor?.photo}
                alt="Shoes"
                className="rounded-xl w-full h-full"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{instructor?.name}</h2>
              <p className="bg-[#1dcdbc] text-white px-2 py-1 rounded-lg">
                {instructor?.role}
              </p>
              <p>{instructor?.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
