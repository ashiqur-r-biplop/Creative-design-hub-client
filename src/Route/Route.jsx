import { createBrowserRouter } from "react-router-dom";
import Navbar from "../sheard/Navbar";
import Main from "../Layout/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: {
      path: "/",
    },
  },
]);
