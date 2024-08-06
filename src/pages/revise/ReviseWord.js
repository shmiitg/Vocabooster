import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import Loader from "../../components/Loader";
import WordContainer from "../word/WordContainer";
import { getAllWords } from "../../utils/utils";
import { sortWords } from "../../utils/sort";

const ReviseWord = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const [wordInfo, setWordInfo] = useState([]);
    const [reviseWords, setReviseWords] = useState([]);
    const [loading, setLoading] = useState(true);

    const [wordList, setWordList] = useState(new Set());

    function getRandomWordIds(wordList, count) {
        const ids = wordList.map((word) => word._id);
        const shuffled = ids.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const changeWords = () => {
        const newWordIds = getRandomWordIds(wordInfo, 15);
        localStorage.setItem("revisionWordIds", JSON.stringify(newWordIds));
        updateReviseWords(newWordIds);
    };

    const updateReviseWords = (ids) => {
        if (wordInfo.length === 0) return;
        const wordsToDisplay = sortWords(ids.map((id) => wordInfo.find((word) => word._id === id)));
        setReviseWords(wordsToDisplay);
    };

    const getWords = async () => {
        const allWords = await getAllWords();
        setWordList(allWords.wordList);
        setWordInfo(allWords.wordInfo);
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
    }, [wordInfo]);

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="main-container">
                <div className="main-container-list">
                    {reviseWords.map((entry) => (
                        <WordContainer key={entry._id} entry={entry} allWords={wordList} />
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
