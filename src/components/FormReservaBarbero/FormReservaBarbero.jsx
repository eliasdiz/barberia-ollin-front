import { CheckBox, Label } from 'keep-react';
import React, { useEffect, useState } from 'react'
import { ImScissors } from "react-icons/im";
import { IoCalendarNumber } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { CalendarCheck, CheckFat, Money, Scissors, User, Watch, ArrowRight } from "@phosphor-icons/react";
import { Button, Typography } from '@material-tailwind/react';
import actionsServicios from '../../Store/Servicios/actions.js'
import CalendarioUsuario from '../CalendarioUsuario/CalendarioUsuario.jsx';
import numeral from 'numeral';
import { addMinute, format } from '@formkit/tempo';
import axios from 'axios';
import { urlLocal } from '../../urlHost.js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import actionsCapturaId from '../../Store/Idcapture/actions.js'
import actionsReservas from '../../Store/Reservas/actions.js'


const { getServAdicional} = actionsReservas
const { idCapture } = actionsCapturaId
const { getServicios } = actionsServicios



export default function FormReservaBarbero() {

    const dispatch = useDispatch()
	const navigate = useNavigate()

	
	const [ step, setStep ] = useState(1)
    
	// STEP 0 BARBEROS
	const barbero = useSelector(store => store.getUsuarios.usuario)
	// console.log(barbero)

	const verificarBarbero = (barbero) => {
		if(barbero.length === 0){
			return navigate('/barbero')
		}
	}

	//STEP 1 SERVICIOS
	const servicios = useSelector(store => store.servicios.servicios)
	const [ servicio, setServicio ] = useState([])	
	
	const handleServicio = (id) => {
		let servSelec = servicios?.find(item => item._id === id)
		servicio.some(item => item._id === id) ? 
			setServicio(servicio.filter(item => item._id !== id)) 
		: 
			setServicio([...servicio,servSelec])
	}

	const servAdicional = () => {
		let servAdicional = servicio?.some(({adicional}) => adicional )
		let servNormal = servicio?.some(({adicional}) => !adicional )
		return servicio.length >= 2 && servAdicional && servNormal
	}


	const handleSiguiente = () =>{
		dispatch(idCapture({id: barbero._id}))
		servicio.length === 0 ?
			toast.error('debes serleccionar un servivio',{style: { background: '#94a3b8', textTransform: 'capitalize', color: 'black', textAlign: 'center'}})
		:
			setStep(step + 1)
			dispatch(getServAdicional({adicional: servAdicional()}))
	}

	const handleStepServicio = () => {
		setStep(1)
	}


	// STEP 2 FECHA
    const [ fecha, setFecha ] = useState(null)
	const fechaFinal = servAdicional() ? addMinute(fecha,30) : fecha 
	
	
	const handleFecha = () => {
		setFecha(null)
		setStep(2)
	}
	
	const goToInfo = (fecha) => {
		fecha !== null ? setStep( step + 1): null
	}

	// STEP 3 INFO RESERVA
	const mostrarValor = servicio?.map(({valor}) => valor).reduce((a,b) => a+b,0)
	const mostrarServicios = servicio?.map(({servicio}) => servicio).join(' + ')
	

	const handleReservar = () => {
		let data = {
			cliente_id: barbero?._id,
			barbero_id: barbero?._id,
			servicio: servicio,
			fecha: {
				horaInicio: fecha,
				horaFinal: fechaFinal
			},
			valor: mostrarValor
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
			verificarBarbero(barbero)
		},
		[dispatch,fecha,barbero]
	)


    return (
        <div className='w-full flex justify-center  '>

			<div className='flex w-full md:w-[60%] p-1 gap-1 mt-2'>

				<div className='w-[3rem] h-[60vh] xsm:h-[90vh] md:h-[71vh] flex flex-col justify-between items-center p-3 border border-blue-gray-500 rounded-md'>

					<button
						onClick={handleStepServicio}
					>
						{ servicio.length !== 0 ? <CheckFat size={24} weight="fill" color='green' /> : <ImScissors className='w-8 h-8' /> } 
					</button>

					<button
						onClick={handleFecha}
						disabled={servicio.length === 0 ? true : false}
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
					<div className="w-full max-h-[50vh] md:max-h-[71vh] flex flex-col items-center justify-center gap-3">
						<div className='w-full h-full flex items-center justify-evenly flex-wrap overflow-y-auto gap-3 p-1'>
							{
								servicios?.map((item, i) => (
								<div
								className="xxsm:w-[45%] w-[40%] md:w-[25%] flex justify-between items-center border border-blue-gray-300 rounded-md p-2"
								key={i}
								>
								<Label htmlFor={`checkbox-${item._id}`}>
									<Typography variant='small' className="font-semibold text-blue-gray-300 uppercase">
									{item.servicio}
									</Typography>
								</Label>
								<CheckBox
									id={`checkbox-${item._id}`}
									onChange={() => handleServicio(item._id)}
									checked={servicio.some(serv => serv._id === item._id)}
								/>
								</div>
							))}
						</div>
						
						<Typography 
							className='flex items-center gap-2 uppercase text-white cursor-pointer'
							onClick={handleSiguiente}
						>
							siguiente
						<ArrowRight size={25} weight='bold' color='white'/>
						</Typography>

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
								<Typography>{barbero?.nombres} {barbero?.apellidos}</Typography>
								<Typography>{mostrarServicios}</Typography>
								<Typography>{format(fecha,'dddd D MMMM ')}</Typography>
								<Typography>{format(fecha,'HH:mm')} / {format(fecha,'h:mm a')}</Typography>
								<Typography>$ {numeral(mostrarValor).format()}</Typography>
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
