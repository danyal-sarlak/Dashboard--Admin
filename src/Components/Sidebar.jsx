
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div   >
      
      <div className="md:hidden  sm:hidden  fixed top-0  right-0 p-4 ">
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl bg-blue-700 p-2  rounded"
        >
          <FaBars />
        </button>
      </div>

     
      <div
        className={`fixed top-0 right-0 h-full bg-blue-700 text-white md:w-56 w-44 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:block z-40`}
      >
         <button
          onClick={toggleSidebar}
          className="text-white md:hidden pr-2 text-2xl bg-blue-700 p-2  rounded"
        >
          <FaBars />
        </button>
      
        
        
        <ul className="list-none mt-6">
          <h1 className="font-bold text-lg pt-8 md:pt-0 md:py-2 pr-3  text-right border-b-2 border-blue-500">
          به داشبورد خود خوش آمدید
        </h1>
          <li className="relative p-3 mb-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex w-full justify-start p-2 items-center text-lg ${
                  isActive ? "bg-blue-300" : ""
                }`
              }
            >
              صفحه اصلی
            </NavLink>
          </li>
          <li className="relative p-3 ">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex w-full p-2 justify-start items-center text-lg ${
                  isActive ? "bg-blue-300" : ""
                }`
              }
            >
              محصولات
            </NavLink>
          </li>
          <li className="relative p-3 ">
            <NavLink
              to="/comments"
              className={({ isActive }) =>
                `flex w-full p-2 justify-start items-center text-lg ${
                  isActive ? "bg-blue-300" : ""
                }`
              }
            >
              کامنت‌ها
            </NavLink>
          </li>
          <li className="relative p-3 ">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex w-full p-2 justify-start items-center text-lg ${
                  isActive ? "bg-blue-300" : ""
                }`
              }
            >
              کاربران
            </NavLink>
          </li>
          <li className="relative p-3 ">
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `flex w-full p-2 justify-start items-center text-lg ${
                  isActive ? "bg-blue-300" : ""
                }`
              }
            >
              سفارشات
            </NavLink>
          </li>
          <li className="relative p-3 ">
            <NavLink
              to="/offs"
              className={({ isActive }) =>
                `flex w-full p-2 justify-start items-center text-lg ${
                  isActive ? "bg-blue-300" : ""
                }`
              }
            >
              تخفیف‌ها
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
