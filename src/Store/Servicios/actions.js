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

const actions = { getServicios}

export default actions