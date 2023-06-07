import React from "react";
import Navbar from "../sheard/Navbar";
import Footer from "../sheard/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
        <div className="md:min-h-[calc(100vh-73px)]">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
