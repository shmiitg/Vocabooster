import React, { useState, useEffect, useContext, useRef } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditWord from "../word/EditWord";
import WordDetailsModal from "../../components/WordDetailsModal";
import { underlineWord, checkExistingWord, trimCapitalize } from "../../utils/utils";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const WordAccordion = ({ entry, allWords, active, togglePanel, wordsChange }) => {
    const [height, setHeight] = useState(0);
    const innerRef = useRef(null);

    useEffect(() => {
        if (innerRef.current) {
            setHeight(innerRef.current.scrollHeight + 20);
        }
    }, [wordsChange]);

    const innerStyle = {
        height: `${active ? height : 0}px`,
    };

    const { user, addFavorite, removeFavorite, favorites } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);

    const handleUpdate = (e) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDetailsOpen = (word, e) => {
        e.stopPropagation();
        setSelectedWord(word);
        setDetailsOpen(true);
    };

    const handleDetailsClose = () => {
        setDetailsOpen(false);
        setSelectedWord(null);
    };

    const favObj = { itemType: "word", itemId: String(entry._id) };
    const isFavorite = favorites.has(favObj);

    const toggleFavorite = (e) => {
        e.stopPropagation();
        if (isFavorite) {
            removeFavorite("word", entry._id);
        } else {
            addFavorite("word", entry._id);
        }
    };

    return (
        <div className="revise-container" aria-expanded={active}>
            <div className="revise-container-item">
                <div className="revise-container-top" role="tab" onClick={togglePanel}>
                    <div className="word-container-top">
                        <h3>{trimCapitalize(entry.word)}</h3>
                        <div className="update-icons">
                            {user && (
                                <button onClick={toggleFavorite}>
                                    {isFavorite ? (
                                        <FaStar className="star-icon" />
                                    ) : (
                                        <FaRegStar className="star-icon" />
                                    )}
                                </button>
                            )}
                            {active && <button onClick={handleUpdate}>Edit</button>}
                        </div>
                    </div>
                </div>
                <div className="revise-container-bottom" style={innerStyle} aria-hidden={!active}>
                    <div className="revise-subcontainer-bottom" ref={innerRef}>
                        {entry.meanings.map((meaning, index) => (
                            <div key={index} className="word-container-bottom">
                                {meaning.definition && <p>{meaning.definition}</p>}
                                {meaning.example && (
                                    <p>"{underlineWord(meaning.example, entry.word)}"</p>
                                )}
                                {meaning.synonyms?.length > 0 && (
                                    <p>
                                        <strong>Synonyms:</strong>{" "}
                                        {meaning.synonyms
                                            .map((synonym) =>
                                                checkExistingWord(synonym, allWords) ? (
                                                    <span
                                                        key={synonym}
                                                        className="clickable-word"
                                                        onClick={(e) =>
                                                            handleDetailsOpen(synonym, e)
                                                        }
                                                    >
                                                        {synonym}
                                                    </span>
                                                ) : (
                                                    <span key={synonym}>{synonym}</span>
                                                )
                                            )
                                            .reduce((prev, curr) => [prev, ", ", curr])}
                                    </p>
                                )}
                                {meaning.antonyms?.length > 0 && (
                                    <p>
                                        <strong>Antonyms:</strong>{" "}
                                        {meaning.antonyms
                                            .map((antonym) =>
                                                checkExistingWord(antonym, allWords) ? (
                                                    <span
                                                        key={antonym}
                                                        className="clickable-word"
                                                        onClick={(e) =>
                                                            handleDetailsOpen(antonym, e)
                                                        }
                                                    >
                                                        {antonym}
                                                    </span>
                                                ) : (
                                                    <span key={antonym}>{antonym}</span>
                                                )
                                            )
                                            .reduce((prev, curr) => [prev, ", ", curr])}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        showCloseIcon={false}
                        closeOnOverlayClick={false}
                        center
                    >
                        <EditWord entry={entry} onClose={handleClose} />
                    </Modal>
                    {detailsOpen && (
                        <WordDetailsModal word={selectedWord} onClose={handleDetailsClose} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default WordAccordion;
