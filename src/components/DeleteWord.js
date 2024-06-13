import React, { useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";

const DeleteWord = ({ onClose, word }) => {
    const { setWordUpdate } = useContext(UpdateContext);
    const wordId = word._id;
    const handleSubmit = async () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/words/${wordId}`;
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (res.status === 200) {
            onClose();
            setWordUpdate((prev) => !prev);
        } else {
            window.alert(data.error);
        }
    };

    return (
        <div className="modal-content">
            <h3>
                Are you sure you want to delete <strong>{word.word}</strong>?
            </h3>
            <div className="modal-actions">
                <button className="submit-button" onClick={onClose}>
                    Cancel
                </button>
                <button className="submit-button" onClick={handleSubmit}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteWord;
