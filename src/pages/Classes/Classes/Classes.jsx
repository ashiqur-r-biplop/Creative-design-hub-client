import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [currentRole, setCurrentRole] = useState("");
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:5000/AllClassByViewr")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((DbUsers) => {
        const currentUser = DbUsers.find(
          (DbUser) => DbUser?.email === user?.email
        );
        console.log(currentUser);
        setCurrentRole(currentUser?.role);
      });
  }, [user]);
  return (
    <div>
      <div className="container mx-auto mb-10">
        <h2 className="text-4xl font-semibold text-center py-5 "></h2>
        <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold my-5 md:mt-20 mb-12">
          All <span className="text-[#1dcdbc]">Classes</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((popular, i) => (
            <div
              key={i}
              className={`card card-compact md:w-96 mx-4 bg-base-100 shadow-xl ${
                popular?.availableSeats === 0 && "bg-red-100"
              }`}
            >
              <figure>
                <img src={popular?.imgURL} alt="Shoes" />
              </figure>
              <div className="card-body relative">
                {popular?.availableSeats === 0 && (
                  <p className="bg-[#1dcdbc] absolute -top-8 py-2 px-3 font-semibold text-gray-900 shadow-lg">
                    {" "}
                    Full fill up Seats
                  </p>
                )}
                <h2 className="card-title">{popular?.className}</h2>
                <p>Price: ${popular?.price}</p>
                <p>Available Seats: {popular?.availableSeats}</p>
                <button
                  onClick={() => handleClassSelect(popular)}
                  className="btn btn-outline btn-accent"
                  disabled={
                    popular?.availableSeats == 0 ||
                    currentRole == "admin" ||
                    currentRole == "instructor"
                  }
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
