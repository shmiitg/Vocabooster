import React, { useState, useEffect, useRef } from "react";
// import ReactDOM from "react-dom";

const Panel = ({ label, content, active, togglePanel }) => {
    const [height, setHeight] = useState(0);
    const innerRef = useRef(null);

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
