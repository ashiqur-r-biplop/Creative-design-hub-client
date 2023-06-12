import Swal from "sweetalert2";

export const StateUpdate = async (id, state) => {
  // console.log(id, state);
  const response = await fetch(`https://creativa-design-hub-server-site.vercel.app/feedBack/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ state }),
  });
  const data = await response.json();
  if (data?.modifiedCount > 0) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${state} successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  return data;
};

// send feedback
export const FeedBackSend = async (id, feedback, form) => {
  const response = await fetch(`https://creativa-design-hub-server-site.vercel.app/UpdateFeedBack/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(feedback),
  });
  const data = await response.json();
  if (data?.modifiedCount > 0) {
    form.reset();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `FeedBack successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  return data;
};

// export const UpdatePay = async (id, state) => {
//   console.log(id, state);
//   const response = await fetch(`https://creativa-design-hub-server-site.vercel.app/updatePay/${id}`, {
//     method: "PATCH",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(state),
//   });
//   const data = await response.json();
//   return data;
// };
