import React, { useState, useContext, useEffect } from "react";
import { UpdateContext } from "../context/UpdateContext";

export default function NewOWS({ onClose }) {
    const { setWordUpdate } = useContext(UpdateContext);

    const [newWord, setNewWord] = useState({
        entries: [{ word: "", definition: "", example: "" }],
    });
    const [error, setError] = useState(null);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newEntries = newWord.entries.map((entry, i) => {
            if (i === index) {
                return { ...entry, [name]: value };
            }
            return entry;
        });
        setNewWord({
            ...newWord,
            entries: newEntries,
        });
    };

    const handleAddEntry = () => {
        setNewWord({
            ...newWord,
            entries: [
                ...newWord.entries,
                {
                    word: "",
                    definition: "",
                    example: "",
                },
            ],
        });
    };

    const handleDeleteEntry = (index) => {
        setNewWord({
            ...newWord,
            entries: newWord.entries.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async () => {
        const { entries } = newWord;

        let checkValidation = true; // to check for an assciated word with each definition of example

        // Filter out empty entries and check validation
        const updatedEntries = entries.filter((entry) => {
            const hasWord = entry.word.trim() !== "";
            const hasDefinition = entry.definition.trim() !== "";
            const hasExample = entry.example.trim() !== "";

            // Validation: If definition or example is written, then word is necessary
            if ((hasDefinition || hasExample) && !hasWord) {
                setError("Each definition or example must have an associated word");
                checkValidation = false;
                return false;
            }

            // Include non-empty entries
            return hasWord || hasDefinition || hasExample;
        });

        if (!checkValidation) {
            return;
        }

        // Check if there are no valid entries
        if (updatedEntries.length === 0) {
            setError("Please fill out at least one word entry.");
            return; // Prevent submission
        }

        // Perform the API call only if validation passes
        const url = `${process.env.REACT_APP_SERVER_URL}/ows/save`;
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ows: updatedEntries }),
        });
        const data = await res.json();
        if (res.status === 201) {
            // assuming 201 status code for created
            window.alert(data.message);
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
                <strong>Add New Word</strong>
            </h3>
            {newWord.entries.map((entry, index) => (
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
            <div className="add-part">
                {error && <p className="error-message">*{error}</p>}
                <button className="add-part-button" onClick={handleAddEntry}>
                    + Add Entry
                </button>
            </div>
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
