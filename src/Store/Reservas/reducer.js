import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { getCliente, getReservasCLiente, getReservasBarbero, getServAdicional } = actions

const initialState = {
    cliente: [],
    reservasClientes: [],
    reservasBarbero: [],
    adicional: false
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
        .addCase(
            getReservasBarbero.fulfilled,
            (state,action) => {
                let newState = {
                    ...state,
                    reservasBarbero: action.payload.reservasBarbero
                }
                return newState
            }
        )
        .addCase(
            getServAdicional,
            (state,action) => {
                let newState = {
                    ...state,
                    adicional: action.payload.adicional
                }
                return newState
            }
        )
)

export default reducer