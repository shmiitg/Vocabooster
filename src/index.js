import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UpdateProvider from "./context/UpdateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <UpdateProvider>
                    <App />
                </UpdateProvider>
            </AuthProvider>
        </Router>
    </React.StrictMode>
);
