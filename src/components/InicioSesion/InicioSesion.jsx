import React, { useRef } from 'react'
import InputPassword from '../InputPassword/InputPassword'
import InputTexto from '../InputTexto/InputTexto'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import usuarioActions from '../../../Store/Usuarios/actions'
import { urlLocal } from '../../urlHost'


const { getUsuario } = usuarioActions


export default function InicioSesion() {

    // let url = `${urlHost}auth/inicio-sesion`
    let usuario = useRef()
    let password = useRef()
    const dispatch = useDispatch()
    let navigate = useNavigate()


    const handleInicioseion = async(e) =>{
        e.preventDefault()
        let data = {
            email: usuario.current.value,
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
                    dispatch(getUsuario());
                    setTimeout(() => {
                        navigate('/')   
                    }, 1500);
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    console.log(error);
                    return <>{error.response.data.message}</>;
                } 
            },
            {   
                style: { textTransform: 'capitalize'},
                success: { duration: 1200 },
                error: {duration: 1200}
            }
        );
        
    }

    return (
    <div className='flex justify-center p-5'>
        <form
            className="flex flex-col gap-2 shadow-lg bg-blue-gray-400 px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl w-full max-w-md"
            onSubmit={handleInicioseion}
        >
            <div 
                className='font-bold uppercase text-center p-2'
            >
                iniciar sesion
            </div>
            <div>
                <InputTexto placeHold='email' parentRef={usuario}/>
                <InputPassword parentRef={password} />
                <div className="flex w-full">
                    <Button 
                        color='teal'
                        type="submit" 
                        fullWidth
                        variant='gradient'
                        className="flex items-center justify-center gap-3 text-base "
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
        </form>
        <Toaster />
    </div>
    )
}
