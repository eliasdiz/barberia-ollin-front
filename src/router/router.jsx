import { createBrowserRouter } from "react-router-dom";
import Layout from '../layouts/Main.jsx';
import Home from '../Pages/Home.jsx'
import Reservas from "../Pages/Reservas.jsx";
import Admin from "../Pages/Admin.jsx";
import AdminLayout from '../layouts/AdminLayout.jsx'
import InicioSesion from '../components/InicioSesion/InicioSesion.jsx'
import Pruebas from "../components/Pruebas/Pruebas.jsx";
import PanelUsuarios from '../components/PanelUsuarios/PanelUsuarios.jsx'
import BarberoLayout from "../layouts/BarberoLayout.jsx";
import Barbero from "../Pages/Barbero.jsx";
import FormRegistro from "../components/FormRegistro/FormRegistro.jsx";


const router = createBrowserRouter([
    {
        path: '/', element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/reservas', element: <Reservas /> },
            { path: '/inicio-sesion', element: <InicioSesion />},
            { path: '/prueba', element: <Pruebas />},
            { path: '/registro', element: <FormRegistro />}
        ],
    },
    {
        path: '/admin', element: <AdminLayout />,
        children: [
            { path: '/admin', element: <Admin />},
            { path: '/admin/usuarios', element: <PanelUsuarios />},
        ]
    },
    {
        path: '/barbero', element: <BarberoLayout />,
        children: [
            { path: '/barbero', element: <Barbero />}
        ]
    }
]);

export default router;
