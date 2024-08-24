import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarBarbero from '../components/NavbarBarbero/NavbarBarbero'
import AlertaServidor from '../components/AlertaServidor/AlertaServidor'


export default function BarberoLayout() {
    return (
        <>
            <NavbarBarbero />
            <AlertaServidor />
            <Outlet />
        </>
    )
}
