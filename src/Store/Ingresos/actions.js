import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlLocal } from "../../urlHost";

const getIngresosBarbero = createAsyncThunk(
    'getIngresosBarbero',
    async(params) => {
        const token = localStorage.getItem('token')
        const headers = { headers: { Authorization: `Bearer ${token}`}}
        const {fechaInicial, fechaFinal } = params
        try {
            if(token){
                let res = await axios.get(`${urlLocal}ingresos/ingresos-barbero/?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`,headers)
                return { ingresosBarbero: res.data.ingresos}
            }else {
                return { ingresosBarbero: []}
            }
        } catch (error) {
            return { ingresosBarbero: []}
        }
    }
)

const actions = { getIngresosBarbero}

export default actions