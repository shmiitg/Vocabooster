import React, { useState, useEffect, useRef } from "react";
import { sortCommonTerms } from "../../utils/sort";

const Accordion = ({ label, content, active, togglePanel }) => {
    const [height, setHeight] = useState(0);
    const innerRef = useRef(null);

    sortCommonTerms(content);

    useEffect(() => {
        if (innerRef.current) {
            setHeight(innerRef.current.scrollHeight - 10);
        }
    }, []);

    const innerStyle = {
        height: `${active ? height : 0}px`,
    };

    return (
        <div className="panel" aria-expanded={active}>
            <button className="panel__label" role="tab" onClick={togglePanel}>
                {label}
            </button>
            <div className="panel__inner" ref={innerRef} style={innerStyle} aria-hidden={!active}>
                <div className="panel__content">
                    <div className="panel__section">
                        {content.map((entry, index) => (
                            <>
                                {index < content.length / 2 && (
                                    <div className="panel__word" key={index}>
                                        {entry.word ? (
                                            <div>
                                                <strong>{entry.word}:</strong> {entry.description}
                                            </div>
                                        ) : (
                                            <div>{entry.description}</div>
                                        )}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                    <div className="panel__section">
                        {content.map((entry, index) => (
                            <>
                                {index >= content.length / 2 && (
                                    <div className="panel__word" key={index}>
                                        {entry.word ? (
                                            <div>
                                                <strong>{entry.word}:</strong> {entry.description}
                                            </div>
                                        ) : (
                                            <div>{entry.description}</div>
                                        )}
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
