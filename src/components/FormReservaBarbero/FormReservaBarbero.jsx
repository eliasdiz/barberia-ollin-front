import { CheckBox, Label } from 'keep-react';
import React, { useEffect, useState } from 'react'
import { ImScissors } from "react-icons/im";
import { IoCalendarNumber } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { CalendarCheck, CheckFat, Money, Scissors, User, Watch } from "@phosphor-icons/react";
import { Button, Typography } from '@material-tailwind/react';
import actionsServicios from '../../Store/Servicios/actions.js'
import CalendarioUsuario from '../CalendarioUsuario/CalendarioUsuario.jsx';
import numeral from 'numeral';
import { format } from '@formkit/tempo';
import axios from 'axios';
import { urlLocal } from '../../urlHost.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import actionsCapturaId from '../../Store/Idcapture/actions.js'


const { idCapture } = actionsCapturaId
const { getServicios } = actionsServicios


export default function FormReservaBarbero() {

    const dispatch = useDispatch()
	const navigate = useNavigate()

	
	const [ step, setStep ] = useState(1)
    
	// STEP 0 BARBEROS
	const barberoCliente = useSelector(store => store.getUsuarios.usuario)


	//STEP 1 SERVICIOS
	const servicios = useSelector(store => store.servicios.servicios)
	const [ servicio, setServicio ] = useState('')
	const servicioSelecc = servicios?.find( item => item._id === servicio)

	const handleServicio = (id) => {
		setServicio(id)
        dispatch(idCapture({id: barberoCliente._id}))
		setTimeout(() => {
			setStep(step + 1)
		}, 1200);
	}

	const handleStepServicio = () => {
		setServicio('')
		setStep(1)
	}


	// STEP 2 FECHA
    const [ fecha, setFecha ] = useState(null)
	
	
	const goToInfo = (fecha) => {
		fecha !== null ? setStep( step + 1): null
	}
	const handleFecha = () => {
		setFecha(null)
		setStep(2)
	}

	// STEP 3 INFO RESERVA
	const fechaObjeto = new Date(fecha)
	

	const handleReservar = () => {
		let data = {
			cliente_id: barberoCliente?._id,
			barbero_id: barberoCliente?._id,
			servicio_id: servicio,
			fecha: fechaObjeto,
		}
		// console.log(data)
		let promesa = axios.post(`${urlLocal}reservas/crear`,data)
		toast.promise(
			promesa,
			{
				loading: 'creando reserva',
				success: (res) => {
					setTimeout(() => {
						navigate('/barbero/reservas')
					}, 1500);
					return <>{res.data.message}</>
				},
				error: (error) => {
					return <>{error.response.data.message}</>
				}
			},
			{
				success: {duration: 1200},
                style: { background: '#94a3b8', textTransform: 'capitalize', color: 'black', textAlign: 'center'},
			}
		)
	}

	useEffect(
		() => {
			goToInfo(fecha)
			dispatch(getServicios())
		},
		[dispatch,fecha]
	)


    return (
        <div className='w-full flex justify-center  '>

			<div className='flex w-full md:w-[60%] p-1 gap-1 mt-2'>

				<div className='w-[3rem] h-[60vh] xsm:h-[90vh] md:h-[71vh] flex flex-col justify-between items-center p-3 border border-blue-gray-500 rounded-md'>

					<button
						onClick={handleStepServicio}
					>
						{ servicioSelecc ? <CheckFat size={24} weight="fill" color='green' /> : <ImScissors className='w-8 h-8' /> } 
					</button>

					<button
						onClick={handleFecha}
						disabled={servicio === '' ? true : false}
					>
						{ fecha ? <CheckFat size={24} weight="fill" color='green' /> : <IoCalendarNumber className='w-9 h-9' />}
					</button>

					<button
						onClick={() => setStep(3)}
						disabled={fecha === null ? true : false}
					>
						<IoInformationCircle className='w-9 h-9' />
					</button>
				</div>


				{ step === 1 &&(
					<div className="w-full flex flex-wrap items-center justify-center p-2  gap-3 xxsm:flex-col xxsm:justify-around xxsm:items-center">
						{servicios?.map((item, i) => (
							<div
                                className="xxsm:w-[60%] w-[40%] flex justify-between items-center border border-blue-gray-300 rounded-md p-2"
                                key={i}
                                onClick={() => handleServicio(item._id)}
							>
                                <Label htmlFor={`checkbox-${item._id}`}>
                                    <Typography className="font-semibold text-blue-gray-300 uppercase">
                                    {item.servicio}
                                    </Typography>
                                </Label>
                                <CheckBox
                                    id={`checkbox-${item._id}`}
                                    checked={servicio === item._id}
                                    onChange={() => handleServicio(item._id)}
                                />
							</div>
						))}
					</div>	
				)}

				{ step === 2 &&(
					<div className='w-full  h-[60vh] xsm:h-[90vh] md:h-[71vh] overflow-x-hidden'>
						<CalendarioUsuario fehca={fecha} setFecha={setFecha} />
					</div>
				)}
				
				{ step === 3 &&(
					<div className='w-full flex flex-col justify-around items-center p-2'>
						<Typography 
							variant='lead'
							className='text-white capitalize'
						>
							detalles de la reserva
						</Typography>

						<div className='w-full h-full flex justify-around'>

							<div className='h-full w-[20%] flex flex-col items-center justify-evenly'>
								<User size={32} weight="regular" color='white' />
								<Scissors size={32} weight="regular" color='white' />
								<CalendarCheck size={32} weight="regular" color='white' />
								<Watch size={32} weight="regular" color='white' />
								<Money size={32} weight="regular" color='white' />
							</div>

							<div className='h-full w-[60%] flex flex-col justify-evenly text-white capitalize'>
								<Typography>{barberoCliente?.nombres}</Typography>
								<Typography>{servicioSelecc?.servicio}</Typography>
								<Typography>{format(fechaObjeto,'dddd D MMMM ')}</Typography>
								<Typography>{format(fechaObjeto,'HH:mm')} / {format(fechaObjeto,'h:mm a')}</Typography>
								<Typography>$ {numeral(servicioSelecc?.valor).format()}</Typography>
							</div>
						</div>

						<Button
							size='sm'
							variant='text'
							className='border text-white'
							onClick={handleReservar}
						>
							confirmar reserva
						</Button>
					</div>
				)}

			</div>
		</div>
    )
}
