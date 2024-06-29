import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { SearchContext } from "../../context/SearchContext";
import { Modal } from "react-responsive-modal";
import Loader from "../../components/Loader";
import WordContainer from "./WordContainer";
import NewWord from "./NewWord";
import { getAllWords } from "../../utils/utils";
import { sortWords } from "../../utils/sort";
import { filterWords } from "../../utils/filter";

const Word = () => {
    const { wordUpdate } = useContext(UpdateContext);
    const { searchQuery } = useContext(SearchContext);

    const [open, setOpen] = useState(false);

    const [words, setWords] = useState([]);
    const [allWords, setAllWords] = useState(new Set());
    const [selectedAlphabet, setSelectedAlphabet] = useState("A");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getWords = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/word`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setWords(sortWords(data.words));
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

    const filteredWords = filterWords(words, selectedAlphabet, searchQuery);

    return (
        <>
            <div className="main-container-top">
                <div className="main-container-sub-top">
                    <div className="main-container-add">
                        <button onClick={handleOpen}>Add</button>
                    </div>
                </div>
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
                <div className="main-container-list">
                    {filteredWords.map((word) => (
                        <WordContainer key={word._id} word={word} allWords={allWords} />
                    ))}
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                showCloseIcon={false}
                closeOnOverlayClick={false}
                center
            >
                <NewWord onClose={handleClose} />
            </Modal>
        </>
    );
};

export default Word;
