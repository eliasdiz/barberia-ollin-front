import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { urlLocal } from "../../src/urlHost";


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

const actions = { getTodos }

export default actions