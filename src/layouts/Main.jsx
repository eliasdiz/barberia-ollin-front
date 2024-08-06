import React from 'react'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/NavbarAdmin/NavbarAdmin';
import AlertaServidor from '../components/AlertaServidor/AlertaServidor';


export default function Main() {

  
  return (
    <>
      <NavbarAdmin />
      {/* <AlertaServidor /> */}
      <Outlet />
      <Footer />
    </>
  )
}
