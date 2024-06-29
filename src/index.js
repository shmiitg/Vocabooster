import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";
import UpdateProvider from "./context/UpdateContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <SearchProvider>
                <UpdateProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </UpdateProvider>
            </SearchProvider>
        </Router>
    </React.StrictMode>
);
