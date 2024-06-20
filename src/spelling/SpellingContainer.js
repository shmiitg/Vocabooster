import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditSpelling from "./EditSpelling";
import DeleteSpelling from "./DeleteSpelling";

export default function SpellingContainer({ spelling }) {
    const [open, setOpen] = useState(false);
    const [updateType, setUpdateType] = useState("edit");

    const capitalizeFirstLetter = (spelling) => {
        return spelling.charAt(0).toUpperCase() + spelling.slice(1);
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
                <h3>{capitalizeFirstLetter(spelling.spelling)}</h3>
                <div className="update-icons">
                    <button onClick={() => handleUpdate("edit")}>Edit</button>
                    <button onClick={() => handleUpdate("delete")}>Delete</button>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                showCloseIcon={false}
                closeOnOverlayClick={false}
                center
            >
                {updateType === "edit" ? (
                    <EditSpelling spelling={spelling} onClose={handleClose} />
                ) : (
                    <DeleteSpelling spelling={spelling} onClose={handleClose} />
                )}
            </Modal>
        </div>
    );
}
