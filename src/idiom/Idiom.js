import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";
import { Modal } from "react-responsive-modal";
import { FaSearch } from "react-icons/fa";
import Loader from "../components/Loader";
import IdiomContainer from "./IdiomContainer";
import NewIdiom from "./NewIdiom";
import { idiomTypes } from "./IdiomTypes";
import { sortWords } from "../utils/utils";

const Idiom = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const types = idiomTypes.slice(1);
    const [open, setOpen] = useState(false);
    const [idioms, setIdioms] = useState([]);
    const [selectedAlphabet, setSelectedAlphabet] = useState("A");
    const [selectedType, setSelectedType] = useState("General");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getIdioms = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/idiom`;
            const res = await fetch(url);
            const data = await res.json();

            if (res.status === 200) {
                const sortedIdioms = sortWords(data.idioms);
                setIdioms(sortedIdioms);
                setLoading(false);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
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

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    const filteredIdioms = idioms.filter(
        (idiom) =>
            idiom.idiom.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedAlphabet === "All" ||
                idiom.idiom.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
            (selectedType === "General" || idiom.type === selectedType)
    );

    return (
        <>
            <div className="main-container-top">
                <div className="main-container-sub-top">
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-bar"
                        />
                    </div>
                    <div className="main-container-add">
                        <button onClick={handleOpen}>Add</button>
                    </div>
                </div>
            </div>
            <div className="alphabet-nav">
                <div className="alphabets">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                        <button
                            key={letter}
                            onClick={() => {
                                setSelectedAlphabet(letter);
                                setSelectedType("General");
                            }}
                            className={selectedAlphabet === letter ? "selected" : ""}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
            <div className="type-nav">
                {types.map((type) => (
                    <button
                        key={type}
                        onClick={() => {
                            setSelectedType(type);
                            setSelectedAlphabet("All");
                        }}
                        className={selectedType === type ? "selected" : ""}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <div className="main-container">
                <ul className="main-container-list">
                    {filteredIdioms.map((idiom) => (
                        <IdiomContainer key={idiom._id} idiom={idiom} />
                    ))}
                </ul>
            </div>
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
