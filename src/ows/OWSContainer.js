import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import EditWord from "./EditOWS";
import DeleteWord from "../components/DeleteWord";
import { underlineWord } from "../utils/utils";

export default function OWSContainer({ wordType, words }) {
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
    return (
        <div className="word-container-item">
            {words.word.map((word, index) => (
                <div className="word-container">
                    <div className="word-container-top">
                        <h3>{capitalizeFirstLetter(word)}</h3>
                        {index === 0 && (
                            <div className="update-icons">
                                <button onClick={() => handleUpdate("edit")}>Edit</button>
                                <button onClick={() => handleUpdate("delete")}>Delete</button>
                            </div>
                        )}
                    </div>
                    <div key={index} className="word-container-bottom">
                        {words.meanings[index].definition && (
                            <p>{words.meanings[index].definition}</p>
                        )}
                        {words.meanings[index].example && (
                            <p>"{underlineWord(words.meanings[index].example, word)}"</p>
                        )}
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
                    <EditWord wordType={wordType} word={words} onClose={handleClose} />
                ) : (
                    <DeleteWord wordType={wordType} word={words} onClose={handleClose} />
                )}
            </Modal>
        </div>
    );
}
