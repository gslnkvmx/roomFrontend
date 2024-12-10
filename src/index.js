import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./Context";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
//import { ContextProvider } from "./Context";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </ContextProvider>
  </React.StrictMode>
);
