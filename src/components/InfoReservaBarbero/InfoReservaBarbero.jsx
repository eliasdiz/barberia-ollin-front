import { Button, Dialog, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Scissors, User, PhoneOutgoing, XSquare, Info } from "@phosphor-icons/react";
import { addMinute, format } from '@formkit/tempo'
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
    const [ alertaEliminar, setAlertaEliminar ] = useState(false)

    // console.log(alertaEliminar)


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
                    console.log(error.response.data)
                    return <>{error.response.data.message}</>
                }
            },{
                success: {duration: 1200},
                style: { background: '#94a3b8', textTransform: 'capitalize', fontWeight: 'bolder'}
            }
        )
    }

    const handleCancelarEliminar = (t) => {
        toast.dismiss(t.id)
        setAlertaEliminar(false)
    }

    const handleCerrarModal = () => {
        !alertaEliminar && setOpen(false)
    }

    return (
        <>
            <Button
                className='w-[30%] flex justify-center items-center text-white border bg-blue-800'
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
                            <XSquare
                                className='cursor-pointer'
                                onClick={handleCerrarModal} 
                                size={32} 
                                color="#bb0202" 
                            />
                        </div>
                        <div className='flex flex-col items-center'>
                            <Typography 
                                variant='lead'
                                className='text-white capitalize'
                            >
                                {format(reserva.fecha.horaInicio,'dddd D MMMM')}
                            </Typography>

                            <Typography 
                                variant='lead'
                                className='text-white capitalize'
                            >
                                {format(reserva.fecha.horaInicio,'HH:mm a')} - {format(addMinute(reserva.fecha.horaFinal,30),'hh:mm a')} 
                            </Typography>
                        </div>

                        <div className='h-[25vh] w-full flex gap-2'>

                            <div className='w-[20%] flex flex-col items-center justify-around'>
                                <User size={32} weight="regular" color='white' />
                                <Scissors size={32} weight="regular" color='white' />
                                <Link to={`tel:${reserva?.cliente_id?.telefono}`}>
                                    <PhoneOutgoing size={32} weight="regular" color='white'  />
                                </Link>
                            </div>

                            <div className='h-full w-[80%] flex flex-col justify-around text-white capitalize'>
                                <Typography variant='lead'>{reserva?.cliente_id?.nombres} {reserva?.cliente_id?.apellidos}</Typography>
                                <Typography variant={reserva?.length <= 2 ? 'lead' : 'paragraph'} >{reserva?.servicio?.map(({servicio}) => servicio).join(' + ')}</Typography>
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
                                disabled={alertaEliminar}
                            >
                                eliminar reserva
                            </Button>

                            <Button
                                size='sm'
                                variant='text'
                                className='border border-green-500 text-green-500'
                                onClick={handleIniciarReserva}
                                disabled={alertaEliminar}
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
