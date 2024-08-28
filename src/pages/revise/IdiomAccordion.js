import React, { useState, useEffect, useContext, useRef } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditIdiom from "../idiom/EditIdiom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const IdiomAccordion = ({ entry, active, togglePanel, idiomsChange }) => {
    const { wordUpdate } = useContext(UpdateContext);

    const [height, setHeight] = useState(0);
    const innerRef = useRef(null);

    useEffect(() => {
        if (innerRef.current) {
            setHeight(innerRef.current.scrollHeight + 20);
        }
    }, [wordUpdate, idiomsChange]);

    const innerStyle = {
        height: `${active ? height : 0}px`,
    };

    const { user, addFavorite, removeFavorite, favorites } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleUpdate = (e) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const favObj = { itemType: "idiom", itemId: String(entry._id) };
    const isFavorite = favorites.has(favObj);

    const toggleFavorite = (e) => {
        e.stopPropagation();
        if (isFavorite) {
            removeFavorite("idiom", entry._id);
        } else {
            addFavorite("idiom", entry._id);
        }
    };

    return (
        <div className="revise-container" aria-expanded={active}>
            <div className="revise-container-item">
                <div className="revise-container-top" role="tab" onClick={togglePanel}>
                    <div className="word-container-top">
                        <h3>{entry.idiom}</h3>
                        <div className="update-icons">
                            {user && (
                                <>
                                    <button onClick={toggleFavorite}>
                                        {isFavorite ? (
                                            <FaStar className="star-icon" />
                                        ) : (
                                            <FaRegStar className="star-icon" />
                                        )}
                                    </button>
                                    {active && <button onClick={handleUpdate}>Edit</button>}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="revise-container-bottom" style={innerStyle} aria-hidden={!active}>
                    <div className="revise-subcontainer-bottom">
                        <div className="word-container-bottom" ref={innerRef}>
                            {entry.meaning && <p>{entry.meaning}</p>}
                            {entry.example && <p>"{entry.example}"</p>}
                        </div>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        showCloseIcon={false}
                        closeOnOverlayClick={false}
                        center
                    >
                        <EditIdiom entry={entry} onClose={handleClose} />
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default IdiomAccordion;
