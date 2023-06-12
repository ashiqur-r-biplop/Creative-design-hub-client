import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import animation from "./../../../../src/assets/dashboard.json";
import { Fade } from "react-awesome-reveal";
import useTitle from "../../../Hook/UseTitle";

const DashboardHome = () => {
  useTitle("DashBoard | Home")
  return (
    <Fade delay={1e3} cascade damping={1e-1}>
      <div className="h-screen md:w-1/2 mx-auto">
        <Player src={animation} autoplay loop></Player>
      </div>
    </Fade>
  );
};

export default DashboardHome;
