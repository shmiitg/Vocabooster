import React, { useState, useEffect, useContext, useRef } from "react";
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const wordRefs = useRef({});

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

    const filteredWords = filterWords(words, searchQuery);

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
            <div className="alphabet-selector">
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                    <button key={letter} onClick={() => handleAlphabetClick(letter)}>
                        {letter}
                    </button>
                ))}
            </div>
            <button className="add-button" onClick={handleOpen}>
                Add
            </button>
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
