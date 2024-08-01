import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../Store/Store.js'
import  router  from './router/router.jsx'


export default function App() {
    return (
        <Provider store={store}>
        <RouterProvider router={router} />
        </Provider>
    );
}
