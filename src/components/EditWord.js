import React, { useState } from "react";

export default function EditWordDialog({ onClose, word }) {
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
        } else {
            window.alert(data.error);
        }
    };

    return (
        <div className="modal-content">
            <h3>Edit Word</h3>
            <div>
                <label>
                    Word:
                    <input
                        type="text"
                        name="word"
                        value={updatedWord.word}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Definition:
                    <input
                        type="text"
                        name="definition"
                        value={updatedWord.meanings[0].definition}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Synonyms (comma-separated):
                    <input
                        type="text"
                        name="synonyms"
                        value={updatedWord.meanings[0].synonyms}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Antonyms (comma-separated):
                    <input
                        type="text"
                        name="antonyms"
                        value={updatedWord.meanings[0].antonyms}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Example:
                    <input
                        type="text"
                        name="example"
                        value={updatedWord.meanings[0].example}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="modal-actions">
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
}
