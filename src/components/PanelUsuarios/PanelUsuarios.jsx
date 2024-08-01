import { Card, CardHeader, Typography, Tabs, TabsHeader, Tab, Input,} from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import CardUsuario from '../CardUsuario/CardUsuario';




export default function PanelUsuarios() {

    const url = 'http://localhost:8080/'
    const [ usuarios, setUsuarios ] = useState([])
    const [ idUsuario, setIdUsuario ] = useState('')
    const [ valueParametro, setValuePrametro ] = useState('')
    const [ parametro, setParametro ] = useState('')
    const [ nombres, setNombres ] = useState('')

    const categorias = [{label: "barberos",value: "barberos",},{label: "clientes",value: "clientes",}];

    const tableHead = [ '#','nombre ','telefono','acc'] 

    const handleParametro = () => {
        setParametro(valueParametro)
    }

    const handleCheck = async(e) => {
        let check = e.target.checked
        let data = {
            barbero: check
        }
        try {
            await axios.put(`${url}users/usuarios/rol/${idUsuario}`,data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(
        () => {
            axios.get(`${url}users/usuarios/?parametro=${parametro}&nombres=${nombres}`)
                .then( res => setUsuarios(res.data.usuarios))
                .catch( error => console.log(error))
        },
        [parametro,nombres]
    )
    
    return (
        <div className='w-full flex justify-center md:w-[60%] p-1'>
            <Card className="h-full w-full overflow-scroll ">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className='w-full text-center p-2 '>
                        <Typography variant="h5" color="blue-gray" className='uppercase font-semibold'>
                            usuarios
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full md:w-max" >
                            <TabsHeader>
                            {
                                categorias.map((item,i) => (
                                    <Tab 
                                        key={i} 
                                        value={item.value} 
                                        className='capitalize'
                                        onClickCapture={(e) => setValuePrametro(e.target.textContent)}
                                        onClick={handleParametro}
                                    >
                                        {item.label}
                                    </Tab>
                                ))
                            }
                            
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72 p-2 capitalize">
                        {
                            nombres === '' ?
                                <Input
                                    label="buscar"
                                    icon={<FaMagnifyingGlass className="h-5 w-5" />}
                                    onChange={(e) => setNombres(e.target.value)}
                                    value={nombres}
                                />
                                :
                                <Input
                                    label="buscar"
                                    icon={<GiCancel className="h-5 w-5 cursor-pointer" />}
                                    onChange={(e) => setNombres(e.target.value)}
                                    onClick={() => setNombres('')}
                                    value={nombres}
                                />
                        }
                        </div>
                    </div>
                </CardHeader>
                <table className="w-full min-w-max table-auto text-left bg-gray-600">
                    <thead>
                        <tr>
                            {
                                tableHead.map((item,i) => (
                                    <th
                                        key={i}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-3 text-left"
                                    >
                                        <Typography
                                            variant="h6"
                                            color="blue-gray"
                                            className="font-sans leading-none opacity-70 capitalize"
                                        >{item}</Typography>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios?.map((item,i) => (
                                <tr key={i}>
                                    <td className='p-2 border-b border-blue-gray-50'>
                                        <Typography
                                            variant="h6"
                                            color="cyan"
                                            className="font-medium capitalize"
                                        >
                                            {i+1}
                                        </Typography>
                                    </td>

                                    <td className='p-2 border-b border-blue-gray-50'>
                                        <Typography
                                            variant="h6"
                                            color="cyan"
                                            className="font-medium capitalize"
                                        >
                                            {item.nombres} {item.apellidos}
                                        </Typography>
                                    </td>

                                    <td className='p-2 border-b border-blue-gray-50 text-left'>
                                        <Typography
                                            variant="h6"
                                            color="cyan"
                                            className="font-medium capitalize"
                                        >
                                            {item.telefono}
                                        </Typography>
                                    </td>

                                    <td className='p-2 border-b border-blue-gray-50 '>
                                        <div className='flex gap-2'>
                                            <CardUsuario/>
                                            <FaRegTrashAlt className='w-5 h-5 text-red-400' />
                                        </div>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Card>
        </div>
    )
}
