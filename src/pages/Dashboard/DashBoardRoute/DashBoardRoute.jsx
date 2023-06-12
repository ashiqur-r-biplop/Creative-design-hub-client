import React from "react";
import useUser from "../../../Hook/useUser";
import useInstructor from "../../../Hook/useInstructor";
import useAdmin from "../../../Hook/useAdmin";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt } from "@fortawesome/free-solid-svg-icons";
import { Fade } from "react-awesome-reveal";

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
            <Fade delay={1e3} cascade damping={1e-1}>
              <li className=" px-3 py-2 rounded-md text-sm font-medium">
                <Link to="/dashboard/selected">MY selected classes</Link>
              </li>
            </Fade>
            <Fade delay={1e3} cascade damping={1e-1}>
              <li className=" px-3 py-2 rounded-md text-sm font-medium">
                <Link to="/dashboard/enroll">Enroll classes</Link>
              </li>
            </Fade>
            <Fade delay={1e3} cascade damping={1e-1}>
              <li className=" px-3 py-2 rounded-md text-sm font-medium">
                <Link to="/dashboard/PaymentHistory">
                  <FontAwesomeIcon icon={faMoneyBillAlt}></FontAwesomeIcon>{" "}
                  PaymentHistory
                </Link>
              </li>
            </Fade>
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
