import React, { useEffect } from 'react'
import { addDay, format, sameDay } from '@formkit/tempo';
import { Typography } from '@material-tailwind/react';
import { FaCalendar, FaClock, FaCut } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import actionsServicios from '../../Store/Servicios/actions.js'
import actionsReservas from '../../Store/Reservas/actions.js'


const { getReservasBarbero} = actionsReservas
const { getServicios} = actionsServicios

export default function CardCitas() {

    const dispatch = useDispatch()

    const hoy = new Date()
    const mañana = addDay(hoy, 1)
    const barbero = useSelector(store => store.getUsuarios.usuario)
    const reservas = useSelector(store => store.reservas.reservasBarbero)
    const reservasHoy = reservas?.filter(({fecha}) => sameDay(fecha,hoy))
    const reservasMañana = reservas?.filter(({fecha}) => sameDay(fecha,mañana))
    
    console.log(barbero)

    useEffect(
        () => {
            dispatch(getServicios())
            dispatch(getReservasBarbero({id: barbero._id}))
        },
        [dispatch,barbero]
    )
    return (
        <>
            <div className="bg-gray-800 p-5 rounded-xl shadow-lg flex-1 mb-3 md:mb-0">
                <div className="flex items-center justify-between">
                    <Typography className="text-xl text-white font-semibold capitalize">
                        citas de hoy
                    </Typography>
                    <FaCalendar className="text-blue-500" size={24} />
                </div>

                <Typography variant='paragraph' className="text-gray-400 mb-4 capitalize">
                    {format(hoy,'dddd, DD MMMM')}
                </Typography>

                <div className='max-h-[50vh] overflow-y-auto'>
                    {
                        reservasHoy.length !== 0 ? 
                            reservasHoy?.map(({fecha,cliente_id,servicio_id},i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex items-center space-x-4  p-4 bg-gray-700 rounded-lg mb-3">
                                        <FaClock className="text-blue-400 flex-shrink-0" />
                                        <div className="flex-grow">
                                            <Typography className="font-semibold text-white capitalize">
                                                {format(fecha,'HH:mm')} - {cliente_id.nombres} {cliente_id.apellidos}
                                            </Typography>
                                            <Typography className="text-sm text-gray-300">{servicio_id.servicio}</Typography>
                                        </div>
                                        <FaCut className="text-yellow-500 flex-shrink-0" />
                                    </div>
                                </div>
                            ))
                        :
                            <Typography className="font-semibold text-white capitalize">
                                no tienes reservas hoy
                            </Typography>
                }
                </div>

            </div>

            <div className="bg-gray-800 p-5 rounded-xl shadow-lg flex-1 mb-6 md:mb-0">
                <div className="flex items-center justify-between">
                    <Typography className="text-xl text-white font-semibold capitalize">
                        citas de mañana
                    </Typography>
                    <FaCalendar className="text-blue-500" size={24} />
                </div>

                <Typography variant='paragraph' className="text-gray-400 mb-4 capitalize">
                    {format(mañana,'dddd, DD MMMM')}
                </Typography>

                <div className='max-h-[50vh] overflow-y-auto'>
                    {
                        reservasMañana.length !== 0 ? 
                            reservasMañana?.map(({fecha,cliente_id,servicio_id},i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex items-center space-x-4  p-4 bg-gray-700 rounded-lg mb-3">
                                        <FaClock className="text-blue-400 flex-shrink-0" />
                                        <div className="flex-grow">
                                            <Typography className="font-semibold text-white capitalize">
                                                {format(fecha,'HH:mm')} - {cliente_id.nombres} {cliente_id.apellidos}
                                            </Typography>
                                            <Typography className="text-sm text-gray-300">{servicio_id.servicio}</Typography>
                                        </div>
                                        <FaCut className="text-yellow-500 flex-shrink-0" />
                                    </div>
                                </div>
                            ))
                        :
                            <Typography className="font-semibold text-white capitalize">
                                no tienes reservas hoy
                            </Typography>
                }
                </div>
            </div>
        </>
    )
}
