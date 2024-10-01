import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Switch, Typography } from '@material-tailwind/react'
import { CurrencyCircleDollar, TextAa } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { FaRegEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import actionsServicios from '../../Store/Servicios/actions'
import numeral from 'numeral'
import capturaId from '../../Store/Idcapture/actions'
import axios from 'axios'
import { urlLocal } from '../../urlHost'


const { idCapture} = capturaId
const { getServicios} = actionsServicios


export default function FormEditarServicio(props) {

    const dispatch = useDispatch()

    const [ open, setOpen ] = useState(false)
    const idServicio = useSelector(store => store.captureId.id)
    const servicioEditar = useSelector(store => store.servicios.servicios)?.find(({_id}) => _id === idServicio)
    const [ servicio, setServicio ] = useState('')
    const [ valor, setValor ] = useState(0)
    const [ valorMostrar, setValorMostrar ] = useState('')
    const [ adicional, setAdicional ] = useState(servicioEditar?.adicional)
    
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Bearer ${token}`}}
    // console.log(servicioEditar)

    const handleOpen = () => setOpen(true)

    const handleValor = (e) => {
        let valor = e.target.value 
        setValorMostrar(numeral(valor).format())
        setValor(numeral(valor).value())
    }

    const handleCerrar = () => {
        setOpen(false)
        dispatch(idCapture({id: ''}))
    }

    const handleEditar = () => {
        let data = {
            servicio: servicio || servicioEditar.servicio,
            valor: valor || servicioEditar.valor,
            adicional: adicional
        }
        // console.log(data)
        let promesa = axios.put(`${urlLocal}servicios/${idServicio}`,data,headers)
        toast.promise(
            promesa,
            {
                loading: 'actualizando servicio',
                success: (res) => {
                    dispatch(getServicios())
                    setTimeout(() => {
                        setOpen(false)
                    }, 2000);
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    console.log(error.response)
                    return <>{error.response.data.message}</>
                }
            },{
                style: {background: '#94a3b8',textAlign: 'center', textTransform:'capitalize'}
            }
        )
    }


    return (
        <>
            <button
                onClick={handleOpen}
                onClickCapture={props.clickCapture}
            >
                <FaRegEdit size={20} color='orange' />
            </button>
            {
                servicioEditar ?
                    <>
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
                                    editar {servicioEditar.servicio}
                                </Typography>
                            </DialogHeader>

                            <DialogBody divider className='flex justify-center'>
                                
                                <div className='w-[70%] flex flex-col items-center gap-4 capitalize'>

                                    <Input 
                                        color='white'
                                        label='servicio'
                                        icon={<TextAa size={20} weight='bold' color='white'/>}
                                        onChange={(e) => setServicio(e.target.value)}
                                        defaultValue={servicioEditar.servicio}
                                    />

                                    <Input 
                                        color='white'
                                        label='precio'
                                        icon={<CurrencyCircleDollar size={20} weight='bold' color='white'/>}
                                        onChange={handleValor}
                                        value={valorMostrar !== '' ? `$ ${valorMostrar}` : `$ ${numeral(servicioEditar.valor).format()}`}
                                    />

                                    <div className='w-full flex justify-center gap-3'>
                                        <Typography color='white'>adicional</Typography>
                                        
                                        <Switch 
                                            color='blue'
                                            onChange={(e) => setAdicional(e.target.checked)}
                                            defaultChecked={servicioEditar.adicional ? true : false}
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
                                    className='border border-green-600 flex items-center gap-2'
                                    size='sm'
                                    color='green'
                                    onClick={handleEditar}
                                >
                                    editar
                                    <FaRegEdit size={18} />
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </>
                :
                <></>
            }
        </>
    )
}
