import React, { useEffect, useState } from 'react'
import CrearCuenta from '../CrearCuenta/CrearCuenta'
import actionsServicios from '../../Store/Servicios/actions'
<<<<<<< HEAD
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { urlLocal } from '../../urlHost'
import CarritoCliente from '../CarritoCliente/CarritoCliente'
=======
import { useDispatch, useSelector } from 'react-redux'
import CarritoCliente from '../CarritoCliente/CarritoCliente'
import actionsCarrito from '../../Store/Carrito/actions'
>>>>>>> 610d6f6c1f481458e9a14dd8beb6959b1002783d


const { getCarritos} = actionsCarrito
const { getServicios} = actionsServicios


export default function Tienda() {

    const dispatch = useDispatch()

    const carritos = useSelector(store => store.carrito.carritos)

    useEffect(
        () => {
            const token = localStorage.getItem('token')
            const headers = { headers: { Authorization: `Bearer ${token}`}}
            dispatch(getServicios())
            dispatch(getCarritos())
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


