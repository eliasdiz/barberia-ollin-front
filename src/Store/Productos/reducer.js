import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { getProductos} = actions

const initialState = {
    productos: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder    
        .addCase(
            getProductos.fulfilled,
            (state,action) => {
                let newState = {
                    ...state,
                    productos: action.payload.productos
                }
                return newState
            }
        )
)

export default reducer