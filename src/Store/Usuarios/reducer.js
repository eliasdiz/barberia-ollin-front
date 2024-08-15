import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { getTodos,getUsuario } = actions

const initialState = {
    usuarios: [],
    usuario: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            getUsuario.fulfilled,
            (state,action) => {
                let newState = {
                    ...state,
                    usuario: action.payload.usuario
                }
                return newState
            }
        )
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