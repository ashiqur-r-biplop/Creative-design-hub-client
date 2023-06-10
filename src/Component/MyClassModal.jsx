import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyClassModal = ({ item }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    //   {/* Put this part before </body> tag */}
    //   <input type="checkbox" id="my_modal_6" className="modal-toggle" />
    //   <div className="modal">
    //     <div className="modal-box">
    //       <form className="" onSubmit={handleSubmit(onSubmit)}>
    //         <div className="card-body">
    //           <div className="md:flex justify-between w-full">
    //             <div className="form-control md:w-2/5">
    //               <label className="label">
    //                 <span className="label-text">Class Name</span>
    //               </label>
    //               <input
    //                 type="text"
    //                 placeholder="Class Name"
    //                 defaultValue={item?.className}
    //                 className="input input-bordered w-full"
    //                 {...register("className", { required: true })}
    //                 required
    //               />
    //             </div>
    //             <div className="form-control md:w-2/5 md:ml-auto ">
    //               <label className="label">
    //                 <span className="label-text">Class Image</span>
    //               </label>
    //               <input
    //                 type="file"
    //                 {...register("file", { required: true })}
    //                 className="file-input file-input-bordered file-input-accent w-full "
    //               />
    //             </div>
    //           </div>
    //           <div className="md:flex justify-between w-full">
    //             <div className="form-control md:w-2/5">
    //               <label className="label">
    //                 <span className="label-text">Available Seats</span>
    //               </label>
    //               <input
    //                 type="number"
    //                 defaultValue={item?.availableSeats}
    //                 placeholder="available seats"
    //                 className="input input-bordered w-full"
    //                 {...register("availableSeats", { required: true })}
    //                 required
    //               />
    //             </div>
    //             <div className="form-control md:w-2/5 md:ml-auto">
    //               <label className="label">
    //                 <span className="label-text">Price</span>
    //               </label>
    //               <input
    //                 type="text"
    //                 defaultValue={item?.price}
    //                 {...register("price", { required: true })}
    //                 placeholder="price"
    //                 className="input input-bordered w-full "
    //                 required
    //               />
    //             </div>
    //           </div>

    //           <div className=" mt-6 ">
    //             <input
    //               type="submit"
    //               className="btn bg-[#1dcdbc] hover:bg-[#1dcdbc] border-0"
    //               value="Add Classes"
    //             />
    //           </div>
    //         </div>
    //       </form>
    //       <div className="modal-action">
    //         <label htmlFor="my_modal_6" className="btn">
    //           Close!
    //         </label>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <label for="my_modal_6" className="btn">
        <FontAwesomeIcon icon={faArrowUpRightFromSquare}></FontAwesomeIcon>{" "}
      </label>

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
                    defaultValue={item?.className}
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
                    defaultValue={item?.availableSeats}
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
                    defaultValue={item?.price}
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
