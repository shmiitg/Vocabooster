import React, { useState, useEffect, useContext, useRef } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { SearchContext } from "../../context/SearchContext";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Empty from "../../components/Empty";
import PhrasalContainer from "./PhrasalContainer";
import { sortPhrasal } from "../../utils/sort";
import { filterPhrasal } from "../../utils/filter";
import { scrollThreshold } from "../../utils/constant";
import { useMediaQuery } from "react-responsive";

const BookmarkWord = () => {
    const { wordUpdate } = useContext(UpdateContext);
    const { searchQuery } = useContext(SearchContext);

    const [phrasal, setPhrasal] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const wordRefs = useRef({});
    const alphabetSelectorRef = useRef(null);
    let lastScrollTop = 0;

    // Define media queries
    const isLargeScreen = useMediaQuery({ query: "(min-width: 769px)" });
    const isMediumScreen = useMediaQuery({ query: "(max-width: 768px) and (min-width: 481px)" });
    const isSmallScreen = useMediaQuery({ query: "(max-width: 480px)" });

    const getFavorites = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const url = `${process.env.REACT_APP_SERVER_URL}/user`;
                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    const favs = data.favorites.filter((fav) => fav.itemType === "phrasal");
                    setPhrasal(sortPhrasal(favs));
                } else {
                    setError("Failed to load Phrasal Verbs");
                }
            } catch (err) {
                setError("Failed to load Phrasal Verbs");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        getFavorites();
    }, [wordUpdate]);

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

    const filteredPhrasal = filterPhrasal(phrasal, searchQuery);

    const handleAlphabetClick = (letter) => {
        const wordElement = wordRefs.current[letter];
        if (wordElement) {
            wordElement.scrollIntoView({ behavior: "instant" });

            const offset = isLargeScreen ? -115 : isMediumScreen ? -105 : -95;

            window.scrollBy(0, offset);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (phrasal.length === 0) {
        return <Empty message="No Phrasal Verbs in Bookmark" />;
    }

    return (
        <>
            <div className="main-container">
                <div className="main-container-list">
                    {filteredPhrasal.map((entry) => (
                        <div
                            key={entry._id}
                            ref={(el) => {
                                const firstLetter = entry.phrasal.charAt(0).toUpperCase();
                                if (searchQuery === "" && !wordRefs.current[firstLetter]) {
                                    wordRefs.current[firstLetter] = el;
                                } else if (searchQuery !== "") {
                                    wordRefs.current[firstLetter] = null;
                                }
                            }}
                        >
                            <PhrasalContainer entry={entry} />
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
        </>
    );
};

export default BookmarkWord;
