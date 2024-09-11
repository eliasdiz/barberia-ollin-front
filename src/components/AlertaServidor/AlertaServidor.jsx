import { Dialog, Spinner } from '@material-tailwind/react'
import { Typography } from 'keep-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function AlertaServidor() {

    const navigate = useNavigate()
    const [ open, setOpen ] = useState(true)
    const servicios = useSelector(store => store.servicios.servicios)
    // const usuario = useSelector(store => store.reservas.cliente)



    
    useEffect(
        () => {
            servicios.length !== 0 ? setOpen(false) : setOpen(true)
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
