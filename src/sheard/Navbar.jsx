import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import logo from "../assets/Image/logo.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  // console.log(user);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
    });
  }, []);

  const handleLogout = () => {
    logout()
      .then(() => {})
      .then((err) => {});
  };

  return (
    <nav
      style={{ zIndex: "9999" }}
      className="bg-[#09542f] py-2 md:fixed top-0 mx-auto w-full"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-start sm:justify-between w-full">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-lg">
                <div className="w-28 md:w-36">
                  {/* <img src={logo} className="w-full" alt="" /> */}CreativaDesignHub
                </div>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="text-[#fff] hover:border-b hover:border-[#fff] hover:text-white px-3 py-2  text-lg "
                >
                  Home
                </Link>

                <Link
                  to="/allToy"
                  className="text-[#fff] hover:border-b hover:border-[#fff] hover:text-white px-3 py-2  text-lg "
                >
                  All Toys
                </Link>
                {user && (
                  <>
                    <Link
                      to="/myToys"
                      className="text-[#fff] hover:border-b hover:border-[#fff] hover:text-white px-3 py-2  text-lg "
                    >
                      MyToys
                    </Link>
                    <Link
                      to="/addToy"
                      className="text-[#fff] hover:border-b hover:border-[#fff] hover:text-white px-3 py-2  text-lg "
                    >
                      Add a Toy
                    </Link>
                  </>
                )}
                <Link
                  to="/blogs"
                  className="text-[#fff] hover:border-b hover:border-[#fff] hover:text-white px-3 py-2  text-lg "
                >
                  Blogs
                </Link>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="py-3 px-10 text-white font-semibold rounded-lg bg-[#013855] hover:bg-[#013855] border-none"
                  >
                    LogOut
                  </button>
                ) : (
                  <Link to="/login">
                    <button className="py-3 px-10 text-white font-semibold rounded-lg bg-[#013855] hover:bg-[#013855] border-none">
                      Login
                    </button>
                  </Link>
                )}

                {user?.photoURL && (
                  <>
                    <div className="dropdown dropdown-end">
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
              </div>
            </div>
          </div>
          <div className="-mr-2 flex sm:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#fff] hover:text-white hover:bg-[#32c770] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2fff/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2fff/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`${isOpen ? "block" : "hidden"} sm:hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user?.photoURL && (
              <>
                <div className="dropdown dropdown-start">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        title={`${user?.displayName ? user?.displayName : ""}`}
                        className=""
                        src={user?.photoURL}
                        alt=""
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
            <Link
              to="/"
              className="text-[#fff] hover:bg-[#32c770] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/allToy"
              className="text-[#fff] hover:bg-[#32c770] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              All Toy
            </Link>
            {user && (
              <>
                <Link
                  to="/myToys"
                  className="text-[#fff] hover:bg-[#32c770] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  MYToy
                </Link>
                <Link
                  to="/addToy"
                  className="text-[#fff] hover:bg-[#32c770] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Add a Toy
                </Link>
              </>
            )}
            <Link
              to="/blogs"
              className="text-[#fff] hover:bg-[#32c770] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Blogs
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="py-3 px-10 text-white font-semibold rounded-lg bg-[#013855] hover:bg-[#013855] border-none"
              >
                LogOut
              </button>
            ) : (
              <Link to="/login">
                <button className="py-3 px-10 text-white font-semibold rounded-lg bg-[#013855] hover:bg-[#013855] border-none">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;