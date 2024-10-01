import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlLocal } from "../../urlHost.js";



const getServicios = createAsyncThunk(
    'getServicios',
    async() => {
        try {
            let res = await axios.get(`${urlLocal}servicios`)
            return { servicios: res.data.servicios}
        } catch (error) {
            return { servicios: []}
        }
    }
)

const getServicio = createAsyncThunk(
    'getServicio',
    async(params) =>{
        const token = localStorage.getItem('token')
        const headers = { headers: { Authorization: `Bearer ${token}`}}
        const {id} = params
        try {
            if(token){
                let res = await axios.get(`${urlLocal}servicios/servicio/${id}`,headers)
                return { servicio: res.data.servicio}
            }else{
                return {servicio: []}
            }
        } catch (error) {
            return {servicio: []}
        }
    }

)

const actions = { getServicios, getServicio}

export default actions