import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

const { idCapture } = actions

const initialState = {
    id: ''
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            idCapture,
            (state,action) => {
                let newState = {
                    ...state,
                    id: action.payload.id
                }
                return newState
            }
        )
)

export default reducer