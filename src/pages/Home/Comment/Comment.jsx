import React, { useContext, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "./Comment.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { TestimonialContext } from "../Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
const Comment = () => {
  AOS.init();
  const [rating, setRating] = useState(0);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const { setRefetch, reFetch } = useContext(TestimonialContext);
  const { user } = useContext(AuthContext);
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleCheck = (e) => {
    setCheck(e?.target?.checked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const comment = form.comment.value;
    const checked = check;
    // console.log(check);
    const ratings = rating;
    const ourComment = {
      name,
      email,
      comments: comment,
      ratings,
      checked,
      Photo: user?.photoURL,
    };
    console.log(ourComment);
    if (user) {
      fetch("https://creativa-design-hub-server-site.vercel.app/comment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(ourComment),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result?.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Comment Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            form.reset();
            setRefetch(!reFetch);
          }
        });
    } else {
      Swal.fire({
        title: "Are you sure You want to comment this post ?",
        text: "Please Login !!!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#267E23",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log in",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  return (
    <div className="container mx-auto my-10">
      {" "}
      <h1 className="section-title" data-aos="fade-down-left">
        Our <span className="text-[#267E23]">Comment</span>
      </h1>
      <div className="m-3">
        <h1 className="uppercase md:text-3xl text-xl  font-bold">
          Leave a Reply
        </h1>
        <p className="text-xl my-1">
          You email address will no be publish. Required fields are marked.
        </p>
        <div className="flex items-center my-1">
          <span className="me-2 text-2xl text-[#267E23] ">Rating </span>{" "}
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#267E23"
          />
        </div>
        <form
          onSubmit={handleComment}
          className="flex mx-auto flex-col justify-start items-start w-full"
        >
          <div className="allComment-input mx-auto">
            <textarea
              style={{ borderRadius: "5px" }}
              className="w-full md:w-3/4"
              name="comment"
              id=""
              cols="30"
              rows="10"
              placeholder="Your Comment"
              required
            ></textarea>
            <input
              style={{ borderRadius: "5px" }}
              className="w-full md:w-3/4"
              type="text"
              defaultValue={user?.displayName}
              name="name"
              placeholder="Your Name"
              required
            />
            {user ? (
              <input
                style={{ borderRadius: "5px" }}
                defaultValue={user?.email}
                className="w-full md:w-3/4"
                name="email"
                type="Email"
                disabled
                placeholder="Your Email"
                required
              />
            ) : (
              <input
                style={{ borderRadius: "5px" }}
                defaultValue={user?.email}
                className="w-full md:w-3/4"
                name="email"
                type="Email"
                placeholder="Your Email"
                required
              />
            )}
          </div>
          <div className="flex justify-start items-start my-3">
            <div>
              <input type="checkbox" onChange={handleCheck} name="" id="" />
            </div>
            <p className="ms-1">
              Save my name, email and website in this browser for the next time
              I comment.
            </p>
          </div>
          <button
            style={{ cursor: "pointer" }}
            type="submit"
            className="bg-[#013855] text-[#fff] px-4 py-3 md:px-10 md:text-center md:py-4 rounded-full font-semibold flex items-center uppercase"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
