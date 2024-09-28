import React, { useState } from 'react'
import { Typography, Button } from '@material-tailwind/react'
import { CalendarCheck, Money, Scissors, User, Watch } from "@phosphor-icons/react";
import numeral from 'numeral';
import { format } from '@formkit/tempo'
import toast from 'react-hot-toast';
import axios from 'axios';
import { urlLocal } from '../../urlHost.js';
import actionsReservas from '../../Store/Reservas/actions.js'
import { useDispatch } from 'react-redux';


const { getReservasCLiente} = actionsReservas


export default function CardInfoReserva({reserva}) {

    const dispatch = useDispatch()

    const mostrarServicios = reserva?.servicio?.map(({servicio}) => servicio).join(' + ')
    const [ alertaEliminar, setAlertaEliminar ] = useState(false)



    const eliminarReserva = (id) => {
        let promesa = axios.delete(`${urlLocal}reservas/${id}`)
        toast.promise(
            promesa,
            {
                loading: 'eliminado reserva',
                success: (res) => {
                    dispatch(getReservasCLiente({id: reserva.cliente_id}))
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    console.log(error.response.data)
                    return <>{error.response.data.message}</>
                }
            },{
                succes:{duration:1000},
                error: {duration: 1000},
                style: { background: '#94a3b8', textTransform: 'capitalize', fontWeight: 'bolder'},
            }
        )
    }

    const handleEliminar = () => {
        setAlertaEliminar(true)
        reserva._id !== ''  &&
        toast((t) => (
            <div className='bg-transparent flex flex-col gap-1'>
                <div className='w-[15rem] h-full bg-blue-gray-700 rounded-md capitalize text-center'>
                    <Typography color='white' variant='lead' className='p-1'>
                        eliminar servicio ? 
                    </Typography>

                    <div className='p-2 border-t-2 border-gray-600 cursor-pointer'>
                        <Typography 
                            color='red' 
                            variant='lead'
                            onClick={() => { 
                                toast.dismiss(t.id) 
                                eliminarReserva(reserva._id)
                            }}
                        >
                            eliminar
                        </Typography>
                    </div>
                </div>

                <div 
                    className=' bg-blue-gray-700 rounded-md text-center capitalize p-1 cursor-pointer' 
                    onClick={() => handleCancelarEliminar(t)}
                >
                    <Typography color='blue' variant='lead'>
                        cancelar
                    </Typography>
                </div>
            </div>
        ),{
            duration: Infinity,
            style:{background: 'transparent', boxShadow: 'none'}
        })
    }

    const handleCancelarEliminar = (t) => {
        toast.dismiss(t.id)
        setAlertaEliminar(false)
    }
    

    return (
        <div className='h-full flex justify-center items-center'>
            <div 
                className='border rounded-xl w-[75%] xsm:w-[50%] md:w-[40%]  h-[90%] md:h-full xsm:h-full flex flex-col justify-around items-center p-2'
            >
                <Typography 
                    variant='lead'
                    className='text-white capitalize'
                >
                    detalles de la reserva
                </Typography>

                <div className='w-full h-full flex justify-center gap-3 '>

                    <div className='h-full w-[20%] flex flex-col items-center justify-around'>
                        <User size={32} weight="regular" color='white' />
                        <Scissors size={32} weight="regular" color='white' />
                        <CalendarCheck size={32} weight="regular" color='white' />
                        <Watch size={32} weight="regular" color='white' />
                        <Money size={32} weight="regular" color='white' />
                    </div>

                    <div className='h-full w-[80%] flex flex-col justify-around text-white capitalize'>
                        <Typography>{reserva?.barbero_id.nombres} {reserva?.barbero_id.apellidos}</Typography>
                        <Typography>{mostrarServicios}</Typography>
                        <Typography>{format(reserva?.fecha.horaInicio,'dddd D MMMM ')}</Typography>
                        <Typography>{format(reserva?.fecha.horaInicio,'HH:mm')} / {format(reserva?.fecha.horaInicio,'h:mm a')}</Typography>
                        <Typography>$ {numeral(reserva?.valor).format()}</Typography>
                    </div>
                </div>
                <Button
                    size='sm'
                    variant='text'
                    className='border border-red-700 text-red-700'
                    onClick={handleEliminar}
                    disabled={alertaEliminar}
                >
                    eliminar
                </Button>
            </div>
        </div>
    )
}
