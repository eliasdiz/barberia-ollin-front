import { createBrowserRouter } from "react-router-dom";
import Layout from '../layouts/Main.jsx'
import Home from "../App.jsx";

const routers = createBrowserRouter([
    {
        path:'/', element: <Layout />,
        children:[
            {path: '/', element: <Home />},
        ]
    }
])

export default routers