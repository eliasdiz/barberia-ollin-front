import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlLocal } from "../../urlHost";

const getProductos = createAsyncThunk(
    'getProductos',
    async() => {
        const token = localStorage.getItem('token')
        const headers = { headers: { Authorization: `Bearer ${token}`}}
        try {
            if(token){
                let res = await axios.get(`${urlLocal}productos`,headers)
                return { productos: res.data.productos}
            }else{
                return { productos: []}    
            }
        } catch (error) {
            return { productos: []}
        }
    }
)

const actions = { getProductos }

export default actions