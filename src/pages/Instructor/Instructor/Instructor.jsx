import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useTitle from "../../../Hook/UseTitle";

const Instructor = () => {
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
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  return (
    <div className="mb-10">
      <div className="container mx-auto pb-10">
        <h2 className="text-4xl font-semibold text-center py-5 "></h2>
        <h1 className="section-title">
          Our <span className="text-[#267E23]">instructor</span>
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
    </div>
  );
};

export default Instructor;
