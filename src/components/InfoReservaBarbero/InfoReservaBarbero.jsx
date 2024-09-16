import { Button, Dialog, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Scissors, User, PhoneOutgoing, XSquare, ArrowFatLineRight } from "@phosphor-icons/react";
import { format } from '@formkit/tempo'
import { Link } from 'react-router-dom';


export default function InfoReservaBarbero(props) {

    const [ open, setOpen ] = useState(false)
    const handleOpen = () => setOpen(true)

    const reservas = useSelector(store => store.reservas.reservasBarbero)
    const idReserva = useSelector(store => store.captureId.id)
    const reserva = reservas?.find(item => item._id === idReserva )

    // console.log(reserva)

    return (
        <>
            <Button
                className='w-[30%] text-white border bg-blue-800'
                variant='text'
                key={props.llave}
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
                                <Link to={`tel:${reserva?.cliente_id.telefono}`}>
                                    <PhoneOutgoing size={32} weight="regular" color='white'  />
                                </Link>
                            </div>

                            <div className='h-full w-[60%] flex flex-col justify-evenly gap-3 text-white capitalize'>
                                <Typography variant='lead'>{reserva?.cliente_id.nombres} {reserva?.cliente_id.apellidos}</Typography>
                                <Typography variant='lead'>{reserva?.servicio_id.servicio}</Typography>
                                <Link to={`tel:${reserva?.cliente_id.telefono}`}>
                                    <Typography variant='lead'>{reserva?.cliente_id.telefono}</Typography>
                                </Link>
                            </div>
                        </div>

                        <div className='flex items-center justify-center gap-5'>
                            <Button
                                size='sm'
                                variant='text'
                                className='border border-red-500 text-red-500 '
                            >
                                eliminar reserva
                            </Button>

                            <Button
                                size='sm'
                                variant='text'
                                className='border border-green-500 text-green-500 '
                            >
                                iniciar servicio
                            </Button>
                        </div>

                    </Dialog>
            }
        </>
    )
}
