import React, { useState, useContext, useEffect } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { trimCapitalize } from "../../utils/utils";

const NewSpelling = ({ onClose }) => {
    const { setWordUpdate } = useContext(UpdateContext);
    const [newSpelling, setNewSpelling] = useState({ spelling: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSpelling({
            ...newSpelling,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        const { spelling } = newSpelling;

        const finalSpelling = trimCapitalize(spelling);

        if (finalSpelling === "") {
            setError("Spelling is required");
            return;
        }

        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/spelling/save`, {
            method: "POST",
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
                <strong>Add New Spelling</strong>
            </h3>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Spelling:</div>
                    <input
                        type="text"
                        name="spelling"
                        value={newSpelling.spelling}
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
                    Add Spelling
                </button>
            </div>
        </div>
    );
};

export default NewSpelling;
