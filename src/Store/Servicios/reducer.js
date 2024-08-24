import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { getServicios } = actions

const initialState = {
    servicios: []
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
)

export default reducer