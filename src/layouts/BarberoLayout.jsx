import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarBarbero from '../components/NavbarBarbero/NavbarBarbero'

export default function BarberoLayout() {
    return (
        <>
            <NavbarBarbero />
            <Outlet />
        </>
    )
}
