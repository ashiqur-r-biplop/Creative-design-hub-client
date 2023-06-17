import { Route, createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Instructor from "../pages/Instructor/Instructor/Instructor";
import Classes from "../pages/Classes/Classes/Classes";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Register from "../pages/Login/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import InstructorRoute from "./InstructorRoute";
import SelectedClass from "../pages/Dashboard/SelectedClass/SelectedClass";
import EnrollClass from "../pages/Dashboard/EnrollClass/EnrollClass";
import StudentRoute from "./StudentRoute";
import AddClasses from "../pages/Dashboard/AddClasses/AddClasses";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import AdminRoute from "./AdminRoute";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Payment from "../pages/Payment/Payment";
import PaymentHistory from "../pages/Payment/PaymentHistory";
import Profile from "../pages/Profile/Profile";
import AllUpcomingClasses from "../pages/AllUpcomingClasses/AllUpcomingClasses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/instructor",
        element: <Instructor></Instructor>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/upcomingClasses",
        element: <AllUpcomingClasses></AllUpcomingClasses>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/selected",
        element: (
          <StudentRoute>
            <SelectedClass></SelectedClass>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/enroll",
        element: (
          <StudentRoute>
            <EnrollClass></EnrollClass>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/addClass",
        element: (
          <InstructorRoute>
            <AddClasses></AddClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/myClass",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/manageClasses",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <StudentRoute>
            <Payment></Payment>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/PaymentHistory",
        element: (
          <StudentRoute>
            <PaymentHistory></PaymentHistory>
          </StudentRoute>
        ),
      },
    ],
  },
]);
