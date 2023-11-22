import React from 'react'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom';



export default function Main() {
  return (
    <>
    <div>
        <Outlet />
    </div>
    <Footer />
    </>
  )
}
