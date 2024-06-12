import React from "react";

export default function WordFrame({ word }) {
    return (
        <>
            {word.meanings.map((meaning, index) => (
                <div key={index} className="word-frame">
                    {meaning.definition && <p className="word-meaning">{meaning.definition}</p>}
                    {meaning.example && <p className="word-example">"{meaning.example}"</p>}
                    {meaning.synonyms && (
                        <p>
                            <strong>Synonyms:</strong> {meaning.synonyms.join(", ")}
                        </p>
                    )}
                    {meaning.antonyms && (
                        <p>
                            <strong>Antonyms:</strong> {meaning.antonyms.join(", ")}
                        </p>
                    )}
                </div>
            ))}
        </>
    );
}
