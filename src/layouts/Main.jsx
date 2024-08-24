import React from 'react'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom';
import AlertaServidor from '../components/AlertaServidor/AlertaServidor';
import NavBarUsuarios from '../components/NavBarUsuarios/NavBarUsuarios';


export default function Main() {

  
  return (
    <>
      <NavBarUsuarios />
      <AlertaServidor />
      <Outlet />
      <Footer />
    </>
  )
}
