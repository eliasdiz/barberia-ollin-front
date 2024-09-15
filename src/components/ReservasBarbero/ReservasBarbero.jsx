import React, { useEffect } from 'react'
import CardInfoReserva from '../CardInfoReserva/CardInfoReserva'
import { useDispatch, useSelector } from 'react-redux'
import { Plus } from '@phosphor-icons/react'
import { Typography } from '@material-tailwind/react'
import actionsServicios from '../../Store/Servicios/actions.js'
import actionsReservas from '../../Store/Reservas/actions.js'
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'keep-react'

const { getReservasCLiente } = actionsReservas
const { getServicios } = actionsServicios


export default function ReservasBarbero() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reservas = useSelector(store => store.reservas.reservasClientes)
    const barbero = useSelector(store => store.getUsuarios.usuario)


    useEffect(
        () => {
            dispatch(getServicios())
            dispatch(getReservasCLiente({id: barbero._id}))
        },
        [dispatch]
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
                        <div className='w-[75%] xsm:w-[50%] md:w-[40%] h-[90%] xsm:h-full md:h-full flex flex-col justify-center items-center border-2 border-dashed rounded-xl '>
                            <Plus onClick={() => navigate('/barbero/crear-reserva')} size={62} color="#02ca6d" weight="fill" />
                            <Typography variant='lead' className='capitalize text-white'>nueva reserva</Typography>
                        </div>
                    </div>
                </Carousel>
                :
                <>
                    <div className='h-[55vh] mt-1 flex justify-center items-center'>
                        <div className='w-[75%] xsm:w-[50%] md:w-[40%] h-[90%] xsm:h-full md:h-full flex flex-col justify-center items-center border-2 border-dashed rounded-xl '>
                            <Plus onClick={() => navigate('/barbero/crear-reserva')} size={62} color="#02ca6d" weight="fill" />
                            <Typography variant='lead' className='capitalize text-white'>nueva reserva</Typography>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
