import React, { useEffect, useState } from 'react'
import CrearCuenta from '../CrearCuenta/CrearCuenta'
import actionsServicios from '../../Store/Servicios/actions'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { urlLocal } from '../../urlHost'
import CarritoCliente from '../CarritoCliente/CarritoCliente'


const { getServicios} = actionsServicios


export default function Tienda() {

    const dispatch = useDispatch()

    const [ carritos, setCarritos ] = useState([])

    // console.log(carritos)

    useEffect(
        () => {
            const token = localStorage.getItem('token')
            const headers = { headers: { Authorization: `Bearer ${token}`}}
            dispatch(getServicios())
            axios.get(`${urlLocal}carrito`,headers)
                .then( res => setCarritos(res.data.carritos))
                .catch( error => console.log(error))
        },
        []
    )
    return (
        <div className='flex justify-center'>
            <div className='w-[80%] flex flex-wrap justify-evenly gap-3 p-5 '>   
                <div>
                    <CrearCuenta />
                </div>
                {
                    carritos.length !== 0 ?
                        <>
                            {
                                carritos.map((item,i) => (
                                    <CarritoCliente key={i} carrito={item} />
                                ))
                            }
                        </>
                        :
                        <></>
                }
            </div>
        </div>
    )
}


