import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faSun } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [navTheme, setNavTheme] = useState("light");
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleMenuClick = () => {
    setMobileMenuOpen(false);
  };
  const handleLogout = () => {
    logout()
      .then((res) => {})
      .catch((err) => {});
  };

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
    setNavTheme(newTheme)
    bodyElement.setAttribute("data-theme", newTheme);
    setTheme(!theme);
  };
  return (
    <div>
      <nav
        className={`${
          navTheme === "light" ? "bg-[#ffffffd3]" : "bg-[#5e5e5ed3]"
        } md:fixed block w-full py-3 z-40`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between w-full">
              <div className="flex-shrink-0 text-black font-semibold">
                {/* Your logo or branding */}
                <Link to="/">
                  <img src={logo} className="w-40" alt="" />
                </Link>
              </div>
              {/* Desktop menu */}
              <div className="hidden sm:block ml-10">
                <div className="flex space-x-4">
                  {/* Navbar items */}
                  <Link
                    to="/"
                    onClick={handleMenuClick}
                    className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/instructor"
                    onClick={handleMenuClick}
                    className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Instructors
                  </Link>
                  <Link
                    to="/classes"
                    onClick={handleMenuClick}
                    className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Classes
                  </Link>
                  {user && (
                    <Link
                      to="/dashboard"
                      onClick={handleMenuClick}
                      className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Dashboard
                    </Link>
                  )}
                </div>
              </div>
              <div className="hidden sm:flex items-center">
                {user ? (
                  <>
                    {" "}
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline btn-accent"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login">
                    <button className="btn btn-outline btn-accent">
                      Login
                    </button>
                  </Link>
                )}

                {user?.photoURL && (
                  <>
                    <div className="dropdown dropdown-end ms-3">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img
                            title={`${
                              user?.displayName ? user?.displayName : ""
                            }`}
                            className="hidden md:block"
                            src={user?.photoURL}
                            alt={user?.displayName}
                          />
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <Link to="/profile" className="justify-between">
                            Profile
                            <span className="badge">New</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
                <div className="ms-3">
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
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-black transition duration-150 ease-in-out"
              >
                {/* Toggle icon */}
                <svg
                  className={`h-6 w-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {/* Toggle icon lines */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Close icon */}
                <svg
                  className={`h-6 w-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {/* Close icon lines */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } sm:hidden transition-all duration-500 ease-in-out transform ${
            isMobileMenuOpen ? "h-screen" : "h-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 flex flex-col">
            <div className="ms-3">
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
            {/* Navbar items */}
            <Link
              to="/"
              onClick={handleMenuClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              Home
            </Link>
            <Link
              to="/instructor"
              onClick={handleMenuClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              Instructors
            </Link>
            <Link
              to="/classes"
              onClick={handleMenuClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              Classes
            </Link>
            {user && (
              <Link
                to="/dashboard"
                onClick={handleMenuClick}
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
              >
                Dashboard
              </Link>
            )}
            {/* {user && <Link
              to="/dashboard"
              onClick={handleMenuClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              Dashboard
            </Link>} */}
            {user?.photoURL && (
              <>
                <div className="dropdown dropdown-end ms-3">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        title={`${user?.displayName ? user?.displayName : ""}`}
                        className=" md:hidden block"
                        src={user?.photoURL}
                        alt={user?.displayName}
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-accent"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={handleMenuClick}>
                <button className="btn btn-outline btn-accent ms-3">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
