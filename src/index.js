import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UpdateContextProvider from "./context/UpdateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <UpdateContextProvider>
            <App />
        </UpdateContextProvider>
    </React.StrictMode>
);
