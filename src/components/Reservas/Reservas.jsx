import React, { useEffect } from 'react'
import CardInfoReserva from '../CardInfoReserva/CardInfoReserva'
import { Typography } from '@material-tailwind/react'
import { Plus } from '@phosphor-icons/react'
import { Carousel } from 'keep-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import actionsReservas from '../../Store/Reservas/actions'
import actionsServicios from '../../Store/Servicios/actions'


const { getServicios } = actionsServicios 
const { getReservasCLiente} = actionsReservas

export default function Reservas() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const reservas = useSelector(store => store.reservas.reservasClientes)
    const cliente = useSelector(store => store.reservas.cliente)

    const validacionCliente = (cliente) =>{
        if(cliente.length === 0 ){
            return navigate('/validacion-email')
        }
    }

    useEffect(
        () => {
            validacionCliente(cliente)
            dispatch(getServicios())
            dispatch(getReservasCLiente({id: cliente._id}))
        },
        [dispatch,cliente]
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
                            <Plus onClick={() => navigate('/crear-reservas')} size={62} color="#02ca6d" weight="fill" />
                            <Typography variant='lead' className='capitalize text-white'>nueva reserva</Typography>
                        </div>
                    </div>
                </Carousel>
                :
                <>
                    <div className='h-[55vh] mt-1 flex justify-center items-center'>
                        <div className='w-[75%] xsm:w-[50%] md:w-[40%] h-[90%] xsm:h-full md:h-full flex flex-col justify-center items-center border-2 border-dashed rounded-xl '>
                            <Plus onClick={() => navigate('/crear-reservas')} size={62} color="#02ca6d" weight="fill" />
                            <Typography variant='lead' className='capitalize text-white'>nueva reserva</Typography>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
