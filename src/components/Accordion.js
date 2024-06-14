import React, { useState, useRef } from "react";

const Accordion = ({ cluster }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    // Sort the filtered words alphabetically
    cluster.words.sort((a, b) => {
        const wordA = a.word.toLowerCase();
        const wordB = b.word.toLowerCase();
        if (wordA < wordB) {
            return -1;
        }
        if (wordA > wordB) {
            return 1;
        }
        return 0;
    });

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`accordion-item ${isOpen ? "open" : ""}`}>
            <div className="accordion-title" onClick={toggleAccordion}>
                <h3>{cluster.name}</h3>
                <div>{isOpen ? "-" : "+"}</div>
            </div>
            <div
                className="accordion-content"
                ref={contentRef}
                style={
                    isOpen
                        ? { maxHeight: contentRef.current.scrollHeight + "px" }
                        : { maxHeight: "0px" }
                }
            >
                <div className="word-container">
                    <div className="word-section">
                        {cluster.words.map((word, index) => (
                            <>
                                {index % 2 === 0 && (
                                    <div className="word" key={index}>
                                        <strong>{word.word}:</strong> {word.description}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                    <div className="word-section">
                        {cluster.words.map((word, index) => (
                            <>
                                {index % 2 === 1 && (
                                    <div className="word" key={index}>
                                        <strong>{word.word}:</strong> {word.description}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
