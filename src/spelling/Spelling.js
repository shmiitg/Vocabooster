import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";
import { Modal } from "react-responsive-modal";
import { FaSearch } from "react-icons/fa";
import Loader from "../components/Loader";
import SpellingContainer from "./SpellingContainer";
import NewSpelling from "./NewSpelling";
import { sortWords } from "../utils/utils";

const Spelling = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const [open, setOpen] = useState(false);

    const [spellings, setSpellings] = useState([]);
    const [selectedAlphabet, setSelectedAlphabet] = useState("A");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getSpellings = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/spelling`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setSpellings(sortWords(data.spellings));
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
        getSpellings();
    }, [wordUpdate]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    const filteredSpellings = spellings.filter(
        (spelling) =>
            spelling.spelling.toLowerCase().startsWith(selectedAlphabet.toLowerCase()) &&
            spelling.spelling.toLowerCase().includes(searchQuery.toLowerCase())
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
                            onClick={() => setSelectedAlphabet(letter)}
                            className={selectedAlphabet === letter ? "selected" : ""}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
            <div className="main-container">
                <div className="main-container-list">
                    {filteredSpellings.map((spelling) => (
                        <SpellingContainer key={spelling._id} spelling={spelling} />
                    ))}
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                showCloseIcon={false}
                closeOnOverlayClick={false}
                center
            >
                <NewSpelling onClose={handleClose} />
            </Modal>
        </>
    );
};

export default Spelling;
