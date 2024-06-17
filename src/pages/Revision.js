import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";
import Loader from "../components/Loader";
import WordContainer from "../word/WordContainer";
import { sortWords } from "../utils/utils";

const Revision = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const [revisionWords, setRevisionWords] = useState([]);
    const [allWords, setAllWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Get random words
    const getRandomWords = (list, count) => {
        const shuffled = list.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const getWords = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/word`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                // Extract all words and store them in lowercase for easy comparison
                const allWordsList = data.words.flatMap((word) => word.word.toLowerCase());
                setAllWords(allWordsList);

                const sortedWords = sortWords(getRandomWords(data.words, 10));
                setRevisionWords([...sortedWords]);
                setLoading(false);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
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

    return (
        <>
            <div className="main-container">
                <h2 className="main-container-heading">Daily Revision</h2>
                <ul className="main-container-list">
                    {revisionWords.map((word) => (
                        <WordContainer
                            key={word._id}
                            wordType="word"
                            word={word}
                            allWords={allWords}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Revision;
