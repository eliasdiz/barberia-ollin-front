import { createBrowserRouter } from "react-router-dom";
import Layout from '../layouts/Main.jsx';
import Home from '../Pages/Home.jsx'
import Reservas from "../Pages/Reservas.jsx";
import Admin from "../Pages/Admin.jsx";
import AdminLayout from '../layouts/AdminLayout.jsx'
import InicioSesion from '../components/InicioSesion/InicioSesion.jsx'


const router = createBrowserRouter([
    {
        path: '/', element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/reservas', element: <Reservas /> },
            { path: '/inicio-sesion', element: <InicioSesion />}
        ],
    },
    {
        path: '/admin', element: <AdminLayout />,
        children: [
            { path: '/admin/usuarios', element: <Admin />}
        ]
    },
]);

export default router;
