import { Typography, Tabs, TabsHeader, Tab, Input, Button} from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import CardUsuario from '../CardUsuario/CardUsuario';
import { useDispatch, useSelector } from 'react-redux';
import { urlLocal } from '../../urlHost';
import actionsIdCapture from '../../Store/Idcapture/actions.js'
import toast from 'react-hot-toast';
import actionsUsuarios from '../../Store/Usuarios/actions.js'
import iconoUsuario from '../../assets/lupaX.png'
import actionsServicios from '../../Store/Servicios/actions.js'


const { getServicios } = actionsServicios
const { getTodos, getUsuario } = actionsUsuarios
const { idCapture } = actionsIdCapture


export default function PanelUsuarios() {

    const dispatch = useDispatch()
    const usuarios = useSelector(store => store.getUsuarios.usuarios)
    const [ valueParametro, setValuePrametro ] = useState('')
    const [ parametro, setParametro ] = useState('')
    const [ nombres, setNombres ] = useState('')
    const idUsuario = useSelector(store => store.captureId.id)
    // console.log(idUsuario)

    const categorias = [{label: "barberos",value: "barberos",},{label: "clientes",value: "clientes",}];
    const tableHead = [ 'nombre ','telefono','acc'] 

    const handleParametro = () => {
        setParametro(valueParametro)
    }

    const handleEditar = (id) => {
        dispatch(idCapture({ id: id}))
    }

    const handleEliminar = (id) => {
        let usuario = usuarios?.find(item => item._id === id)
        usuario &&
        toast((t) => (
            <div className='flex flex-col items-center gap-2 capitalize text-black'>
                <Typography variant='lead' className='text-center'>eliminar {usuario?.nombres}?</Typography>

                <div className='flex items-center gap-3'>
                    <Button 
                        className='bg-green-600'
                        size='sm'
                        onClick={() => {
                            toast.dismiss(t.id)
                            let promesa = axios.delete(`${urlLocal}usuarios/${id}`)
                            toast.promise(
                                promesa,
                                {
                                    loading: 'eliminando usuario',
                                    success: (res) => {
                                        dispatch(getTodos({parametro:parametro, nombres:nombres}))
                                        return <>{res.data.message}</>
                                    },
                                    error: (error) => {
                                        return <>{error.response.data.message}</>
                                    }
                                },
                                {   
                                    style: { 
                                        background: '#94a3b8', textTransform: 'capitalize', fontWeight: 'bolder'
                                    }
                                }
                            )
                        }} 
                    >
                        si
                    </Button>

                    <Button 
                        className='bg-red-700'
                        size='sm'
                        onClick={() => toast.dismiss(t.id)}
                    >
                        no
                    </Button>

                </div>
            </div>
        )),{
            duration: Infinity,
            style: {
                borderRadius: '10px',
                background: '#94a3b8',
            }
        }
    }

    useEffect(
        () => {
            dispatch(getServicios())
            dispatch(getTodos({parametro:parametro, nombres: nombres}))
        },
        [dispatch,parametro,nombres]
    )
    

    return (
        <div className='flex justify-center'>
            <div className='w-full md:w-[60%] flex flex-col'>
                <div className='flex flex-col items-center bg-white rounded-t-2xl'>
                    <div className='p-2 '>
                        <Typography  variant="h4" color="blue-gray" className='uppercase font-serif text-center'>
                            usuarios
                        </Typography>
                    </div>

                    <div className='w-full flex flex-col items-center md:flex-row md:justify-center  '>
                        <div className='flex justify-center xxsm:w-[95%] xsm:w-[50%] md:w-[40%] p-2 '>
                            <Tabs value="all" className="w-full md:w-max" >
                                <TabsHeader>
                                {
                                    categorias.map((item,i) => (
                                        <Tab 
                                            key={i} 
                                            value={item.value} 
                                            className='capitalize'
                                            onClickCapture={(e) => setValuePrametro(e.target.textContent)}
                                            onClick={handleParametro}
                                        >
                                            {item.label}
                                        </Tab>
                                    ))
                                }
                                
                                </TabsHeader>
                            </Tabs>
                        </div>

                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row xxsm:w-[95%] xsm:w-[50%] md:w-[40%] ">
                            <div className="w-full md:w-72 p-2 capitalize">
                            {
                                nombres === '' ?
                                    <Input
                                        label="buscar"
                                        icon={<FaMagnifyingGlass className="h-5 w-5" />}
                                        onChange={(e) => setNombres(e.target.value)}
                                        value={nombres}
                                    />
                                    :
                                    <Input
                                        label="buscar"
                                        icon={
                                                <GiCancel 
                                                    className="h-5 w-5 cursor-pointer" 
                                                    onClick={() => setNombres('')}
                                                />
                                            }
                                        onChange={(e) => setNombres(e.target.value)}
                                        value={nombres}
                                    />
                            }
                            </div>
                        </div>
                    </div>

                </div>
                <div className='w-full overflow-y-auto  max-h-[75vh] '>
                    {
                        usuarios.length !== 0 ?
                        <table className="w-full min-w-max table-auto text-left bg-gray-600 overflow-x-auto">
                            <thead>
                                <tr className='sticky top-0'>
                                    {
                                        tableHead.map((item,i) => (
                                            <th
                                                key={i}
                                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-3 text-left"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    color="blue-gray"
                                                    className="font-sans leading-none opacity-70 capitalize"
                                                >{item}</Typography>
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usuarios?.map((item,i) => (
                                        <tr key={i}>
                                            <td className='p-2 border-b border-blue-gray-50'>
                                                <Typography
                                                    variant="h6"
                                                    color="white"
                                                    className="font-medium capitalize"
                                                >
                                                    {item.nombres} {item.apellidos}
                                                </Typography>
                                            </td>

                                            <td className='p-2 border-b border-blue-gray-50 text-left'>
                                                <Typography
                                                    variant="h6"
                                                    color="white"
                                                    className="font-medium capitalize"
                                                >
                                                    {item.telefono}
                                                </Typography>
                                            </td>

                                            <td className='p-2 border-b border-blue-gray-50 '>
                                                <div className='flex justify-center gap-2'>
                                                    <span onClick={() => handleEditar(item._id)}>
                                                        <CardUsuario/>
                                                    </span>

                                                    <span onClick={() => handleEliminar(item._id)}>
                                                        <FaRegTrashAlt className='w-5 h-5 text-red-400 cursor-pointer' />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <div className='flex flex-col items-center gap-4 p-5 w-full bg-blue-gray-300 capitalize'>
                            <img src={iconoUsuario} className='w-20 h-20'/>
                            <Typography variant='h4'>
                                usuario no encontrado
                            </Typography>
                        </div>        
                    }
                </div>
            </div>
        </div>
    )
}
