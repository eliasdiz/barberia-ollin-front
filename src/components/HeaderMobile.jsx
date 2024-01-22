
import { Button } from "@material-tailwind/react";
import React from "react";
import { FaSquarePhone } from "react-icons/fa6";
import {  Link } from "react-router-dom";



function HeaderMobile() {

  

  return (
    <>
      <div className="w-full h-[15rem] border rounded-2xl font-bold bg-opacity-70 bg-black md:hidden">
        <div className="flex justify-end mt-3 px-3 text-black">
          <FaSquarePhone 
            Link='#divHorarios'
            color="green" 
            className="w-6 h-6"
            
          />
        </div>
        <div className="flex items-center justify-evenly h-[13rem] text-white">
          <h1 className="text-white text-4xl  xxsm:text-2xl">Barberia Ollin</h1>
          <img
            src="https://i.postimg.cc/ryYmjMph/logo-barberia-png.png"
            alt="logo"
            className=" w-48 xxsm:w-40"
          ></img>
        </div>
      </div>
    </>
  );
}

export default HeaderMobile;
