import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import MyClassModal from "../../../Component/MyClassModal";

const MyClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [modalItem, setModalItem] = useState(null);
  const {
    data: myClass = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myClass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/getClass/${user?.email}`);
      //   console.log("res from axios", res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <div className="container">
        <div className="text-center my-5">
          <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold my-5 md:mt-20 mb-12">
            <span className="text-[#1dcdbc]">My Classes</span>
          </h1>
        </div>
        {myClass.length === 0 && (
          <div>
            <h1 className="text-center md:text-3xl text-xl">
              You have not added any classes of your own{" "}
              <span
                style={{ borderBottom: "4px solid #32c770" }}
                className="text-[#32c770] font-semibold "
              ></span>
            </h1>
          </div>
        )}
        {myClass.length > 0 && (
          <div className="overflow-x-auto my-5">
            <table className="min-w-full divide-y divide-x border border-bottom divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#32c770] uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#32c770] uppercase tracking-wider">
                    Class Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#32c770] uppercase tracking-wider">
                    Class Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#32c770] uppercase tracking-wider">
                    Available Seats
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#32c770] uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-[#32c770] uppercase tracking-wider">
                    Enrolled Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#32c770] uppercase tracking-wider">
                    State
                  </th>
                  {<th className="px-6 py-3 text-left text-xs font-medium text-[#32c770] uppercase tracking-wider">
                    FeedBack
                  </th>}
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#32c770] uppercase tracking-wider">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myClass.map((item, index) => (
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
                    <td className="px-6 py-4 whitespace-nowrap ">
                      {item?.state}
                    </td>
                    <td></td>
                    <td className="px-10 py-4 whitespace-nowrap">
                      <label
                        onClick={() => setModalItem(item)}
                        for="my_modal_6"
                        className="btn"
                      >
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                        ></FontAwesomeIcon>{" "}
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <MyClassModal modalItem={modalItem}></MyClassModal>
    </div>
  );
};

export default MyClasses;
