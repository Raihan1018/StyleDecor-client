import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/coverage/Coverage";
import AllServices from "../pages/All-services/All-services";
import AddServices from "./PrivateRoute/AdminRoute/AddServices";
import ServicesList from "./PrivateRoute/AdminRoute/ServicesList";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UserProfile from "../pages/UserProfile/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        loader: () => fetch("../coverage.json").then((res) => res.json()),
        Component: Coverage,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "user-profile",
        Component: UserProfile,
      },
      {
        path: "all-services",
        Component: AllServices,
      },
      {
        path: "add-services",
        Component: AddServices,
      },
      {
        path: "service-list",
        Component: ServicesList,
      },
    ],
  },
]);
