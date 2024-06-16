import React, { useState, useEffect } from "react";
import WordContainer from "../word/WordContainer";
import Loader from "../components/Loader";

const Revision = ({ words, loading }) => {
    const [revisionWords, setRevisionWords] = useState([]);

    useEffect(() => {
        const getRandomWords = (list, count) => {
            const shuffled = list.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };
        const selectedWords = getRandomWords(words, 10);

        // Sort the random words alphabetically
        selectedWords.sort((a, b) => {
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
        setRevisionWords([...selectedWords]);
    }, [words]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="main-container">
            <h2 className="main-container-heading">Daily Revision</h2>
            <ul className="main-container-list">
                {revisionWords.map((word) => (
                    <WordContainer key={word._id} word={word} />
                ))}
            </ul>
        </div>
    );
};

export default Revision;
