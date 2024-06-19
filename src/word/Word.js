import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";
import { Modal } from "react-responsive-modal";
import { FaSearch } from "react-icons/fa"; // Import the search icon
import Loader from "../components/Loader";
import WordContainer from "./WordContainer";
import NewWord from "./NewWord";
import { filterWords, sortWords } from "../utils/utils";

const Word = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const [open, setOpen] = useState(false);

    const [words, setWords] = useState([]);
    const [allWords, setAllWords] = useState([]);
    const [selectedAlphabet, setSelectedAlphabet] = useState("A");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getWords = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/word`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setWords(sortWords(data.words));
                // Extract all words and store them in lowercase for easy comparison
                const allWordsList = data.words.flatMap((word) => word.word.toLowerCase());
                setAllWords(allWordsList);
                setLoading(false);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
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

    const filteredWords = words.filter(
        (word) =>
            word.word.toLowerCase().startsWith(selectedAlphabet.toLowerCase()) &&
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
                <ul className="main-container-list">
                    {filteredWords.map((word) => (
                        <WordContainer key={word._id} word={word} allWords={allWords} />
                    ))}
                </ul>
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
