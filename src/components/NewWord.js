import React, { useState, useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";

const NewWord = () => {
    const { setWordUpdate } = useContext(UpdateContext);
    const [newWord, setNewWord] = useState({
        word: "",
        meanings: [
            {
                definition: "",
                synonyms: "",
                antonyms: "",
                example: "",
            },
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "word") {
            setNewWord({
                ...newWord,
                [name]: value,
            });
        } else {
            setNewWord({
                ...newWord,
                meanings: [
                    {
                        ...newWord.meanings[0],
                        [name]: value,
                    },
                ],
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { word, meanings } = newWord;

        // Convert synonyms and antonyms strings to arrays
        const updatedMeanings = {
            ...meanings[0],
            synonyms:
                meanings[0].synonyms.length > 0
                    ? meanings[0].synonyms.split(",").map((item) => item.trim())
                    : [],
            antonyms:
                meanings[0].antonyms.length > 0
                    ? meanings[0].antonyms.split(",").map((item) => item.trim())
                    : [],
        };

        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/words/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ word, meanings: [updatedMeanings] }),
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.message);
            setNewWord({
                word: "",
                meanings: [
                    {
                        definition: "",
                        synonyms: "",
                        antonyms: "",
                        example: "",
                    },
                ],
            });
            setWordUpdate((prev) => !prev);
        } else {
            window.alert(data.error);
        }
    };

    return (
        <form className="new-word-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Word:</div>
                    <input
                        type="text"
                        name="word"
                        value={newWord.word}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Definition:</div>
                    <input
                        type="text"
                        name="definition"
                        value={newWord.meanings[0].definition}
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
                        value={newWord.meanings[0].synonyms}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name"> Antonyms (comma-separated):</div>
                    <input
                        type="text"
                        name="antonyms"
                        value={newWord.meanings[0].antonyms}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-sub-group">
                    Example:
                    <input
                        type="text"
                        name="example"
                        value={newWord.meanings[0].example}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button type="submit" className="submit-button">
                Add Word
            </button>
        </form>
    );
};

export default NewWord;
