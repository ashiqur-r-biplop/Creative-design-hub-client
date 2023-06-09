import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Dashboard = () => {
  const [DbUser, setDbUser] = useState({});
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((DBuser) => {
        const currentUser = DBuser.find((item) => item.email === user.email);
        setDbUser(currentUser);
      });
  }, []);
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
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full text-center bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <img className="w-36 h-32 mx-auto" src={DbUser?.photo} alt="" />
          </li>
          <li>
            <p className="mx-auto">{DbUser?.name}</p>
          </li>
          <li>
            <p className="mx-auto bg-gray-800 hover:bg-gray-800 text-white">{DbUser?.role}</p>
          </li>
          <div className="divider"></div>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
