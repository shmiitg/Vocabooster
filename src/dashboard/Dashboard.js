import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";
import { FaSearch } from "react-icons/fa";
import Loader from "../components/Loader";
import WordContainer from "../word/WordContainer";
import { sortWords } from "../utils/utils";

const Dashboard = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const [words, setWords] = useState([]);
    const [allWords, setAllWords] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getFavorites = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = `${process.env.REACT_APP_SERVER_URL}/user/favorites`;
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

    return (
        <>
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
                        <WordContainer key={word._id} word={word} allWords={allWords} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
