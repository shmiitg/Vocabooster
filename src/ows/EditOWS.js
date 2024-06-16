import React, { useState, useContext, useEffect } from "react";
import { UpdateContext } from "../context/UpdateContext";

export default function EditWordDialog({ wordType, word, onClose }) {
    const { setWordUpdate } = useContext(UpdateContext);
    const wordId = word._id;

    const initializeEntries = (word) => {
        return word.word.map((w, index) => ({
            word: w,
            definition: word.meanings[index]?.definition || "",
            example: word.meanings[index]?.example || "",
        }));
    };

    const [updatedWord, setUpdatedWord] = useState({
        ...word,
        entries: initializeEntries(word),
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (!updatedWord.entries || updatedWord.entries.length === 0) {
            setUpdatedWord({
                ...updatedWord,
                entries: [{ word: "", definition: "", example: "" }],
            });
        }
    }, [updatedWord]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newEntries = updatedWord.entries.map((entry, i) => {
            if (i === index) {
                return { ...entry, [name]: value };
            }
            return entry;
        });
        setUpdatedWord({
            ...updatedWord,
            entries: newEntries,
        });
    };

    const handleAddEntry = () => {
        setUpdatedWord({
            ...updatedWord,
            entries: [
                ...updatedWord.entries,
                {
                    word: "",
                    definition: "",
                    example: "",
                },
            ],
        });
    };

    const handleDeleteEntry = (index) => {
        setUpdatedWord({
            ...updatedWord,
            entries: updatedWord.entries.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async () => {
        const { entries } = updatedWord;

        // Filter out empty entries and check validation
        const updatedEntries = entries.filter((entry) => {
            const hasWord = entry.word.trim() !== "";
            const hasDefinition = entry.definition.trim() !== "";
            const hasExample = entry.example.trim() !== "";

            // Validation: If definition or example is written, then word is necessary
            if ((hasDefinition || hasExample) && !hasWord) {
                setError("Each definition or example must have an associated word.");
                return false;
            }

            // Include non-empty entries
            return hasWord || hasDefinition || hasExample;
        });

        // Check if there are no valid entries
        if (updatedEntries.length === 0) {
            setError("Please fill out at least one word entry.");
            return; // Prevent submission
        }

        // Prepare the updated word object for submission
        const updatedWordForSubmission = {
            ...updatedWord,
            word: updatedEntries.map((entry) => entry.word),
            meanings: updatedEntries.map((entry) => ({
                definition: entry.definition,
                example: entry.example,
            })),
        };

        const url = `${process.env.REACT_APP_SERVER_URL}/${wordType}/${wordId}`;
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedWordForSubmission),
        });
        const data = await res.json();
        if (res.status === 200) {
            onClose();
            setWordUpdate((prev) => !prev);
        } else {
            setError(data.error);
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="modal-content">
            <h3>
                <strong>Edit Word</strong>
            </h3>
            {updatedWord.entries.map((entry, index) => (
                <div key={index} className={`part-group ${index === 0 ? "first-part-group" : ""}`}>
                    <div className="form-group">
                        <div className="form-sub-group">
                            <div className="form-group-name">Word:</div>
                            <input
                                type="text"
                                name="word"
                                value={entry.word}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-sub-group">
                            <div className="form-group-name">Definition:</div>
                            <input
                                type="text"
                                name="definition"
                                value={entry.definition}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-sub-group">
                            <div className="form-group-name">Example:</div>
                            <input
                                type="text"
                                name="example"
                                value={entry.example}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    </div>
                    {index > 0 && (
                        <button
                            className="delete-part-button"
                            onClick={() => handleDeleteEntry(index)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
            {error && <p className="error-message">{error}</p>}
            <button className="add-part-button" onClick={handleAddEntry}>
                + Add Entry
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
