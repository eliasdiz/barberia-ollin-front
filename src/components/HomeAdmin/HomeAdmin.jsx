import { Typography } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actionsUsuarios from '../../Store/Usuarios/actions'

const { getUsuario } = actionsUsuarios

export default function HomeAdmin() {

    const dispatch = useDispatch()
    const usuario = useSelector(store => store.getUsuarios.usuario)

    useEffect(
        () => {
            dispatch(getUsuario())
        },
        [dispatch]
    )

    return (
        <div className='flex flex-col justify-center p-3 min-h-[69vh] capitalize'>
            <Typography 
                className='text-white text-center' 
                variant='h3'
            >
                bienvenido!!
            </Typography>

            <Typography 
                className='text-white text-center' 
                variant='h3'
            >
                {
                    usuario.admin ? `${usuario.nombres} ${usuario.apellidos}` : '' 
                }  
            </Typography>
            
        </div>
    )
}
