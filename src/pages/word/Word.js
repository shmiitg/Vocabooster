import React, { useState, useEffect, useContext, useRef } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "react-responsive-modal";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import WordContainer from "./WordContainer";
import NewWord from "./NewWord";
import { getAllWords } from "../../utils/utils";
import { sortWords } from "../../utils/sort";
import { filterWords } from "../../utils/filter";
import { scrollThreshold } from "../../utils/constant";
import { useMediaQuery } from "react-responsive";

const Word = () => {
    const { user } = useContext(AuthContext);
    const { wordUpdate } = useContext(UpdateContext);
    const { searchQuery } = useContext(SearchContext);

    const [open, setOpen] = useState(false);

    const [words, setWords] = useState([]);
    const [wordList, setWordList] = useState(new Set());

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const wordRefs = useRef({});
    const alphabetSelectorRef = useRef(null);
    let lastScrollTop = 0;

    // Define media queries
    const isLargeScreen = useMediaQuery({ query: "(min-width: 769px)" });
    const isMediumScreen = useMediaQuery({ query: "(max-width: 768px) and (min-width: 481px)" });
    const isSmallScreen = useMediaQuery({ query: "(max-width: 480px)" });

    const getWords = async () => {
        const wordsData = await getAllWords();
        if (wordsData.error) {
            setError(wordsData.error);
        } else {
            setWords(sortWords(wordsData.words));
            setWordList(wordsData.wordList);
            localStorage.setItem("words", JSON.stringify(wordsData.words));
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

            const offset = isLargeScreen ? -115 : isMediumScreen ? -105 : -95;

            // Adjust for the offset
            window.scrollBy(0, offset);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            const offset = isLargeScreen ? "80px" : isMediumScreen ? "70px" : "65px";

            if (st > lastScrollTop) {
                // Scroll down
                if (alphabetSelectorRef.current) {
                    alphabetSelectorRef.current.style.top = offset;
                }
            } else if (lastScrollTop - st > scrollThreshold) {
                // Scroll up beyond threshold
                if (alphabetSelectorRef.current) {
                    alphabetSelectorRef.current.style.top = "0px";
                }
            }
            lastScrollTop = st <= 0 ? 0 : st;
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLargeScreen, isMediumScreen, isSmallScreen]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
            <div className="main-container">
                <div className="main-container-list">
                    {filteredWords.map((entry) => (
                        <div
                            key={entry._id}
                            ref={(el) => {
                                const firstLetter = entry.word.charAt(0).toUpperCase();
                                if (searchQuery === "" && !wordRefs.current[firstLetter]) {
                                    wordRefs.current[firstLetter] = el;
                                } else if (searchQuery !== "") {
                                    wordRefs.current[firstLetter] = null;
                                }
                            }}
                        >
                            <WordContainer entry={entry} wordList={wordList} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="alphabet-selector-container" ref={alphabetSelectorRef}>
                <div className="alphabet-selector">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                        <button key={letter} onClick={() => handleAlphabetClick(letter)}>
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
            {user && (
                <button className="add-button" onClick={handleOpen}>
                    Add
                </button>
            )}
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
