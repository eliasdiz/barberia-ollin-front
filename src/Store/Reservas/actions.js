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
            let res = await axios.get(`${urlLocal}reservas/clientes/${id}`)
            return  { reservasCliente: res.data.reservas}
        } catch (error) {
            return { reservasCliente: []}
        }
    }
)

const actions = { getCliente, getReservasCLiente}

export default actions