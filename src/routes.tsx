// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// import NotFound from './pages/NotFound'
import DashboardPage from "./dashboard";
import NotFound from "./not-found";
import Achivements from "./achivements";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "*", element: <NotFound /> },
      { path: "/achivements", element: <Achivements /> },
    ],
  },
]);

export default router;
