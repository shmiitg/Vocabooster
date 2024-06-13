import React, { useState, useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";

export default function EditWordDialog({ onClose, word }) {
    const { setWordUpdate } = useContext(UpdateContext);
    const wordId = word._id;
    const [updatedWord, setUpdatedWord] = useState({ ...word });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "word") {
            setUpdatedWord({
                ...updatedWord,
                [name]: value,
            });
        } else {
            setUpdatedWord({
                ...updatedWord,
                meanings: [
                    {
                        ...updatedWord.meanings[0],
                        [name]: value,
                    },
                ],
            });
        }
    };

    const handleSubmit = async () => {
        const { word, meanings } = updatedWord;
        if (typeof meanings[0].synonyms === "string") {
            meanings[0].synonyms = meanings[0].synonyms.split(",").map((item) => item.trim());
        }
        if (typeof meanings[0].antonyms === "string") {
            meanings[0].antonyms = meanings[0].antonyms.split(",").map((item) => item.trim());
        }

        const url = `${process.env.REACT_APP_SERVER_URL}/words/${wordId}`;
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ word, meanings }),
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
            <h3>Edit Word</h3>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Word:</div>
                    <input
                        type="text"
                        name="word"
                        value={updatedWord.word}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Definition:</div>
                    <input
                        type="text"
                        name="definition"
                        value={updatedWord.meanings[0].definition}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Synonyms (comma-separated):</div>
                    <input
                        type="text"
                        name="synonyms"
                        value={updatedWord.meanings[0].synonyms}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Antonyms (comma-separated):</div>
                    <input
                        type="text"
                        name="antonyms"
                        value={updatedWord.meanings[0].antonyms}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Example:</div>
                    <input
                        type="text"
                        name="example"
                        value={updatedWord.meanings[0].example}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="modal-buttons">
                <button className="submit-button" onClick={onClose}>
                    Cancel
                </button>
                <button className="submit-button" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
}
