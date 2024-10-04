import { Card, Switch, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actionsServicios from '../../Store/Servicios/actions'
import numeral from 'numeral'
import { FaRegTrashAlt } from "react-icons/fa";
import FormServicio from '../FormServicio/FormServicio'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
// import { urlLocal } from '../../urlHost'
// import capturaId from '../../Store/Idcapture/actions'
import FormEditarServicio from '../FormEditarServicio/FormEditarServicio'
import { urlLocal } from '../../urlHost'
import actionsProductos from '../../Store/Productos/actions'


const { getProductos} = actionsProductos
const { getServicios} = actionsServicios


export default function Productos(){

    const dispatch = useDispatch()

    const tableHead = ["#", "descripcion", "stock", "precio", 'acc']
    // const [ productos, setProductos ] = useState([])
    const productos = useSelector(store => store.productos.productos)
    console.log(productos)
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
                    setTimeout(() => {
                        toast.dismiss()
                    }, 2500);
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

    const handleEditar = (id) => {
        console.log(id)
        dispatch(idCapture({id:id}))
    }


    useEffect(
        () => {
            dispatch(getServicios())
            dispatch(getProductos())
        },
        []
    )

    
    return (
        <Card className="h-[78vh] w-full md:w-[60%] max-w-4xl mx-auto flex flex-col justify-start gap-4 p-2 mt-2  bg-gray-800 text-gray-100">

            <div className='flex justify-evenly items-center p-1 mt-3'>
                <Typography className='capitalize' variant='h3'> productos</Typography>

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
                            productos?.map(({descripcion,unidad_medida,cantidad_medida,stock,precio,_id}, i) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-gray-900" : ''}>

                                    <td className="p-[8px]">
                                        <Typography variant="paragraph" color="white" className="font-normal">
                                            {i + 1}
                                        </Typography>
                                    </td>

                                    <td className="p-[8px]">
                                        <Typography variant="paragraph" color="white" className="font-normal capitalize">
                                            {descripcion} {cantidad_medida} {unidad_medida}
                                        </Typography>
                                    </td>

                                    <td className="p-[8px]">
                                        <Typography variant="paragraph" color="white" className="font-normal capitalize text-center">
                                            {stock}
                                        </Typography>
                                    </td>

                                    <td className="p-[8px]">
                                        <Typography variant="paragraph" color="white" className="font-normal">
                                            $ {numeral(precio).format() }
                                        </Typography>
                                    </td>

                                    <td className="p-[8px]">
                                        <div className='flex items-center gap-1'>
                                            <FormEditarServicio clickCapture={() => dispatch(idCapture({id: _id}))}/>

                                            <button
                                                disabled={alerta}
                                                onClick={() => handleEliminar(_id)}
                                            >
                                                <FaRegTrashAlt size={20} color='red' />
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

