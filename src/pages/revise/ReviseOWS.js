import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import Loader from "../../components/Loader";
import { getAllOws } from "../../utils/utils";
import { sortOws } from "../../utils/sort";
import OWSAccordion from "./OWSAccordion";

const ReviseOWS = () => {
    const [activeTabs, setActiveTabs] = useState([]);

    const togglePanel = (index) => {
        setActiveTabs((prevActiveTabs) => {
            const isActive = prevActiveTabs.includes(index);
            if (isActive) {
                return prevActiveTabs.filter((tabIndex) => tabIndex !== index);
            } else {
                return [...prevActiveTabs, index];
            }
        });
    };

    const { wordUpdate } = useContext(UpdateContext);

    const [ows, setOws] = useState([]);
    const [reviseOws, setReviseOws] = useState([]);
    const [owsChange, setOwsChange] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function getRandomOwsIds(owsList, count) {
        const ids = owsList.map((ows) => ows._id);
        const shuffled = ids.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const changeOws = () => {
        const newOwsIds = getRandomOwsIds(ows, 10);
        localStorage.setItem("revisionOwsIds", JSON.stringify(newOwsIds));
        updateReviseOws(newOwsIds);
        setOwsChange((prev) => !prev);
    };

    const updateReviseOws = (ids) => {
        if (ows.length === 0) return;
        const owsToDisplay = sortOws(ids.map((id) => ows.find((ows) => ows._id === id)));
        setReviseOws(owsToDisplay);
    };

    const getOws = async () => {
        const owsData = await getAllOws();
        if (owsData.error) {
            setError(owsData.error);
        } else {
            setOws(owsData.ows);
        }
        setLoading(false);
    };

    useEffect(() => {
        getOws();
    }, [wordUpdate]);

    useEffect(() => {
        const storedIds = JSON.parse(localStorage.getItem("revisionOwsIds"));
        if (storedIds && storedIds.length > 0) {
            updateReviseOws(storedIds);
        } else {
            changeOws();
        }
    }, [ows]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <>
            <div className="main-container">
                <div className="main-container-list">
                    {reviseOws.map((entry, index) => (
                        <OWSAccordion
                            key={entry._id}
                            entry={entry}
                            active={activeTabs.includes(index)}
                            togglePanel={() => togglePanel(index)}
                            owsChange={owsChange}
                        />
                    ))}
                </div>
            </div>
            <button className="add-button" onClick={changeOws}>
                Change
            </button>
        </>
    );
};

export default ReviseOWS;
