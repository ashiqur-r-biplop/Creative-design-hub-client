import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = () => {
    setMobileMenuOpen(false); // Close the mobile menu after clicking a menu item
  };

  return (
    <nav className="bg-[#414141bb] fixed w-full py-3 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <div className="flex-shrink-0 text-white font-semibold">
              {/* Your logo or branding */}
              CreativaDesignHub
            </div>
            {/* Desktop menu */}
            <div className="hidden sm:block ml-10">
              <div className="flex space-x-4">
                {/* Navbar items */}
                <Link
                  onClick={handleMenuClick}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  onClick={handleMenuClick}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Instructors
                </Link>
                <Link
                  onClick={handleMenuClick}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  classes
                </Link>
                <Link
                  onClick={handleMenuClick}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
              </div>
            </div>
            <div className="hidden sm:block">
              <Link>
                <button className="btn btn-outline btn-accent">Login</button>
              </Link>
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
            onClick={handleMenuClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
          >
            Home
          </Link>
          <Link
            onClick={handleMenuClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
          >
            Instructors
          </Link>
          <Link
            onClick={handleMenuClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
          >
            classes
          </Link>
          <Link
            onClick={handleMenuClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300 hover:bg-gray-700 transition duration-150 ease-in-out"
          >
            Dashboard
          </Link>
          <Link>
            <button className="btn btn-outline btn-accent ms-3">Login</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
