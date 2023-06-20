import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Tilt from "react-parallax-tilt";
const AllUpcomingClasses = () => {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      "https://creativa-design-hub-server-site.vercel.app/allUpcomingClasses"
    )
      .then((res) => res.json())
      .then((data) => {
        setUpcomingClasses(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <>
      {upcomingClasses.length > 0 && (
        <div className="lg:relative lg:py-10 py-5 overflow-x-hidden">
          <div>
            <div className="container mx-auto">
              <h1 className="section-title text-black">
                Our{" "}
                <span className="text-[#267E23] ">
                  Upcoming classes
                </span>
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-10 px-5">
                {upcomingClasses?.map((upcomingClass) => (
                  <Tilt key={upcomingClass?._id}>
                    <div className="upcomimg-classes bg-[#87997e] shadow-lg shadow-black">
                      <img
                        src={upcomingClass?.imgURL}
                        className="upcomimg-classes w-full h-64 hover:scale-125 transition-all"
                        alt=""
                      />
                      <div className="text-container p-9 opacity-80">
                        <h2 className="card-title bg-transparent">
                          {upcomingClass?.className}
                        </h2>
                        <p>Price: ${upcomingClass?.price}</p>
                        <p>Available Seats: {upcomingClass?.availableSeats}</p>
                        <p>Enroll: {upcomingClass?.enrollStudent} </p>
                      </div>
                    </div>
                  </Tilt>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllUpcomingClasses;
