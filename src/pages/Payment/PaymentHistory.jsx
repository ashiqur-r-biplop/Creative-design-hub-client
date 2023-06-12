import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";
import Tabledata from "../../Component/Tabledata";

const PaymentHistory = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const {
    data: paymentClass = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["paymentHistoryDone", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistoryDone/${user?.email}`);
      return res.data;
    },
  });
  // console.log(paymentClass);
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
                <span className="text-[#1dcdbc]">Payment History</span>
              </h1>
            </div>
            {paymentClass.length === 0 && (
              <div>
                <h1 className="text-center md:text-3xl text-xl">
                  You are not enrolled in any class
                  <span
                    style={{ borderBottom: "4px solid #32c770" }}
                    className="text-[#32c770] font-semibold "
                  ></span>
                </h1>
              </div>
            )}
            {paymentClass.length > 0 && (
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
                        Date
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                        Time
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
                      <th className="px-6 py-3  text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-[#1dcdbc] uppercase tracking-wider">
                        Transaction Id
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paymentClass.map((item, index) => (
                      <Tabledata key={index} index={index} item={item}></Tabledata>
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

export default PaymentHistory;
