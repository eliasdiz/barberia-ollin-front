import { configureStore } from "@reduxjs/toolkit";
import idCapture from './IdCapture/reducer'


export const store = configureStore({
    reducer:{
        idCapture: idCapture
    }
})