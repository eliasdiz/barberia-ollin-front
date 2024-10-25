import React, { useEffect, useState } from 'react'
import CrearCuenta from '../CrearCuenta/CrearCuenta'
import actionsServicios from '../../Store/Servicios/actions'
import { useDispatch, useSelector } from 'react-redux'
import CarritoCliente from '../CarritoCliente/CarritoCliente'
import actionsCarrito from '../../Store/Carrito/actions'


const { getCarritos} = actionsCarrito
const { getServicios} = actionsServicios


export default function Tienda() {

    const dispatch = useDispatch()

    const carritos = useSelector(store => store.carrito.carritos)

    useEffect(
        () => {
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


