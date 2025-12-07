import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="container max-w-7xl  mx-auto px-4 md:px-6 lg:px-8 flex flex-col min-h-screen bg-base-300">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
