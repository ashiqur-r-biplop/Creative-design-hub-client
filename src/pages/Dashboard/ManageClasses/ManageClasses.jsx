import React, { useContext, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";

const ManageClasses = () => {
  const { user, loading } = useContext(AuthContext);
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
  console.log(Classes);
  if (isLoading) {
    return <h2>loading</h2>;
  }
  return (
    <div>
      <div className="container">
        <div className="text-center my-5">
          <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold my-5 md:mt-20 mb-12">
            <span className="text-[#1dcdbc]">My Classes</span>
          </h1>
        </div>
        {Classes.length === 0 && (
          <div>
            <h1 className="text-center md:text-3xl text-xl">
              There are no classes at this location
              <span
                style={{ borderBottom: "4px solid #32c770" }}
                className="text-[#32c770] font-semibold "
              ></span>
            </h1>
          </div>
        )}
        {Classes.length > 0 && (
          <div className="overflow-x-auto my-5">
            <table className="min-w-full divide-y divide-x border border-bottom divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                    Class Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                    Class Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Classes.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.imgURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.className}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.availableSeats}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {item?.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center ">
                      {item?.enrollStudent}
                    </td>
                    <td className="flex justify-between items-center px-5 mt-5 h-full">
                      <button
                        className="btn btn-outline btn-accent"
                        disabled={item?.state == "pending"}
                      >
                        pending
                      </button>
                      <button
                        className="btn btn-outline btn-accent"
                        disabled={item?.state == "Approve"}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-outline btn-accent"
                        disabled={item?.state == "Denied"}
                      >
                        Denied
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageClasses;
