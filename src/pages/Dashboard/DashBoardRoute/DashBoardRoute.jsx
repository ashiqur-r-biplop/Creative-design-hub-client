import React from "react";
import useUser from "../../../Hook/useUser";
import useInstructor from "../../../Hook/useInstructor";
import useAdmin from "../../../Hook/useAdmin";
import { Link } from "react-router-dom";

const DashBoardRoute = () => {
  const [isStudent] = useUser();
  const [isInstructor] = useInstructor();
  const [isAdmin] = useAdmin();
  return (
    <div className="text-center mx-auto">
      <>
        {isStudent && (
          <>
            <li className=" px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/selected">MY selected classes</Link>
            </li>
            <li className=" px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/enRoll">EnRoll classes</Link>
            </li>
          </>
        )}
      </>
      <>
        {isInstructor && (
          <>
            <li className=" px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/addClass">Add a Class</Link>
            </li>
            <li className="px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/myClass">My class</Link>
            </li>
          </>
        )}
      </>
      <>
        {isAdmin && (
          <>
            <li className=" px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/manageClasses">Manage Classes</Link>
            </li>
            <li className=" px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/manageUsers">Manage user</Link>
            </li>
          </>
        )}
      </>
    </div>
  );
};

export default DashBoardRoute;
