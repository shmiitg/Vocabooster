import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import EditOWS from "./EditOWS";
import DeleteWord from "../components/DeleteWord";
import { underlineWord } from "../utils/utils";

export default function OWSContainer({ ows }) {
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
            {ows.ows.map((entry, index) => (
                <div key={index} className="word-container">
                    <div className="word-container-top">
                        <h3>{capitalizeFirstLetter(entry.word)}</h3>
                        {index === 0 && (
                            <div className="update-icons">
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
                    <DeleteWord wordType="ows" word={ows} onClose={handleClose} />
                )}
            </Modal>
        </div>
    );
}
