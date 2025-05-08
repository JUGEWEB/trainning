// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Use 'react-dom/client' for React 18
import App from "./App";
import "./index.css";
import {BrowserRouter} from "react-router-dom"

// Find the root element in the HTML
const rootElement = document.getElementById("root");

// Create a root using React 18's createRoot
const root = ReactDOM.createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
