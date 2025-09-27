import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import OtpSend from './pages/OtpSend.jsx';
import CreateTask from './pages/CreateTask.jsx';
import Root from './components/HomeLayout/Root.jsx';
import MainContainer from './components/HomeLayout/MainContainer.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App></App>,
    children:[
      {path:'/register',element:<RegisterPage></RegisterPage>},
      {path:'/login',element:<LoginPage></LoginPage>},
      {path:'/forget-password', element:<ForgetPassword></ForgetPassword>},
      {path:'/otp', element:<OtpSend></OtpSend>},
      {path:'/create-task', element:<CreateTask></CreateTask>},
    ]
  },
// home page layout for personal
{
  path:'/home/personal', element:<Root></Root>,
  children:[
  {path:'',element: <MainContainer></MainContainer>},
  ]
},

// home page layout for crating task
{
  path:'/home/create-task', element:<Root></Root>,
  children:[
  {path:'',element: <h1>for admin</h1>},
  ]
},



]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </StrictMode>,
)
