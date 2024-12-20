import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";
import UpdateProvider from "./context/UpdateContext";

const Root = () => {
    useEffect(() => {
        // Add Google AdSense script dynamically to the head of the document
        const script = document.createElement("script");
        script.src =
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1588856948014272";
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
    }, []);

    return (
        <Router>
            <SearchProvider>
                <UpdateProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </UpdateProvider>
            </SearchProvider>
        </Router>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);
