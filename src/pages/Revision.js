import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";
import Loader from "../components/Loader";
import WordContainer from "./word/WordContainer";
import IdiomContainer from "./idiom/IdiomContainer";
import OWSContainer from "./ows/OWSContainer";
import { getAllWords } from "../utils/utils";
import { sortWords, sortOws, sortIdioms } from "../utils/sort";

const Revision = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const [revisionWords, setRevisionWords] = useState([]);
    const [allWords, setAllWords] = useState(new Set());
    const [revisionOWS, setRevisionOWS] = useState([]);
    const [revisionIdioms, setRevisionIdioms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getRandomData = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/revision`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setRevisionWords(sortWords(data.words));
                setRevisionOWS(sortOws(data.ows));
                setRevisionIdioms(sortIdioms(data.idioms));
                const allWordsList = await getAllWords();
                setAllWords(allWordsList);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        getRandomData();
    }, [wordUpdate]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    return (
        <>
            <div className="main-container">
                <h2 className="main-container-heading">Daily Revision</h2>
                <div className="main-container-list">
                    {revisionWords.map((entry) => (
                        <WordContainer key={entry._id} entry={entry} allWords={allWords} />
                    ))}
                </div>
                <h2 className="main-container-heading">One Word Substitutions</h2>
                <div className="main-container-list">
                    {revisionOWS.map((ows) => (
                        <OWSContainer key={ows._id} ows={ows} />
                    ))}
                </div>
                <h2 className="main-container-heading">Idioms</h2>
                <div className="main-container-list">
                    {revisionIdioms.map((idiom) => (
                        <IdiomContainer key={idiom._id} idiom={idiom} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Revision;
