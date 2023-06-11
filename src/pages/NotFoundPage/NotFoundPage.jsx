import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import notFound from "../../../src/assets/404Page.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-1/2 mx-auto text-center">
      <Player src={notFound} autoplay loop></Player>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline btn-accent"
      >
        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Back Now
      </button>
    </div>
  );
};

export default NotFoundPage;
