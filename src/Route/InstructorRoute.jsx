import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useInstructor from "../Hook/useInstructor";
const InstructorRoute = () => {
  const { user, loading } = useAuth();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();

  if (loading || isInstructorLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isInstructor) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
