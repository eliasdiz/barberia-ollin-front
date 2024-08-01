import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import { red } from "@mui/material/colors";

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