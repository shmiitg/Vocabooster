import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import Loader from "../../components/Loader";
import WordContainer from "../word/WordContainer";
import { getAllWords } from "../../utils/utils";
import { sortWords } from "../../utils/sort";

const ReviseWord = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const [reviseWords, setReviseWords] = useState([]);
    const [allWords, setAllWords] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getNewData = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/revision`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setReviseWords(sortWords(data.words));
                const allWordsList = await getAllWords();
                setAllWords(allWordsList);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        getNewData();
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
                <div className="main-container-list">
                    {reviseWords.map((entry) => (
                        <WordContainer key={entry._id} entry={entry} allWords={allWords} />
                    ))}
                </div>
            </div>
            <button className="add-button" onClick={getNewData}>
                Change
            </button>
        </>
    );
};

export default ReviseWord;
