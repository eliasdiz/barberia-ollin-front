import React, { useEffect, useState } from 'react'
import { Card, Input, Typography } from '@material-tailwind/react'
import { format } from '@formkit/tempo'
import actionsServicios from '../../Store/Servicios/actions.js'
import { useDispatch } from 'react-redux'
import numeral from 'numeral'
import axios from 'axios'
import { urlLocal } from '../../urlHost'


const { getServicios } = actionsServicios

export default function IngresosBarberos() {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const headers = { headers: { Authorization: `Bearer ${token}`}}
    
    const [fecha, setFecha] = useState('')
    const tableHead = ["#", "Fecha", "Servicio", "Valor"]
    const [ servicios, setServicios ] = useState([]) 
    const total = servicios?.map(({valor}) => valor / 2)?.reduce((a,b) => a+b,0)

    // console.log(servicios)

    useEffect(
        () => {
            dispatch(getServicios())
            axios.get(`${urlLocal}ingresos/ingresos-barbero`,headers)
                .then( res => setServicios(res.data.ingresos))
                .catch( error => console.log(error))
        },
        []
    )


    return (
        <Card className="w-full h-[89vh] md:w-[60%] max-w-4xl mx-auto flex flex-col justify-start p-1 mt-2  bg-gray-800 text-gray-100">
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
                                    className="font-normal leading-none opacity-70 uppercase"
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
                        servicios?.map(({fecha, servicio, valor }, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-gray-900" : ""}>
                                <td className="p-4">
                                <Typography variant="small" color="white" className="font-normal">
                                    {i + 1}
                                </Typography>
                                </td>
                                <td className="p-4">
                                <Typography variant="small" color="white" className="font-normal">
                                    {format(fecha,'YYYY-MM-DD' )}
                                </Typography>
                                </td>
                                <td className="p-4">
                                <Typography variant="small" color="white" className="font-normal capitalize">
                                    {servicio}
                                </Typography>
                                </td>
                                <td className="p-4">
                                <Typography variant="small" color="white" className="font-normal">
                                    $ {numeral(valor / 2).format() }
                                </Typography>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    )
}
