import React, { useEffect } from 'react'
import CrearCuenta from '../CrearCuenta/CrearCuenta'
import actionsServicios from '../../Store/Servicios/actions'
import { useDispatch } from 'react-redux'


const { getServicios} = actionsServicios


export default function Tienda() {

    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(getServicios())
        },
        []
    )
    return (
        <div className='border flex justify-center mt-2'>
            <CrearCuenta />
        </div>
    )
}
