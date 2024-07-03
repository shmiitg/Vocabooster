import React, { useState, useEffect, useContext, useRef } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { SearchContext } from "../../context/SearchContext";
import { Modal } from "react-responsive-modal";
import Loader from "../../components/Loader";
import IdiomContainer from "./IdiomContainer";
import NewIdiom from "./NewIdiom";
import { idiomTypes } from "./IdiomTypes";
import { sortIdioms } from "../../utils/sort";
import { filterIdioms } from "../../utils/filter";

const Idiom = () => {
    const { wordUpdate } = useContext(UpdateContext);
    const { searchQuery } = useContext(SearchContext);

    const [open, setOpen] = useState(false);

    const [idioms, setIdioms] = useState([]);
    const [selectedType, setSelectedType] = useState("General");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const idiomRefs = useRef({});

    const getIdioms = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/idiom`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setIdioms(sortIdioms(data.idioms));
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
        setLoading(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getIdioms();
    }, [wordUpdate]);

    const filteredIdioms = filterIdioms(idioms, searchQuery, selectedType);

    const handleAlphabetClick = (letter) => {
        const idiomElement = idiomRefs.current[letter];
        if (idiomElement) {
            idiomElement.scrollIntoView({ behavior: "instant" });

            // Determine the offset based on screen width
            const offset = window.innerWidth <= 768 ? -80 : -90;

            // Adjust for the offset
            window.scrollBy(0, offset);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    return (
        <>
            {/* <div className="type-nav">
                {idiomTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => {
                            setSelectedType(type);
                        }}
                        className={selectedType === type ? "selected" : ""}
                    >
                        {type}
                    </button>
                ))}
            </div> */}
            <div className="main-container">
                <div className="main-container-list">
                    {filteredIdioms.map((entry) => (
                        <div
                            key={entry._id}
                            ref={(el) => {
                                const firstLetter = entry.idiom.charAt(0).toUpperCase();
                                if (searchQuery === "" && !idiomRefs.current[firstLetter]) {
                                    idiomRefs.current[firstLetter] = el;
                                } else if (searchQuery !== "") {
                                    idiomRefs.current[firstLetter] = null;
                                }
                            }}
                        >
                            <IdiomContainer idiom={entry} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="alphabet-selector">
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                    <button key={letter} onClick={() => handleAlphabetClick(letter)}>
                        {letter}
                    </button>
                ))}
            </div>
            <button className="add-button" onClick={handleOpen}>
                Add
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                showCloseIcon={false}
                closeOnOverlayClick={false}
                center
            >
                <NewIdiom onClose={handleClose} />
            </Modal>
        </>
    );
};

export default Idiom;
