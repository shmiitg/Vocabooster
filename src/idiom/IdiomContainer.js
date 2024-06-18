import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditIdiom from "./EditIdiom";
import DeleteWord from "../components/DeleteWord";

export default function IdiomContainer({ idiom }) {
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
        <div className="word-container-item">
            <div className="word-container-top">
                <h3>{idiom.idiom}</h3>
                <div className="update-icons">
                    <button onClick={() => handleUpdate("edit")}>Edit</button>
                    <button onClick={() => handleUpdate("delete")}>Delete</button>
                </div>
            </div>
            <div className="word-container-bottom">
                <p>{idiom.meaning}</p>
                <p>{idiom.example}</p>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                showCloseIcon={false}
                closeOnOverlayClick={false}
                center
            >
                {updateType === "edit" ? (
                    <EditIdiom idiom={idiom} onClose={handleClose} />
                ) : (
                    <DeleteWord wordType="idiom" word={idiom} onClose={handleClose} />
                )}
            </Modal>
        </div>
    );
}
