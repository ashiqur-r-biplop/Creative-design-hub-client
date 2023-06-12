import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckOut from "./CheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
import useTitle from "../../Hook/UseTitle";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);

const Payment = () => {
  useTitle("Payment History")
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const {
    data: selectedClassPrice = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getSelectedClass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/getSelectedClass/${user?.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });
  // console.log(selectedClassPrice);
  const paymentClass = selectedClassPrice.find((item) => item?.selectedId === id);
  // console.log(paymentClass);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOut paymentClass={paymentClass}></CheckOut>
      </Elements>
    </div>
  );
};

export default Payment;
