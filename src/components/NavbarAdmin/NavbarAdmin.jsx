import React, { useEffect } from "react";
import { Navbar,Collapse,Typography,Button,IconButton,List,ListItem} from "@material-tailwind/react";
import { Bars3Icon,XMarkIcon} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { urlLocal } from '../../urlHost.js'
import actionsUsuarios from '../../Store/Usuarios/actions.js'
import { useDispatch } from "react-redux";
import { BeerStein, CalendarDots, House, Scissors, User } from "@phosphor-icons/react";


const { getUsuario } = actionsUsuarios

    
    
export default function NavbarAdmin() {
            
    const [openNav, setOpenNav] = React.useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Bearer ${token}`}}


    const handleInicio = () => {
        navigate('/admin')
        setOpenNav(false)
    }

    const handleTienda = () => {
        navigate('/admin/tienda')
        setOpenNav(false)
    }

    const handleIniciosesion = () => {
        navigate('/inicio-sesion')
        setOpenNav(false)
    }

    const handleServicios = () => {
        navigate('/admin/servicios')
        setOpenNav(false)
    }

    const handleUsuarios = () => {
        navigate('/admin/usuarios')
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
    

    

    const NavList = () => {
        return (
            <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
                <ListItem onClick={handleInicio}>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex items-center gap-3 font-medium capitalize"
                    >
                        <House size={30} weight="bold" />
                        inicio
                    </Typography>
                </ListItem>

                <ListItem onClick={handleTienda}>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex items-center gap-3 font-medium capitalize"
                    >
                        <BeerStein size={30} weight="bold" />
                        tienda
                    </Typography>
                </ListItem>

                <ListItem onClick={handleInicio}>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex items-center gap-3 font-medium capitalize"
                    >
                        <CalendarDots size={30} weight="bold" />
                        agenda
                    </Typography>
                </ListItem>

                <ListItem onClick={handleServicios}>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex items-center gap-3 font-medium capitalize"
                    >
                        <Scissors size={30} weight="fill" />
                        servicios
                    </Typography>
                </ListItem>


                <ListItem onClick={handleUsuarios}>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex items-center gap-3 font-medium capitalize"
                    >
                        <User size={30} weight="bold" />
                        usuarios
                    </Typography>
                </ListItem>
                                
            </List>
        );
        }


    useEffect(() => {
        window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);
    
    return (
        <Navbar className="mx-auto max-w-screen-xl px-4 py-2 shadow-md" color="blue-gray">
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
                    !token  ?
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
                        !token  ?
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
