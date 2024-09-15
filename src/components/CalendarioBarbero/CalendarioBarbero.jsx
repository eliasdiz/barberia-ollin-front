import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actiosnServicios from '../../Store/Servicios/actions.js'
import Calendar from 'react-calendar'
import { Button, Typography } from '@material-tailwind/react'
import actionsUsuario from '../../Store/Usuarios/actions.js'
import {addHour, format, sameDay, sameHour} from '@formkit/tempo'


const { getUsuario } = actionsUsuario
const { getServicios} = actiosnServicios



export default function CalendarioBarbero() {

    const dispatch = useDispatch()
    const [ dia, setDia ] = useState(null)
    const reservas = useSelector(store => store.reservas.reservasBarbero)
    const horas = reservas?.map(item => format(item.fecha,'HH:mm '))
    const reservasDelDia = reservas.filter(reserva => sameDay(reserva.fecha, dia));
    


    const diasPasadosDomingos = ({date,view}) => {
        if(view === 'month'){
            let hoy = new Date().setHours(0,0,0,0)
            let diasPasados = view === 'month' && date.setHours(0,0,0,0) < hoy
            let domingos = date.getDay() === 0
            return diasPasados || domingos
        }
        return false
    }


    const horasReservadas = (hora) => {
        const fechaConHora = addHour(dia,parseInt(hora));
        let reservasFiltradas =  reservas.filter(reserva => 
            sameDay(reserva.fecha, dia) && sameHour(reserva.fecha,fechaConHora)
        )
        return reservasFiltradas.length > 0
    }
    
    


    useEffect(
        () => {
            dispatch(getUsuario())
            dispatch(getServicios())
        },
        [dispatch]
    )

    // console.log(reservas)


    return (
        <>
            {
                !dia ?
                        <>
                            <div className='h-[60vh] flex justify-center items-center'>
                                <Calendar 
                                    className='rounded-xl'
                                    tileDisabled={diasPasadosDomingos}
                                    onClickDay={(e) => setDia(e)}
                                />
                            </div>
                        </>
                    :
                        <div className='flex justify-center'>
                            <div className='w-full md:w-[50%] h-[53vh] md:h-[70vh] flex flex-col items-center gap-3 mt-3 border rounded-xl'>
                                <div className='w-[100%] flex justify-center p-1 mt-2'>
                                    <Button
                                        className='border text-white'
                                        size='sm'
                                        variant='text'
                                        onClick={() => setDia('')}
                                    >
                                        cambiar dia
                                    </Button>
                                </div>

                                <div className='w-full h-[80%] flex flex-col flex-wrap items-center justify-center gap-3'>
                                    {
                                        reservasDelDia.length !== 0 ?
                                            reservas?.map((item,i) => (
                                                horasReservadas(format(item.fecha,'HH:mm')) &&
                                                <Button
                                                    className='w-[30%] text-white border bg-blue-800'
                                                    variant='text'
                                                    key={i}
                                                    size='sm'
                                                    
                                                >
                                                    {format(item.fecha,'HH:mm')}
                                                </Button>
                                            ))
                                        :
                                            <Typography
                                                className='text-white capitalize'
                                                variant='lead'
                                            >
                                                no tienes reservas
                                            </Typography>
                                            
                                    }
                                </div>
                            </div>
                        </div>
            }
        </>
    )
}
