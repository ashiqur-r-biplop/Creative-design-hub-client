import React, { useContext, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import "./AddClass.css";
import { useForm } from "react-hook-form";

const img_hosting_Token = import.meta.env.VITE_IMAGE_UPLOAD;
console.log(img_hosting_Token);
const AddClasses = () => {
  const { user } = useContext(AuthContext);

  const imgHostingUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_Token}`;

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // const state = "pending";
    // const enrollStudent = 0;
    console.log(data);
    const formData = new FormData();
    formData.append("image", data?.file[1]);

    fetch(imgHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => console.log(imgResponse));
  };

  // if (user?.email === sellerEmail) {
  //   fetch("", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(myToy),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (result?.insertedId) {
  //         Swal.fire({
  //           position: "top-center",
  //           icon: "success",
  //           title: "Add A Toy SuccessFull",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //         form.reset();
  //       }
  //     });
  // } else {
  //   Swal.fire({
  //     icon: "error",
  //     buttonsStyling: {
  //       color: "#1dcdbc",
  //       backgroundColor: "#1dcdbc",
  //     },
  //     title: "Oops...",
  //     title: `You Email is not valid`,
  //     footer: "Please Provide Me User Email",
  //   });
  // }

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold my-5 ">
        Add <span className="text-[#1dcdbc]">A Classes</span>
      </h1>
      <div className="">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <div className="md:flex justify-between w-full">
              <div className="form-control md:w-2/5">
                <label className="label">
                  <span className="label-text">Instructor Name</span>
                </label>
                <input
                  value={user?.displayName}
                  readOnly
                  {...register("instructorName", { required: true })}
                  type="text"
                  placeholder="Instructor name"
                  className="input w-full input-bordered"
                  required
                />
              </div>
              <div className="form-control md:w-2/5 md:ml-auto ">
                <label className="label">
                  <span className="label-text ">Instructor Email</span>
                </label>
                <input
                  type="email"
                  value={user?.email}
                  {...register("instructorEmail", { required: true })}
                  readOnly
                  placeholder="Please Provide Login Email"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="md:flex justify-between w-full">
              <div className="form-control md:w-2/5">
                <label className="label">
                  <span className="label-text">Class Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Class Name"
                  className="input input-bordered w-full"
                  {...register("className", { required: true })}
                  required
                />
              </div>
              <div className="form-control md:w-2/5 md:ml-auto">
                <label className="label">
                  <span className="label-text">Class Image</span>
                </label>
                <input
                  type="file"
                  {...register("file", { required: true })}
                  className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                />
              </div>
            </div>
            <div className="md:flex justify-between w-full">
              <div className="form-control md:w-2/5">
                <label className="label">
                  <span className="label-text">Available Seats</span>
                </label>
                <input
                  type="number"
                  placeholder="available seats"
                  className="input input-bordered w-full"
                  {...register("availableSeats", { required: true })}
                  required
                />
              </div>
              <div className="form-control md:w-2/5 md:ml-auto">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="text"
                  {...register("price", { required: true })}
                  placeholder="price"
                  className="input input-bordered w-full "
                  required
                />
              </div>
            </div>

            <div className=" mt-6 ">
              <input
                type="submit"
                className="btn bg-[#1dcdbc] hover:bg-[#1dcdbc] border-0"
                value="Add Classes"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClasses;
