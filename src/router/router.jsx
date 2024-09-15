import { createBrowserRouter } from "react-router-dom";
import Layout from '../layouts/Main.jsx';
import Home from '../Pages/Home.jsx'
import Admin from "../Pages/Admin.jsx";
import AdminLayout from '../layouts/AdminLayout.jsx'
import InicioSesion from '../components/InicioSesion/InicioSesion.jsx'
import Pruebas from "../components/Pruebas/Pruebas.jsx";
import PanelUsuarios from '../components/PanelUsuarios/PanelUsuarios.jsx'
import BarberoLayout from "../layouts/BarberoLayout.jsx";
import Barbero from "../Pages/Barbero.jsx";
import FormRegistro from "../components/FormRegistro/FormRegistro.jsx";
import EditarUsuario from "../components/EditarUsuario/EditarUsuario.jsx";
import ValidacionEmail from "../components/ValidacionEmail/ValidacionEmail.jsx";
import FormReserva from "../components/FormReserva/FormReserva.jsx";
import Reservas from "../components/Reservas/Reservas.jsx";
import ReservasBarbero from "../components/ReservasBarbero/ReservasBarbero.jsx";
import FormReservaBarbero from "../components/FormReservaBarbero/FormReservaBarbero.jsx";

const router = createBrowserRouter([
    {
        path: '/', element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/crear-reservas', element: <FormReserva /> },
            { path: '/inicio-sesion', element: <InicioSesion />},
            { path: '/prueba', element: <Pruebas />},
            { path: '/registro', element: <FormRegistro />},
            { path: '/validacion-email', element: <ValidacionEmail />},
            { path: '/reservas', element: <Reservas />}
        ],
    },
    {
        path: '/admin', element: <AdminLayout />,
        children: [
            { path: '/admin', element: <Admin />},
            { path: '/admin/usuarios', element: <PanelUsuarios />},
            { path: '/admin/editar-usuario', element: <EditarUsuario />}
        ]
    },
    {
        path: '/barbero', element: <BarberoLayout />,
        children: [
            { path: '/barbero', element: <Barbero />},
            { path: '/barbero/reservas', element: <ReservasBarbero />},
            { path: '/barbero/crear-reserva', element: <FormReservaBarbero />}
        ]
    }
]);

export default router;
