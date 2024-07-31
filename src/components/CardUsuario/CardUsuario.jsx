import { Button, Card, Dialog, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { TbUserEdit } from "react-icons/tb";
import fotoPerfil from '../../assets/usuario.png'
import { FaRegEye } from "react-icons/fa6";
import { MdClose } from "react-icons/md";



export default function CardUsuario() {

    const [ open, setOpen ] = useState(false)
    const handleOpen = () => setOpen(!open)

    return (
        <>
            <button
                onClick={handleOpen}
            >
                <FaRegEye className='w-5 h-5 text-cyan-500'  />
            </button>
            <Dialog open={open} handler={handleOpen}>
                <Card className="w-full p-6 grid gap-6 md:max-w-md bg-blue-gray-300 text-black border border-gray-300">
                    <div  className='w-full flex justify-end cursor-pointer'>
                        <MdClose className='w-6 h-6 ' onClick={handleOpen} />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-5 relative">
                        <img src={fotoPerfil} alt='foto perfil' className="w-16 h-16 rounded-full border-2 border-gray-300" />

                        <div className="grid gap-1 flex-1 bg-gray-100 p-4 rounded-lg shadow-sm">
                            <Typography variant="h5" className="text-2xl font-bold capitalize text-gray-800">
                                {/* {user?.nombres} {user?.apellidos} */} elias jimenez diz
                            </Typography>

                            <div className="flex items-center gap-2 text-gray-600">
                                <HiOutlineDevicePhoneMobile className="w-6 h-6 text-blue-500" />
                                <Typography variant="lead">
                                    {/* {user?.telefono} */} 3013281320
                                </Typography>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <HiOutlineMail className="w-6 h-6 text-red-500" />
                                <Typography variant="lead">
                                    {/* {user?.email} */} eliasj.diz@gmail.com
                                </Typography>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Button variant="outlined" size="sm" className="flex items-center shadow-lg">
                                <TbUserEdit className="w-6 h-6 mr-2" />
                                Edit
                            </Button>
                        </div>
                    </div>
                </Card>
            </Dialog>
        </>
    );
};
