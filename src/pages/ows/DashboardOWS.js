import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { SearchContext } from "../../context/SearchContext";
import Loader from "../../components/Loader";
import OWSContainer from "./OWSContainer";
import { filterOws } from "../../utils/filter";
import { sortOws } from "../../utils/sort";

const DashboardOWS = () => {
    const { wordUpdate } = useContext(UpdateContext);
    const { searchQuery } = useContext(SearchContext);

    const [ows, setOws] = useState([]);
    const [selectedAlphabet, setSelectedAlphabet] = useState("A");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getFavoriteOws = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const url = `${process.env.REACT_APP_SERVER_URL}/user`;
                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    const favs = data.favorites.filter((fav) => fav.itemType === "ows");
                    setOws(sortOws(favs));
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        getFavoriteOws();
    }, [wordUpdate]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    const filteredOWS = filterOws(ows, selectedAlphabet, searchQuery);

    return (
        <>
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
                    {filteredOWS.map((ows) => (
                        <OWSContainer key={ows._id} ows={ows} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default DashboardOWS;
