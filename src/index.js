import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import { ContextProvider } from "./Context";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./components/ui/color-mode";
import "./App.css";
//import { ContextProvider } from "./Context";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider forcedTheme="dark">
          <RouterProvider router={router} />
        </ColorModeProvider>
      </ChakraProvider>
    </ContextProvider>
  </React.StrictMode>
);
