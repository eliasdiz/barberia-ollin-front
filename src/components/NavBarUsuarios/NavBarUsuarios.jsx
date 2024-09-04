import React, { useEffect, useState } from "react";
import { Navbar, Collapse, Typography, Button, IconButton, List, ListItem } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { urlLocal } from '../../urlHost.js';
import actionsUsuarios from '../../Store/Usuarios/actions.js';
import { useDispatch } from "react-redux";
import { RiCalendarScheduleFill } from "react-icons/ri";


const { getUsuario } = actionsUsuarios;

export default function NavBarUsuarios() {
    const [openNav, setOpenNav] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(true);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleInicio = () => {
        navigate('/');
        setOpenNav(false);
    };

    const handleIniciosesion = () => {
        navigate('/inicio-sesion');
        setOpenNav(false);
    };

    const handleReserva = () => {
        navigate('/validacion-email');
        setOpenNav(false);
    };

    const handleCerrarSesion = () => {
        let promesa = axios.post(`${urlLocal}usuarios/cerrar-sesion`, null, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.promise(
            promesa,
            {
                loading: 'cerrando sesion',
                success: (res) => {
                    localStorage.removeItem('token');
                    setOpenNav(false);
                    setTimeout(() => {
                        dispatch(getUsuario());
                        navigate('/');
                    }, 2500);
                    return <>{res.data.message}</>;
                },
                error: (error) => {
                    console.log(error);
                    return <>{error.response.data.message}</>;
                }
            },
            {
                style: { background: '#94a3b8', textTransform: 'capitalize', color: 'black' }
            }
        );
    };

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

                <ListItem 
                    onClick={handleReserva}
                >
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex items-center gap-2 font-medium capitalize"
                    >
                        <RiCalendarScheduleFill className="h-5 w-5" />
                        reservas
                    </Typography>
                </ListItem>

            </List>
        );
    };

    useEffect(() => {
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
                    className="mr-4 cursor-pointer py-1.5 lg:ml-2 uppercase"
                >
                    menu
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>

                {
                    !isAuthenticated  ?
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
                    !isAuthenticated  ?
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
