import { Button, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { addHour, format, sameDay, sameHour} from '@formkit/tempo'
import { useDispatch, useSelector } from 'react-redux';
import actionsReservas from '../../Store/Reservas/actions.js'


const { getReservasBarbero} = actionsReservas


export default function CalendarioUsuario({fecha, setFecha}) {

    const dispatch = useDispatch()
    const [ dia, setDia ] = useState('')
    const horasAm = ['08:00','09:00','10:00','11:00','12:00','13:00']
    const horasPm = ['14:00','15:00','16:00','17:00','18:00','19:00']
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
        const fechaConHora = addHour(diaObj,parseInt(hora))
        let reservasFiltradas =  reservas.filter(reserva => 
            sameDay(reserva.fecha, diaObj) && sameHour(reserva.fecha,fechaConHora)
        )
        return reservasFiltradas.length > 0
    }

    

    const seleccDia = (e) => {
        // console.log(e)
        let dia = new Date(e)
        setDia(dia)
    }
    
    const handleFecha = (item) => {
        let hora = parseInt(item)
        let fecha = addHour(dia,hora)
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
                                    <div className='w-[50%] flex flex-col items-center justify-around p-1'>
                                        {
                                            horasAm.map((item,i) => (
                                                <Button
                                                    className={ horasReservadas(item) ? 'w-[70%] text-white border bg-gray-500' : 'w-[70%] text-white border bg-green-800'}
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

                                    <div className='w-[50%] flex flex-col items-center justify-around p-1'>
                                        {
                                            horasPm.map((item,i) => (
                                                <Button
                                                    className={ horasReservadas(item) ? 'w-[70%] text-white border bg-gray-500' : 'w-[70%] text-white border bg-green-800'}
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
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )
}
