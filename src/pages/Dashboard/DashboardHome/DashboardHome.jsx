import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import animation from "./../../../../src/assets/dashboard.json";

const DashboardHome = () => {
  return (
    <div className="h-screen md:w-1/2 mx-auto">
      <Player src={animation} autoplay loop></Player>
    </div>
  );
};

export default DashboardHome;
