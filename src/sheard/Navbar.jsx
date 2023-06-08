import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = () => {
    setMobileMenuOpen(false); // Close the mobile menu after clicking a menu item
  };
  const handleLogout = () => {
    logout()
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <div>
      <nav className="bg-[#414141bb] md:fixed block w-full py-3 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between w-full">
              <div className="flex-shrink-0 text-white font-semibold">
                {/* Your logo or branding */}
                <Link to="/">CreativaDesignHub</Link>
              </div>
              {/* Desktop menu */}
              <div className="hidden sm:block ml-10">
                <div className="flex space-x-4">
                  {/* Navbar items */}
                  <Link
                    to="/"
                    onClick={handleMenuClick}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/instructor"
                    onClick={handleMenuClick}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Instructors
                  </Link>
                  <Link
                    to="/classes"
                    onClick={handleMenuClick}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Classes
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={handleMenuClick}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
              <div className="hidden sm:flex">
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
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
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
          <div className="px-2 pt-2 pb-3">
            {/* Navbar items */}
            <Link
              to="/"
              onClick={handleMenuClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              Home
            </Link>
            <Link
              to="/instructor"
              onClick={handleMenuClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              Instructors
            </Link>
            <Link
              to="/classes"
              onClick={handleMenuClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              Classes
            </Link>
            <Link
              to="/dashboard"
              onClick={handleMenuClick}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              Dashboard
            </Link>
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
