import { Button, Typography,  } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { addHour, date, format, sameDay, sameHour, sameMinute} from '@formkit/tempo'
import { useDispatch, useSelector } from 'react-redux';
import actionsReservas from '../../Store/Reservas/actions.js'
import { Carousel } from 'keep-react';


const { getReservasBarbero} = actionsReservas


export default function CalendarioUsuario({fecha, setFecha}) {

    const dispatch = useDispatch()
    const [ dia, setDia ] = useState('')
    const horasAm = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30']
    const horasPm = ['14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30']
    const reservas = useSelector(store => store.reservas.reservasBarbero)
    const barberoId = useSelector(store => store.captureId.id)
    

    const horasPasadas = (hora) => {
        let hoy = new Date()
        let diaSelece = new Date(dia)
        let horaActual = format(hoy,'HH:mm')
        return sameDay(diaSelece,hoy) && horaActual >= hora
    }
    
    const horasReservadas = (hora) => {
        const diaObj = new Date(dia)
        let [ hour, minutos ] = hora.split(':').map(Number)
        diaObj.setHours(hour)
        diaObj.setMinutes(minutos)

        let reservasFiltradas =  reservas.filter(reserva => 
            sameDay(reserva.fecha, diaObj) && sameHour(reserva.fecha,diaObj) && sameMinute(reserva.fecha,diaObj)
        )
        return reservasFiltradas.length > 0
    }

    

    const seleccDia = (e) => {
        let dia = new Date(e)
        setDia(dia)
    }
    
    const handleFecha = (item) => {
        let [ hora, minutos ] = item.split(':').map(Number)
        let fecha = new Date(dia)
        fecha.setHours(hora)
        fecha.setMinutes(minutos)
        setFecha(format(fecha,"dddd, MMMM D, YYYY HH:mm"))
    }
    

    const diasPasadosDomingos = ({date,view}) => {       
        if(view === 'month'){
            let hoy = new Date().setHours(0,0,0,0)
            let diasPasados = view === 'month' && date.setHours(0,0,0,0) < hoy
            let domingos = date.getDay() === 0
            return diasPasados || domingos
        }
        return false
    }

    useEffect(
        () => {
            dispatch(getReservasBarbero({id: barberoId}))
        },
        [dispatch]
    )


    return (
        <>
            <div className='w-full h-full'>
                {
                    !dia ?
                        <>
                            <div className='h-full w-full flex items-center xsm:justify-center'>
                                <div className='xxsm:w-[90%]'>
                                    <Calendar 
                                        className='rounded-xl '
                                        onClickDay={(e) => seleccDia(e)}
                                        tileDisabled={diasPasadosDomingos} 
                                    />
                                </div>
                            </div>
                        </>
                    :
                        <>
                            <div className='w-full h-full md:h-[70vh] flex flex-col items-center'>
                                <div className='w-[100%] flex flex-col items-center justify-center'>
                                    <Typography
                                            variant=''
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

                                <div className='h-full w-full flex'>
                                    <Carousel loop className='w-full h-full p-2' >
                                        <div className='w-full flex  flex-wrap items-center justify-evenly'>
                                            {
                                                horasAm.map((item,i) => (
                                                    <Button
                                                        className={ horasReservadas(item) ? 'w-[40%] text-white border bg-gray-500' : 'w-[40%] text-white border bg-green-800'}
                                                        variant='text'
                                                        key={i}
                                                        size='sm'
                                                        onClick={() => handleFecha(item)}
                                                        disabled={horasReservadas(item) || horasPasadas(item)}
                                                    >
                                                        {item}
                                                    </Button>
                                                ) )
                                            }
                                        </div>

                                        <div className='w-full flex  flex-wrap items-center justify-evenly '>
                                            {
                                                horasPm.map((item,i) => (
                                                    <Button
                                                        className={ horasReservadas(item) ? 'w-[40%] text-white border bg-gray-500' : 'w-[40%] text-white border bg-green-800'}
                                                        variant='text'
                                                        key={i}
                                                        size='sm'
                                                        onClick={() => handleFecha(item)}
                                                        disabled={horasReservadas(item) || horasPasadas(item)}
                                                    >
                                                        {item}
                                                    </Button>
                                                ) )
                                            }
                                        </div>
                                    </Carousel>
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )
}
