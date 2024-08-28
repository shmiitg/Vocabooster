import React, { useState, useContext } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditSpelling from "./EditSpelling";
import DeleteEntry from "../../components/DeleteEntry";
import { trimCapitalize } from "../../utils/utils";
import { AuthContext } from "../../context/AuthContext";

export default function SpellingContainer({ entry }) {
    const { user } = useContext(AuthContext);
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
                <h3>{trimCapitalize(entry.spelling)}</h3>
                {user && (
                    <div className="update-icons">
                        <button onClick={() => handleUpdate("edit")}>Edit</button>
                        <button onClick={() => handleUpdate("delete")}>Delete</button>
                    </div>
                )}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                showCloseIcon={false}
                closeOnOverlayClick={false}
                center
            >
                {updateType === "edit" ? (
                    <EditSpelling entry={entry} onClose={handleClose} />
                ) : (
                    <DeleteEntry entryType="spelling" entry={entry} onClose={handleClose} />
                )}
            </Modal>
        </div>
    );
}
