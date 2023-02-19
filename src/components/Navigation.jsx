import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const navLinkClass = ({ isActive }) => `
    w-full text-base text-center font-nunito m-2.5
    ${
      isActive
        ? "bg-cyan text-gray-300"
        : "bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan active:text-gray-300"
    }
    border-0 cursor-pointer rounded capitalize font-semibold
  `;

  return (
    <nav className="w-[40%] mt-16 flex justify-around align-middle border border-cyan rounded-lg">
      <NavLink to="/" end className={navLinkClass}>
        Crypto
      </NavLink>

      <NavLink to="/trending" className={navLinkClass}>
        Trending
      </NavLink>

      <NavLink to="/saved" className={navLinkClass}>
        Saved
      </NavLink>
    </nav>
  );
};

export default Navigation;
