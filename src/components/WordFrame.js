import React, { useState } from "react";
import { Modal } from "react-responsive-modal"; // Import the modal component
import "react-responsive-modal/styles.css"; // Import the styles
import EditWord from "./EditWord"; // Import the edit form component

export default function WordFrame({ word }) {
    const [open, setOpen] = useState(false);

    // Function to capitalize the first letter of a word
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const isEditable = () => {
        const now = new Date();
        const createdAt = new Date(word.updatedAt);
        const diffInHours = (now - createdAt) / (1000 * 60 * 60);
        return diffInHours <= 24;
    };

    const handleEditClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="word-frame-container">
                <h3 className="MainScreen-word">
                    {capitalizeFirstLetter(word.word)}
                    {isEditable() && (
                        <button className="edit-icon" onClick={handleEditClick}>
                            Edit
                        </button>
                    )}
                </h3>
                {word.meanings.map((meaning, index) => (
                    <div key={index} className="word-frame">
                        {meaning.definition && <p className="word-meaning">{meaning.definition}</p>}
                        {meaning.example && <p className="word-example">"{meaning.example}"</p>}
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
                <Modal open={open} onClose={handleClose} center>
                    <EditWord word={word} onClose={handleClose} />
                </Modal>
            </div>
        </>
    );
}
