import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Swal from "sweetalert2";
const img_hosting_Token = import.meta.env.VITE_IMAGE_UPLOAD;

const MyClassModal = ({ refetch, modalItem }) => {
  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${img_hosting_Token}`;
  const { register, handleSubmit, reset } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
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
          const { className, price, availableSeats } = data;
          const updateClass = {
            imgURL,
            className,
            price: parseFloat(price),
            availableSeats: parseFloat(availableSeats),
          };
          axiosSecure
            .patch(`/updateClass/${modalItem?._id}`, updateClass)
            .then((data) => {
              if (data.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Update Classes Successfully",
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
    <div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="md:flex justify-between w-full">
                <div className="form-control md:w-2/5">
                  <label className="label">
                    <span className="label-text">Class Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Class Name"
                    defaultValue={modalItem?.className}
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
                    defaultValue={modalItem?.availableSeats}
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
                    defaultValue={modalItem?.price}
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
                  value="Update Classes"
                />
              </div>
            </div>
          </form>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClassModal;
