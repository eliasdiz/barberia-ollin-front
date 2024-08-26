import { Avatar, Button, Card, Dialog, Switch, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { TbUserEdit } from "react-icons/tb";
import fotoPerfil from '../../assets/usuario.png'
import { FaRegEye } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';



export default function CardUsuario() {

    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ open, setOpen ] = useState(false)
    const handleOpen = () => setOpen(!open)
    const usuarios = useSelector(store => store.getUsuarios.usuarios)
    const id = useSelector(store => store.captureId.id)
    const usuario = usuarios?.find(item => item._id === id)
    const [ openEmail, setOpenEmail ] = useState(false)

    const handleEditar = () => {
        navigate('/admin/editar-usuario')
    }

    const handlOpenEmail = () => setOpenEmail(!openEmail)

    return (
        <>
            <button
                onClick={handleOpen}
            >
                <FaRegEye className='w-5 h-5 text-green-400'  />
            </button>
            <Dialog open={open} handler={handleOpen} className='flex flex-col'>
                {
                    id ? 
                        <>
                            <Card className="w-full p-2 bg-blue-gray-300 text-black rounded-md border border-gray-200">
                                <div  className='flex justify-end'>
                                    <MdClose className='w-6 h-6 cursor-pointer' onClick={handleOpen} />
                                </div>

                                <div className="flex flex-col gap-2 items-center">
                                    <Avatar src={fotoPerfil} alt='perfil' />
                                    <div className="flex flex-col gap-2 bg-gray-100 p-3 rounded-lg shadow-sm">
                                        <Typography variant="h5" className="text-2xl font-bold capitalize text-gray-800">
                                            {usuario?.nombres} {usuario?.apellidos}
                                        </Typography>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Link to={`tel:${usuario?.telefono}`}>
                                                <HiOutlineDevicePhoneMobile className="w-6 h-6 text-blue-500" />
                                            </Link>
                                            <Typography className='text-xl font-semibold'>
                                                {usuario?.telefono} 
                                            </Typography>
                                        </div>
                                        
                                        {
                                            usuario?.email.length > 25 ?
                                            <div className="flex items-center gap-2 text-gray-600 ">
                                                <Link to={`mailto:${usuario?.email}`}>
                                                    <HiOutlineMail className="w-6 h-6 text-red-500" />
                                                </Link>
                                                <div>
                                                    <Typography onClick={handlOpenEmail}  className='text-lg font-semibold'>
                                                        {usuario?.email.slice(0,25)}
                                                    </Typography>
                                                    <Typography onClick={handlOpenEmail}  className='text-lg font-semibold'>
                                                        {usuario?.email.slice(25)}
                                                    </Typography>
                                                </div>
                                            </div>
                                            :
                                            <div className="flex items-center gap-2 text-gray-600 ">
                                                <Link to={`mailto:${usuario?.email}`}>
                                                    <HiOutlineMail className="w-6 h-6 text-red-500" />
                                                </Link>
                                                <Typography  className='text-lg font-semibold'>
                                                    {usuario?.email} 
                                                </Typography>
                                            </div>
                                        }

                                        <div className='flex items-center justify-center gap-4'>
                                            <Typography 
                                                variant="lead"
                                                className='capitalize'
                                            >
                                                barbero
                                            </Typography>
                                            <Switch
                                                color='blue'
                                                disabled
                                                defaultChecked={usuario?.barbero ? true : false}
                                            />

                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Button 
                                            variant="outlined" 
                                            size="sm" 
                                            className="flex items-center shadow-lg "
                                            onClick={handleEditar}
                                        >
                                            <TbUserEdit className="w-6 h-6 mr-2" />
                                            Editar
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </>
                        :
                        <></>
                }
            </Dialog>
        </>
    );
};
