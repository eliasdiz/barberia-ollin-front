import React, { useEffect, useState } from "react";
import { Navbar,Collapse,Typography,Button,IconButton,List,ListItem} from "@material-tailwind/react";
import { Bars3Icon,XMarkIcon} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { urlLocal } from '../../urlHost.js'
import actionsUsuarios from '../../Store/Usuarios/actions.js'
import { useDispatch } from "react-redux";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";
import { CurrencyDollar } from '@phosphor-icons/react'





const { getUsuario } = actionsUsuarios


export default function NavbarBarbero() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [openNav, setOpenNav] = useState(false);
    const [ autenticado, setAutenticado ] = useState(false);
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Bearer ${token}`}}

    const handleInicio = () => {
        navigate('/barbero')
        setOpenNav(false)
    }

    const handleIniciosesion = () => {
        navigate('/inicio-sesion')
        setOpenNav(false)
    }

    const handleAgenda = () => {
        navigate('/barbero/agenda')
        setOpenNav(false)
    }

    const handleReserva = () => {
        navigate('/barbero/reservas')
        setOpenNav(false)
    }

    const handleIngresos = () => {
        navigate('/barbero/ingresos')
        setOpenNav(false)
    }

    const handleCerrarSesion = () => {
        let promesa = axios.post(`${urlLocal}usuarios/cerrar-sesion`,null,headers)
        toast.promise(
            promesa,
            {
                loading: 'cerrando sesion',
                success: (res) => {
                    localStorage.removeItem('token')
                    setOpenNav(false)
                    setTimeout(() => {
                        dispatch(getUsuario())
                        navigate('/')
                    }, 2500);
                    return <>{res.data.message}</>
                },
                error: (error) => {
                    return <>{error.response.data.message}</>
                }
            },
            {
                style: { background: '#94a3b8', textTransform: 'capitalize', color: 'black'}
            }
        )
    }

    const verificarToken = (token) => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token')
                setAutenticado(false);
            } else {
                setAutenticado(true);
            }
        } else {
            setAutenticado(false);
        }
    }
    

    const NavList = () => {
        return (
            <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
                <ListItem onClick={handleInicio}>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex items-center gap-2 font-medium capitalize"
                    >
                        <HiMiniHome className="h-5 w-5" />
                        inicio
                    </Typography>
                </ListItem>
                
                <ListItem onClick={handleAgenda}>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex items-center gap-2 font-medium capitalize"
                    >
                        <IoCalendarNumberSharp className="h-5 w-5"  />
                        agenda
                    </Typography>
                </ListItem>

                <ListItem onClick={handleReserva}>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex items-center gap-2 font-medium capitalize"
                    >
                        <RiCalendarScheduleFill className="h-5 w-5" />
                        reservas
                    </Typography>
                </ListItem>

                <ListItem onClick={handleIngresos}>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex items-center gap-2 font-medium capitalize"
                    >
                        <CurrencyDollar size={26} weight="fill" />
                        ingresos
                    </Typography>
                </ListItem>

            </List>
        );
        }


    useEffect(() => {
        verificarToken(token)
        window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);
    
    return (
        <Navbar className="mx-auto max-w-screen-xl px-4 py-2 shadow-md md:w-[60%] " color="blue-gray">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                as="a"
                href="#"
                variant="h6"
                className="mr-4  cursor-pointer py-1.5 lg:ml-2 uppercase"
                >
                menu
                </Typography>
                <div className="hidden lg:block">
                <NavList />
                </div>

                {
                    !autenticado  ?
                    <div 
                        className="hidden gap-2 lg:flex"
                    >
                        <Button 
                            variant="gradient" 
                            size="sm" 
                            color="blue-gray" 
                            fullWidth
                            onClick={handleIniciosesion} 
                        >
                            iniciar sesion
                        </Button>
                    </div>
                    :
                    <div 
                        className="hidden gap-2 lg:flex"
                    >
                        <Button 
                            variant="gradient" 
                            size="sm"
                            fullWidth
                            onClick={handleCerrarSesion} 
                        >
                            cerrar sesion
                        </Button>
                    </div>
                }
        
                <IconButton
                variant="text"
                color="blue-gray"
                className="lg:hidden"
                onClick={() => setOpenNav(!openNav)}
                >
                {openNav ? (
                    <XMarkIcon className="h-6 w-6 text-black" strokeWidth={2} />
                ) : (
                    <Bars3Icon className="h-6 w-6 text-black" strokeWidth={2} />
                )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
                    {
                        !autenticado  ?
                        <div 
                            className="flex w-full flex-nowrap justify-center gap-2 lg:hidden"
                        >
                            <Button 
                                variant="gradient" 
                                size="sm" 
                                color="blue-gray" 
                                fullWidth
                                onClick={handleIniciosesion}    
                            >
                                iniciar sesion
                            </Button>
                        </div>
                        :
                        <div 
                            className="flex w-full flex-nowrap items-center gap-2 lg:hidden"
                        >
                            <Button 
                                variant="gradient" 
                                size="sm" 
                                fullWidth
                                onClick={handleCerrarSesion} 
                            >
                                cerrar sesion
                            </Button>
                        </div>
                    }
            </Collapse>
            <Toaster />
        </Navbar>
);
}
