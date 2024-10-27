import { Card, CardBody, Typography } from '@material-tailwind/react'
import { ChartLine, FileText, Scissors, User } from '@phosphor-icons/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Admin() {

    const navigate = useNavigate()

    const adminActions = [
        { title: 'productos', icon: <FileText size={48} />, link: '/admin/productos' },
        { title: 'Servicios', icon: <Scissors size={48} />, link: '/admin/servicios' },
        { title: 'Usuarios', icon: <User size={48} />, link: '/admin/usuarios' },
        { title: 'Estadísticas', icon: <ChartLine size={48} />, link: '/admin/admin' },
        { title: 'Reportes', icon: <FileText size={48} />, link: '/admin/admin' },
    ].sort((a,b) => a.title.localeCompare(b.title))

    return (
        <div className='w-full flex justify-center'>
            <div className="flex flex-wrap justify-center p-3 gap-4 mt-6">
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
