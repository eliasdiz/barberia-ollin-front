import React from 'react'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/NavbarAdmin/NavbarAdmin';


export default function Main() {

  
  return (
    <>
      <NavbarAdmin />
      <Outlet />
      <Footer />
    </>
  )
}
