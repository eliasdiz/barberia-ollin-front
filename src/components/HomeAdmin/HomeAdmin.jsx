import { Typography, Avatar, Card, CardBody } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actionsUsuarios from '../../Store/Usuarios/actions'
import actionsServicios from '../../Store/Servicios/actions'
import { User, ChartLine, FileText, Scissors, BeerStein } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'


const { getServicios} = actionsServicios
const { getUsuario } = actionsUsuarios

export default function HomeAdmin() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const usuario = useSelector(store => store.getUsuarios.usuario)

    const adminActions = [
        { title: 'Servicios', icon: <Scissors size={48} />, link: '/admin/servicios' },
        { title: 'Usuarios', icon: <User size={48} />, link: '/admin/usuarios' },
        { title: 'tienda', icon: <BeerStein size={48} />, link: '/admin/tienda' },
        { title: 'Estadísticas', icon: <ChartLine size={48} />, link: '/admin/stats' },
        { title: 'Reportes', icon: <FileText size={48} />, link: '/admin/reports' },
        { title: 'productos', icon: <FileText size={48} />, link: '/admin/productos' },
    ]

    useEffect(
        () => {
            dispatch(getUsuario())
            dispatch(getServicios())
        },
        [dispatch]
    )

    return (
        <div className='w-full md:w-[60%] flex flex-col gap-2 p-1'>

            <div className='w-full flex items-center justify-end gap-4 p-2'>
                <Typography 
                    className='text-white text-center capitalize' 
                    variant='lead'
                >
                    hola {usuario.nombres}!!!
                </Typography>
                <Avatar
                    size='sm'
                    variant='rounded'
                    src='https://docs.material-tailwind.com/img/face-2.jpg'
                />
            </div>

            <div className="flex flex-wrap justify-center p-3 gap-4">
                {
                    adminActions.map(({title,icon,link}, i) => (
                        <Card 
                            key={i}
                            className="w-[45%] md:w-[30%] bg-gray-800 hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
                            onClick={() => navigate(link)}
                        >
                            <CardBody className="flex flex-col items-center">
                                <div className="text-blue-500 mb-4">
                                    {icon}
                                </div>
                                <Typography variant="h5" color="white" className="text-center capitalize">
                                    {title}
                                </Typography>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>

        </div>
    )
}
