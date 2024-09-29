import { Card, Switch, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actionsServicios from '../../Store/Servicios/actions'
import numeral from 'numeral'
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import FormServicio from '../FormServicio/FormServicio'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { urlLocal } from '../../urlHost'


const { getServicios} = actionsServicios


export default function Servicios() {

    const dispatch = useDispatch()

    const tableHead = ["#", "servicio", "adicional", "valor", 'acc']
    const servicios = useSelector(store => store.servicios.servicios)
    const [ alerta , setAlerta ] = useState(false)

    

    const handleEliminar = (id) => {
        setAlerta(true)
        // console.log(id)
        let servicio = servicios?.find(({_id}) => _id === id)
        id !== '' &&
            toast((t) => (
                <div className='flex flex-col gap-1'>
                    <div className='w-[15rem] h-full bg-blue-gray-700 rounded-md capitalize text-center divide-y divide-gray-200'>
                        <Typography color='white' variant='lead' className='p-1'>
                            eliminar {servicio.servicio}  ? 
                        </Typography>

                        <div className='p-2 cursor-pointer'>
                            <Typography 
                                color='red' 
                                variant='lead'
                                onClick={() => { 
                                    toast.dismiss(t.id) 
                                    eliminarReserva(servicio._id)
                                }}
                            >
                                eliminar
                            </Typography>
                        </div>
                    </div>

                    <div 
                        className=' bg-blue-gray-700 rounded-md text-center capitalize p-1 cursor-pointer' 
                        onClick={() => handleCancelarEliminar(t)}
                    >
                        <Typography color='blue' variant='lead'>
                            cancelar
                        </Typography>
                    </div>
            </div>
            ),{
                duration: Infinity,
                style:{boxShadow: 'none', background: 'transparent'}
            })
    }

    const handleCancelarEliminar = (t) => {
        toast.dismiss(t.id)
        setAlerta(false)
    }
    
    const eliminarReserva = (id) => {
        setAlerta(false)
        let promesa = axios.delete(`${urlLocal}servicios/${id}`)
        toast.promise(
            promesa,
            {
                loading: 'eliminando servicio',
                success: (res) => {
                    dispatch(getServicios())
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    return <>{error.response.data.message}</>
                }
            },{
                style: {background: '#94a3b8',textAlign: 'center', textTransform:'capitalize'}

            }
        )
    }

    useEffect(
        () => {
            dispatch(getServicios())
        },
        []
    )


    return (
        <Card className="h-[78vh] w-full md:w-[60%] max-w-4xl mx-auto flex flex-col justify-start gap-4 p-2 mt-2  bg-gray-800 text-gray-100">

            <div className='flex justify-evenly items-center p-1 mt-3'>
                <Typography className='capitalize' variant='h3'> servicios</Typography>

                <FormServicio />
            </div>

            <div className='h-full w-full overflow-y-auto flex justify-center mt-2'>
                <table className="w-full h-[60%] md:w-[60%] min-w-max table-auto text-left capitalize">
                    <thead className="sticky top-0 bg-gray-800 z-10">
                        <tr>
                            {
                                tableHead.map((head) => (
                                    <th key={head} className="border-b border-gray-700 bg-gray-800 p-[8px] ">
                                    <Typography
                                        variant="small"
                                        color="white"
                                        className="font-normal leading-none opacity-70 uppercase"
                                    >
                                        {head}
                                    </Typography>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            servicios?.map(({servicio,valor,adicional,_id}, i) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-gray-900" : ''}>

                                    <td className="p-[8px]">
                                        <Typography variant="paragraph" color="white" className="font-normal">
                                            {i + 1}
                                        </Typography>
                                    </td>

                                    <td className="p-[8px]">
                                        <Typography variant="paragraph" color="white" className="font-normal">
                                            {servicio}
                                        </Typography>
                                    </td>


                                    <td className="p-[8px]">
                                        <div className='flex justify-center'>
                                            <Switch 
                                                color='blue'
                                                checked={adicional}
                                                disabled
                                            />
                                        </div>
                                    </td>

                                    <td className="p-[8px]">
                                        <Typography variant="paragraph" color="white" className="font-normal">
                                            $ {numeral(valor).format() }
                                        </Typography>
                                    </td>

                                    <td className="p-[8px]">
                                        <div className='flex items-center gap-1'>
                                            <FaRegEdit size={20} color='orange' />

                                            <button
                                                // className='border'
                                                size='sm'
                                                variant='text'
                                                disabled={alerta}
                                            >
                                                <FaRegTrashAlt 
                                                    size={20} 
                                                    color='red' 
                                                    onClick={() => handleEliminar(_id)}
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Toaster />
        </Card>
    )
}
