import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import "./AddClass.css";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Fade } from "react-awesome-reveal";
import useTitle from "../../../Hook/UseTitle";

const img_hosting_Token = import.meta.env.VITE_IMAGE_UPLOAD;
// console.log(img_hosting_Token);
const AddClasses = () => {
  useTitle("Add Class")
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${img_hosting_Token}`;

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data?.file[0]);

    fetch(imgHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse?.data?.url;
          // console.log(imgURL);
          const {
            instructorName,
            instructorEmail,
            className,
            price,
            availableSeats,
          } = data;
          const newClass = {
            instructorName,
            instructorEmail,
            imgURL,
            className,
            price: parseFloat(price),
            availableSeats: parseFloat(availableSeats),
            state: "pending",
            enrollStudent: 0,
          };
          axiosSecure.post("/addClass", newClass).then((data) => {
            // console.log("after posting ew menu item", data.data);
            if (data.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Add Classes Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              reset();
            }
          });
        }
      });
  };

  return (
    <Fade delay={1e3} cascade damping={1e-1}>
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
                <div className="form-control md:w-2/5 md:ml-auto ">
                  <label className="label">
                    <span className="label-text">Class Image</span>
                  </label>
                  <input
                    type="file"
                    {...register("file", { required: true })}
                    className="file-input file-input-bordered file-input-accent w-full "
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
    </Fade>
  );
};

export default AddClasses;
