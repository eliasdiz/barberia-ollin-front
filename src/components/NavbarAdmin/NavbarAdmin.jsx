import React, { useEffect } from "react";
import { Navbar,Collapse,Typography,Button,IconButton,List,ListItem} from "@material-tailwind/react";
import { Bars3Icon,XMarkIcon} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { BsFillPeopleFill } from "react-icons/bs";

    
    
export default function NavbarAdmin() {
            
    const [openNav, setOpenNav] = React.useState(false);
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleInicioseion = () => {
        navigate('/inicio-sesion')
        setOpenNav(false)
    }
    
    const handleInicio = () => {
        navigate('/')
        setOpenNav(false)
    }

    function NavList() {
    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            <ListItem onClick={handleInicio}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-2 font-medium capitalize"
                >
                    <HiMiniHome className="h-4 w-4" />
                    inicio
                </Typography>
            </ListItem>

            <Link to={'/admin/usuarios'}>
                <ListItem>
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center gap-2 font-medium capitalize"
                    >
                        <BsFillPeopleFill className="h-4 w-4" />
                        usuarios
                    </Typography>
                </ListItem>
            </Link>

            
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

                <div className="hidden gap-2 lg:flex">
                    {
                        !token  ?
                        <Button 
                            variant="gradient" 
                            size="sm" 
                            color="blue-gray" 
                            fullWidth
                            onClick={handleInicioseion}
                        >
                            iniciar sesion
                        </Button>
                        :
                        <></>
                    }
                    <Button variant="gradient" size="sm">
                        cerrar sesion
                    </Button>
                </div>
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
                <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                    {
                        !token  ?
                        <Button 
                            variant="gradient" 
                            size="sm" 
                            color="blue-gray" 
                            fullWidth
                            onClick={handleInicioseion}
                        >
                            iniciar sesion
                        </Button>
                        :
                        <></>
                    }
                <Button variant="gradient" size="sm" fullWidth>
                    cerrar sesion
                </Button>
                </div>
            </Collapse>
        </Navbar>
);
}
