import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarAdmin from '../components/NavbarAdmin/NavbarAdmin'
import AlertaServidor from '../components/AlertaServidor/AlertaServidor'


export default function AdminLayout() {
    return (
        <>
            <NavbarAdmin />
            <AlertaServidor />
            <Outlet/>
        </>
    )
}
