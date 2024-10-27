import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlLocal } from "../../urlHost";

const getCarritos = createAsyncThunk(
    'getCarritos',
    async() => {
        const token = localStorage.getItem('token')
        const headers = { headers: { Authorization: `Bearer ${token}`}}
        try {
            if(token){
                let res = await axios.get(`${urlLocal}carrito`,headers)
                return { carritos: res.data.carritos}
            }else{
                return { carritos: []}
            }
        } catch (error) {
            return { carritos: []}
        }
    }
)

const actCarrito = createAction(
    'actCarrito',
    ({carrito,producto}) => {
        const carritoActualizado = {
            ...carrito,
            productos: [...carrito.productos, producto]
        }
        return { payload: carritoActualizado}
    }

)


const actions = { getCarritos, actCarrito}

export	default actions