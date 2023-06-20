import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../Hook/UseTitle";
import AOS from "aos";
import "aos/dist/aos.css";
import Tilt from "react-parallax-tilt";
const Classes = () => {
  AOS.init();

  useTitle("All Class");
  const [classes, setClasses] = useState([]);
  const [currentRole, setCurrentRole] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    fetch("https://creativa-design-hub-server-site.vercel.app/AllClassByViewr")
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("https://creativa-design-hub-server-site.vercel.app/users")
      .then((res) => res.json())
      .then((DbUsers) => {
        const currentUser = DbUsers.find(
          (DbUser) => DbUser?.email === user?.email
        );
        // console.log(currentUser);
        setCurrentRole(currentUser?.role);
        setLoading(false);
      });
  }, [user]);

  const handleClassSelect = (selected) => {
    if (user) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't to select this Class!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#267E23",
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
            feedback: selected?.feedback || "",
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
        confirmButtonColor: "#267E23",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="overflow-x-hidden">
      <div className="container mx-auto mb-10">
        <h2 className="text-4xl font-semibold text-center py-5 "></h2>
        <h1 className="section-title">
          Our <span className="text-[#267E23]">Classes</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((popular, i) => (
            <Tilt key={i}>
              <div
                data-aos="fade-up"
                className={`card-compact rounded-lg md:w-96 mx-4 bg-base-100 shadow-xl ${
                  popular?.availableSeats === 0 && "!bg-[#267e2380] text-black"
                }`}
              >
                <figure className="relative">
                  <img
                    className="w-full h-64 shadow-lg shadow-[#fff]"
                    src={popular?.imgURL}
                    alt="Shoes"
                  />

                  {popular?.availableSeats === 0 && (
                    <>
                      <p className="bg-[#9b0101] absolute top-4 right-4 py-2 px-3 font-semibold text-white shadow-lg uppercase rounded-lg">
                        {" "}
                        Not Available Seats
                      </p>
                    </>
                  )}
                </figure>
                <div className="card-body ">
                  <h2 className="card-title">{popular?.className}</h2>
                  <p>Price: ${popular?.price}</p>
                  <p>Available Seats: {popular?.availableSeats}</p>
                  <p>Enroll: {popular?.enrollStudent} </p>
                  <button
                    onClick={() => handleClassSelect(popular)}
                    className="primary-btn btn"
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
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
