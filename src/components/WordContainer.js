import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditWord from "./EditWord";
import DeleteWord from "./DeleteWord";
import { underlineWord } from "../utils/utils";

export default function WordContainer({ word }) {
    const [open, setOpen] = useState(false);
    const [updateType, setUpdateType] = useState("edit");

    // Function to capitalize the first letter of a word
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const isEditable = () => {
        const now = new Date();
        const createdAt = new Date(word.updatedAt);
        const diffInHours = (now - createdAt) / (1000 * 60 * 60);
        return diffInHours <= 24 * 3;
    };

    const handleUpdate = (type) => {
        setOpen(true);
        setUpdateType(type);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="word-container-item">
            <div className="word-container-top">
                <h3>{capitalizeFirstLetter(word.word)}</h3>
                {isEditable() && (
                    <div className="update-icons">
                        <button onClick={() => handleUpdate("edit")}>Edit</button>
                        <button onClick={() => handleUpdate("delete")}>Delete</button>
                    </div>
                )}
            </div>
            {word.meanings.map((meaning, index) => (
                <div key={index} className="word-container-bottom">
                    {meaning.definition && <p>{meaning.definition}</p>}
                    {meaning.example && <p>"{underlineWord(meaning.example, word.word)}"</p>}
                    {meaning.synonyms?.length > 0 && (
                        <p>
                            <strong>Synonyms:</strong> {meaning.synonyms.join(", ")}
                        </p>
                    )}
                    {meaning.antonyms?.length > 0 && (
                        <p>
                            <strong>Antonyms:</strong> {meaning.antonyms.join(", ")}
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
                    <EditWord word={word} onClose={handleClose} />
                ) : (
                    <DeleteWord word={word} onClose={handleClose} />
                )}
            </Modal>
        </div>
    );
}
