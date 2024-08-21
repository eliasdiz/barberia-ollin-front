import React, { useRef } from 'react'
import InputTexto from '../InputTexto/InputTexto'
import { Button } from '@material-tailwind/react'
import toast, { Toaster } from 'react-hot-toast'
import { TbAbc } from "react-icons/tb";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FiAtSign } from "react-icons/fi";
import axios from 'axios';
import { urlLocal } from '../../urlHost';
import { useNavigate } from 'react-router-dom';



export default function FormRegistro() {

    const navigate = useNavigate()
    const nombres = useRef()
    const apellidos = useRef()
    const email = useRef()
    const telefono = useRef()


    const hanldeRegistro = () => {
        let data = {
            nombres: nombres.current.value.toLowerCase(),
            apellidos: apellidos.current.value.toLowerCase(),
            email: email.current.value.toLowerCase(),
            telefono: telefono.current.value,
            password: ''
        }
        // console.log(data)
        const promesa = axios.post(`${urlLocal}usuarios/crear`,data) 
        toast.promise(
            promesa,
            {
                loading: 'creando usuario',
                success: (res) =>{
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    return <>{error.response.data.message}</>
                }
            },{
                style: { background: '#94a3b8', textTransform: 'capitalize', color: 'black'},
            }
        )
    }

    return (
        <div className='flex justify-center p-4'>
            <div
                className="flex flex-col shadow-lg bg-blue-gray-400 px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl w-full max-w-md"
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
                        parentRef={nombres}
                        className='capitalize border-2 border-black'
                    />

                    <InputTexto 
                        icono={<TbAbc className='w-7 h-7' />}
                        placeHold='apellido' 
                        parentRef={apellidos}
                    />
                    <InputTexto 
                        placeHold='email' 
                        icono={<FiAtSign className='w-7 h.7 ' />}
                        parentRef={email}
                    />
                    <InputTexto 
                        placeHold='telefono'
                        tipo='number'
                        icono={<HiOutlineDevicePhoneMobile className='w-6 h-6' />}
                        parentRef={telefono}
                    />
                    <div className="flex w-full">
                        <Button 
                            color='teal'
                            type="submit" 
                            fullWidth
                            variant='gradient'
                            className="flex items-center justify-center gap-3 text-base "
                            onClick={hanldeRegistro}
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
