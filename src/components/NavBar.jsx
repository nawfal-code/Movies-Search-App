import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { path: "/", label: "Search", icon: "🔍" },
    { path: "/favorites", label: "Favorites", icon: "⭐" },
  ];

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-gray-800 text-white fixed w-full top-0  z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-between px-4 sm:px-6 py-3">
        {/* Logo (centered on mobile) */}
        <Link
          to="/"
          className="sm:text-md md:text-lg  font-bold text-red-500 tracking-wide mx-auto sm:mx-0"
        >
          🎬 MovieView
        </Link>

        {/* Desktop Links (hidden on mobile) */}
        <div className="hidden sm:flex gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-gray-300 hover:text-red-400 transition ${
                  isActive ? "text-red-500 font-semibold" : ""
                }`
              }
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
