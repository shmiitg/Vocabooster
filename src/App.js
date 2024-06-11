import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MainScreen from "./components/MainScreen";
import RevisionPage from "./components/RevisionPage";
import "./App.css";

const App = () => {
    const [words, setWords] = useState([]);

    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => setWords(data));
    }, []);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1 className="logo">
                        <Link to="/">Vocabrain</Link>
                    </h1>
                    <div className="links">
                        <Link to="/revision">
                            <button>Revision</button>
                        </Link>
                    </div>
                </header>
                <Routes>
                    <Route path="/" element={<MainScreen words={words} />} />
                    <Route path="/revision" element={<RevisionPage words={words} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
