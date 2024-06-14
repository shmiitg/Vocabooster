import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";
import WordContainer from "../components/WordContainer";
import Loader from "../components/Loader";
import { filterWords, sortWords } from "../utils/utils";
import "../css/Home.css";

const Home = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const [words, setWords] = useState([]);
    const [selectedAlphabet, setSelectedAlphabet] = useState("A");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getWords = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/words`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                const sortedWords = sortWords(data.words);
                setWords(sortedWords);
                setLoading(false);
            } else {
                setError(true);
            }
        } catch (err) {}
    };

    useEffect(() => {
        getWords();
    }, [wordUpdate]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    const filteredWords = words.filter(
        (word) =>
            word.word.toLowerCase().startsWith(selectedAlphabet.toLowerCase()) &&
            word.word.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
            </div>
            <div className="alphabet-nav">
                <div className="alphabets">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                        <button
                            key={letter}
                            onClick={() => setSelectedAlphabet(letter)}
                            className={selectedAlphabet === letter ? "selected" : ""}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
            <div className="main-container">
                <ul className="main-container-list">
                    {filteredWords.map((word) => (
                        <WordContainer key={word._id} word={word} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Home;
