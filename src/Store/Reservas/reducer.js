import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { getCliente, getReservasCLiente } = actions

const initialState = {
    cliente: [],
    reservasClientes: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            getCliente,
            (state,action) => {
                let newState = {
                    ...state,
                    cliente: action.payload.cliente
                }
                return newState
            }
        )
        .addCase(
            getReservasCLiente.fulfilled,
            (state,action) => {
                let newState = {
                    ...state,
                    reservasClientes: action.payload.reservasCliente
                }
                return newState
            }
        )
)

export default reducer