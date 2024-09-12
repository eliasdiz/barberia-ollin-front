import React from 'react'
import { Typography, Button } from '@material-tailwind/react'
import { CalendarCheck, Money, Scissors, User, Watch } from "@phosphor-icons/react";
import numeral from 'numeral';
import { format } from '@formkit/tempo'




export default function CardInfoReserva({reserva}) {


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
                        <Typography>{reserva?.servicio_id.servicio}</Typography>
                        <Typography>{format(reserva?.fecha,'dddd D MMMM ')}</Typography>
                        <Typography>{format(reserva?.fecha,'HH:mm')} / {format(reserva?.fecha,'h:mm a')}</Typography>
                        <Typography>$ {numeral(reserva?.servicio_id.valor).format()}</Typography>
                    </div>
                </div>
                <Button
                    size='sm'
                    variant='text'
                    className='border border-red-700 text-red-700'
                    // onClick={handleEliminar}
                >
                    eliminar
                </Button>
            </div>
        </div>
    )
}
