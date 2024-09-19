import React, { useEffect, useState } from 'react'
import { Card, Input, Typography } from '@material-tailwind/react'
import { format } from '@formkit/tempo'
import actionsServicios from '../../Store/Servicios/actions.js'
import { useDispatch } from 'react-redux'
import numeral from 'numeral'


const { getServicios } = actionsServicios

export default function IngresosBarberos() {

    const dispatch = useDispatch()

    const [fecha, setFecha] = useState('')
    
    const tableHead = ["#", "Fecha", "Servicio", "Valor"]
    const servicios = [
        { id: 1, fecha: new Date("2023-05-01"), servicio: "Consultoría", valor: 25000 },
        { id: 2, fecha: new Date("2023-05-03"), servicio: "Desarrollo web", valor: 10000 },
        { id: 3, fecha: new Date("2023-05-05"), servicio: "Diseño gráfico", valor: 30000 },
        { id: 4, fecha: new Date("2023-05-10"), servicio: "SEO", valor: 40000 },
        { id: 5, fecha: new Date("2023-05-15"), servicio: "Marketing digital", valor: 60000 },
    ]

    const serviciosFiltrados = fecha
        ? servicios.filter(s => format(s.fecha, "yyyy-MM-dd") === fecha)
        : servicios

    const total = serviciosFiltrados.reduce((sum, servicio) => sum + servicio.valor, 0)

    useEffect(
        () => {
            dispatch(getServicios())
        },
        []
    )

    return (
        <Card className="w-full h-[89vh] max-w-4xl mx-auto flex flex-col justify-start p-1 mt-2  bg-gray-800 text-gray-100">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-3">
                <div className="flex justify-between items-center">
                    <div className="w-[40%]">
                    <Input
                        label="Seleccionar fecha"
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="!border-gray-600 focus:!border-gray-400"
                        labelProps={{
                        className: "!text-gray-400 peer-focus:!text-gray-300",
                        }}
                        color="white"
                    />
                    </div>
                    <Typography variant="h6" color="white" className="font-normal">
                    Total: $ {numeral(total).format()}
                    </Typography>
                </div>
            </div>
            <table className="w-full min-w-max table-auto text-left overflow-x-auto px-0">
            <thead>
                <tr>
                    {
                        tableHead.map((head) => (
                            <th key={head} className="border-b border-gray-700 bg-gray-800 p-4">
                            <Typography
                                variant="small"
                                color="white"
                                className="font-normal leading-none opacity-70"
                            >
                                {head}
                            </Typography>
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    serviciosFiltrados.map(({ id, fecha, servicio, valor }, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-gray-900" : ""}>
                            <td className="p-4">
                            <Typography variant="small" color="white" className="font-normal">
                                {id}
                            </Typography>
                            </td>
                            <td className="p-4">
                            <Typography variant="small" color="white" className="font-normal">
                                {format(fecha,'YYYY-MM-DD' )}
                            </Typography>
                            </td>
                            <td className="p-4">
                            <Typography variant="small" color="white" className="font-normal">
                                {servicio}
                            </Typography>
                            </td>
                            <td className="text-right p-4">
                            <Typography variant="small" color="white" className="font-normal">
                                $ {numeral(valor).format()}
                            </Typography>
                            </td>
                        </tr>
                ))}
            </tbody>
            </table>
        </Card>
    )
}
