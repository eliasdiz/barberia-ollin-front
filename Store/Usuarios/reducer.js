import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { getTodos } = actions

const initialState = {
    usuarios: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            getTodos.fulfilled,
            (state,action) => {
                let newState = {
                    ...state,
                    usuarios: action.payload.usuarios
                }
                return newState
            }
        )
)

export default reducer