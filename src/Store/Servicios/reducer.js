import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { getServicios, getServicio } = actions

const initialState = {
    servicios: [],
    servicio: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            getServicios.fulfilled,
            (state,action) => {
                let newState = {
                    ...state,
                    servicios: action.payload.servicios
                }
                return newState
            }
        )
        .addCase(
            getServicio.fulfilled,
            (state,action) => {
                let newState = {
                    ...state,
                    servicio: action.payload.servicio
                }
                return newState
            }
        )
)

export default reducer