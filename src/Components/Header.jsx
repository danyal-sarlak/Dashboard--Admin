
import { FaRegUser } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { BsBell } from "react-icons/bs";
import { MdOutlineLightMode, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

export default function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      (async () => {
        try {
          const { data, error } = await supabase
            .from('cmsUsers')
            .select('username')
            .eq('token', token)
            .single();

          if (error) throw error;

          if (data) {
            setUserName(data.username);
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      })();
    } else {
      // Redirect to login page if no token
      
    }
  }, [navigate]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen)
  };
  const handleLogoutClick = () => {
    setUserName(null);
    localStorage.removeItem("token");
    toggleAccount()
  };

  return (
    <div className="relative flex  md:flex-row md:pr-36 lg:pr-24  xl:pr-4    mt-5 px-6 justify-between items-center">
      {/* User Info */}
      <div
        className="flex justify-center bg-blue-600 text-white md:p-3 rounded-3xl p-1 hover:bg-blue-500 items-center pr-5 gap-3 cursor-pointer"
        onClick={() => toggleAccount()}
      >
        <FaRegUser className="w-4 h-4 md:w-6 md:h-6" />
        {userName || 'Account'}
      </div>
      {
        isAccountOpen && (
          <div className=" absolute top-full mt-2 bg-slate-200 shadow-lg rounded-lg p-2 flex flex-col items-center z-50">
           <span
              onClick={()=>navigate("/login")}
              className="cursor-pointer py-1 px-3 hover:bg-gray-400 rounded"
            >
              <span className="flex items-center gap-1">
                Login
               
              </span>
            </span>
            <span
              onClick={handleLogoutClick}
              className="cursor-pointer py-1 px-3 hover:bg-gray-400 rounded"
            >
              <span className="flex items-center gap-1">
                Log out
               
              </span>
            </span>
          </div>
        )
      }

      {/* Action Icons */}
      <div className="flex  md:flex-row gap-2 md:gap-5 justify-center items-center ">
        {/* Search Button */}
        <div className="relative">
          <button
            className="bg-blue-600 md:hidden p-1 rounded-md border border-black cursor-pointer"
            onClick={toggleSearch}
          >
            <MdSearch className="text-white" />
          </button>
          <div className="bg-slate-200 hidden md:flex p-0 md:p-2 rounded-2xl">
          <input
            className="p-1 md:p-2 text-center bg-slate-200 w-14 md:w-36 lg:w-80 h-1 md:h-8 rounded-2xl"
            type="text"
            placeholder="جست و جو کنید..."
          />
          <button className="bg-blue-600 p-2  rounded-md text-white border border-black ">
          <MdSearch className="text-white" />
          </button>
        </div>
          
          {/* Search Input */}
          {isSearchOpen && (
            <div className="absolute w-28 sm:hidden top-full   left-0 right-0 bg-slate-200 p-2 rounded-xl ">
              <input
                className="p-2 text-center bg-slate-200 w-full rounded-2xl"
                type="text"
                placeholder="جست و جو کنید..."
              />
              <button
                className="bg-blue-600 mt-2  w-full text-white rounded-md border border-black "
                onClick={toggleSearch}
              >
                جست و جو
              </button>
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <div className="bg-blue-600 md:p-3 p-1 border rounded-md border-black">
          <BsBell className="text-white" />
        </div>
        
        {/* Theme Icon */}
        <div className="bg-blue-600 md:p-3 p-1 border rounded-md border-black">
          <MdOutlineLightMode className="text-white" />
        </div>
      </div>
    </div>
  );
}
