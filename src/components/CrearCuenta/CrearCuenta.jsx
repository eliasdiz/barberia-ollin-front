import { Button, Dialog, DialogBody, DialogHeader, Typography } from '@material-tailwind/react'
import { Plus, X } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import actionsUsuarios from '../../Store/Usuarios/actions'
import CarritoCliente from '../CarritoCliente/CarritoCliente'


const { getTodos} = actionsUsuarios

export default function CrearCuenta() {

    const dispatch = useDispatch()

    const [ open, setOpen ] = useState(false)
    const usuarios = useSelector(store => store.getUsuarios.usuarios)
    // console.log(usuarios)

    const options = usuarios?.map(({nombres,apellidos,_id}) => ({value:`${nombres} ${apellidos}`, label:`${nombres} ${apellidos}`,id:`${_id}`}))

    // console.log(options)

    const handleOpen = () => setOpen(true)

    useEffect(
        () => {
            dispatch(getTodos({parametro: '', nombres: ''}))
        },
        []
    )

    return (
        <>
            <Button 
                size='sm'
                className="flex flex-col items-center bg-gray-800 hover:bg-gray-700"
                onClick={handleOpen}
            >
                <div className="text-blue-500 mb-2">
                    <Plus size={48} weight='bold'/>
                </div>
                <Typography variant="lead" color="white" className="text-center capitalize">
                    crear cuenta
                </Typography>
            </Button>

            <Dialog
                open={open}
                handler={handleOpen}
                className='bg-gray-800'
                size='sm'
            >
                <DialogHeader className='flex justify-end'>
                    <X 
                        className='cursor-pointer'
                        size={20} 
                        color='red'
                        onClick={() => setOpen(false)} 
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
                        />

                        <CarritoCliente />
                        
                    </div>
                </DialogBody>
            </Dialog>
        </>
    )
}
