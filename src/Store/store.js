import { configureStore } from "@reduxjs/toolkit";
import captureId from './Idcapture/reducer.js'
import getUsuarios from './Usuarios/reducer.js'


export const store = configureStore({
    reducer:{
        captureId: captureId,
        getUsuarios: getUsuarios
    }
})