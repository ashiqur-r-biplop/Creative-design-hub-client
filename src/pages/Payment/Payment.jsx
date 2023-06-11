import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckOut from "./CheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useParams } from "react-router-dom";
import axios from "axios";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);

const Payment = () => {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const {
    data: selectedClassPrice = {},
    refetch,
  } = useQuery({
    queryKey: ["getSelectedClass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5173/getSelectedClass/${user?.email}`);
      console.log(res.data);
      return res.data 
    },
  });
  console.log(selectedClassPrice);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOut selectedClassPrice={selectedClassPrice}></CheckOut>
      </Elements>
    </div>
  );
};

export default Payment;
