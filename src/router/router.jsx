import { createBrowserRouter } from "react-router-dom";
import Layout from '../layouts/Main.jsx'
import Home from "../App.jsx";
import Reservas from "../Pages/Reservas.jsx";

const routers = createBrowserRouter([
    {
        path:'/', element: <Layout />,
        children:[
            {path: '/', element: <Home />},
            {path: '/reservas', element: <Reservas/>},
        ]
    }
])

export default routers