import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import routers from './router/router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <RouterProvider router={routers} />
    </ThemeProvider>
  </React.StrictMode>
)
