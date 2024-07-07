import React, { useState, useEffect, useContext, useRef } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { SearchContext } from "../../context/SearchContext";
import { Modal } from "react-responsive-modal";
import Loader from "../../components/Loader";
import SpellingContainer from "./SpellingContainer";
import NewSpelling from "./NewSpelling";
import { sortSpellings } from "../../utils/sort";
import { filterSpellings } from "../../utils/filter";
import { useMediaQuery } from "react-responsive";

const Spelling = () => {
    const { wordUpdate } = useContext(UpdateContext);
    const { searchQuery } = useContext(SearchContext);

    const [open, setOpen] = useState(false);

    const [spellings, setSpellings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const spellingRefs = useRef({});
    const alphabetSelectorRef = useRef(null);
    let lastScrollTop = 0;
    const scrollThreshold = 5; // Define the scroll threshold

    // Define media queries
    const isLargeScreen = useMediaQuery({ query: "(min-width: 769px)" });
    const isMediumScreen = useMediaQuery({ query: "(max-width: 768px) and (min-width: 481px)" });
    const isSmallScreen = useMediaQuery({ query: "(max-width: 480px)" });

    const getSpellings = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/spelling`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setSpellings(sortSpellings(data.spellings));
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
        getSpellings();
    }, [wordUpdate]);

    const filteredSpellings = filterSpellings(spellings, searchQuery);

    const handleAlphabetClick = (letter) => {
        const spellingElement = spellingRefs.current[letter];
        if (spellingElement) {
            spellingElement.scrollIntoView({ behavior: "instant" });

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
        return <h1>Error</h1>;
    }

    return (
        <>
            <div className="main-container">
                <div className="main-container-list">
                    {filteredSpellings.map((entry) => (
                        <div
                            key={entry._id}
                            ref={(el) => {
                                const firstLetter = entry.spelling.charAt(0).toUpperCase();
                                if (searchQuery === "" && !spellingRefs.current[firstLetter]) {
                                    spellingRefs.current[firstLetter] = el;
                                } else if (searchQuery !== "") {
                                    spellingRefs.current[firstLetter] = null;
                                }
                            }}
                        >
                            <SpellingContainer spelling={entry} />
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
                <NewSpelling onClose={handleClose} />
            </Modal>
        </>
    );
};

export default Spelling;
