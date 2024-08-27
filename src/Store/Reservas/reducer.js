import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { getCliente } = actions

const initialState = {
    cliente: []
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
)

export default reducer