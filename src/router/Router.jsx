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
      }
    ]
  },
]);
export default router;
