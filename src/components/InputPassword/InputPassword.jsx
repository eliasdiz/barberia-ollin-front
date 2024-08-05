import React, { useState } from 'react'
import { MdLockOutline } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";

export default function InputPassword(props) {

    const [ showPassword , setShowPassword ] = useState(false)
    const [ unlock, setUnlock] = useState(false)

    const mostrarPassword = () => {
        setShowPassword(!showPassword)
        setUnlock(!unlock)
    }

    return (
    <>
        <div className="flex flex-col mb-6">
            <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">{props.name}</label>
            <div className="relative">
                    <div  className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span onClick={mostrarPassword}>
                        {
                            !unlock ? <MdLockOutline className='w-6 h-6' /> : <MdLockOpen className='w-6 h-6' />
                        }   
                    </span>
                    </div>
                <input 
                ref={props.parentRef}
                id="password" 
                type={ !showPassword ? 'password' : 'text' }
                name="password" 
                className="sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 " placeholder="Contraseña"     
                />  
            </div>
        </div>
    </>
    )
}
