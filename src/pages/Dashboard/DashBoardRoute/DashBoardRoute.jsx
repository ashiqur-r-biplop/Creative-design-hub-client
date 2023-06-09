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
    <div>
      <>
        {isStudent && (
          <>
            <li>
              <Link>MY selected classes</Link>
            </li>
            <li>
              <Link>EnRoll classes</Link>
            </li>
          </>
        )}
      </>
      <>
        {isInstructor && (
          <>
            <li>
              <Link>Add a Class</Link>
            </li>
            <li>
              <Link>My class</Link>
            </li>
          </>
        )}
      </>
      <>
        {isAdmin && (
          <>
            <li>
              <Link>MY selected classes</Link>
            </li>
            <li>
              <Link>EnRoll classes</Link>
            </li>
          </>
        )}
      </>
    </div>
  );
};

export default DashBoardRoute;
