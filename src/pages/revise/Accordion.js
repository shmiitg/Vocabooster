import React, { useState, useEffect, useContext, useRef } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditWord from "../word/EditWord";
import DeleteEntry from "../../components/DeleteEntry";
import WordDetailsModal from "../../components/WordDetailsModal";
import { underlineWord, checkExistingWord } from "../../utils/utils";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Panel = ({ entry, allWords, active, togglePanel, wordsChange }) => {
    const { wordUpdate } = useContext(UpdateContext);

    const [height, setHeight] = useState(0);
    const innerRef = useRef(null);

    useEffect(() => {
        if (innerRef.current) {
            setHeight(innerRef.current.scrollHeight + 5);
        }
    }, [wordUpdate, wordsChange]);

    const innerStyle = {
        height: `${active ? height : 0}px`,
    };

    const { user, addFavorite, removeFavorite, favorites } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [updateType, setUpdateType] = useState("edit");
    const [selectedWord, setSelectedWord] = useState(null);

    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const handleUpdate = (type, e) => {
        e.stopPropagation();
        setOpen(true);
        setUpdateType(type);
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
            <button className="revise-label" role="tab" onClick={togglePanel}>
                <div className="word-container-top">
                    <h3>{capitalizeFirstLetter(entry.word)}</h3>
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
                        {active && (
                            <>
                                <button onClick={(e) => handleUpdate("edit", e)}>Edit</button>
                                <button onClick={(e) => handleUpdate("delete", e)}>Delete</button>
                            </>
                        )}
                    </div>
                </div>
            </button>
            <div
                className="revise-container-bottom"
                ref={innerRef}
                style={innerStyle}
                aria-hidden={!active}
            >
                {entry.meanings.map((meaning, index) => (
                    <div key={index} className="word-container-bottom">
                        {meaning.definition && <p>{meaning.definition}</p>}
                        {meaning.example && <p>"{underlineWord(meaning.example, entry.word)}"</p>}
                        {meaning.synonyms?.length > 0 && (
                            <p>
                                <strong>Synonyms:</strong>{" "}
                                {meaning.synonyms
                                    .map((synonym) =>
                                        checkExistingWord(synonym, allWords) ? (
                                            <span
                                                key={synonym}
                                                className="clickable-word"
                                                onClick={(e) => handleDetailsOpen(synonym, e)}
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
                                                onClick={(e) => handleDetailsOpen(antonym, e)}
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
                <Modal
                    open={open}
                    onClose={handleClose}
                    showCloseIcon={false}
                    closeOnOverlayClick={false}
                    center
                >
                    {updateType === "edit" ? (
                        <EditWord entry={entry} onClose={handleClose} />
                    ) : (
                        <DeleteEntry entryType="word" entry={entry} onClose={handleClose} />
                    )}
                </Modal>
                {detailsOpen && (
                    <WordDetailsModal word={selectedWord} onClose={handleDetailsClose} />
                )}
            </div>
        </div>
    );
};

export default Panel;
