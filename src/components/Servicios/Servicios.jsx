import { Button, Card, Switch, Typography } from '@material-tailwind/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actionsServicios from '../../Store/Servicios/actions'
import numeral from 'numeral'
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { PlusCircle } from '@phosphor-icons/react'
import FormServicio from '../FormServicio/FormServicio'


const { getServicios} = actionsServicios


export default function Servicios() {

    const dispatch = useDispatch()

    const tableHead = ["#", "servicio", "adicional", "valor", 'acc']
    const servicios = useSelector(store => store.servicios.servicios)


    // console.log(servicios)


    useEffect(
        () => {
            dispatch(getServicios())
        },
        []
    )


    return (
        <Card className="h-[78vh] w-full md:w-[60%] max-w-4xl mx-auto flex flex-col justify-start gap-4 p-2 mt-2  bg-gray-800 text-gray-100">

            <div className='flex justify-evenly items-center p-1 mt-3'>
                <Typography className='capitalize' variant='h3'> servicios</Typography>

                <FormServicio />
            </div>

            <div className='h-full w-full overflow-y-auto flex justify-center mt-2'>
                <table className="w-full h-[60%] md:w-[60%] min-w-max table-auto text-left capitalize">
                    <thead className="sticky top-0 bg-gray-800 z-10">
                        <tr>
                            {
                                tableHead.map((head) => (
                                    <th key={head} className="border-b border-gray-700 bg-gray-800 p-[8px] ">
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
                            servicios?.map(({servicio,valor,adicional }, i) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-gray-900" : ''}>

                                    <td className="p-[8px]">
                                        <Typography variant="paragraph" color="white" className="font-normal">
                                            {i + 1}
                                        </Typography>
                                    </td>

                                    <td className="p-[8px]">
                                        <Typography variant="paragraph" color="white" className="font-normal">
                                            {servicio}
                                        </Typography>
                                    </td>


                                    <td className="p-[8px]">
                                        <div className='flex justify-center'>
                                            <Switch 
                                                color='blue'
                                                checked={adicional}
                                                disabled
                                            />
                                        </div>
                                    </td>

                                    <td className="p-[8px]">
                                        <Typography variant="paragraph" color="white" className="font-normal">
                                            $ {numeral(valor).format() }
                                        </Typography>
                                    </td>

                                    <td className="p-[8px]">
                                        <div className='flex gap-1'>
                                            <FaRegEdit size={20} color='orange' />
                                            <FaRegTrashAlt size={20} color='red' />
                                        </div>
                                    </td>


                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}
