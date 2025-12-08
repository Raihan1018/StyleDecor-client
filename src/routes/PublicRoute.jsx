import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/coverage/Coverage";

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
        path: "services",
        // Component: Services,
        element: <div>All Services Page Coming Soon...</div>,
      },
    ],
  },
]);
