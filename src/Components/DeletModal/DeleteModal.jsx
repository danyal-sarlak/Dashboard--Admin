// src/components/DeleteModal.jsx
import React, { useEffect } from 'react';



export default function DeleteModal({submitAction,cancelAction}) {
  useEffect(() => {
    const checkKey = (event) => {
      if (event.keyCode === 27) {
        cancelAction();
      }
    };
    window.addEventListener("keydown", checkKey);
    return () => window.removeEventListener("keydown", checkKey);
  }, [cancelAction]);

  return  (
    <div className=' flex  justify-center z-10 items-center fixed top-0 left-0 w-full bg-black bg-opacity-50  h-svh '>
      <div className='modal-conten '>
     <div className='bg-white p-12 text-center'>
      <h1 className='text-3xl font-bold'>آیا از حذف اطمینان دارید؟</h1>
      <div className='flex gap-5'>
        <button
          className='w-full mt-7 text-xl p-4 bg-blue-600 text-white'
          onClick={() => submitAction()}
        >
          بله
        </button>
        <button
          className='w-full mt-7 text-xl p-4 bg-blue-600 text-white'
          onClick={() => cancelAction()}
        >
          خیر
        </button>
      </div>
    </div>

   </div>

    </div>
   
   
   
  );
}


