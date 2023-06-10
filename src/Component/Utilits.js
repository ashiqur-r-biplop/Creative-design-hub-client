export const StateUpdate = async (id, state) => {
  console.log(id, state);
  const response = await fetch(`http://localhost:5000/feedBack/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ state }),
  });
  const data = await response.json();
  return data;
};

// send feedback
export const FeedBackSend = async (id, feedback, form) => {
  const response = await fetch(`http://localhost:5000/UpdateFeedBack/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(feedback),
  });
  const data = await response.json();
  form.reset();
  return data;
};
