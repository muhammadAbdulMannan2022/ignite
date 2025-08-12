import { createBrowserRouter } from "react-router";
import App from "../App";
import Landing from "../pages/Landing/Landing";
import Pricing from "../pages/Landing/Pricing/Pricing";
import AuthLayout from "../pages/auth/AuthLayout";
import LoginPage from "../pages/auth/login";
import ConfirmEmail from "../pages/auth/ConfirmEmail";
import VerifyCode from "../pages/auth/VerifyCode";
import ChangePasswordPage from "../pages/auth/ChangePass";
import BackToLogin from "../pages/auth/BackToLogin";
import SignUpPage from "../pages/auth/Signup";
import DashboardLayout from "../pages/Dashboards/DashboardLayout";
import Chat from "../components/Chat";
import UserManagement from "../pages/Dashboards/admin/adminpages/UserManagement";
import FileManagement from "../pages/Dashboards/admin/FileManagement/FileManagement";
import AdminLayout from "../pages/Dashboards/admin/AdminLayout";
import Profile from "../components/lib/Profile";
import EditPrifile from "../components/lib/EditProfile";
import ChangeEmail from "../components/lib/ChangeEmail";
import ChangePasswordAuthUser from "../components/lib/ChangePasswordAuthUser";
import UserLayout from "../pages/Dashboards/user/UserLayout";
import UserPriccing from "../pages/Dashboards/user/UserPages/UserPriccing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Landing />
      },
      {
        path: "/pricing",
        element: <Pricing />
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />
          },
          {
            path: "forgot",
            element: <ConfirmEmail />
          },
          {
            path: "verify",
            element: <VerifyCode />
          },
          {
            path: "changePass",
            element: <ChangePasswordPage />
          },
          {
            path: "backtoLogin",
            element: <BackToLogin />
          },
          {
            path: "signup",
            element: <SignUpPage />
          }
        ]
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <h1 className="text-6xl text-white">user</h1>
          },
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              {
                path: "",
                element: <Chat />
              },
              {
                path: "user-controle",
                element: <UserManagement />
              },
              {
                path: "file-controle",
                element: <FileManagement />
              },
              {
                path: "view/profile",
                element: <Profile />
              },
              {
                path: "edit/profile",
                element: <EditPrifile />
              },
              {
                path: "changeEmail",
                element: <div className="flex w-full h-full items-center justify-center">
                  <ChangeEmail />
                </div>
              },
              {
                path: "changePassword",
                element: <div className="flex w-full h-full items-center justify-center">
                  <ChangePasswordAuthUser />
                </div>
              }
            ]
          },
          {
            path: "user",
            element: <UserLayout />,
            children: [
              {
                path: "",
                element: <Chat />
              },
              {
                path: "changeEmail",
                element: <div className="flex w-full h-full items-center justify-center"><ChangeEmail /></div>
              },
              {
                path: "changePassword",
                element: <div className="flex w-full h-full items-center justify-center"><ChangePasswordAuthUser /></div>
              },
              {
                path: "view/profile",
                element: <Profile />
              },
              {
                path: "edit/profile",
                element: <EditPrifile />
              },
              {
                path: "pricing",
                element: <UserPriccing />
              }
            ]
          }
        ]
      }
    ]
  },
]);
export default router;
