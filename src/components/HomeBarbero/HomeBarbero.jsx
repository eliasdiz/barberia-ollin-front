import { Typography } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actionsUsuarios from '../../Store/Usuarios/actions'
import actionsServicios from '../../Store/Servicios/actions'
import CardCitas from '../CardCitas/CardCitas'

const { getServicios} = actionsServicios
const { getUsuario} = actionsUsuarios

export default function HomeBarbero() {

    const dispatch = useDispatch()
    const usuario = useSelector(store => store.getUsuarios.usuario)


    useEffect(
        () => {
            dispatch(getUsuario())
            dispatch(getServicios())
        },
        [dispatch]
    )

    return (
        <div className='flex flex-col items-center min-h-[69vh] mt-2 p-1'>
            <div className='w-full h-full md:w-[60%] flex flex-col gap-1'>
                <Typography 
                    className='text-white text-center capitalize' 
                    variant='h5'
                >
                    bienvenido
                </Typography>
                <Typography 
                    className='text-white text-center capitalize' 
                    variant='h5'
                >
                    {usuario.nombres} {usuario.apellidos}
                </Typography>

                <CardCitas />
            </div>            
        </div>
    )
}
