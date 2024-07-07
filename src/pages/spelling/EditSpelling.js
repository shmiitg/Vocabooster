import React, { useState, useContext, useEffect } from "react";
import { UpdateContext } from "../../context/UpdateContext";

export default function EditSpelling({ spelling, onClose }) {
    const { setWordUpdate } = useContext(UpdateContext);
    const wordId = spelling._id;
    const [updatedSpelling, setUpdatedSpelling] = useState({ ...spelling });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedSpelling({
            ...updatedSpelling,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        const { spelling } = updatedSpelling;

        if (spelling === "") {
            setError("Spelling is required");
            return;
        }

        const url = `${process.env.REACT_APP_SERVER_URL}/spelling/${wordId}`;
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ spelling }),
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
                <strong>Edit Spelling</strong>
            </h3>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Spelling:</div>
                    <input
                        type="text"
                        name="spelling"
                        value={updatedSpelling.spelling}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
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
