import { configureStore } from "@reduxjs/toolkit";
import captureId from './Idcapture/reducer.js'
import getUsuarios from './Usuarios/reducer.js'
import servicios from './Servicios/reducer.js'
import reservas from './Reservas/reducer.js'
import ingresos from './Ingresos/reducer.js'
import carrito from './Carrito/reducer.js'
import productos from './Productos/reducer.js'


export const store = configureStore({
    reducer:{
        captureId: captureId,
        getUsuarios: getUsuarios,
        servicios: servicios,
        reservas: reservas,
        ingresos: ingresos,
        carrito: carrito,
        productos: productos
    }
})