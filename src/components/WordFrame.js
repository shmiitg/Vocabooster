import React from "react";

export default function WordFrame({ meaning, index }) {
    return (
        <div key={index} className="MainScreen-meaning">
            {meaning.definition && (
                <p>
                    <strong>Definition:</strong> {meaning.definition}
                </p>
            )}
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
            {meaning.example && (
                <p>
                    <strong>Example:</strong> {meaning.example}
                </p>
            )}
        </div>
    );
}
