import { createBrowserRouter } from "react-router";
import App from "../App";
import Landing from "../pages/Landing/Landing";
import Pricing from "../pages/Landing/Pricing/Pricing";

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
      }
    ]
  },
]);
export default router;
