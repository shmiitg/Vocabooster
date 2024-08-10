import React, { useState, useContext, useEffect } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { trimCapitalize } from "../../utils/utils";

export default function EditSpelling({ entry, onClose }) {
    const { setWordUpdate } = useContext(UpdateContext);
    const spellingId = entry._id;
    const [updatedSpelling, setUpdatedSpelling] = useState({ ...entry });
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

        const finalSpelling = trimCapitalize(spelling);

        if (finalSpelling === "") {
            setError("Spelling is required");
            return;
        }

        const url = `${process.env.REACT_APP_SERVER_URL}/spelling/${spellingId}`;
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ spelling: finalSpelling }),
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
