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
import Root from './components/Root/Root.jsx';
import MainContainer from './components/HomeLayout/MainContainer';
import MainContainer2 from './components/HomeLayoutAdmin/MainContainer2.jsx';
import ViewTask from './components/HomeLayout/ViewTask.jsx';
import RootAdmin from './components/Root/RootAdmin.jsx';
import CreateTask from './components/HomeLayoutAdmin/CreateTask.jsx';
import AllTask from './components/HomeLayoutAdmin/AllTask.jsx';
import View from './components/HomeLayoutAdmin/View.jsx';
import { el } from '../node_modules/date-fns/locale/el';
import Edit from './components/HomeLayoutAdmin/Edit.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App></App>,
    children:[
      {path:'/register',element:<RegisterPage></RegisterPage>},
      {path:'/login',element:<LoginPage></LoginPage>},
      {path:'/forget-password', element:<ForgetPassword></ForgetPassword>},
      {path:'/otp', element:<OtpSend></OtpSend>},

    ]
  },
// home page layout for personal
{
  path:'/home/user', element:<Root></Root>,
  children:[
  {path:'',element: <MainContainer></MainContainer>},
  {path:'task-view', element:<ViewTask></ViewTask>},
  ]
},

// home page layout for crating task
{
  path:'/home/admin', element:<RootAdmin></RootAdmin>,
  children:[
  {path:'',element: <MainContainer2></MainContainer2>},
  {path:'create-task', element: <CreateTask></CreateTask>},
  {path:'all-task', element: <AllTask></AllTask>},
  {path:'view' , element:<View></View>},
  {path:'edit', element: <Edit>
    
  </Edit>}
  ]
},



]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </StrictMode>,
)
