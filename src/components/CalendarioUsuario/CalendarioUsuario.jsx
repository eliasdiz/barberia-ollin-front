import { Button } from '@material-tailwind/react';
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function CalendarioUsuario() {

    const [ dia, setDia ] = useState('')
    const [ hora, setHora ] = useState(null)
    const [ fecha, setFecha ] = useState(null)
    const horasAm = ['8:00','9:00','10:00','11:00','12:00','13:00']
    const horasPm = ['14:00','15:00','16:00','17:00','18:00','19:00']


    const seleccDia = (date) => {
        setTimeout(() => {
            setDia(date)
        }, 1000);
    }

    const handleFecha = (item) => {
        setHora(item)
    }


    return (
        <>
            <div className='w-full h-full'>
                {
                    !dia ? 
                        <div className='w-[88%] h-full flex items-center xsm:justify-center md:justify-center '>
                            <Calendar 
                                className='rounded-xl '
                                onClickDay={seleccDia}
                            />
                        </div>
                    :
                        <div className='w-full h-full md:h-[70vh] flex flex-col items-center p-1'>
                            <div className='w-[100%] flex justify-center '>
                                <Button
                                    className='border text-white'
                                    size='sm'
                                    variant='text'
                                    onClick={() => setDia('')}
                                >
                                    cambiar dia
                                </Button>
                            </div>

                            <div className='w-full h-full flex'>
                                <div className='w-[50%] flex flex-col justify-around items-center'>
                                    {
                                        horasAm.map((item,i) => (
                                            <Button
                                                className='w-[90%] md:w-[50%] text-white border bg-green-800'
                                                variant='text'
                                                key={i}
                                                size='sm'
                                                onClick={() => handleFecha(item)}
                                            >
                                                {item}
                                            </Button>
                                        ) )
                                    }
                                </div>

                                <div className='w-[50%] flex flex-col justify-around items-center'>
                                {
                                        horasPm.map((item,i) => (
                                            <Button
                                                className='w-[90%] md:w-[50%] text-white border bg-green-800'

                                                variant='text'
                                                key={i}
                                                size='sm'
                                                onClick={() => handleFecha(item)}
                                            >
                                                {item}
                                            </Button>
                                        ) )
                                    }
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}
