import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUser from "../Hook/useUser";
import useAuth from "../Hook/UseAuth";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isStudent, isStudentLoading] = useUser();
  const location = useLocation();

  if (loading || isStudentLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isStudent) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default StudentRoute;
