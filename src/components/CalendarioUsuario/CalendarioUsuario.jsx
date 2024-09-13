import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { addHour, format, sameDay, sameHour} from '@formkit/tempo'
import axios from 'axios';
import { urlLocal} from '../../urlHost.js'
import { useSelector } from 'react-redux';


export default function CalendarioUsuario({fecha, setFecha}) {

    const [ dia, setDia ] = useState('')
    const horas = ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00']
    const [ reservas, setReservasBarbero ] = useState([])
    const barberoId = useSelector(store => store.captureId.id) 
    
    // console.log(barberoId)
    
    const horasReservadas = (hora) => {
        const diaObj = new Date(dia);
        const fechaConHora = addHour(diaObj,parseInt(hora));
        let reservasFiltradas =  reservas.filter(reserva => 
            sameDay(reserva.fecha, diaObj) && sameHour(reserva.fecha,fechaConHora)
        )
        return reservasFiltradas.length > 0
    }


    const seleccDia = (e) => {
        let dia = e.toISOString()
        setDia(dia)
    }
    

    const handleFecha = (item) => {
        let hora = parseInt(item)
        let fecha = addHour(dia,hora).toISOString()
        setFecha(format(fecha,"dddd, MMMM D, YYYY HH:mm"))
    }


    const diasPasadosDomingos = ({date,view}) => {
        let hoy = new Date()
        let diasPasados = view === 'month' && date.setHours(0,0,0,0) < hoy.setHours(0,0,0,0)
        let domingos = date.getDay() === 0

        return diasPasados || domingos
    }


    useEffect(
        () => {
            axios.get(`${urlLocal}reservas/barbero/${barberoId}`)
                .then( res => setReservasBarbero(res.data.reservas))
                .catch( error => console.log(error))
        },
        []
    )

    return (
        <>
            <div className='w-full h-full'>
                {
                    !dia ? 
                        <div className='w-[88%] h-full flex items-center xsm:justify-center md:justify-center '>
                            <Calendar 
                                className='rounded-xl '
                                onClickDay={(e) => seleccDia(e)}
                                tileDisabled={diasPasadosDomingos} 
                            />
                        </div>
                    :
                        <div className='w-full h-full md:h-[70vh] flex flex-col items-center'>
                            <div className='w-[100%] flex justify-center p-1 '>
                                <Button
                                    className='border text-white'
                                    size='sm'
                                    variant='text'
                                    onClick={() => setDia('')}
                                >
                                    cambiar dia
                                </Button>
                            </div>

                            <div className='w-full h-[85%] flex flex-col flex-wrap items-center justify-evenly gap-2 p-1'>
                                    {
                                        horas.map((item,i) => (
                                            <Button
                                                className={ horasReservadas(item) ? 'w-[40%] text-white border bg-gray-500' : 'w-[40%] text-white border bg-green-800'}
                                                variant='text'
                                                key={i}
                                                size='sm'
                                                onClick={() => handleFecha(item)}
                                                disabled={horasReservadas(item)}
                                            >
                                                {item}
                                            </Button>
                                        ) )
                                    }
                            </div>
                        </div>
                }
            </div>
        </>
    )
}
