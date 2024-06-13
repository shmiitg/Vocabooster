import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { UpdateContext } from "./context/UpdateContext";
import MainScreen from "./components/MainScreen";
import RevisionPage from "./components/RevisionPage";
import NewWord from "./components/NewWord";
import "./App.css";

const App = () => {
    const { wordUpdate } = useContext(UpdateContext);
    const [words, setWords] = useState([]);
    const [error, setError] = useState(false);

    const getWords = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/words`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setWords(data.words);
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
                            <Link to="/new">
                                <button>Add Word</button>
                            </Link>
                        </div>
                    </div>
                </header>
                <Routes>
                    <Route path="/" element={<MainScreen words={words} />} />
                    <Route path="/revision" element={<RevisionPage words={words} />} />
                    <Route path="/new" element={<NewWord />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
