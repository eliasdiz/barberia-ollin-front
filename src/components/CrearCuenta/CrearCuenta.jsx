import { Button, Dialog, DialogBody, DialogHeader, Typography } from '@material-tailwind/react'
import { Plus, X } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import actionsUsuarios from '../../Store/Usuarios/actions'
import toast, { Toaster } from 'react-hot-toast'


const { getTodos} = actionsUsuarios

export default function CrearCuenta() {

    const dispatch = useDispatch()

    const [ open, setOpen ] = useState(false)
    const usuarios = useSelector(store => store.getUsuarios.usuarios)
    // console.log(usuarios)

    const options = usuarios?.map(({nombres,apellidos,_id}) => ({value:`${nombres} ${apellidos}`, label:`${nombres} ${apellidos}`,id:`${_id}`}))
    const [ cliente, setCliente ] = useState('')

    console.log(cliente)

    const handleOpen = () => setOpen(true)

    const handleCrear = () => {
        if(cliente === ''){
            toast.error('debes seleccionar un cliente')
        }
    }

    const handleCerrar = () => {
        setCliente('')
        setOpen(false)
    }

    useEffect(
        () => {
            dispatch(getTodos({parametro: '', nombres: ''}))
        },
        []
    )

    return (
        <>
            <div 
                className='min-w-[8rem] transition-all duration-300 hover:scale-105 cursor-pointer' 
                onClick={handleOpen}
            >

                <div className='flex flex-col justify-center items-center gap-2 bg-gray-900 rounded-t-lg p-3'>
                    <Plus size={60} weight='bold' className='text-blue-500'/>
                    <div className='flex items-center justify-evenly'>
                        <Typography className='text-blue-500'>
                        </Typography>
                    </div>
                </div>

                <div className='text-center capitalize bg-blue-gray-900 rounded-b-lg p-1'>
                    <Typography color='white'>
                        crear cuenta
                    </Typography>
                </div>
            </div>

            <Dialog
                open={open}
                handler={handleOpen}
                className='bg-gray-800'
                size='sm'
            >
                <Toaster />
                <DialogHeader className='flex justify-end'>
                    <X 
                        className='cursor-pointer'
                        size={20} 
                        color='red'
                        onClick={handleCerrar} 
                    />
                </DialogHeader>

                <DialogBody className='flex flex-col items-center gap-4 '>
                    <div className='capitalize ' >
                        <Typography color='white' variant='lead'>
                            seleccione un cliente
                        </Typography>
                    </div>

                    <div className='w-full flex flex-col items-center gap-4 capitalize'>
                        <Select 
                            className='w-full md:w-[50%]' 
                            placeholder='clientes'  
                            options={options} 
                            isSearchable
                            onChange={(e) => setCliente(e.id)}
                        />                        
                    </div>

                    <Button
                        className='flex items-center gap-3'
                        onClick={handleCrear}
                    >
                        crear
                        <Plus size={20} weight='bold' />
                    </Button>
                </DialogBody>
            </Dialog>
        </>
    )
}
