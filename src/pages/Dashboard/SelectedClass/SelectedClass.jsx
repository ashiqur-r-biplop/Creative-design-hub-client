import React, { useContext, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

const SelectedClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const {
    data: selected = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getSelectedClass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5173/getSelectedClass/${user?.email}`);
      return res.data;
    },
  });
  console.log(selected);
  const handleDelete = (id) => {
    axiosSecure.delete(`/deleteSelectedClass/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  if (isLoading) {
    return <h2>loading...</h2>;
  }
  return (
    <div>
      <div>
        <div className="container">
          <div className="text-center my-5">
            <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold my-5 md:mt-20 mb-12">
              <span className="text-[#1dcdbc]">My Selected Class</span>
            </h1>
          </div>
          {selected.length === 0 && (
            <div>
              <h1 className="text-center md:text-3xl text-xl">
                You Have No Classes
                <span
                  style={{ borderBottom: "4px solid #32c770" }}
                  className="text-[#32c770] font-semibold "
                ></span>
              </h1>
            </div>
          )}
          {selected.length > 0 && (
            <div className="overflow-x-auto my-5">
              <table className="min-w-full divide-y divide-x border border-bottom divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Class name
                    </th>
                    <th className="px-6 py-3  text-left text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      instructor Name
                    </th>
                    <th className="px-6 py-3  text-left text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      instructor Email
                    </th>
                    <th className="px-6 py-3  text-left text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selected.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
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
                        {item?.instructorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item?.instructorEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${item?.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex flex-row-reverse justify-between items-center">
                        <button onClick={() => handleDelete(item?._id)}>
                          <FontAwesomeIcon
                            icon={faDeleteLeft}
                          ></FontAwesomeIcon>
                        </button>
                        <Link  to={`/dashboard/payment/${item?._id}`} className="btn btn-outline btn-accent">
                          Pay
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedClass;
