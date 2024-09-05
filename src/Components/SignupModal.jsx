import React from "react";
import { createPortal } from "react-dom";
import { TiTick } from "react-icons/ti";

export default function SignupModal() {
  return createPortal(
    <div className="flex justify-center z-20 items-center fixed top-0 left-0 w-full bg-black bg-opacity-50 h-screen">
      <div className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/4 xl:w-1/5 h-auto p-4 flex  items-center justify-center bg-white rounded-md">
        <p className="text-green-500 font-bold ">Sign up Success</p>
        <TiTick className="text-green-500 w-8 h-8" />
      </div>
    </div>,
    document.body
  );
}