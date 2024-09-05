import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

export default function Home() {
  return (
    <div dir="rtl" className="grid grid-cols-6 h-screen">
      <div className="col-span-1 z-2 md:z-0 lg:z-2 ">
        <Sidebar />
      </div>
      <div className="col-span-5    ">
        <Header />
        <div  className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}


