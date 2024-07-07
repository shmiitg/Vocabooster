import React, { useState, useContext } from "react";
import { Modal } from "react-responsive-modal";
import EditOWS from "./EditOWS";
import DeleteEntry from "../../components/DeleteEntry";
import { underlineWord } from "../../utils/utils";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

export default function OWSContainer({ ows }) {
    const { user, addFavorite, removeFavorite, favorites } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [updateType, setUpdateType] = useState("edit");

    // Function to capitalize the first letter of a word
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const handleUpdate = (type) => {
        setOpen(true);
        setUpdateType(type);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const favObj = { itemType: "ows", itemId: String(ows._id) };
    const isFavorite = favorites.has(favObj);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite("ows", ows._id);
        } else {
            addFavorite("ows", ows._id);
        }
    };

    return (
        <div className="word-container-item">
            {ows.ows.map((entry, index) => (
                <div key={index} className="word-container">
                    <div className="word-container-top">
                        <h3>{capitalizeFirstLetter(entry.word)}</h3>
                        {index === 0 && (
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
                                <button onClick={() => handleUpdate("edit")}>Edit</button>
                                <button onClick={() => handleUpdate("delete")}>Delete</button>
                            </div>
                        )}
                    </div>
                    <div className="word-container-bottom reduce-margin">
                        {entry.definition && <p>{entry.definition}</p>}
                        {entry.example && <p>"{underlineWord(entry.example, entry.word)}"</p>}
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
                {updateType === "edit" ? (
                    <EditOWS ows={ows} onClose={handleClose} />
                ) : (
                    <DeleteEntry entryType="ows" entry={ows} onClose={handleClose} />
                )}
            </Modal>
        </div>
    );
}
