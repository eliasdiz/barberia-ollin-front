import React from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment/moment.js';
import 'moment/locale/es'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Typography } from '@material-tailwind/react';



export default function CalendarioUsuario() {

    const localizer = momentLocalizer(moment)
	moment.locale('es')

	const domingos = (date) => {
		const day = date.getDay()
		if(day === 0){
			return { style: { backgroundColor: '#FFA07A'}}
		}
		return {}
	}

    const handleSeleccionar = (slotInfo) => {
        console.log(slotInfo.end);
        // console.log('Inicio:', start);
        // console.log('Fin:', end);

        // // Puedes usar estas fechas para determinar la hora seleccionada
        // const selectedHour = start.getHours();
        // console.log('Hora seleccionada:', selectedHour);
    }

	const customToolbar = (toolbar) => {
		const goToBack = () => {
		toolbar.onNavigate('PREV');
		};
	
		const goToNext = () => {
		toolbar.onNavigate('NEXT');
		};
	
		const goToCurrent = () => {
		toolbar.onNavigate('TODAY');
		};
	
		const goToView = (view) => {
		toolbar.onView(view);
		};

		const labelFecha = () => {
			const date = toolbar.date;
			const view = toolbar.view;
		
			if (view === 'month') {
				return moment(date).format('MMMM YYYY'); // Ejemplo: Febrero 2024
			} else if (view === 'day') {
				return moment(date).format('dddd D MMM YYYY'); // Ejemplo: Lunes, 5 Febrero 2024
			}
			return '';
		};
	
		return (
			<div className='xsm:flex md:flex justify-between items-center p-1'>
				<div className='flex justify-center '>
					<Button className='border' color='gray' size='sm' variant='text' onClick={goToBack}
					>
						atras
					</Button>

					<Button className='border' color='gray' size='sm' variant='text' onClick={goToCurrent}
					>
						hoy
					</Button>

					<Button className='border' color='gray'size='sm'variant='text' onClick={goToNext}
					>
						siguiente
					</Button>
				</div>
				
				<div className='flex justify-center p-1'>
					<Typography variant='h6' className='text-gray-700 capitalize'>
					{labelFecha()}
					</Typography>
				</div>
				
				<div className='flex justify-center'>
					<Button className='border' color='gray' size='sm' variant='text' onClick={() => goToView('month')}>
						mes
					</Button>
					<Button className='border' color='gray' size='sm' variant='text' onClick={() => goToView('day')}>
						dia
					</Button>
				</div>
			</div>
		);
	};



    return (
        <div className='w-full xxsm:h-[47vh] xsm:h-[80vh] md:h-[71vh] bg-white p-3 rounded-xl overflow-x-hidden'>
            <Calendar
                className='rounded-xl'
                localizer={localizer}
                events={[]} 
                startAccessor="start"
                endAccessor="end"
                min={new Date(2024, 8, 1, 8, 0, 0)} // Hora mínima visible (8 AM)
                max={new Date(2024, 8, 1, 20, 0, 0)} // Hora máxima visible (8 PM)
                step={60} // Intervalo de tiempo en minutos (30 minutos)
                timeslots={1} // Muestra dos ranuras por cada intervalo de 30 minutos
                defaultView="month" 
                scrollToTime={new Date(2024, 8, 1, 8, 0, 0)} // Desplaza a las 8 AM
                dayPropGetter={domingos}
                components={{ toolbar: customToolbar}}
                onSelectSlot={handleSeleccionar}
                selectable
                onRangeChange={handleSeleccionar}
            />
        </div>
    )
}
