import React, { useState } from "react";
import "../css/MainScreen.css";
import WordFrame from "./WordFrame";

const MainScreen = ({ words }) => {
    const [selectedAlphabet, setSelectedAlphabet] = useState("A");

    // Function to capitalize the first letter of a word
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    // Filter words based on selected alphabet
    const filteredWords = words.filter((word) =>
        word.word.toLowerCase().startsWith(selectedAlphabet.toLowerCase())
    );

    // Sort the filtered words alphabetically
    filteredWords.sort((a, b) => {
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

    return (
        <>
            <div className="alphabet-nav">
                <div className="alphabets">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                        <button key={letter} onClick={() => setSelectedAlphabet(letter)}>
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
            <div className="MainScreen">
                <h2 className="MainScreen-heading">Words starting with "{selectedAlphabet}"</h2>
                <ul className="MainScreen-list">
                    {filteredWords.map((word) => (
                        <li key={word.word} className="MainScreen-item">
                            <h3 className="MainScreen-word">{capitalizeFirstLetter(word.word)}</h3>
                            {word.meanings.map((meaning, index) => (
                                <WordFrame meaning={meaning} index={index} />
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MainScreen;
