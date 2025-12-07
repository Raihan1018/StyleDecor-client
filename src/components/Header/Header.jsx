import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={handleClose}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
              isActive
                ? "text-blue-500 bg-white/10 backdrop-blur border border-blue-400/30 shadow-sm"
                : "hover:text-blue-400 hover:bg-white/5"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          onClick={handleClose}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
              isActive
                ? "text-blue-500 bg-white/10 backdrop-blur border border-blue-400/30 shadow-sm "
                : "hover:text-blue-400 hover:bg-white/5"
            }`
          }
        >
          Services
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/coverage"
          onClick={handleClose}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
              isActive
                ? "text-blue-500 bg-white/10 backdrop-blur border border-blue-400/30 shadow-sm"
                : "hover:text-blue-400 hover:bg-white/5"
            }`
          }
        >
          Coverage
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.1)] sticky top-0 z-50 px-4 lg:px-10">
      {/* Left Section */}
      <div className="navbar-start flex items-center gap-3">
        {/* Mobile Menu Button */}
        <div className="dropdown">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost lg:hidden p-2"
          >
            <HiMenuAlt3 className="h-7 w-7 text-blue-400" />
          </button>

          {isOpen && (
            <ul className="menu menu-sm dropdown-content mt-3 w-56 rounded-xl bg-white/20 backdrop-blur-xl shadow-lg p-3">
              {links}
            </ul>
          )}
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold text-blue-500 tracking-tight hover:opacity-90 transition"
          onClick={handleClose}
        >
          <img
            src="https://img.icons8.com/?size=100&id=9J8dZrJPDCdT&format=png&color=000000"
            alt="logo"
            className="w-10 h-10 object-contain"
          />
          StyleDecor
        </Link>
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-4 px-1">{links}</ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end">
        <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transition-all duration-300">
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
