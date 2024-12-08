import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { SearchContext } from "../../context/SearchContext";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Empty from "../../components/Empty";
import OWSContainer from "./OWSContainer";
import { filterOws } from "../../utils/filter";
import { sortOws } from "../../utils/sort";

const BookmarkOWS = () => {
    const { wordUpdate } = useContext(UpdateContext);
    const { searchQuery } = useContext(SearchContext);

    const [ows, setOws] = useState([]);

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
                    setError("Failed to load OWS");
                }
            } catch (err) {
                setError("Failed to load OWS");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        getFavoriteOws();
    }, [wordUpdate]);

    const filteredOWS = filterOws(ows, "", searchQuery);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (ows.length === 0) {
        return <Empty message="No OWS in Bookmark" />;
    }

    return (
        <>
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

export default BookmarkOWS;
