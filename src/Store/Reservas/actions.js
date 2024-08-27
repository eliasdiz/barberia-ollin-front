import { createAction } from "@reduxjs/toolkit";



const getCliente = createAction(
    'getCliente',
    (cliente) => {
        return { payload: cliente}
    }

)

const actions = { getCliente}

export default actions