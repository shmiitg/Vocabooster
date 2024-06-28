import React, { useState, useContext, useEffect } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { idiomTypes } from "./IdiomTypes";

const EditIdiom = ({ idiom, onClose }) => {
    const { setWordUpdate } = useContext(UpdateContext);
    const idiomId = idiom._id;
    const [updatedIdiom, setUpdatedIdiom] = useState({ ...idiom });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedIdiom({
            ...updatedIdiom,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!updatedIdiom.idiom) {
            setError("Idiom is required");
            return;
        }

        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/idiom/${idiomId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedIdiom),
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
                        value={updatedIdiom.idiom}
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
                        value={updatedIdiom.meaning}
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
                        value={updatedIdiom.example}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Type:</div>
                    <div className="select-wrapper">
                        {" "}
                        {/* Add this wrapper */}
                        <select
                            className="idiom-type-select"
                            name="type"
                            value={updatedIdiom.type}
                            onChange={handleChange}
                        >
                            {idiomTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
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
