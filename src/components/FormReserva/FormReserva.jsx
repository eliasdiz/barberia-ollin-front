import { Carousel, CheckBox, Label } from 'keep-react';
import React, { useEffect, useState } from 'react'
import { GiBeard } from "react-icons/gi";
import { ImScissors } from "react-icons/im";
import { IoCalendarNumber } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import actionsUsuarios from '../../Store/Usuarios/actions.js'
import { CheckFat } from "@phosphor-icons/react";
import { Typography } from '@material-tailwind/react';
import actionsServicios from '../../Store/Servicios/actions.js'
import CalendarioUsuario from '../CalendarioUsuario/CalendarioUsuario.jsx';




const { getServicios } = actionsServicios
const { getTodos } = actionsUsuarios


export default function FormReserva() {

	const [ step, setStep ] = useState(0)
	const dispatch = useDispatch()

	// STEP 0 BARBEROS
	const barberos = useSelector(store => store.getUsuarios.usuarios)
	const [ barbero, setBarbero ] = useState('')

	const handleBarbero = (id) => {
		setBarbero(id)
		setStep(step + 1)		
	}

	const handleStepBarbero = () => {
		setBarbero('')
		setStep(0)
	}


	//STEP 1 SERVICIOS
	const servicios = useSelector(store => store.servicios.servicios)
	const [ servicio, setServicio ] = useState(null)
	
	const handleServicio = (id) => {
		// setServicio((prev) => (prev === id ? null : id));
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
		


	useEffect(
		() => {
			dispatch(getTodos({parametro:'barberos', nombres: ''}))
			dispatch(getServicios())
		},
		[dispatch]
	)


	return (
		<div className='w-full flex justify-center  '>

			<div className='flex w-full md:w-[60%] p-1 gap-1 mt-2'>

				<div className='w-[3rem] h-[47vh] xsm:h-[90vh] md:h-[71vh] flex flex-col justify-between items-center p-3 border border-blue-gray-500 rounded-md'>
					<button 
						onClick={handleStepBarbero}
					>
						{ barbero !== '' ? <CheckFat size={24} weight="fill" color='green' /> : <GiBeard className='w-9 h-9' /> }
						
					</button>

					<button
						onClick={handleStepServicio}
						disabled={barbero === '' ? true : false}
					>
						{ servicio !== null ? <CheckFat size={24} weight="fill" color='green' /> : <ImScissors className='w-8 h-8' /> } 
					</button>

					<button
						onClick={() => setStep(2)}
						disabled={servicio === null ? true : false}
					>
						<IoCalendarNumber className='w-9 h-9' />
					</button>

					<button
						onClick={() => setStep(3)}
						disabled={fecha === '' ? true : false}
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
						<CalendarioUsuario />
					</div>
				)}
				


			</div>
		</div>
	)
}
	

	
