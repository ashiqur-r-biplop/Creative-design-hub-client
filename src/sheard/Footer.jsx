import {
  faLocation,
  faPhone,
  faVoicemail,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../assets/logo/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-700 text-gray-300 pt-20 px-3">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          {/* colum 1 */}
          <div>
            <div className="logo text-2xl font-bold py-3">
              <Link to="/">
                <img src={logo} className="w-40" alt="" />
              </Link>
            </div>
            <p className="py-2 ">
              Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis.
              Integer rutrum ante eu lacus.
            </p>
          </div>
          {/* colum 2 */}
          <div>
            <div className="text-2xl font-bold">
              <h1 className="text-white py-3">Our Classes</h1>
            </div>
            <p className="py-2 ">MUSIC</p>
            <p className="py-2 ">FOREIGN</p>
            <p className="py-2 ">LANGUAGES</p>
            <p className="py-2 ">DANCE</p>
            <p className="py-2 ">MARTIAL ARTS</p>
            <p className="py-2 ">DRAMA</p>
            <p className="py-2 ">SPORTS SKILLS</p>
            <p className="py-2 ">PRE-READING</p>
            <p className="py-2 ">PRE-MATH</p>
          </div>
          {/* colum 3 */}
          <div>
            <div className="text-2xl font-bold">
              <h1 className="text-white py-3">Quick Links</h1>
            </div>
            <p className="py-2 ">ABOUT</p>
            <p className="py-2 ">OUR STAFF</p>
            <p className="py-2 ">FAQ</p>
            <p className="py-2 ">ADMISSIONS</p>
            <p className="py-2 ">TUITION</p>
            <p className="py-2 ">CURRICULUM</p>
            <p className="py-2 ">CONTACT</p>
          </div>
          {/* colum 4 */}
          <div>
            <div className="text-2xl font-bold">
              <h1 className="text-white py-3">For Nannies</h1>
            </div>
            <p className="py-2 ">OVERVIEW</p>
            <p className="py-2 ">MISSION AND</p>
            <p className="py-2 ">PHILOSOPHY</p>
            <p className="py-2 ">HISTORY</p>
            <p className="py-2 ">TESTIMONIALS</p>
            <p className="py-2 ">OUR ENVIRONMENT</p>
            <p className="py-2 ">OUR AFFILIATION</p>
          </div>
          {/* colum 5 */}
          <div>
            <div className="text-2xl font-bold">
              <h1 className="text-white py-3">Contact Us</h1>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLocation}></FontAwesomeIcon>
              <p className="py-2 ms-3">
                9870 St Vincent Place, Glasgow, DC 45 Fr 45
              </p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
              <p className="py-2 ms-3">+1 800 559 6580</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faVoicemail}></FontAwesomeIcon>
              <p className="py-2 ms-3">info@companyname.com</p>
            </div>
          </div>
        </div>
        <div className="py-5 text-center">
          <p className="py-2 ">© Copyright 2023. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
