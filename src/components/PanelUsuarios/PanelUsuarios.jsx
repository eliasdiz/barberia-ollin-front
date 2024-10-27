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
    const tableHead = [ '#','nombre ','telefono','acc'] 

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
        <div className='flex justify-center '>
            <div className='w-full md:w-[60%] flex flex-col mt-3 rounded-t-2xl bg-gray-800 text-gray-100'>
                <div className='flex flex-col items-center' >
                    <div className='p-2 '>
                        <Typography  variant="h4" className='uppercase font-serif text-center'>
                            usuarios
                        </Typography>
                    </div>

                    <div className='w-full flex flex-col items-center md:flex-row md:justify-center'>
                        <div className='flex justify-center xxsm:w-[95%] xsm:w-[50%] md:w-[50%] p-2'>
                            <Tabs value="all" className="w-full" >
                                <TabsHeader className='bg-gray-700'  indicatorProps={{ className: 'bg-blue-500'}}>
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
                                        color='white'
                                        label="buscar"
                                        icon={<FaMagnifyingGlass className="h-5 w-5" color='white' />}
                                        onChange={(e) => setNombres(e.target.value)}
                                        value={nombres}
                                    />
                                    :
                                    <Input
                                        color='white'
                                        label="buscar"
                                        icon={
                                                <GiCancel
                                                    className="h-5 w-5 cursor-pointer text-white" 
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
                <div className='w-full overflow-y-auto  max-h-[75vh] flex justify-center mt-2 bg-gray-800'>
                    {
                        usuarios.length !== 0 ?
                        <table 
                            className="w-full h-[60%]  min-w-max table-auto text-left capitalize"
                        >
                            <thead className='sticky top-0 bg-gray-800 z-10'>
                                <tr >
                                    {
                                        tableHead.map((item,i) => (
                                            <th
                                                key={i}
                                                className="border-b border-gray-700 bg-gray-800 p-[8px] "
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="white"
                                                    className="font-normal leading-none opacity-70 uppercase"
                                                >
                                                    {item}
                                                </Typography>
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    usuarios?.map(({nombres,apellidos,telefono,_id},i) => (
                                        <tr 
                                            key={i}
                                            className={i % 2 === 0 ? "bg-gray-900" : ''}
                                        >
                                            <td className="p-[8px]">
                                                <Typography variant="paragraph" color="white" className="font-normal">
                                                    {i + 1}
                                                </Typography>
                                            </td>

                                            <td className="p-[8px]">
                                                <Typography variant="paragraph" color="white" className="font-normal">
                                                    {nombres} {apellidos}
                                                </Typography>
                                            </td>

                                            <td className="p-[8px]">
                                                <Typography variant="paragraph" color="white" className="font-normal">
                                                    {telefono}
                                                </Typography>
                                            </td>

                                            <td className='p-[8px]'>
                                                <div className='flex justify-center gap-2'>
                                                    <span onClick={() => handleEditar(_id)}>
                                                        <CardUsuario/>
                                                    </span>

                                                    <span onClick={() => handleEliminar(_id)}>
                                                        <FaRegTrashAlt size={20} color='red' />
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
