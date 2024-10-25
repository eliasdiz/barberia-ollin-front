import { Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react'
import { Plus, PlusCircle, X } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import productosActions from '../../Store/Productos/actions'
import { useDispatch, useSelector } from 'react-redux'
import numeral from 'numeral'



const { getProductos} = productosActions


export default function AgregarProductosCarrito() {

    const dispatch = useDispatch()
    const [ open, setOpen ] = useState(false)
    const productos = useSelector(store => store.productos.productos)
    const [ activeTabs, setActiveTaps ] = useState('productos')
    const [ productSelec, setProductSelec ] = useState('')
    const [ itemProducto, setItemProducto ] = useState(null)
    
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    
    const handleItemProducto = (id) => {
        setProductSelec(id)
        let producto = productos?.find(({_id}) => _id === id)
        setItemProducto(producto)
        // console.log(producto)
    }

    // console.log(productos)

    
    const handleAgregarProducto = () => {

    }

    useEffect(
        () => {
            dispatch(getProductos())
        },
        []
    )

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
                        onClick={handleClose} 
                    />
                </DialogHeader>

                <DialogBody className='flex flex-col items-center gap-4 '>
                    <div className='capitalize ' >
                        <Typography color='white' variant='lead'>
                            agregar un producto / servicio
                        </Typography>
                    </div>

                    <Tabs value={activeTabs} className='w-full'>
                        <TabsHeader className='capitalize w-full' indicatorProps={{ className: 'bg-blue-500'}}>
                            <Tab value={'productos'} onClick={() => setActiveTaps('productos')}>
                                productos
                            </Tab>

                            <Tab value={'servicios'} onClick={() => setActiveTaps('servicios')}>
                                servicios
                            </Tab>
                        </TabsHeader>

                        <TabsBody>
                            <TabPanel value='productos' className='w-full flex flex-col gap-1 '>
                                <div className='w-full max-h-[57vh] overflow-y-auto flex flex-col items-center gap-2 p-1'>
                                    {
                                        productos?.map(({cantidad_medida,descripcion,unidad_medida,precio,_id,stock}) => (
                                                <Card
                                                    key={_id}
                                                    className={`w-[95%] capitalize rounded-lg bg-gray-900 cursor-pointer hover:scale-105 ${
                                                        productSelec === _id ? 'ring-1 ring-blue-500' : ''
                                                    }`}
                                                    onClick={stock === 0 ? null : () => handleItemProducto(_id)}
                                                >
                                                    <CardBody 
                                                        className={`flex justify-evenly ${ stock === 0 ? '' : 'text-white' } `}
                                                    >
                                                        <Typography>
                                                            {descripcion}
                                                        </Typography>
                                                        <Typography className="font-normal">
                                                            {cantidad_medida}{unidad_medida}
                                                        </Typography>
                                                        <Typography className="font-bold">
                                                            $ {numeral(precio).format()}
                                                        </Typography>
                                                    </CardBody>
                                                </Card>
                                        ))
                                    }
                                </div>

                                <div className='flex justify-end'>
                                    <Button
                                        disabled={!itemProducto}
                                        size='sm'
                                        color='blue'
                                        onClick={handleAgregarProducto}
                                    >
                                        agregar
                                    </Button>
                                </div>
                            </TabPanel>

                            <TabPanel value='servicios' className='w-full min-h-[58vh]'>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </DialogBody>
            </Dialog>
        </>
    )
}
