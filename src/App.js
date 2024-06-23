import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Word from "./word/Word";
import Revision from "./pages/Revision";
import OWS from "./ows/OWS";
import Idiom from "./idiom/Idiom";
import Spelling from "./spelling/Spelling";
import Clusters from "./pages/Clusters";
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
                        <Route path="/spellings" element={<Spelling />} />
                        <Route path="/clusters" element={<Clusters />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
