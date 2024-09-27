import { Button, Dialog, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Scissors, User, PhoneOutgoing, XSquare, Info } from "@phosphor-icons/react";
import { format } from '@formkit/tempo'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import actionsReservas from '../../Store/Reservas/actions.js'
import { urlLocal } from '../../urlHost.js';
import axios from 'axios';



const { getReservasBarbero} = actionsReservas

export default function InfoReservaBarbero(props) {

    const dispatch = useDispatch()
    const [ open, setOpen ] = useState(false)
    
    const reservas = useSelector(store => store.reservas.reservasBarbero)
    const idReserva = useSelector(store => store.captureId.id)
    const reserva = reservas?.find(item => item._id === idReserva )
    const barbero = useSelector(store => store.getUsuarios.usuario)


    const handleOpen = () => {
        reserva.activa ? 
                setOpen(true) 
            : 
                toast('serivicio iniciado',
                    {icon: <Info size={35} />, duration: 1200 ,style: { background: '#94a3b8', textTransform: 'capitalize', fontWeight: 'bolder'}}
                )  
    } 

    const eliminarReserva = (id) => {
        let promesa = axios.delete(`${urlLocal}reservas/${id}`)
        toast.promise(
            promesa,
            {
                loading: 'eliminado reserva',
                success: (res) => {

                    dispatch(getReservasBarbero({id: barbero._id}))
                    setTimeout(() => {
                        setOpen(false)
                    }, 2000);
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    console.log(error.response.data)
                    return <>{error.response.data.message}</>
                }
            },{
                style: { background: '#94a3b8', textTransform: 'capitalize', fontWeight: 'bolder'},
            }
        )
    }

    const handleEliminar = () => {
        reserva._id !== '' &&
        toast((t) =>(
            <div className='flex flex-col gap-3 items-center'>
                <div>
                    <Typography variant='lead'>eliminar {reserva?.servicio?.map(({servicio}) => servicio).join(' + ')}</Typography>
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
            duration:3000,
            style: { background: '#94a3b8', textTransform: 'capitalize', fontWeight: 'bolder'}
        })
    }

    const handleIniciarReserva = () => {
        let actualEstado = axios.put(`${urlLocal}reservas/${reserva._id}`)
        reserva._id !== '' &&
        toast.promise(
            actualEstado,
            {
                loading: 'iniciando servicio',
                success: (res) => {
                    dispatch(getReservasBarbero({id: barbero._id}))
                    setTimeout(() => {
                        setOpen(false)
                    }, 1500)
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    console.log(error)
                    return <>{error.response.data.message}</>
                }
            },{
                success: {duration: 1200},
                style: { background: '#94a3b8', textTransform: 'capitalize', fontWeight: 'bolder'}
            }
        )
    }

    return (
        <>
            <Button
                className='w-[30%] text-white border bg-blue-800'
                variant='text'
                size='sm'
                onClick={handleOpen}
                onClickCapture={props.clickCapture}
            >
                {props.hora}
            </Button>
            {
                reserva &&
                    <Dialog
                        size='sm'
                        handler={handleOpen}
                        open={open}
                        className='flex flex-col gap-5 bg-blue-gray-500 p-3'
                    >
                        <div className='flex justify-end'>
                            <XSquare onClick={() => setOpen(false)} size={32} color="#bb0202" />
                        </div>
                        <div className='flex flex-col items-center'>
                            <Typography 
                                variant='lead'
                                className='text-white capitalize'
                            >
                                {format(reserva.fecha,'dddd D MMMM')}
                            </Typography>

                            <Typography 
                                variant='lead'
                                className='text-white capitalize'
                            >
                                {format(reserva.fecha,'HH:mm')} / {format(reserva.fecha,'hh:mm a')} 
                            </Typography>
                        </div>

                        <div className='w-full h-full flex justify-around'>

                            <div className='h-full w-[20%] flex flex-col items-center justify-evenly gap-3'>
                                <User size={32} weight="regular" color='white' />
                                <Scissors size={32} weight="regular" color='white' />
                                <Link to={`tel:${reserva?.cliente_id?.telefono}`}>
                                    <PhoneOutgoing size={32} weight="regular" color='white'  />
                                </Link>
                            </div>

                            <div className='h-full w-[60%] flex flex-col justify-evenly gap-3 text-white capitalize'>
                                <Typography variant='lead'>{reserva?.cliente_id?.nombres} {reserva?.cliente_id?.apellidos}</Typography>
                                <Typography variant='lead'>{reserva?.servicio?.map(({servicio}) => servicio).join(' + ')}</Typography>
                                <Link to={`tel:${reserva?.cliente_id?.telefono}`}>
                                    <Typography variant='lead'>{reserva?.cliente_id?.telefono}</Typography>
                                </Link>
                            </div>
                        </div>

                        <div className='flex items-center justify-center gap-5'>
                            <Button
                                size='sm'
                                variant='text'
                                className='border border-red-500 text-red-500 '
                                onClick={handleEliminar}
                            >
                                eliminar reserva
                            </Button>

                            <Button
                                size='sm'
                                variant='text'
                                className='border border-green-500 text-green-500'
                                onClick={handleIniciarReserva}
                            >
                                iniciar servicio
                            </Button>
                        </div>

                    <Toaster position='top-center' />
                    </Dialog>
            }
        </>
    )
}
