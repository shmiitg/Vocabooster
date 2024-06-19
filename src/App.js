import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Word from "./word/Word";
import Revision from "./pages/Revision";
import OWS from "./ows/OWS";
import Clusters from "./pages/Clusters";
import Idiom from "./idiom/Idiom";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Word />} />
                        <Route path="/revision" element={<Revision />} />
                        <Route path="/ows" element={<OWS />} />
                        <Route path="/idioms" element={<Idiom />} />
                        <Route path="/clusters" element={<Clusters />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
