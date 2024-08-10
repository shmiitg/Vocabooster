import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditIdiom from "./EditIdiom";
import DeleteEntry from "../../components/DeleteEntry";

export default function IdiomContainer({ entry }) {
    const [open, setOpen] = useState(false);
    const [updateType, setUpdateType] = useState("edit");

    const handleUpdate = (type) => {
        setOpen(true);
        setUpdateType(type);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="word-container">
            <div className="word-container-top">
                <h3>{entry.idiom}</h3>
                <div className="update-icons">
                    <button onClick={() => handleUpdate("edit")}>Edit</button>
                    <button onClick={() => handleUpdate("delete")}>Delete</button>
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
