import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Dashboard from "./dashboard/Dashboard";
import Word from "./word/Word";
import Revision from "./pages/Revision";
import OWS from "./ows/OWS";
import Idiom from "./idiom/Idiom";
import Spelling from "./spelling/Spelling";
import Cluster from "./cluster/Cluster";
import Footer from "./components/Footer";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "./App.css";
import "./css/Modal.css";
import { AuthContext } from "./context/AuthContext";

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="App">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Word />} />
                    <Route
                        path="/dashboard"
                        element={user ? <Dashboard /> : <Navigate to="/login" />}
                    />
                    <Route path="/revision" element={<Revision />} />
                    <Route path="/ows" element={<OWS />} />
                    <Route path="/idioms" element={<Idiom />} />
                    <Route path="/spellings" element={<Spelling />} />
                    <Route path="/clusters" element={<Cluster />} />
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/dashboard" /> : <Login />}
                    />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="/dashboard" /> : <Register />}
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;
