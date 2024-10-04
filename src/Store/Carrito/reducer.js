import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { getCarritos} = actions

const initialState = {
    carritos: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            getCarritos.fulfilled,
            (state,action) => {
                let newState = {
                    ...state,
                    carritos: action.payload.carritos
                }
                return newState
            }
        )

)

export default reducer