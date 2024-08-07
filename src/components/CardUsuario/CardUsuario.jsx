import { Button, Card, Dialog, Switch, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { TbUserEdit } from "react-icons/tb";
import fotoPerfil from '../../assets/usuario.png'
import { FaRegEye } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useSelector } from 'react-redux';


export default function CardUsuario() {

    const [ open, setOpen ] = useState(false)
    const handleOpen = () => setOpen(!open)
    const usuarios = useSelector(store => store.getUsuarios.usuarios)
    const id = useSelector(store => store.idCapture.id)
    const usuario = usuarios?.find(item => item._id === id)


    return (
        <>
            <button
                onClick={handleOpen}
            >
                <FaRegEye className='w-5 h-5 text-cyan-500'  />
            </button>
            <Dialog open={open} handler={handleOpen}>
                {
                    id ? 
                        <>
                            <Card className="p-3 gap-6 md:max-w-md bg-blue-gray-300 text-black rounded-md border border-gray-200">
                                <div  className='w-full flex justify-end cursor-pointer'>
                                    <MdClose className='w-6 h-6 ' onClick={handleOpen} />
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-5 ">
                                    <img src={fotoPerfil} alt='foto perfil' className="w-16 h-16 rounded-full border-2 border-gray-300" />

                                    <div className="flex flex-col gap-2 bg-gray-100 p-3 rounded-lg shadow-sm">
                                        <Typography variant="h5" className="text-2xl font-bold capitalize text-gray-800">
                                            {usuario?.nombres} {usuario?.apellidos}
                                        </Typography>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <HiOutlineDevicePhoneMobile className="w-6 h-6 text-blue-500" />
                                            <Typography className='text-xl font-semibold'>
                                                {usuario?.telefono} 
                                            </Typography>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <HiOutlineMail className="w-6 h-6 text-red-500" />
                                            <Typography  className='text-lg font-semibold'>
                                                {usuario?.email} 
                                            </Typography>
                                        </div>

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
                                        <Button variant="outlined" size="sm" className="flex items-center shadow-lg ">
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
