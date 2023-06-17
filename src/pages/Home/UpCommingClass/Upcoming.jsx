import React from "react";
import "./UpComing.css";
import { useEffect } from "react";
import { useState } from "react";

const Upcoming = () => {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  useEffect(() => {
    fetch("https://creativa-design-hub-server-site.vercel.app/upcomingClasses")
      .then((res) => res.json())
      .then((data) => setUpcomingClasses(data));
  }, []);
  return (
    <>
      {upcomingClasses.length > 0 && (
        <div className="lg:relative">
          <div className="upcomimg-section lg:h-screen text-white z-0 rounded-sm"></div>
          <div className="flex justify-center items-center z-10 lg:absolute lg:top-[5%] mx-auto w-full">
            <div className="container mx-auto">
              <h1 className="section-title text-white">
                Our <span className="text-[#28b323] ">Upcoming classes</span>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-10 px-5">
                {upcomingClasses?.map((upcomingClass) => (
                  <div key={upcomingClass?._id} className="upcomimg-classes bg-white shadow-lg shadow-black ">
                    <img
                      src={upcomingClass?.imgURL}
                      className="upcomimg-classes w-full h-64"
                      alt=""
                    />
                    <div className="text-container p-9 opacity-80">
                      <h2 className="card-title bg-transparent">{upcomingClass?.className}</h2>
                      <p>Price: ${upcomingClass?.price}</p>
                      <p>Available Seats: {upcomingClass?.availableSeats}</p>
                      <p>Enroll: {upcomingClass?.enrollStudent} </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Upcoming;
