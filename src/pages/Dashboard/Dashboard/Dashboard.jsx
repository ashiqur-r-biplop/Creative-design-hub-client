import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import DashBoardRoute from "../DashBoardRoute/DashBoardRoute";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faLightbulb, faSun } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineMenuFold } from "react-icons/ai";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { Fade } from "react-awesome-reveal";

const Dashboard = () => {
  const [DbUser, setDbUser] = useState({});
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(false);
  // const [axiosSecure] = useAxiosSecure();
  // axiosSecure.get("/users").then((res) => {
  //   console.log(res.data);
  //   const currentUser = res.data.find((item) => item.email === user.email);
  //       console.log(currentUser, "19");
  //       setDbUser(currentUser);
  // });
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((DBusers) => {
        const currentUser = DBusers.find((item) => item.email === user.email);
        // console.log(currentUser, "19");
        setDbUser(currentUser);
      });
  }, []);

  // console.log(DbUser);
  useEffect(() => {
    window.addEventListener("load", handleToggle);
    return () => {
      window.removeEventListener("load", handleToggle);
    };
  }, []);
  const handleToggle = () => {
    const bodyElement = document.getElementsByTagName("body")[0];
    const currentTheme = bodyElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    bodyElement.setAttribute("data-theme", newTheme);
    setTheme(!theme);
  };

  const handleLogout = () => {
    logout()
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <div className="drawer lg:drawer-open z-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content md:mx-10">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn bg-[#1dcdbc] drawer-button lg:hidden "
        >
          <div className="text-center bottom">
            <AiOutlineMenuFold />
          </div>
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <ul className="menu p-4 w-60 text-center bg-base-200 text-base-content">
          <label
            htmlFor="my-drawer-2"
            className="drawer-overlay bg-[#1dcdbc] px-3 py-2 text-white rounded-lg font-semibold cursor-pointer lg:cursor-default"
          >
            DashBoard
            <span className="lg:hidden block  cursor-pointer">Close</span>
          </label>
          {/* Sidebar content here */}
          <li>
            <img className="w-36 h-32 mx-auto" src={DbUser?.photo} alt="" />
          </li>
          <li className="mx-auto">
            <Fade delay={1e3} cascade damping={1e-1}>
              <p className="mx-auto">{DbUser?.name}</p>
            </Fade>
          </li>
          <li className="mx-auto">
            <Fade delay={1e3} cascade damping={1e-1}>
              <p className="mx-auto">{DbUser?.email}</p>
            </Fade>
          </li>
          <Fade delay={1e3} cascade damping={1e-1}>
            <div className="my-2">
              {theme ? (
                <FontAwesomeIcon
                  onClick={handleToggle}
                  className="text-2xl cursor-pointer"
                  icon={faLightbulb}
                ></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon
                  onClick={handleToggle}
                  className="text-2xl cursor-pointer"
                  icon={faSun}
                ></FontAwesomeIcon>
              )}
            </div>
          </Fade>
          <Fade delay={1e3} cascade damping={1e-1}>
            <li>
              <p className="mx-auto bg-gray-800 hover:bg-gray-800 text-white">
                {DbUser?.role}
              </p>
            </li>
          </Fade>
          <div className="divider"></div>
          <DashBoardRoute></DashBoardRoute>
          <div className="divider"></div>
          <li className="mx-auto">
            <Fade delay={1e3} cascade damping={1e-1}>
              <Link
                to="/"
                className=" px-3 py-2 rounded-md text-sm font-medium"
              >
                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Home
              </Link>
            </Fade>
          </li>
          <li className="mx-auto">
            <Fade delay={1e3} cascade damping={1e-1}>
              <Link
                to="/instructor"
                className=" px-2 my-2 rounded-md text-sm font-medium"
              >
                Instructors
              </Link>
            </Fade>
          </li>
          <li className="mx-auto">
            <Fade delay={1e3} cascade damping={1e-1}>
              <Link
                to="/classes"
                className=" px-2 my-2 rounded-md text-sm font-medium"
              >
                Classes
              </Link>
            </Fade>
          </li>
          <li className="mx-auto">
            <Fade delay={1e3} cascade damping={1e-1}>
              <button
                onClick={handleLogout}
                className="btn btn-outline my-2 btn-accent"
              >
                Logout
              </button>
            </Fade>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
