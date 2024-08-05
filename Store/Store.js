import { configureStore } from "@reduxjs/toolkit";
import idCapture from './IdCapture/reducer'
import getUsuarios from './Usuarios/reducer'


export const store = configureStore({
    reducer:{
        idCapture: idCapture,
        getUsuarios: getUsuarios
    }
})