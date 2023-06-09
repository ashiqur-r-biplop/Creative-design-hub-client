import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import DashBoardRoute from "../DashBoardRoute/DashBoardRoute";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faSun } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [DbUser, setDbUser] = useState({});
  const { user } = useContext(AuthContext);
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((DBuser) => {
        const currentUser = DBuser.find((item) => item.email === user.email);
        setDbUser(currentUser);
      });
  }, []);

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

  return (
    <div className="drawer lg:drawer-open z-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full text-center bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <img className="w-36 h-32 mx-auto" src={DbUser?.photo} alt="" />
          </li>
          <li className="">
            <p className="mx-auto">{DbUser?.name}</p>
          </li>
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
          <li>
            <p className="mx-auto bg-gray-800 hover:bg-gray-800 text-white">
              {DbUser?.role}
            </p>
          </li>

          <div className="divider"></div>
          <DashBoardRoute></DashBoardRoute>
          <div className="divider"></div>
          <Link to="/" className=" px-3 py-2 rounded-md text-sm font-medium">
            Home
          </Link>
          <Link
            to="/instructor"
            className=" px-3 py-2 rounded-md text-sm font-medium"
          >
            Instructors
          </Link>
          <Link
            to="/classes"
            className=" px-3 py-2 rounded-md text-sm font-medium"
          >
            Classes
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
