import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../Hook/useInstructor";
import useAuth from "../Hook/UseAuth";
const InstructorRoute = ({children}) => {
  const { user, loading } = useAuth();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();
  console.log(user, isInstructor);
  if (loading || isInstructorLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user && isInstructor) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
