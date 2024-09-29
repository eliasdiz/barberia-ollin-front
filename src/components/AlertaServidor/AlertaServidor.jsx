import { Dialog, Spinner } from '@material-tailwind/react'
import { Typography } from 'keep-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actionsServicios from '../../Store/Servicios/actions.js'


const {getServicios} = actionsServicios

export default function AlertaServidor() {

    const dispatch = useDispatch()
    const [ open, setOpen ] = useState(true)
    const servicios = useSelector(store => store.servicios.servicios)
    const hora = new Date().getMinutes()

    const servidor = (servicios) => {
        servicios.length !== 0 ? setOpen(false) : setOpen(true)
    }

    
    useEffect(
        () => {
            servidor(servicios)
        },
        [servicios]
    )


    return (
        <>
            <Dialog 
                open={open}
                className='flex flex-col items-center gap-4 bg-transparent shadow-none outline-none'
            >
                <Spinner color='blue' className='h-8 w-8' />
                <Typography className='text-white capitalize'>cargando datos...</Typography>
            </Dialog>
        </>
    )
}
