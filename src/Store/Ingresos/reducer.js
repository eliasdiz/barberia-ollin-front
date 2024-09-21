import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { getIngresosBarbero} = actions

const initialState = {
    ingresosBarbero: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            getIngresosBarbero.fulfilled,
            (state,action) => {
                let newState = {
                    ...state,
                    ingresosBarbero: action.payload.ingresosBarbero
                }
                return newState
            }
        )

)

export default reducer