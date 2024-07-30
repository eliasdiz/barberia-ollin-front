import { createBrowserRouter } from "react-router-dom";
import Layout from '../layouts/Main.jsx'
import Home from "../App.jsx";
import Reservas from "../Pages/Reservas.jsx";
import Admin from "../Pages/Admin.jsx";

const routers = createBrowserRouter([
    {
        path:'/', element: <Layout />,
        children:[
            {path: '/', element: <Home />},
            {path: '/reservas', element: <Reservas/>},
        ]
    },

    {
        path:'/admin', element: <Admin />
    }

])

export default routers