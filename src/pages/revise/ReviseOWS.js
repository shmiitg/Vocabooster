import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import Loader from "../../components/Loader";
import OWSContainer from "../ows/OWSContainer";
import { getAllOws } from "../../utils/utils";
import { sortOws } from "../../utils/sort";

const ReviseOWS = () => {
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
                    {reviseOws.map((ows) => (
                        <OWSContainer key={ows._id} ows={ows} />
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
