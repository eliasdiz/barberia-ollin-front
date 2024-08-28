import { Button, Input, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { urlLocal } from '../../urlHost'
import toast, { Toaster } from 'react-hot-toast'
import actionsReservas from '../../Store/Reservas/actions.js'
import { useDispatch } from 'react-redux'



const { getCliente } = actionsReservas



export default function ValidacionEmail() {


    const [ email, setEmail ] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const validar = () => {
        const data = {
            email: email
        }
        // console.log(data)
        let promesa = axios.post(`${urlLocal}reservas/validar-email`,data)
        toast.promise(
            promesa,
            {
                loading: 'validando usuario',
                success: (res) => {
                    let cliente = res.data.cliente
                    dispatch(getCliente({cliente: cliente}))
                    setTimeout(() => {
                        navigate('/reservas')
                    }, 2500);
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    return <>{error.response.data.message}</>
                }
            },{
                style: { background: '#94a3b8', textTransform: 'capitalize', color: 'black', textAlign: 'center'},
            }
        )
    }


    return (
        <>
            <div className='flex justify-center'>

                <div className='w-full flex flex-col items-center md:w-[60%] bg-blue-gray-400 rounded-lg border'>

                    <div className='p-6'>
                        <Typography variant='h5' className='text-center capitalize text-white'>            
                            validemos tu email
                        </Typography>
                    </div>

                    <div className="relative flex w-[90%] xsm:w-[40%] md:w-[60%] ">
                        <Input
                            color='white'
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            size="sm"
                            color={email ? "indigo" : "blue-gray"}
                            disabled={!email}
                            className="!absolute right-1 top-1 rounded"
                            onClick={validar}
                        >
                            validar
                        </Button>
                    </div>

                    <div className='flex items-center gap-1 p-3'>
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
        </>
    )
}
