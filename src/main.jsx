import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; // ✅ fixed imports

import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import OtpSend from "./pages/OtpSend.jsx";
import Root from "./components/Root/Root.jsx";
import MainContainer from "./components/HomeLayout/MainContainer.jsx";
import MainContainer2 from "./components/HomeLayoutAdmin/MainContainer2.jsx";
import ViewTask from "./components/HomeLayout/ViewTask.jsx";
import RootAdmin from "./components/Root/RootAdmin.jsx";
import CreateTask from "./components/HomeLayoutAdmin/CreateTask.jsx";
import AllTask from "./components/HomeLayoutAdmin/AllTask.jsx";
import View from "./components/HomeLayoutAdmin/View.jsx";
import Edit from "./components/HomeLayoutAdmin/Edit.jsx";
import Settings from "./components/ShareComponent/Settings.jsx";
import ProfileEdit from "./components/ShareComponent/ProfileEdit.jsx";
import { AuthProvider } from "./components/Provider/AuthProvider.jsx";
import TaskList from "./components/HomeLayout/TaskList.jsx";
import CoverPage from "./pages/CoverPage.jsx";

const router = createBrowserRouter([
  // Cover page as root
  { path: "", element: <CoverPage /> }, // ✅ fixed JSX usage

  // Authentication pages
  {
    path: "/auth",
    element: <App />,
    children: [
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "otp", element: <OtpSend /> },
    ],
  },

  // Home page layout for personal
  {
    path: "/home/user",
    element: <Root />,
    children: [
      { path: "", element: <MainContainer /> },
      { path: "task", element: <TaskList /> },
      { path: "task-view", element: <ViewTask /> },
      { path: "settings", element: <Settings /> },
      { path: "profile-edit", element: <ProfileEdit /> },
    ],
  },

  // Home page layout for admin
  {
    path: "/home/admin",
    element: <RootAdmin />,
    children: [
      { path: "", element: <MainContainer2 /> },
      { path: "create-task", element: <CreateTask /> },
      { path: "all-task", element: <AllTask /> },
      { path: "view", element: <View /> },
      { path: "edit", element: <Edit /> },
      { path: "settings", element: <Settings /> },
      { path: "profile-edit", element: <ProfileEdit /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
