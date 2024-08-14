import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import Loader from "../../components/Loader";
import { getAllWords } from "../../utils/utils";
import { sortWords } from "../../utils/sort";
import WordAccordion from "./WordAccordion";

const ReviseWord = () => {
    const [activeTabs, setActiveTabs] = useState([]);

    const togglePanel = (index) => {
        setActiveTabs((prevActiveTabs) => {
            const isActive = prevActiveTabs.includes(index);
            if (isActive) {
                return prevActiveTabs.filter((tabIndex) => tabIndex !== index);
            } else {
                return [...prevActiveTabs, index];
            }
        });
    };

    const { wordUpdate } = useContext(UpdateContext);

    const [words, setWords] = useState([]);
    const [reviseWords, setReviseWords] = useState([]);
    const [wordList, setWordList] = useState(new Set());
    const [wordsChange, setWordsChange] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function getRandomWordIds(wordList, count) {
        const ids = wordList.map((word) => word._id);
        const shuffled = ids.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const changeWords = () => {
        const newWordIds = getRandomWordIds(words, 10);
        localStorage.setItem("revisionWordIds", JSON.stringify(newWordIds));
        updateReviseWords(newWordIds);
        setWordsChange((prev) => !prev);
    };

    const updateReviseWords = (ids) => {
        if (words.length === 0) return;
        const wordsToDisplay = sortWords(ids.map((id) => words.find((word) => word._id === id)));
        setReviseWords(wordsToDisplay);
    };

    const getWords = async () => {
        const wordsData = await getAllWords();
        if (wordsData.error) {
            setError(wordsData.error);
        } else {
            setWords(wordsData.words);
            setWordList(wordsData.wordList);
        }
        setLoading(false);
    };

    useEffect(() => {
        getWords();
    }, [wordUpdate]);

    useEffect(() => {
        const storedIds = JSON.parse(localStorage.getItem("revisionWordIds"));
        if (storedIds && storedIds.length > 0) {
            updateReviseWords(storedIds);
        } else {
            changeWords();
        }
    }, [words]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <>
            <div className="main-container">
                <div className="main-container-list">
                    {reviseWords.map((entry, index) => (
                        <WordAccordion
                            key={entry._id}
                            entry={entry}
                            allWords={wordList}
                            active={activeTabs.includes(index)}
                            togglePanel={() => togglePanel(index)}
                            wordsChange={wordsChange}
                        />
                    ))}
                </div>
            </div>
            <button className="add-button" onClick={changeWords}>
                Change
            </button>
        </>
    );
};

export default ReviseWord;
