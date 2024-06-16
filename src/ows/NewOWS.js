import React, { useState } from "react";

const NewOWS = () => {
    const [newOWS, setNewOWS] = useState({
        word: "",
        meanings: [
            {
                definition: "",
                example: "",
            },
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "word") {
            setNewOWS({
                ...newOWS,
                [name]: value,
            });
        } else {
            setNewOWS({
                ...newOWS,
                meanings: [
                    {
                        ...newOWS.meanings[0],
                        [name]: value,
                    },
                ],
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { word, meanings } = newOWS;

        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/ows/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ word, meanings }),
        });
        const data = await res.json();
        if (res.status === 200) {
            window.alert(data.message);
            setNewOWS({
                word: "",
                meanings: [
                    {
                        definition: "",
                        example: "",
                    },
                ],
            });
            // setOwsUpdate((prev) => !prev);
        } else {
            window.alert(data.error);
        }
    };
    return (
        <div className="new-word-form-container">
            <form className="new-word-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="form-sub-group">
                        <div className="form-group-name">Word:</div>
                        <input
                            type="text"
                            name="word"
                            value={newOWS.word}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-sub-group">
                        <div className="form-group-name">Definition:</div>
                        <input
                            type="text"
                            name="definition"
                            value={newOWS.meanings[0].definition}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-sub-group">
                        Example:
                        <input
                            type="text"
                            name="example"
                            value={newOWS.meanings[0].example}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="submit" className="submit-button">
                    Add Word
                </button>
            </form>
        </div>
    );
};

export default NewOWS;
