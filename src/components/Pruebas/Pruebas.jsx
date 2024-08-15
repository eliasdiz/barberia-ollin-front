import { Typography } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function Pruebas() {

    const usuario = useSelector(store => store.getUsuarios.usuario)
    // console.log(usuario)


    return (
        <div className='flex flex-col justify-center p-3 capitalize h-[30vh]'>
            <Typography 
                className='text-white text-center' 
                variant='h4'
            >
                bienvenido!!
            </Typography>

            <Typography 
                className='text-white text-center' 
                variant='h4'
            >
                {usuario.nombres} {usuario.apellidos}
            </Typography>
            
        </div>
    )
}
