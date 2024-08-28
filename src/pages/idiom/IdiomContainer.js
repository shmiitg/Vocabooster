import React, { useState, useContext } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditIdiom from "./EditIdiom";
import DeleteEntry from "../../components/DeleteEntry";
import { trimCapitalize } from "../../utils/utils";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

export default function IdiomContainer({ entry }) {
    const { user, addFavorite, removeFavorite, favorites } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [updateType, setUpdateType] = useState("edit");

    const handleUpdate = (type) => {
        setOpen(true);
        setUpdateType(type);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const favObj = { itemType: "idiom", itemId: String(entry._id) };
    const isFavorite = favorites.has(favObj);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite("idiom", entry._id);
        } else {
            addFavorite("idiom", entry._id);
        }
    };

    return (
        <div className="word-container">
            <div className="word-container-top">
                <h3>{trimCapitalize(entry.idiom)}</h3>
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
                            <button onClick={() => handleUpdate("edit")}>Edit</button>
                            <button onClick={() => handleUpdate("delete")}>Delete</button>
                        </>
                    )}
                </div>
            </div>
            <div className="word-container-bottom">
                {entry.meaning && <p>{entry.meaning}</p>}
                {entry.example && <p>"{entry.example}"</p>}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                showCloseIcon={false}
                closeOnOverlayClick={false}
                center
            >
                {updateType === "edit" ? (
                    <EditIdiom entry={entry} onClose={handleClose} />
                ) : (
                    <DeleteEntry entryType="idiom" entry={entry} onClose={handleClose} />
                )}
            </Modal>
        </div>
    );
}
