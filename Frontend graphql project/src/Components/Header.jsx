import React from "react";
import graphql_icon from "../assets/graphql_icon.png";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const naviate  = useNavigate();
  const token= localStorage.getItem("token");

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    naviate('/login')
  }
  return (
      <div className="flex justify-between items-center bg-black/20 px-2 py-4">
        <Link className="flex items-center" to="/">
        <img className="w-12 h-12 object-cover" src={graphql_icon} />
        <span className="mr-2 text-[20px] text-main-heading">ProjectMgmt</span>
        </Link>

        {
          token?
        <button onClick={handleLogout} className='text-main-heading font-bold text-lg border border-main-heading rounded px-2 py-1 hover:bg-main-heading hover:text-main-color transition ease-linear duration-500'>
                Logout
        </button>
          :""
        }

      </div>
  );
}

export default Header;
