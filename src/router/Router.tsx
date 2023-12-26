import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/main",
        element: <MainPage />,
      },
    ],
  },
]);

export default router;
