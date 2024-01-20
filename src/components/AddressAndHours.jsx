import { Typography } from '@material-tailwind/react';
import { Button } from 'keep-react';
import React from 'react'
import { FaClock } from "react-icons/fa";


function AddressAndHours() {

  const horaActual = new Date().getHours()
  const abierto = 8.5
  const cerrado = 20
  console.log(horaActual)

  return (
    <div id='divHorarios' className='flex justify-center text-white mt-10 md:hidden' >
      <div className="text-center">
        <h2 className="font-bold text-2xl pb-2">Dirección</h2>
        <p className="pb-2">Cra. 16a #41-04, Montería, Córdoba</p>
        <iframe
          className="rounded-lg xxsm:w-80"
          title="Ubicación de Barberia Ollin"
          width="500"
          height="400"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3943.3430502813408!2d-75.8690719!3d8.7537574!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a2f3b2645fae7%3A0xa18047bd9380ea9b!2sBarberia%20Ollin!5e0!3m2!1sen!2sco!4v1700339914566!5m2!1sen!2sco"
        ></iframe>
        <div
          className="flex-col justify-center items-center mt-10"
        >
          <div className='w-full flex justify-center items-center gap-2'>

            
            {
              horaActual > abierto && horaActual < cerrado ? 
              <>
                <FaClock color='green' />
                <Typography variant='h6' className='capitalize'>abierto</Typography>
              </>
              :
              <>
                <FaClock color='red' />
                <Typography variant='h6' className='capitalize'>cerrado</Typography>
              </>
            }
          </div>
          <Typography variant='h6' className='capitalize'>horario de atencion</Typography>
          <Typography variant='h6' className='capitalize'>lunes a sabado</Typography>
          <Typography variant='h6' className='capitalize'>8:30 am a 8:00 pm</Typography>
        </div>
      </div>
    </div>
  )
}

export default AddressAndHours