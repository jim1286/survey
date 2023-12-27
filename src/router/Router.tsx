import { createBrowserRouter } from "react-router-dom";
import { MainPage, PreviewPage } from "@/pages";
import App from "@/app/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/preview",
        element: <PreviewPage />,
      },
    ],
  },
]);

export default router;
