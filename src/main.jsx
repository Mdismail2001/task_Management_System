import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import LoginPage from './pages/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App></App>,
    children:[
      {path:'/login',element:<LoginPage></LoginPage>}
    ]

  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </StrictMode>,
)
