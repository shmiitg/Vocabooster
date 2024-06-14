import React, { useState, useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";

export default function EditWordDialog({ wordType, word, onClose }) {
    const { setWordUpdate } = useContext(UpdateContext);
    const wordId = word._id;
    console.log(wordId);
    const [updatedWord, setUpdatedWord] = useState({ ...word });

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === "word") {
            setUpdatedWord({
                ...updatedWord,
                [name]: value,
            });
        } else {
            const newMeanings = updatedWord.meanings.map((meaning, i) => {
                if (i === index) {
                    return { ...meaning, [name]: value };
                }
                return meaning;
            });
            setUpdatedWord({
                ...updatedWord,
                meanings: newMeanings,
            });
        }
    };

    const handleAddMeaning = () => {
        if (wordType === "word") {
            setUpdatedWord({
                ...updatedWord,
                meanings: [
                    ...updatedWord.meanings,
                    {
                        definition: "",
                        synonyms: "",
                        antonyms: "",
                        example: "",
                    },
                ],
            });
        } else {
            setUpdatedWord({
                ...updatedWord,
                meanings: [
                    ...updatedWord.meanings,
                    {
                        definition: "",
                        example: "",
                    },
                ],
            });
        }
    };

    const handleDeleteMeaning = (index) => {
        setUpdatedWord({
            ...updatedWord,
            meanings: updatedWord.meanings.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async () => {
        const { word, meanings } = updatedWord;

        // Filter out empty meanings
        let updatedMeanings;
        if (wordType === "word") {
            const filteredMeanings = meanings.filter(
                (meaning) =>
                    meaning.definition.trim() !== "" ||
                    (Array.isArray(meaning.synonyms)
                        ? meaning.synonyms.join("").trim() !== ""
                        : meaning.synonyms.trim() !== "") ||
                    (Array.isArray(meaning.antonyms)
                        ? meaning.antonyms.join("").trim() !== ""
                        : meaning.antonyms.trim() !== "") ||
                    meaning.example.trim() !== ""
            );
            updatedMeanings = filteredMeanings.map((meaning) => ({
                ...meaning,
                synonyms: Array.isArray(meaning.synonyms)
                    ? meaning.synonyms
                    : meaning.synonyms.trim()
                    ? meaning.synonyms.split(",").map((item) => item.trim())
                    : [],
                antonyms: Array.isArray(meaning.antonyms)
                    ? meaning.antonyms
                    : meaning.antonyms.trim()
                    ? meaning.antonyms.split(",").map((item) => item.trim())
                    : [],
            }));
        } else {
            updatedMeanings = meanings.filter(
                (meaning) => meaning.definition.trim() !== "" || meaning.example.trim() !== ""
            );
        }

        const url = `${process.env.REACT_APP_SERVER_URL}/${wordType}/${wordId}`;
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ word, meanings: updatedMeanings }),
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
                <strong>Edit Word</strong>
            </h3>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Word:</div>
                    <input
                        type="text"
                        name="word"
                        value={updatedWord.word}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </div>
            {updatedWord.meanings.map((meaning, index) => (
                <div
                    key={index}
                    className={`meaning-group ${index === 0 ? "first-meaning-group" : ""}`}
                >
                    <div className="form-group">
                        <div className="form-sub-group">
                            <div className="form-group-name">Definition:</div>
                            <input
                                type="text"
                                name="definition"
                                value={meaning.definition}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    </div>
                    {wordType === "word" && (
                        <>
                            <div className="form-group">
                                <div className="form-sub-group">
                                    <div className="form-group-name">
                                        Synonyms (comma-separated):
                                    </div>
                                    <input
                                        type="text"
                                        name="synonyms"
                                        value={
                                            Array.isArray(meaning.synonyms)
                                                ? meaning.synonyms.join(", ")
                                                : meaning.synonyms
                                        }
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-sub-group">
                                    <div className="form-group-name">
                                        Antonyms (comma-separated):
                                    </div>
                                    <input
                                        type="text"
                                        name="antonyms"
                                        value={
                                            Array.isArray(meaning.antonyms)
                                                ? meaning.antonyms.join(", ")
                                                : meaning.antonyms
                                        }
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <div className="form-sub-group">
                            <div className="form-group-name">Example:</div>
                            <input
                                type="text"
                                name="example"
                                value={meaning.example}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    </div>
                    {index > 0 && (
                        <button
                            className="delete-meaning-button"
                            onClick={() => handleDeleteMeaning(index)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
            <button className="add-meaning-button" onClick={handleAddMeaning}>
                + Add Meaning
            </button>
            <div className="modal-actions">
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
