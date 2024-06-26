import React, { useState, useEffect, useContext, useRef } from "react";
import { UpdateContext } from "../context/UpdateContext";
import { FaSearch } from "react-icons/fa";
import Loader from "../components/Loader";
import WordContainer from "../word/WordContainer";
import { sortWords } from "../utils/utils";
import "../css/Dashboard.css";

const Dashboard = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const [words, setWords] = useState([]);
    const [allWords, setAllWords] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const wordRefs = useRef({});

    const getFavorites = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/user`;
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setWords(sortWords(data.favorites));
            } else {
                setError(true);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
        }
    };

    useEffect(() => {
        getFavorites();
    }, [wordUpdate]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    const filteredWords = words.filter((word) =>
        word.word.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAlphabetClick = (letter) => {
        const wordElement = wordRefs.current[letter];
        if (wordElement) {
            wordElement.scrollIntoView({ behavior: "instant" });

            // Determine the offset based on screen width
            const offset = window.innerWidth <= 768 ? -80 : -90;

            // Adjust for the offset
            window.scrollBy(0, offset);
        }
    };

    return (
        <>
            <div className="dashboard-container">
                <div className="main-content">
                    <div className="main-container-top">
                        <div className="main-container-sub-top">
                            <div className="search-bar">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-bar"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="main-container">
                        <div className="main-container-list">
                            {filteredWords.map((word) => (
                                <div
                                    key={word._id}
                                    ref={(el) => {
                                        const firstLetter = word.word.charAt(0).toUpperCase();
                                        if (searchQuery === "" && !wordRefs.current[firstLetter]) {
                                            wordRefs.current[firstLetter] = el;
                                        } else if (searchQuery !== "") {
                                            wordRefs.current[firstLetter] = null;
                                        }
                                    }}
                                >
                                    <WordContainer word={word} allWords={allWords} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="alphabet-selector">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                        <button key={letter} onClick={() => handleAlphabetClick(letter)}>
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
