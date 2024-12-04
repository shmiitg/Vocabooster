import React, { useState, useContext, useEffect } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { AuthContext } from "../../context/AuthContext";
import { trimCapitalize } from "../../utils/utils";

export default function EditPhrasalDialog({ entry, onClose }) {
    const { userRole } = useContext(AuthContext);
    const { setWordUpdate } = useContext(UpdateContext);
    const entryId = entry._id;
    const [updatedEntry, setUpdatedEntry] = useState({
        ...entry,
        meanings: entry.meanings.map((meaning) => ({
            ...meaning,
            definition: meaning.definition ? meaning.definition : "",
            example: meaning.example ? meaning.example : "",
        })),
    });
    const [error, setError] = useState("");

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === "phrasal") {
            setUpdatedEntry({
                ...updatedEntry,
                [name]: value,
            });
        } else {
            const newMeanings = updatedEntry.meanings.map((meaning, i) => {
                if (i === index) {
                    return { ...meaning, [name]: value };
                }
                return meaning;
            });
            setUpdatedEntry({
                ...updatedEntry,
                meanings: newMeanings,
            });
        }
    };

    const handleAddMeaning = () => {
        setUpdatedEntry({
            ...updatedEntry,
            meanings: [
                ...updatedEntry.meanings,
                {
                    definition: "",
                    example: "",
                },
            ],
        });
    };

    const handleDeleteMeaning = (index) => {
        setUpdatedEntry({
            ...updatedEntry,
            meanings: updatedEntry.meanings.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e) => {
        const { phrasal, meanings } = updatedEntry;

        const finalPhrasal = trimCapitalize(phrasal);

        if (finalPhrasal === "") {
            setError("Phrasal Verb is required");
            return;
        }

        // Filter out empty meanings and validate
        const updatedMeanings = meanings.filter((meaning) => {
            const hasDefinition = meaning.definition.trim() !== "";
            const hasExample = meaning.example.trim() !== "";

            return hasDefinition || hasExample;
        });

        // Check if there are no valid meanings
        if (updatedMeanings.length === 0) {
            setError("Please fill out at least one entry");
            return;
        }

        const finalMeanings = updatedMeanings.map((meaning) => ({
            definition: meaning.definition.trim(),
            example: meaning.example.trim(),
        }));

        if (userRole === "admin") {
            const url = `${process.env.REACT_APP_SERVER_URL}/phrasal/${entryId}`;
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phrasal: finalPhrasal, meanings: finalMeanings }),
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
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Phrasal Verb:</div>
                    <input
                        type="text"
                        name="phrasal"
                        value={updatedEntry.phrasal}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
            </div>
            {updatedEntry.meanings.map((meaning, index) => (
                <div key={index} className={`part-group ${index === 0 ? "first-part-group" : ""}`}>
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
                    <div className="form-group">
                        <div className="form-sub-group">
                            Example:
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
                            className="delete-part-button"
                            type="button"
                            onClick={() => handleDeleteMeaning(index)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
            <div className="add-part">
                {error && <p className="error-message">*{error}</p>}
                <button className="add-part-button" type="button" onClick={handleAddMeaning}>
                    + Add Meaning
                </button>
            </div>
            <div className="modal-actions">
                <button type="button" className="submit-button" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" className="submit-button" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
}
