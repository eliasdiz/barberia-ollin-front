import { createAction, createAsyncThunk  } from "@reduxjs/toolkit";
import { urlLocal } from "../../urlHost";
import axios from "axios";


const getCliente = createAction(
    'getCliente',
    (cliente) => {
        return { payload: cliente}
    }

)

const getReservasCLiente = createAsyncThunk(
    'getReservasCLiente',
    async(params) => {
        try {
            let { id } = params
            if(id){
                let res = await axios.get(`${urlLocal}reservas/clientes/${id}`)
                return  { reservasCliente: res.data.reservas}
            }else{
                return { reservasCliente: []}
            }
        } catch (error) {
            return { reservasCliente: []}
        }
    }
)

const getReservasBarbero = createAsyncThunk(
    'getReservasBarbero',
    async(params) =>{
        try {
            let { id } = params
            if(id){
                let res = await axios.get(`${urlLocal}reservas/barbero/${id}`)
                return { reservasBarbero: res.data.reservas}
            }else{
                return { reservasBarbero: []}
            }
        } catch (error) {
            return { reservasBarbero: []}
        }
    }
)

const getServAdicional = createAction(
    'getServAdicional',
    (adicional) => {
        return { payload: adicional}
    }
)

const actions = { getCliente, getReservasCLiente, getReservasBarbero, getServAdicional}

export default actions