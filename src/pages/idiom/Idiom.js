import React, { useState, useEffect, useContext, useRef } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { SearchContext } from "../../context/SearchContext";
import { Modal } from "react-responsive-modal";
import Loader from "../../components/Loader";
import IdiomContainer from "./IdiomContainer";
import NewIdiom from "./NewIdiom";
import { sortIdioms } from "../../utils/sort";
import { filterIdioms } from "../../utils/filter";
import { scrollThreshold } from "../../utils/constant";
import { useMediaQuery } from "react-responsive";

const Idiom = () => {
    const { wordUpdate } = useContext(UpdateContext);
    const { searchQuery } = useContext(SearchContext);

    const [open, setOpen] = useState(false);

    const [idioms, setIdioms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const idiomRefs = useRef({});
    const alphabetSelectorRef = useRef(null);
    let lastScrollTop = 0;

    // Define media queries
    const isLargeScreen = useMediaQuery({ query: "(min-width: 769px)" });
    const isMediumScreen = useMediaQuery({ query: "(max-width: 768px) and (min-width: 481px)" });
    const isSmallScreen = useMediaQuery({ query: "(max-width: 480px)" });

    const getIdioms = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/idiom`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setIdioms(sortIdioms(data.idioms));
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
        getIdioms();
    }, [wordUpdate]);

    const filteredIdioms = filterIdioms(idioms, searchQuery);

    const handleAlphabetClick = (letter) => {
        const idiomElement = idiomRefs.current[letter];
        if (idiomElement) {
            idiomElement.scrollIntoView({ behavior: "instant" });

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
                    {filteredIdioms.map((entry) => (
                        <div
                            key={entry._id}
                            ref={(el) => {
                                const firstLetter = entry.idiom.charAt(0).toUpperCase();
                                if (searchQuery === "" && !idiomRefs.current[firstLetter]) {
                                    idiomRefs.current[firstLetter] = el;
                                } else if (searchQuery !== "") {
                                    idiomRefs.current[firstLetter] = null;
                                }
                            }}
                        >
                            <IdiomContainer idiom={entry} />
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
                <NewIdiom onClose={handleClose} />
            </Modal>
        </>
    );
};

export default Idiom;
