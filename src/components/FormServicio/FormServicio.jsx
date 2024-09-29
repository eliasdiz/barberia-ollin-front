import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Switch, Typography } from '@material-tailwind/react'
import { CurrencyCircleDollar, PlusCircle, TextAa } from '@phosphor-icons/react'
import React, { useState } from 'react'
import numeral from 'numeral'
import axios from 'axios'
import { urlLocal } from '../../urlHost'
import toast, { Toaster } from 'react-hot-toast'
import actionsServicios from '../../Store/Servicios/actions'
import { useDispatch } from 'react-redux'


const { getServicios} = actionsServicios


export default function FormServicio() {

    const dispatch = useDispatch()
    const [ open, setOpen ] = useState(false)
    const [ servicio, setServicio ] = useState('')
    const  [ valor, setValor ] = useState(0)
    const [ valorMostrar, setValorMostrar ] = useState('')
    const [ adicional, setAdicional ] = useState(false)
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Bearer ${token}`}}
    
    // console.log(adicional)

    const handleOpen = () => setOpen(true)

    const handleValor = (e) => {
        let valor = e.target.value 
        setValorMostrar(numeral(valor).format())
        setValor(numeral(valor).value())
    }

    const handleCerrar = () => {
        setOpen(false)
        setValorMostrar('')
    } 

    const handleCrear = () => {
        let data = {
            servicio: servicio,
            valor: valor,
            adicional: adicional
        }
        // console.log(data)
        let promesa = axios.post(`${urlLocal}servicios/crear`,data,headers)
        toast.promise(
            promesa,
            {
                loading: 'creacdo servicio',
                success: (res) => {
                    dispatch(getServicios())
                    setTimeout(() => {
                        setValorMostrar('')
                        setOpen(false)
                    }, 2000);
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    return <>{error.response.data.message}</>
                }
            },
            {
                style: {background: '#94a3b8',textAlign: 'center', textTransform:'capitalize'}
            }
        )
    }

    return (
        <>
            <Button
                    className='flex items-center gap-2 text-sm'
                    color='blue'
                    onClick={handleOpen}
                >
                    <PlusCircle size={25} weight='bold' />
                    agregar
            </Button>

            <Dialog
                handler={handleOpen}
                open={open}
                className='bg-blue-gray-400'
                size='sm'
            >
                <Toaster />

                <DialogHeader className='flex justify-center'>
                    <Typography
                        className='font-normal uppercase'
                        color='white'
                        variant='h4'
                    >
                        crear servicio
                    </Typography>
                </DialogHeader>

                <DialogBody divider className='flex justify-center'>
                    
                    <div className='w-[70%] flex flex-col items-center gap-4 capitalize'>

                        <Input 
                            color='white'
                            label='servicio'
                            icon={<TextAa size={20} weight='bold' color='white'/>}
                            onChange={(e) => setServicio(e.target.value)}
                        />

                        <Input 
                            color='white'
                            label='precio'
                            icon={<CurrencyCircleDollar size={20} weight='bold' color='white'/>}
                            onChange={handleValor}
                            value={valorMostrar !== '' ? `$ ${valorMostrar}` : `$ 0`}
                        />

                        <div className='w-full flex justify-center gap-3'>
                            <Typography color='white'>adicional</Typography>
                            <Switch 
                                color='blue'
                                value={adicional}
                                onChange={(e) => setAdicional(e.target.checked)}
                            />
                        </div>
                    </div>
                </DialogBody>

                <DialogFooter className='flex justify-center gap-3'>
                    <Button
                        size='sm'
                        color='red'
                        onClick={handleCerrar}
                    >
                        cancelar
                    </Button>

                    <Button
                        className='border border-green-600 flex items-center gap-1'
                        size='sm'
                        color='green'
                        onClick={handleCrear}
                    >
                        crear
                        <PlusCircle size={20} />
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}
