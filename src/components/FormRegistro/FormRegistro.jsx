import React from 'react'
import InputTexto from '../InputTexto/InputTexto'
import { Button } from '@material-tailwind/react'
import { Toaster } from 'react-hot-toast'
import { TbAbc } from "react-icons/tb";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FiAtSign } from "react-icons/fi";


export default function FormRegistro() {

    const hanldeRegistro = () => {
        
    }

    return (
        <div className='flex justify-center p-5'>
            <div
                className="flex flex-col gap-2 shadow-lg bg-blue-gray-400 px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl w-full max-w-md"
                onClick={hanldeRegistro}
            >
                <div 
                    className='font-bold uppercase text-center p-2'
                >
                    registro
                </div>
                <div>
                    <InputTexto 
                        icono={<TbAbc className='w-7 h-7' />}
                        placeHold='nombre' 
                        // parentRef={usuario}
                    />

                    <InputTexto 
                        icono={<TbAbc className='w-7 h-7' />}
                        placeHold='apellido' 
                        // parentRef={usuario}
                    />
                    <InputTexto 
                        placeHold='email' 
                        icono={<FiAtSign className='w-7 h.7' />}
                        // parentRef={usuario}
                    />
                    <InputTexto 
                        placeHold='telefono'
                        tipo='number'
                        icono={<HiOutlineDevicePhoneMobile className='w-6 h-6' />}
                        // parentRef={usuario}
                    />
                    <div className="flex w-full">
                        <Button 
                            color='teal'
                            type="submit" 
                            fullWidth
                            variant='gradient'
                            className="flex items-center justify-center gap-3 text-base "
                        >
                            registrate
                            <span>
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}
