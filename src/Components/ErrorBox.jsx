import React from 'react'

export default function ErrorBox({msg}) {
  return (
    <div className='flex justify-center'>
       <div className='w-[96%] bg-red-600 shadow-md mt-5 p-5 '>
        <h1 className='text-3xl text-white text-center'>{msg}</h1>
    </div>

    </div>
   
  )
}
