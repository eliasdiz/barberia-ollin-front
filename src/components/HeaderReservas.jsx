import React from 'react'

function HeaderReservas() {
  return (
    <>
    <div className='max-w-screen-2xl mx-auto'>
      <div className="w-full h-[15rem] border rounded-2xl font-bold bg-opacity-70 bg-black">
        <div className="flex items-center justify-evenly h-[13rem] text-white">
          <h1 className="text-white text-4xl  xxsm:text-2xl">Barberia Ollin</h1>
          <img
            src="https://i.postimg.cc/ryYmjMph/logo-barberia-png.png"
            alt="logo"
            className=" w-48 xxsm:w-40 mt-5"
          ></img>
        </div>
      </div>
    </div>
    </>
  )
}

export default HeaderReservas