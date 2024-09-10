import { Button } from '@material-tailwind/react';
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { addHour, format} from '@formkit/tempo'



export default function CalendarioUsuario({fecha, setFecha}) {

    const [ dia, setDia ] = useState('')
    // const [ fecha, setFecha ] = useState(null)
    const horasAm = ['8:00','9:00','10:00','11:00','12:00','13:00']
    const horasPm = ['14:00','15:00','16:00','17:00','18:00','19:00']


    const seleccDia = (e) => {
        let dia = e.toISOString()
        setDia(dia)
    }
    

    const handleFecha = (item) => {
        let hora = parseInt(item)
        let fecha = addHour(dia,hora).toISOString()
        setFecha(format(fecha,"dddd, MMMM D, YYYY HH:mm"))
    }

    // console.log(fecha)

    return (
        <>
            <div className='w-full h-full'>
                {
                    !dia ? 
                        <div className='w-[88%] h-full flex items-center xsm:justify-center md:justify-center '>
                            <Calendar 
                                className='rounded-xl '
                                onClickDay={(e) => seleccDia(e)}
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
