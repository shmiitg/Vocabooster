import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { UpdateContext } from "./context/UpdateContext";
import Home from "./pages/Home";
import Revision from "./pages/Revision";
import OWS from "./pages/OWS";
import New from "./pages/New";
import Clusters from "./pages/Clusters";
import "./App.css";

const App = () => {
    const { wordUpdate } = useContext(UpdateContext);
    const [words, setWords] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const getWords = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/word`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setWords(data.words);
                setLoading(false);
            } else {
                setError(true);
            }
        } catch (err) {}
    };

    useEffect(() => {
        getWords();
    }, [wordUpdate]);

    if (error) {
        return <h1>Error</h1>;
    }

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
                                <button>Revision</button>
                            </Link>
                        </div>
                        <div className="links">
                            <Link to="/ows">
                                <button>OWS</button>
                            </Link>
                        </div>
                        <div className="links">
                            <Link to="/clusters">
                                <button>Cluster</button>
                            </Link>
                        </div>
                        <div className="links">
                            <Link to="/new">
                                <button>Add</button>
                            </Link>
                        </div>
                    </div>
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/revision"
                        element={<Revision words={words} loading={loading} />}
                    />
                    <Route path="/ows" element={<OWS />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/clusters" element={<Clusters />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
