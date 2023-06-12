import React, { useContext, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import FeedBackModal from "../../../Component/FeedBackModal";
import { StateUpdate } from "../../../Component/Utilits";
import { Fade } from "react-awesome-reveal";
import useTitle from "../../../Hook/UseTitle";

const ManageClasses = () => {
  useTitle("Manage Class");
  const { user, loading } = useContext(AuthContext);
  const [FeedbackId, setFeedBackId] = useState("");
  const [titleState, setTitleState] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const {
    data: Classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllClass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/AllClass`);
      return res.data;
    },
  });
  // console.log(Classes);
  const handleApprove = (stateTitle, id) => {
    StateUpdate(id, stateTitle);
    refetch();
  };
  if (isLoading) {
    return <h2>loading</h2>;
  }
  return (
    <Fade delay={1e3} cascade damping={1e-1}>
      <div>
        <div className="container">
          <div className="text-center my-5">
            <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold my-5 md:mt-20 mb-12">
              <span className="text-[#1dcdbc]">Manage Classes</span>
            </h1>
          </div>
          {Classes.length === 0 && (
            <div>
              <h1 className="text-center md:text-3xl text-xl text-gray-400">
                There are no classes at this location
              </h1>
            </div>
          )}
          {Classes.length > 0 && (
            <div className="overflow-x-auto my-5">
              <table className="min-w-full divide-y divide-x border border-bottom divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Class Image
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Class Name
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Instructor Name
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Instructor Email
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Available Seats
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Enrolled Student
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Classes.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-center ">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center ">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.imgURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center ">
                        {item?.className}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center ">
                        {item?.instructorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center ">
                        {item?.instructorEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {item?.availableSeats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {item?.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {item?.enrollStudent}
                      </td>
                      <td>
                        <span
                          style={{ fontWeight: 500 }}
                          className={`${
                            item?.state === "Approve" && "bg-green-100"
                          } ${item?.state === "pending" && "bg-red-100"} ${
                            item?.state === "Denied" && "bg-gray-100"
                          }  px-2 py-1 text-black text-center`}
                        >
                          {item?.state}
                        </span>
                      </td>
                      <td className="flex flex-wrap justify-center items-center px-5 mt-5 h-full">
                        <button
                          onClick={() => handleApprove("Approve", item._id)}
                          className="btn btn-outline btn-accent m-3"
                          disabled={
                            item?.state == "Approve" || item?.state == "Denied"
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-outline btn-accent m-3"
                          onClick={() => handleApprove("Denied", item._id)}
                          disabled={
                            item?.state == "Approve" || item?.state == "Denied"
                          }
                        >
                          Denied
                        </button>
                        <label
                          htmlFor="my_modal_6"
                          className="btn btn-outline btn-accent m-3"
                          onClick={() => setFeedBackId(item?._id)}
                        >
                          Send Feed Back
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <FeedBackModal refetch={refetch} id={FeedbackId}></FeedBackModal>
      </div>
    </Fade>
  );
};

export default ManageClasses;
