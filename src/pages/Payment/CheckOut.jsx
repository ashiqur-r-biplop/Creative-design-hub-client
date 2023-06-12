import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckOut.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useEffect } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOut = ({ paymentClass }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentClass?.price) {
      axiosSecure
        .post("/create-payment-intent", { price: paymentClass?.price })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, []);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    const date = new Date();

    if (error) {
      // console.log("[error]", error);
      setCardError(error.message);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      // console.log("[error]", confirmError);
      setCardError(confirmError.message);
    } else {
      // console.log("[paymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          availableSeats: paymentClass?.availableSeats,
          className: paymentClass?.className,
          enrollStudent: paymentClass?.enrollStudent,
          imgURL: paymentClass?.imgURL,
          price: paymentClass?.price,
          instructorEmail: paymentClass?.instructorEmail,
          instructorName: paymentClass?.instructorName,
          studentEmail: paymentClass?.studentEmail,
          state: paymentClass?.state,
          selectedId: paymentClass?.selectedId,
          feedback: paymentClass?.feedback,
          transactionId: paymentIntent?.id,
          date: new Date(),
          enrolled: "successfully",
        };
        // console.log(paymentInfo);
        axiosSecure
          .patch(`/postPayAmount/${paymentClass?.selectedId}`, paymentInfo)
          .then((res) => {
            // console.log(res.data);
            if (res.data.modifiedCount) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `transactionId: ${paymentIntent?.id} , Pay successfully`,
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/dashboard/PaymentHistory");
              axiosSecure.delete(`/deleteBeforePayment/${paymentClass._id}`);
            }
          });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="h-screen md:mx-8 ">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-outline btn-accent"
          disabled={!stripe}
        >
          Pay
        </button>
        {cardError && <p className="text-red-500 ml-8">{cardError}</p>}
      </form>
    </>
  );
};
export default CheckOut;
