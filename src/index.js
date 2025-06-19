import React from "react";
import ReactDOM from "react-dom/client";
import "./Assets/CSS/main.css";
import "./Assets/CSS/loader.css";
import "react-quill/dist/quill.snow.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registered successfully:", registration);
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  });
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
