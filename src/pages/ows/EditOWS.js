import React, { useState, useContext, useEffect } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { AuthContext } from "../../context/AuthContext";
import { trimCapitalize } from "../../utils/utils";

export default function EditOws({ ows, onClose }) {
    const { userRole } = useContext(AuthContext);
    const { setWordUpdate } = useContext(UpdateContext);
    const owsId = ows._id;

    const initializeEntries = (entries) => {
        return entries.map((entry) => ({
            word: entry.word,
            definition: entry?.definition || "",
            example: entry?.example || "",
        }));
    };

    const [updatedWord, setUpdatedWord] = useState({
        ...ows,
        entries: initializeEntries(ows.ows),
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

        let checkValidation = true; // to check for an assciated word with each definition of example

        // Filter out empty entries and check validation
        const updatedEntries = entries.filter((entry) => {
            const hasWord = entry.word.trim() !== "";
            const hasDefinition = entry.definition.trim() !== "";
            const hasExample = entry.example.trim() !== "";

            // Validation: If definition or example is written, then word is necessary
            if ((hasDefinition || hasExample) && !hasWord) {
                setError("Each definition or example must have an associated word.");
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
            setError("Please fill out at least one word entry");
            return; // Prevent submission
        }

        const finalEntries = updatedEntries.map((entry) => {
            const word = trimCapitalize(entry.word);
            const definition = entry.definition.trim();
            const example = entry.example.trim();

            return { word, definition, example };
        });

        finalEntries.sort((a, b) => a.word.localeCompare(b.word));

        if (userRole === "admin") {
            const url = `${process.env.REACT_APP_SERVER_URL}/ows/${owsId}`;
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ows: finalEntries }),
            });
            const data = await res.json();
            if (res.status === 200) {
                onClose();
                setWordUpdate((prev) => !prev);
            } else {
                setError(data.error);
            }
        } else {
            setError("Only admin can update");
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
