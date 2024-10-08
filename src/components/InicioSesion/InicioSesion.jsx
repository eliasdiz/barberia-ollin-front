import React, { useRef } from 'react'
import InputPassword from '../InputPassword/InputPassword'
import InputTexto from '../InputTexto/InputTexto'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Typography } from '@material-tailwind/react'
import usuarioActions from '../../Store/Usuarios/actions'
import { urlLocal } from '../../urlHost'
import { FiAtSign } from "react-icons/fi";



const { getUsuario } = usuarioActions


export default function InicioSesion() {

    // let url = `${urlHost}auth/inicio-sesion`
    let usuario = useRef()
    let password = useRef()
    const dispatch = useDispatch()
    let navigate = useNavigate()


    const handleInicioseion = () =>{
        let data = {
            email: usuario.current.value.toLowerCase(),
            password: password.current.value
        }
        // console.log(data)
        const promesa = axios.post(`${urlLocal}usuarios/inicio-sesion`, data);
        toast.promise(
            promesa,
            {
                loading: 'verificando usuario',
                success: (res) => {
                    localStorage.setItem('token', res.data.token);
                    let usuario = res.data.user
                    setTimeout(() => {
                        dispatch(getUsuario())
                        if(usuario.barbero) return navigate('/barbero')
                        if(usuario.admin) return navigate('/admin')
                    }, 2500);
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    console.log(error);
                    return <>{error.response.data.message}</>;
                } 
            },
            {   
                style: { background: '#94a3b8', textTransform: 'capitalize', color: 'black'},
                success: { duration: 1200 },
                error: {duration: 1200}
            }
        );
        
    }

    return (
    <div className='flex justify-center p-5'>
        <div
            className="flex flex-col gap-2 shadow-lg bg-blue-gray-400 px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl w-full max-w-md"
        >
            <div 
                className='font-bold uppercase text-center p-2'
            >
                iniciar sesion
            </div>
            <div>
                <InputTexto
                    icono={<FiAtSign 
                    className='w-7 h.7' />} 
                    placeHold='email' 
                    parentRef={usuario}
                />
                <InputPassword parentRef={password} />
                <div className="flex w-full">
                    <Button 
                        color='teal'
                        type="submit" 
                        fullWidth
                        variant='gradient'
                        className="flex items-center justify-center gap-3 text-base "
                        onClick={handleInicioseion}
                    >
                        entrar
                        <span>
                        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </span>
                    </Button>
                </div>
            </div>
            <div className='flex items-center gap-1'>
                <Link
                    className='capitalize underline'
                    to={'/registro'}
                >
                    <Typography>click aqui para registrarte</Typography>
                </Link>
                <Typography variant='h5'>👈</Typography>
            </div>
        </div>
        <Toaster />
    </div>
    )
}
