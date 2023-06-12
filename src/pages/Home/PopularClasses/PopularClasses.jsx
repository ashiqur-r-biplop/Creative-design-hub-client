import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const PopularClasses = () => {
  const [popularClass, setPopularClass] = useState([]);
  const [currentRole, setCurrentRole] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    fetch("http://localhost:5000/popularClasses")
      .then((res) => res.json())
      .then((data) => setPopularClass(data));
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((DbUsers) => {
        const currentUser = DbUsers.find(
          (DbUser) => DbUser?.email === user?.email
        );
        // console.log(currentUser);
        setCurrentRole(currentUser?.role);
      });
  }, [user]);

  const handleClassSelect = (selected) => {
    // console.log(selected);
    if (user) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't to select this Class!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          const selectedClass = {
            availableSeats: selected?.availableSeats,
            className: selected?.className,
            enrollStudent: selected?.enrollStudent,
            imgURL: selected?.imgURL,
            price: selected?.price,
            instructorEmail: selected?.instructorEmail,
            instructorName: selected?.instructorName,
            studentEmail: user?.email,
            state: selected?.state,
            selectedId: selected?._id,
            feedback : selected?.feedback || ""
          };
          // console.log(selectedClass);
          axiosSecure.post("/selected", selectedClass).then((data) => {
            if (data.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Add Classes Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/dashboard/selected");
            }
            // console.log(data, "70");
          });
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't to select this Class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  //   getSelectedClass
  return (
    <div className="container mx-auto ">
      <h2 className="text-4xl font-semibold text-center py-5 "></h2>
      <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold my-5 md:mt-20 mb-12">
        Our <span className="text-[#1dcdbc]">Popular Classes</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {popularClass.map((popular, i) => (
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
              <p>Enroll: {popular?.enrollStudent} </p>
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
  );
};

export default PopularClasses;
