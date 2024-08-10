import React, { useState, useContext, useEffect } from "react";
import { UpdateContext } from "../../context/UpdateContext";

const EditIdiom = ({ entry, onClose }) => {
    const { setWordUpdate } = useContext(UpdateContext);
    const idiomId = entry._id;
    const [updatedEntry, setUpdatedEntry] = useState({ ...entry });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEntry({
            ...updatedEntry,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!updatedEntry.idiom) {
            setError("Idiom is required");
            return;
        }

        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/idiom/${idiomId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEntry),
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
                <strong>Edit Idiom</strong>
            </h3>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Idiom:</div>
                    <input
                        type="text"
                        name="idiom"
                        value={updatedEntry.idiom}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Meaning:</div>
                    <input
                        type="text"
                        name="meaning"
                        value={updatedEntry.meaning}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Example:</div>
                    <input
                        type="text"
                        name="example"
                        value={updatedEntry.example}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="add-part">{error && <p className="error-message">*{error}</p>}</div>
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
};

export default EditIdiom;
