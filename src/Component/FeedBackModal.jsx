import React, { useContext } from "react";

import { FeedBackSend } from "../Component/Utilits";

const FeedBackModal = ({ refetch, id }) => {
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const update = form.update.value;
    const updateClass = {
      feedback: update,
    };
    FeedBackSend(id, updateClass, form);
    refetch();
  };
  return (
    <div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <form onSubmit={handleUpdate}>
            <textarea
              name="update"
              id=""
              cols="30"
              rows="10"
              className="w-full border-2 border-[#1dcdbc] rounded p-3"
              placeholder="Provide Feed Back"
            ></textarea>

            <input
              type="submit"
              value="Send"
              className="btn btn-outline btn-accent m-0"
            />
          </form>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedBackModal;
