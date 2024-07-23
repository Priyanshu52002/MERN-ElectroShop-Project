import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { CartProvider } from "./context/CartContext.jsx";
import { LoginProvider } from "./context/LoginContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <CartProvider>
          <LoginProvider>
            <App />
          </LoginProvider>
        </CartProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
