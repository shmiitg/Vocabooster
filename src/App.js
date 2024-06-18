import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
                <header className="App-header">
                    <div className="left-header">
                        <h1 className="logo">
                            <Link to="/">Vocabrain</Link>
                        </h1>
                    </div>
                    <div className="right-header">
                        <div className="links">
                            <Link to="/revision">
                                <button>Revise</button>
                            </Link>
                        </div>
                        <div className="links">
                            <Link to="/ows">
                                <button>OWS</button>
                            </Link>
                        </div>
                        <div className="links">
                            <Link to="/idioms">
                                <button>Idiom</button>
                            </Link>
                        </div>
                        <div className="links">
                            <Link to="/clusters">
                                <button>Cluster</button>
                            </Link>
                        </div>
                    </div>
                </header>
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
