import { Carousel, CheckBox, Label } from 'keep-react';
import React, { useEffect, useState } from 'react'
import { GiBeard } from "react-icons/gi";
import { ImScissors } from "react-icons/im";
import { IoCalendarNumber } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import actionsUsuarios from '../../Store/Usuarios/actions.js'
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
const { getTodos } = actionsUsuarios


export default function FormReserva() {

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const cliente = useSelector(store => store.reservas.cliente)
	const [ step, setStep ] = useState(0)

	// STEP 0 BARBEROS
	const barberos = useSelector(store => store.getUsuarios.usuarios)
	const [ barberoID, setBarberoId ] = useState('')
	const barbero = barberos?.find( item => item._id === barberoID)
	// console.log(barbero)

	const handleBarbero = (id) => {
		setBarberoId(id)
		dispatch(idCapture({id: id}))
		setStep(step + 1)		
	}

	const handleStepBarbero = () => {
		setBarberoId('')
		setStep(0)
	}


	//STEP 1 SERVICIOS
	const servicios = useSelector(store => store.servicios.servicios)
	const [ servicio, setServicio ] = useState('')
	const servicioSelecc = servicios?.find( item => item._id === servicio)
	// console.log(servicioSelecc)


	const handleServicio = (id) => {
		setServicio(id)
		setTimeout(() => {
			setStep(step + 1)
		}, 1200);
	}

	const handleStepServicio = () => {
		setServicio(null)
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
	
	const verificarCliente = (cliente) => {
		cliente.length === 0 ? navigate('/validacion-email') : null
	}
	// console.log(cliente)

	const handleReservar = () => {
		let data = {
			cliente_id: cliente?._id,
			barbero_id: barberoID,
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
						navigate('/reservas')
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
			verificarCliente(cliente)
			goToInfo(fecha)
			dispatch(getTodos({parametro:'barberos', nombres: ''}))
			dispatch(getServicios())
		},
		[dispatch,fecha,cliente]
	)


	return (
		<div className='w-full flex justify-center  '>

			<div className='flex w-full md:w-[60%] p-1 gap-1 mt-2'>

				<div className='w-[3rem] h-[47vh] xsm:h-[90vh] md:h-[71vh] flex flex-col justify-between items-center p-3 border border-blue-gray-500 rounded-md'>
					<button 
						onClick={handleStepBarbero}
					>
						{ barbero ? <CheckFat size={24} weight="fill" color='green' /> : <GiBeard className='w-9 h-9' /> }
						
					</button>

					<button
						onClick={handleStepServicio}
						disabled={!barbero ? true : false}
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

					
				{ step === 0 &&(
					<div className='w-full flex items-center'>
						<Carousel loop className='w-full h-full p-2'>
							{
								barberos?.map((item,i) => (
									<div 
										key={i} 
										id={item._id} 
										className='flex flex-col gap-6 justify-center items-center p-3 '
										onClick={() => handleBarbero(item._id)}
									>
										<img 
											src="https://docs.material-tailwind.com/img/face-2.jpg" 
											alt="avatar" 
											className='rounded-full object-center h-[89%]'
										/>
										<Typography variant='lead' className='text-white capitalize'>{item.nombres}</Typography>
									</div>
								))

							}
						</Carousel>
					</div>
				)}

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
					<div className='w-full h-[47vh] xsm:h-[90vh] md:h-[71vh]'>
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
								<Typography>{barbero?.nombres}</Typography>
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
	

	
