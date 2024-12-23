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
import { BrowserRouter, Route, Routes } from "react-router";
//import { ContextProvider } from "./Context";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider forcedTheme="dark">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </ColorModeProvider>
      </ChakraProvider>
    </ContextProvider>
  </React.StrictMode>
);
