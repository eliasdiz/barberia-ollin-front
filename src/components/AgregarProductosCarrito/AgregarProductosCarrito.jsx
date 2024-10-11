import { Button, Dialog, DialogBody, DialogHeader, Typography } from '@material-tailwind/react'
import { Plus, PlusCircle, X } from '@phosphor-icons/react'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Select from 'react-select'

export default function AgregarProductosCarrito() {

    const [ open, setOpen ] = useState(false)

    const handleOpen = () => setOpen(!open)
    

    return (
        <>
            <Button
                color='blue'
                className='flex items-center gap-2'
                onClick={handleOpen}
            >
                agregar
                <PlusCircle size={20} weight='bold' />
            </Button>

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
                        // onClick={handleCerrar} 
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
                            // options={options} 
                            isSearchable
                            // onChange={(e) => setCliente(e.id)}
                        />                        
                    </div>

                    <Button
                        className='flex items-center gap-3'
                        // onClick={handleCrear}
                    >
                        crear
                        <Plus size={20} weight='bold' />
                    </Button>
                </DialogBody>
            </Dialog>
        </>
    )
}
