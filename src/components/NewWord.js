import React, { useState } from "react";

const NewWord = () => {
    const [newWord, setNewWord] = useState({
        word: "",
        meanings: [
            {
                definition: "",
                synonyms: [],
                antonyms: [],
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
        } else if (name === "synonyms" || name === "antonyms") {
            setNewWord({
                ...newWord,
                meanings: [
                    {
                        ...newWord.meanings[0],
                        [name]: value.split(",").map((item) => item.trim()), // Split and trim values
                    },
                ],
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
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/words/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ word, meanings }),
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.message);
            setNewWord({
                word: "",
                meanings: [
                    {
                        definition: "",
                        synonyms: [],
                        antonyms: [],
                        example: "",
                    },
                ],
            });
        } else {
            window.alert(data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Word:
                    <input
                        type="text"
                        name="word"
                        value={newWord.word}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Definition:
                    <input
                        type="text"
                        name="definition"
                        value={newWord.meanings[0].definition}
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
                        value={newWord.meanings[0].synonyms.join(", ")}
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
                        value={newWord.meanings[0].antonyms.join(", ")}
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
                        value={newWord.meanings[0].example}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button type="submit">Add Word</button>
        </form>
    );
};

export default NewWord;
