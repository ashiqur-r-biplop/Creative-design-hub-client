import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckOut from "./CheckOut";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);

const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOut></CheckOut>
      </Elements>
    </div>
  );
};

export default Payment;
