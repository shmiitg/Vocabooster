import React, { useState, useEffect, useRef } from "react";

const Panel = ({ label, content, active, togglePanel }) => {
    const [height, setHeight] = useState(0);
    const innerRef = useRef(null);

    content.sort((a, b) => {
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

    useEffect(() => {
        if (innerRef.current) {
            setHeight(innerRef.current.scrollHeight - 10);
        }
    }, []);

    const innerStyle = {
        height: `${active ? height : 0}px`,
    };

    return (
        <div className="panel" role="tabpanel" aria-expanded={active}>
            <button className="panel__label" role="tab" onClick={togglePanel}>
                {label}
            </button>
            <div className="panel__inner" ref={innerRef} style={innerStyle} aria-hidden={!active}>
                <p className="panel__content">
                    <div className="panel__section">
                        {content.map((word, index) => (
                            <>
                                {index % 2 === 0 && (
                                    <div className="panel__word" key={index}>
                                        <strong>{word.word}:</strong> {word.description}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                    <div className="panel__section">
                        {content.map((word, index) => (
                            <>
                                {index % 2 === 1 && (
                                    <div className="panel__word" key={index}>
                                        <strong>{word.word}:</strong> {word.description}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </p>
            </div>
        </div>
    );
};

export default Panel;
