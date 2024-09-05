
import React, { useEffect } from "react";

export default function DetailsModal({ children, onHide }) {
  useEffect(() => {
    const checkKey = (event) => {
      if (event.keyCode === 27) {
        onHide();
      }
    };
    window.addEventListener("keydown", checkKey);
    return () => window.removeEventListener("keydown", checkKey);
  }, [onHide]);

  return (
    <div className="flex justify-center z-10 items-center fixed top-0 left-0 w-full bg-black bg-opacity-50 h-svh">
      <div className="p-8 text-xl bg-white rounded-lg">
        {children}
      </div>
    </div>
  );
}
