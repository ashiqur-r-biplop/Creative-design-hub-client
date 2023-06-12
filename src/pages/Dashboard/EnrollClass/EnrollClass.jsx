import React from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";
import useTitle from "../../../Hook/UseTitle";

const EnrollClass = () => {
  useTitle("EnrollClass")
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const {
    data: EnrollClasses = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["enrollClasses", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrollClasses/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  return (
    <Fade delay={1e3} cascade damping={1e-1}>
      <div>
        <div>
          <div className="container">
            <div className="text-center my-5">
              <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-semibold my-5 md:mt-20 mb-12">
                <span className="text-[#1dcdbc]">Enroll Classes</span>
              </h1>
            </div>
            {EnrollClasses.length === 0 && (
              <div>
                <h1 className="text-center md:text-3xl text-xl text-gray-400">
                  You are not enrolled in any class
                </h1>
              </div>
            )}
            {EnrollClasses.length > 0 && (
              <div className="overflow-x-auto my-5">
                <table className="min-w-full divide-y divide-x border border-bottom divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                        image
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                        Class name
                      </th>
                      <th className="px-6 py-3  text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                        instructor Name
                      </th>
                      <th className="px-6 py-3  text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                        instructor Email
                      </th>
                      <th className="px-6 py-3  text-right text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                        Enroll
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {EnrollClasses.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={item.imgURL}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {item?.className}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {item?.instructorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {item?.instructorEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          ${item?.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {item?.enrolled}
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
    </Fade>
  );
};

export default EnrollClass;
