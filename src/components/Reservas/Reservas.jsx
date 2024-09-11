import React, { useEffect, useState } from 'react'
import CardInfoReserva from '../CardInfoReserva/CardInfoReserva'
import { Typography } from '@material-tailwind/react'
import { Plus } from '@phosphor-icons/react'
import { Carousel } from 'keep-react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { urlLocal } from '../../urlHost'



export default function Reservas() {

    const navigate = useNavigate()
    const [ reservas, setReservas ] = useState([])
    const cliente = useSelector(store => store.reservas.cliente)
    const clienteId = cliente?._id

    useEffect(
        () => {
            axios.get(`${urlLocal}reservas/clientes/${clienteId}`)
                .then( res => setReservas(res.data.reservas))
                .catch(error => console.log(error))
        },
        []
    )


    return (
        <>
            {
                reservas.length !== 0 ?
                <Carousel
                    className='h-[55vh] mt-1'
                >
                    {
                        reservas?.map((item,i) => (
                            <CardInfoReserva key={i} reserva={item} />
                        ))
                    }

                    <div className='h-full flex justify-center items-center'>
                        <div className='w-[75%] h-[90%] flex flex-col justify-center items-center border-2 border-dashed rounded-xl '>
                            <Plus onClick={() => navigate('/crear-reservas')} size={62} color="#02ca6d" weight="fill" />
                            <Typography variant='lead' className='capitalize text-white'>nueva reserva</Typography>
                        </div>
                    </div>
                </Carousel>
                :
                <>
                    <div className='h-[55vh] mt-1 flex justify-center items-center'>
                        <div className='w-[75%] h-[90%] flex flex-col justify-center items-center border-2 border-dashed rounded-xl '>
                            <Plus onClick={() => navigate('/crear-reservas')} size={62} color="#02ca6d" weight="fill" />
                            <Typography variant='lead' className='capitalize text-white'>nueva reserva</Typography>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
