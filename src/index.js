// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' for React 18
import App from "./App";
import "./index.css";
import {HashRouter} from "react-router-dom"
import * as serviceWorker from "./serviceWorker"; // 👈 Add this

// Find the root element in the HTML
const rootElement = document.getElementById("root");

// Create a root using React 18's createRoot
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <HashRouter>
    <App />
    </HashRouter>
  </React.StrictMode>
);

serviceWorker.register(); // 👈 Call the register function