import React from "react";
import graphql_icon from "../assets/graphql_icon.png";

function Header() {
  return (
    <a href="/">
      <div className="flex items-center bg-black/20 tect-e">
        <img className="w-12 h-12 object-cover" src={graphql_icon} />
        <span className="mr-2 text-[20px] text-[#e632ad]">ProjectMgmt</span>
      </div>
    </a>
  );
}

export default Header;
