import React from 'react'
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
        // console.log(reserva._id)
        reserva._id !== '' &&
        toast((t) =>(
            <div className='flex flex-col gap-3 items-center'>
                <div>
                    <Typography variant='lead'>eliminar {reserva?.servicio_id.servicio}</Typography>
                    <Typography variant='lead'>{format(reserva.fecha,'dddd hh:mm a')}</Typography>
                </div>

                <div className='flex gap-5'>
                    <Button
                        size='sm'
                        variant='text'
                        className='text-red-600 border border-red-700'
                        onClick={() => toast.dismiss(t.id)}
                    >
                        no
                    </Button>

                    <Button
                        size='sm'
                        variant='text'
                        className='border border-green-700 text-green-700'
                        onClick={() =>{
                            toast.dismiss(t.id)
                            eliminarReserva(reserva._id)
                        }}
                    >
                        si
                    </Button>
                </div>
            </div>
        ),{
            style: { background: '#94a3b8', textTransform: 'capitalize', fontWeight: 'bolder'}
        })
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

                <div className='w-full h-full flex justify-around'>

                    <div className='h-full w-[20%] flex flex-col items-center justify-evenly'>
                        <User size={32} weight="regular" color='white' />
                        <Scissors size={32} weight="regular" color='white' />
                        <CalendarCheck size={32} weight="regular" color='white' />
                        <Watch size={32} weight="regular" color='white' />
                        <Money size={32} weight="regular" color='white' />
                    </div>

                    <div className='h-full w-[60%] flex flex-col justify-evenly text-white capitalize'>
                        <Typography>{reserva?.barbero_id.nombres}</Typography>
                        <Typography>{reserva.servicio?.map(({servicio}) => servicio).join(' + ')}</Typography>
                        <Typography>{format(reserva?.fecha,'dddd D MMMM ')}</Typography>
                        <Typography>{format(reserva?.fecha,'HH:mm')} / {format(reserva?.fecha,'h:mm a')}</Typography>
                        <Typography>$ {numeral(reserva?.valor).format()}</Typography>
                    </div>
                </div>
                <Button
                    size='sm'
                    variant='text'
                    className='border border-red-700 text-red-700'
                    onClick={handleEliminar}
                >
                    eliminar
                </Button>
            </div>
        </div>
    )
}
