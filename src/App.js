import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./navbar/Navbar";
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

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Word />} />
                    <Route path="/revision" element={<Revision />} />
                    <Route path="/ows" element={<OWS />} />
                    <Route path="/idioms" element={<Idiom />} />
                    <Route path="/spellings" element={<Spelling />} />
                    <Route path="/clusters" element={<Cluster />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;
