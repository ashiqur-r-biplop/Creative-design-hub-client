import React from "react";
import contactImg from "../../assets/contact/contact.jpg";
import { useState } from "react";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Contact = () => {
  const [checked, setChecked] = useState(false);
  const [userRole, setUserRole] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleContact = (even) => {
    even.preventDefault();
    const from = even.target;
    const studentName = from.studentName?.value;
    const studentEmail = from.studentEmail?.value;
    const InstructorName = from.InstructorName?.value;
    const InstructorEmail = from.InstructorEmail?.value;
    const message = from.message?.value;
    const sendMassage = {
      studentName,
      studentEmail,
      InstructorName,
      InstructorEmail,
      message,
      Agree: checked,
    };
    if (user) {
      Swal.fire({
        title: "You Want to massage your instructor?",
        text: "Please Confirm.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#267E23",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(
            "https://creativadesignhub-clinet-default-rtdb.firebaseio.com/Chatbox.json",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sendMassage),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.name) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Send Massage Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                from.reset();
              }
            });
        }
      });
    } else {
      Swal.fire({
        title: "You Want to message your instructor?",
        text: "Please Login.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#267E23",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    fetch("https://creativa-design-hub-server-site.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        const currentUser = data.find((d) => d.email === user.email);
        setUserRole(currentUser.role);
      });
  }, []);

  return (
    <div className="container mx-auto lg:py-16 overflow-x-hidden">
      <h1 className="section-title py-6">
        <span className="text-[#267E23]">
          Contact
        </span>{" "}
        Us
      </h1>
      <div className="flex lg: flex-col-reverse lg:flex-row justify-center items-start  px-3">
        <div className="lg:w-1/2 space-y-5">
          <h1 className="lg:text-6xl text-2xl font-semibold">
            Contact with Teacher
          </h1>
          <p className="lg:w-3/5">
            If you want to contact your teacher, just send him a message with
            his class name and his email.
          </p>
          <img src={contactImg} className="w-full lg:w-3/5" alt="" />
        </div>
        <form onSubmit={handleContact} className="lg:w-1/2">
          <div className="lg:flex justify-between items-center w-full">
            <input
              className="border w-full lg:w-5/12"
              type="text"
              placeholder="Your Name "
              name="studentName"
              id=""
              required
            />
            <input
              className="border w-full lg:w-5/12 "
              type="email"
              placeholder="Your Email"
              name="studentEmail"
              id=""
              required
            />
          </div>

          <div className="lg:flex justify-between items-center">
            <input
              className="border  w-full lg:w-5/12 "
              type="text"
              placeholder="Instructor Name"
              name="InstructorName"
              id=""
              required
            />
            <input
              className="border w-full lg:w-5/12 "
              type="email"
              placeholder="Instructor Email"
              name="InstructorEmail"
              id=""
              required
            />
          </div>
          <input
            className="border"
            type="number"
            placeholder="Enter you Number"
            required
          />
          <textarea
            name="message"
            id=""
            placeholder="Message"
            cols="30"
            rows="10"
            className="w-full border ps-2 pt-2"
            required
          ></textarea>

          <div className="flex justify-start items-start my-3">
            <div>
              <input onChange={handleCheck} type="checkbox" name="" id="" />
            </div>
            <p className="ms-1">
              I agree that My Instructor may contact me at the email address or
              phone number above
            </p>
          </div>
          <input
            disabled={
              !checked || userRole === "instructor" || userRole === "admin"
            }
            type="submit"
            className="primary-btn btn"
            name=""
            id=""
          />
        </form>
      </div>
    </div>
  );
};

export default Contact;
