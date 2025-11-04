import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./layout/Root.jsx";
import Home from "./pages/Home.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import { Toaster } from "react-hot-toast";
import DetailPage from "./pages/DetailPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: (
      <h1 className="h-screen mx-auto text-4xl text-center my-50">
        404 Not Found !
      </h1>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/create",
        element: <CreatePage></CreatePage>,
      },
      {
        path: "/noteDetails/:id",
        element: <DetailPage></DetailPage>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
    <Toaster />
  </StrictMode>
);
