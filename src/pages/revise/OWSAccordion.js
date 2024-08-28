import React, { useState, useEffect, useContext, useRef } from "react";
import { Modal } from "react-responsive-modal";
import EditOWS from "../ows/EditOWS";
import { underlineWord, trimCapitalize } from "../../utils/utils";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

export default function OWSAccordion({ entry, active, togglePanel, owsChange }) {
    const [heights, setHeights] = useState({});
    const innerRefs = useRef([]);

    useEffect(() => {
        const newHeights = {};
        innerRefs.current.forEach((ref, index) => {
            if (ref) {
                newHeights[index] = ref.scrollHeight + 20;
            }
        });
        setHeights(newHeights);
    }, [owsChange]);

    const { user, addFavorite, removeFavorite, favorites } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleUpdate = (e) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const favObj = { itemType: "ows", itemId: String(entry._id) };
    const isFavorite = favorites.has(favObj);

    const toggleFavorite = (e) => {
        e.stopPropagation();
        if (isFavorite) {
            removeFavorite("ows", entry._id);
        } else {
            addFavorite("ows", entry._id);
        }
    };

    return (
        <div className="revise-container" aria-expanded={active}>
            {entry.ows.map((part, index) => (
                <div className="revise-container-item" key={index}>
                    <div className="revise-container-top" role="tab" onClick={togglePanel}>
                        <div className="word-container-top">
                            <h3>{trimCapitalize(part.word)}</h3>
                            {index === 0 && (
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
                            )}
                        </div>
                    </div>
                    <div
                        className="revise-container-bottom"
                        style={{ height: `${active ? heights[index] : 0}px` }}
                        aria-hidden={!active}
                    >
                        <div
                            className="revise-subcontainer-bottom"
                            ref={(el) => (innerRefs.current[index] = el)}
                        >
                            <div className="word-container-bottom">
                                {part.definition && <p>{part.definition}</p>}
                                {part.example && <p>"{underlineWord(part.example, part.word)}"</p>}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <Modal
                open={open}
                onClose={handleClose}
                showCloseIcon={false}
                closeOnOverlayClick={false}
                center
            >
                <EditOWS ows={entry} onClose={handleClose} />
            </Modal>
        </div>
    );
}
