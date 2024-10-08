import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actiosnServicios from '../../Store/Servicios/actions.js'
import Calendar from 'react-calendar'
import { Button, Typography } from '@material-tailwind/react'
import actionsUsuario from '../../Store/Usuarios/actions.js'
import {addHour, format, isEqual, sameDay, sameHour, addMinute} from '@formkit/tempo'
import actionsCapturaId from '../../Store/Idcapture/actions.js'
import InfoReservaBarbero from '../InfoReservaBarbero/InfoReservaBarbero.jsx'
import { useNavigate } from 'react-router-dom'
import actionsReservas from '../../Store/Reservas/actions.js'


const { getReservasBarbero} = actionsReservas
const { idCapture} = actionsCapturaId
const { getUsuario } = actionsUsuario
const { getServicios} = actiosnServicios



export default function CalendarioBarbero() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ dia, setDia ] = useState(null)
    const barbero = useSelector(store => store.getUsuarios.usuario)
    const reservas = useSelector(store => store.reservas.reservasBarbero)
    const reservasDelDia = reservas.filter(reserva => sameDay(reserva.fecha.horaInicio, dia));
    
    // console.log(reservasDelDia)

    const diasPasadosDomingos = ({date,view}) => {
        if(view === 'month'){
            let hoy = new Date().setHours(0,0,0,0)
            let diasPasados = view === 'month' && date.setHours(0,0,0,0) < hoy
            let domingos = date.getDay() === 0
            return diasPasados || domingos
        }
        return false
    }

    const handleSelecDia = (e) => {
        setDia(e)
        dispatch(getReservasBarbero({id: barbero._id}))
    }

    const horasReservadas = (hora) => {
        const fechaConHora = addHour(dia,parseInt(hora));
        let reservasFiltradas =  reservas.filter(reserva => 
            sameDay(reserva.fecha.horaInicio, dia) && sameHour(reserva.fecha.horaInicio,fechaConHora)
        )
        return reservasFiltradas.length > 0
    }
    
    const handleInfoReserva = (id) => {
        dispatch(idCapture({id: id}))
    }


    useEffect(
        () => {
            dispatch(getReservasBarbero({id: barbero._id}))
            dispatch(getUsuario())
            dispatch(getServicios())
        },
        [dispatch]
    )



    return (
        <>
            {
                !dia ?
                        <>
                            <div className='h-[60vh] flex justify-center items-center'>
                                <Calendar 
                                    className='rounded-xl'
                                    tileDisabled={diasPasadosDomingos}
                                    onClickDay={handleSelecDia}
                                />
                            </div>
                        </>
                    :
                        <div className='flex justify-center'>
                            <div className='w-full md:w-[50%] h-[53vh] md:h-[70vh] flex flex-col items-center gap-2 mt-3 border rounded-xl'>
                                <div className='w-[100%] flex flex-col items-center justify-center p-1 mt-2'>
                                    <Typography
                                        className='text-white capitalize'
                                    >
                                        {format(dia,'dddd D MMMM')}
                                    </Typography>
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
                                            reservasDelDia?.map(({fecha,_id},i) => (
                                                horasReservadas(format(fecha.horaInicio,'HH:mm')) &&
                                                <InfoReservaBarbero 
                                                    key={i}
                                                    clickCapture={() => handleInfoReserva(_id)}
                                                    hora={
                                                        isEqual(fecha.horaInicio,fecha.horaFinal) ?
                                                        `${format(fecha.horaInicio,'HH:mm')} - ${format(addMinute(fecha.horaInicio,30),'HH:mm')} `
                                                        :
                                                        `${format(fecha.horaInicio,'HH:mm')} - ${format(addMinute(fecha.horaFinal,30),'HH:mm')} `
                                                    }
                                                />
                                            
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
