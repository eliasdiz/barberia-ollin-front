import { Dialog, Spinner } from '@material-tailwind/react'
import { Typography } from 'keep-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function AlertaServidor() {

    const [ open, setOpen ] = useState(true)
    const usuarios = useSelector(store => store.getUsuarios.usuarios)
    
    useEffect(
        () => {
            usuarios.length !== 0 ? setOpen(false) : setOpen(true)
        },
        [usuarios]
    )

    // console.log(usuarios)

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
