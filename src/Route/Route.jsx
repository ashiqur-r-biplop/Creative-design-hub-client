import { createBrowserRouter } from "react-router-dom";
import Navbar from "../sheard/Navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar></Navbar>,
  },
]);
