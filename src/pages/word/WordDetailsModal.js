import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const WordDetailsModal = ({ word, onClose }) => {
    const [wordDetails, setWordDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchWordDetails = async () => {
        const words = JSON.parse(localStorage.getItem("words"));
        try {
            const lowerCaseWord = word.toLowerCase();
            const wordDetails = words.find((w) => w.word.toLowerCase() === lowerCaseWord);
            if (wordDetails) {
                setWordDetails(wordDetails);
                setLoading(false);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
    };

    useEffect(() => {
        fetchWordDetails();
    }, [word]);

    if (loading) {
        return <></>;
    }

    return (
        <Modal open={true} onClose={onClose} closeOnOverlayClick={false} center>
            <div className="modal-content">
                {error ? (
                    <div>Error</div>
                ) : (
                    <>
                        <h3>
                            <strong>{wordDetails.word}</strong>
                        </h3>
                        {wordDetails.meanings.map((meaning, index) => (
                            <div key={index} className="word-container-bottom">
                                {meaning.definition && <p>{meaning.definition}</p>}
                                {meaning.example && <p>"{meaning.example}"</p>}
                                {meaning.synonyms?.length > 0 && (
                                    <p>
                                        <strong>Synonyms:</strong> {meaning.synonyms.join(", ")}
                                    </p>
                                )}
                                {meaning.antonyms?.length > 0 && (
                                    <p>
                                        <strong>Antonyms:</strong> {meaning.antonyms.join(", ")}
                                    </p>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </Modal>
    );
};

export default WordDetailsModal;
