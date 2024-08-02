import { configureStore } from "@reduxjs/toolkit";
import idCapture from './IdCapture/reducer'
import getUsuariosAll from './Usuarios/reducer'


export const store = configureStore({
    reducer:{
        idCapture: idCapture,
        getUsuariosAll: getUsuariosAll
    }
})