import React, { useEffect, useState } from 'react'
import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { format } from '@formkit/tempo'
import actionsServicios from '../../Store/Servicios/actions.js'
import { useDispatch, useSelector } from 'react-redux'
import numeral from 'numeral'
import actionsIngresos from '../../Store/Ingresos/actions.js'


const { getIngresosBarbero} = actionsIngresos
const { getServicios } = actionsServicios

export default function IngresosBarberos() {

    const dispatch = useDispatch()
    
    const [ fechaInicial, setFechaInicial ] = useState('')
    const [ fechaFinal, setFechaFinal ] = useState('')
    const tableHead = ["#", "Fecha", "Servicio", "Valor"]
    const ingresos = useSelector(store => store.ingresos.ingresosBarbero)
    const total = ingresos?.map(({valor}) => valor / 2)?.reduce((a,b) => a+b,0)

    // console.log(ingresos)

    const borrarFechas = () => {
        setFechaInicial('')
        setFechaFinal('')
    }


    useEffect(
        () => {
            dispatch(getServicios())
            dispatch(getIngresosBarbero({ fechaInicial: fechaInicial, fechaFinal: fechaFinal}))
        },
        [fechaInicial,fechaFinal]
    )


    return (
        <Card className="w-full md:w-[60%] max-w-4xl mx-auto flex flex-col justify-start p-1 mt-2  bg-gray-800 text-gray-100">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-2">
                <div className=" w-full flex flex-col gap-2 items-center">
                    <div className="w-full flex flex-col gap-2 capitalize">
                        <div className='w-[60%] md:w-[20%] flex flex-col gap-4 items-start'>
                            <Input
                                label="fecha inicio"
                                type="date"
                                value={fechaInicial}
                                color="white"
                                onChange={(e) => setFechaInicial(e.target.value)}
                            />

                            <Input
                                label="fecha final"
                                type="date"
                                value={fechaFinal}
                                color="white"
                                onChange={(e) => setFechaFinal(e.target.value)}
                            />

                            <Button
                                size='sm'
                                onClick={borrarFechas}
                            >
                                borrar fechas
                            </Button>
                        </div>
                    </div>
                    
                    <div className=' w-full text-right'>
                        <Typography variant="h5" color="white" className="font-normal">
                            Total: $ {numeral(total).format()}
                        </Typography>
                    </div>
                </div>
            </div>

            <div className='max-h-[75vh] overflow-y-auto'>
                <table className="w-full min-w-max table-auto text-left overflow-x-auto px-0">
                    <thead className="sticky top-0 bg-gray-800 z-10">
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
                            ingresos?.map(({fecha, servicio, valor }, i) => (
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
                                        {servicio?.map( item => item.servicio).join(' + ')}
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
            </div>
        </Card>
    )
}

