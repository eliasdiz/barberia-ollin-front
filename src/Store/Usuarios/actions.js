import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlLocal } from "../../urlHost.js";


const getUsuario = createAsyncThunk(
    'getUsuario',
    async() => {
        const token = localStorage.getItem('token')
        const headers = { headers: { Authorization: `Bearer ${token}`}}
        try {
            if(token){
                let res = await axios.get(`${urlLocal}usuarios/usuario`,headers)
                console.log(res.data.usuario)
                return { usuario: res.data.usuario}
            }else{
                return { usuario: []}
            }
        } catch (error) {
            return { usuario: []}
        }
    }

)

const getTodos = createAsyncThunk(
    'getTodos',
    async(params) => {
        try {
            const {parametro,nombres} = params
            let res = await axios.get(`${urlLocal}usuarios/?parametro=${parametro}&nombres=${nombres}`)
            return {usuarios: res.data.usuarios }
        } catch (error) {
            return { usuarios: []}            
        }
    }

)

const actions = { getTodos, getUsuario }

export default actions