import React, { useContext, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditPhrasal from "./EditPhrasal";
import DeleteEntry from "../../components/DeleteEntry";
import { trimCapitalize } from "../../utils/utils";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const PhrasalContainer = ({ entry }) => {
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

    const favObj = { itemType: "phrasal", itemId: String(entry._id) };
    const isFavorite = favorites.has(favObj);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite("phrasal", entry._id);
        } else {
            addFavorite("phrasal", entry._id);
        }
    };

    return (
        <div className="word-container">
            <div className="word-container-top">
                <h3>{trimCapitalize(entry.phrasal)}</h3>
                {user && (
                    <div className="update-icons">
                        <button onClick={toggleFavorite}>
                            {isFavorite ? (
                                <FaStar className="star-icon" />
                            ) : (
                                <FaRegStar className="star-icon" />
                            )}
                        </button>
                        <button onClick={() => handleUpdate("edit")}>Edit</button>
                        <button onClick={() => handleUpdate("delete")}>Delete</button>
                    </div>
                )}
            </div>
            {entry.meanings.map((meaning, index) => (
                <div key={index} className="word-container-bottom">
                    {meaning.definition && <p>{meaning.definition}</p>}
                    {meaning.example && <p>"{meaning.example}"</p>}
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
                    <EditPhrasal entry={entry} onClose={handleClose} />
                ) : (
                    <DeleteEntry entryType="phrasal" entry={entry} onClose={handleClose} />
                )}
            </Modal>
        </div>
    );
};

export default PhrasalContainer;
