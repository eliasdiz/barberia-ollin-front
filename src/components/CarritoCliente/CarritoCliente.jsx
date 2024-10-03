import { Button, Dialog, Typography, DialogBody, DialogHeader, DialogFooter, CardBody, CardFooter, CardHeader, Card } from '@material-tailwind/react';
import { BeerStein, CashRegister, CurrencyDollar, Plus, PlusCircle, Scissors, ShoppingCart, X } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import numeral from 'numeral';


export default function CarritoCliente({carrito}) {

    const [ open, setOpen ] = useState(false)

    const handleOpen = () => setOpen(true)

    const [cartItems, setCartItems] = useState(carrito.productos)
    

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        ).filter(item => item.quantity > 0));
    };

    const total = numeral(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)).format();

    return (
        <>
            <div 
                className='min-w-[8rem] transition-all duration-300 hover:scale-105 cursor-pointer' 
                onClick={handleOpen}
            >

                <div className='flex flex-col justify-center items-center gap-2 bg-gray-900 rounded-t-lg p-3'>
                    <ShoppingCart size={60} className='text-blue-500' />

                    <div className='flex items-center justify-evenly'>
                        <Typography className='text-blue-500'>
                            $ {numeral(carrito.total).format()}
                        </Typography>
                    </div>
                </div>

                <div className='text-center capitalize bg-blue-gray-900 rounded-b-lg p-1'>
                    <Typography color='white'>
                        {carrito.cliente_id.nombres}
                    </Typography>

                    <Typography color='white'>
                        {carrito.cliente_id.apellidos}
                    </Typography>
                </div>
            </div>

            <Dialog size='sm' open={open} handler={handleOpen} className='bg-gray-800'>

                <DialogHeader className='flex justify-end p-1'>
                    <X 
                    size={25} 
                    color='red' 
                    weight='bold' 
                    className='cursor-pointer' 
                    onClick={() => setOpen(false)}
                />
                </DialogHeader>

                <DialogBody className="flex flex-col gap-2 text-white">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-[40%] flex items-center justify-evenly">
                            <Scissors size={30} weight='bold' className='text-blue-500' />
                            <Typography variant="h5" className="text-center capitalize">
                                {carrito?.cliente_id?.nombres} {carrito?.cliente_id?.apellidos}
                            </Typography>
                            <BeerStein size={30} color='yellow' />
                        </div>

                        <div className='w-full flex items-center justify-between'>
                            <Typography variant="h5" className="text-center capitalize">productos / servicios </Typography>

                            <Button
                                color='blue'
                                className='flex items-center gap-2'
                            >
                                agregar
                                <PlusCircle size={20} weight='bold' />
                            </Button>
                        </div>
                    </div>

                    {
                        cartItems.length === 0 ? (
                        <Typography className="text-center text-xl">
                            Tu carrito está vacío. ¿Qué tal si agregas un corte de cabello o una bebida?
                        </Typography>
                    ) : (
                        <div className="flex flex-col gap-2 max-h-[58vh] overflow-y-auto">
                            {
                                cartItems.map((item,i) => (
                                    <div 
                                        key={item.id} 
                                        className={i % 2 === 0 ? " bg-gray-900 flex justify-between items-center p-4 rounded-lg transition-all hover:bg-gray-700" : 'flex justify-between items-center p-4 bg-gray-800 rounded-lg transition-all hover:bg-gray-700'}
                                    >
                                        <div className="flex-1">
                                            <Typography variant="h6" className="text-lg font-semibold">{item.name}</Typography>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2 bg-gray-700 rounded-full px-2">
                                                <Button
                                                    size="sm"
                                                    color="blue-gray"
                                                    variant="text"
                                                    className="p-0 min-w-[20px]"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <MinusIcon strokeWidth={2} className="h-4 w-4 text-white"  />
                                                </Button>
                                                <Typography variant="small" className="w-8 text-center font-medium">
                                                    {item.quantity}
                                                </Typography>
                                                <Button
                                                    size="sm"
                                                    color="blue-gray"
                                                    variant="text"
                                                    className="p-0 min-w-[20px]"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <PlusIcon strokeWidth={2} className="h-4 w-4 text-white" />
                                                </Button>
                                            </div>
                                            <Typography variant="h6" className="text-lg font-semibold min-w-[60px] text-right">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                            <Button
                                                size="sm"
                                                color="red"
                                                variant="text"
                                                className="p-0 min-w-[20px]"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </DialogBody>

                <DialogFooter 
                    divider
                    className='flex items-center justify-between text-white'
                >
                    <Typography variant="h5">
                        Total: $ {total}
                    </Typography>

                    <Button
                        color="green"
                        size="md"
                        className='flex  items-center gap-2'
                    >
                        pagar
                        <CashRegister size={20} weight='bold' />
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
