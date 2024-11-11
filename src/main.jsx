import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { DarkModeContextProvider } from "../src/context/darkModeContext.jsx";
import "./main.scss";

const container= document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
  <DarkModeContextProvider>
    <div className="app-container">
      <App />
    </div>
  </DarkModeContextProvider>
</React.StrictMode>
)
