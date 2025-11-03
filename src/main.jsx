import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { BoxProvider } from "./Context/BoxContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BoxProvider>
        <App />
      </BoxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
