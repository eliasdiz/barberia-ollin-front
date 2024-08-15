import { createAction } from "@reduxjs/toolkit";

const idCapture = createAction(
    'idCapture',
    (id) => {
        return { payload: id}
    }
)

const actions = { idCapture }

export default actions