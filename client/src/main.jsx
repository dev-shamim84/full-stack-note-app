import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./layout/Root.jsx";
import Home from "./pages/Home.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import { Toaster } from "react-hot-toast";
import NotesNotFound from "./components/NotesNotFound .jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotesNotFound></NotesNotFound>,
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
        path: "/note/:id",
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
