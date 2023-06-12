import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";
import useTitle from "../../../Hook/UseTitle";

const ManageUsers = () => {
  useTitle("Manage Users");
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersManage", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersManage`);
      return res.data;
    },
  });

  const handleUpdateUser = (role, id) => {
    const currentRole = { role };

    axiosSecure.patch(`updateUserRole/${id}`, currentRole).then((data) => {
      if (data.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${role} Promoted successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <Fade delay={1e3} cascade damping={1e-1}>
      <div>
        <div className="container w-full mx-auto">
          <div className="text-center my-5">
            <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold my-5 md:mt-20 mb-12">
              <span className="text-[#1dcdbc]">Manage All Users</span>
            </h1>
          </div>
          {users.length === 0 && (
            <div>
              <h1 className="text-center md:text-3xl text-xl text-gray-400">
                Users Empty{" "}
              </h1>
            </div>
          )}
          {users.length > 0 && (
            <div className="overflow-x-auto table-xs my-5">
              <table className="min-w-full divide-y divide-x border border-bottom divide-gray-200 ">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      image
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      name
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                      Promote/ Demote
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.photo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {item?.name}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {item?.email}
                        {user.email == item?.email && (
                          <span className="bg-green-600 px-2 py-1 rounded-lg text-white ms-2">
                            Active now
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="bg-green-100 px-2 py-1">
                          {item?.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() =>
                            handleUpdateUser("instructor", item?._id)
                          }
                          className="btn btn-outline btn-accent m-3"
                          disabled={item?.role === "instructor"}
                        >
                          Instructor
                        </button>
                        <button
                          onClick={() => handleUpdateUser("admin", item?._id)}
                          className="btn btn-outline btn-accent m-3"
                          disabled={item?.role === "admin"}
                        >
                          Admin
                        </button>
                        <button
                          onClick={() => handleUpdateUser("student", item?._id)}
                          className="btn btn-outline btn-accent m-3"
                          disabled={item?.role === "student"}
                        >
                          Student
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
    </Fade>
  );
};

export default ManageUsers;
