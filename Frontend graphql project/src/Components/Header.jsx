import React from "react";
import graphql_icon from "../assets/graphql_icon.png";
import { Link } from "react-router-dom";

function Header() {
  return (
      <div className="flex items-center bg-black/20 px-2 py-4">
        <Link className="flex items-center" to="/">
        <img className="w-12 h-12 object-cover" src={graphql_icon} />
        <span className="mr-2 text-[20px] text-main-heading">ProjectMgmt</span>
        </Link>
      </div>
  );
}

export default Header;
