import React from "react";
import useUser from "../../../Hook/useUser";
import useInstructor from "../../../Hook/useInstructor";
import useAdmin from "../../../Hook/useAdmin";
import { Link } from "react-router-dom";

const DashBoardRoute = () => {
  const [isStudent, isStudentLoading] = useUser();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const [isAdmin, isAdminLoading] = useAdmin();
  if (isStudentLoading || isInstructorLoading || isAdminLoading) {
    return <span className="loading loading-dots loading-md"></span>;
  }
  return (
    <div className="text-center mx-auto">
      <>
        {isStudent && (
          <>
            <li className=" px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/dashboard/selected">MY selected classes</Link>
            </li>
            <li className=" px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/dashboard/enRoll">EnRoll classes</Link>
            </li>
          </>
        )}
      </>
      <>
        {isInstructor && (
          <>
            <li className=" px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/dashboard/addClass">Add a Class</Link>
            </li>
            <li className="px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/dashboard/myClass">My class</Link>
            </li>
          </>
        )}
      </>
      <>
        {isAdmin && (
          <>
            <li className=" px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/dashboard/manageClasses">Manage Classes</Link>
            </li>
            <li className=" px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/dashboard/manageUsers">Manage user</Link>
            </li>
          </>
        )}
      </>
    </div>
  );
};

export default DashBoardRoute;
