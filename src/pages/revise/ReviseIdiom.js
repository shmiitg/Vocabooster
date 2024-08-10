import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import Loader from "../../components/Loader";
import { getAllIdioms } from "../../utils/utils";
import { sortIdioms } from "../../utils/sort";
import IdiomAccordion from "./IdiomAccordion";

const ReviseIdiom = () => {
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

    const [idiomInfo, setIdiomInfo] = useState([]);
    const [reviseIdioms, setReviseIdioms] = useState([]);
    const [idiomsChange, setIdiomsChange] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function getRandomIdiomIds(idiomList, count) {
        const ids = idiomList.map((idiom) => idiom._id);
        const shuffled = ids.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const changeIdioms = () => {
        const newIdiomIds = getRandomIdiomIds(idiomInfo, 10);
        localStorage.setItem("revisionIdiomIds", JSON.stringify(newIdiomIds));
        updateReviseIdioms(newIdiomIds);
        setIdiomsChange((prev) => !prev);
    };

    const updateReviseIdioms = (ids) => {
        if (idiomInfo.length === 0) return;
        const idiomsToDisplay = sortIdioms(
            ids.map((id) => idiomInfo.find((idiom) => idiom._id === id))
        );
        setReviseIdioms(idiomsToDisplay);
    };

    const getIdioms = async () => {
        const allIdioms = await getAllIdioms();
        if (allIdioms.error) {
            setError(allIdioms.error);
        } else {
            setIdiomInfo(allIdioms.idiomInfo);
        }
        setLoading(false);
    };

    useEffect(() => {
        getIdioms();
    }, [wordUpdate]);

    useEffect(() => {
        const storedIds = JSON.parse(localStorage.getItem("revisionIdiomIds"));
        if (storedIds && storedIds.length > 0) {
            updateReviseIdioms(storedIds);
        } else {
            changeIdioms();
        }
    }, [idiomInfo]);

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
                    {reviseIdioms.map((entry, index) => (
                        <IdiomAccordion
                            key={index}
                            entry={entry}
                            active={activeTabs.includes(index)}
                            togglePanel={() => togglePanel(index)}
                            idiomsChange={idiomsChange}
                        />
                    ))}
                </div>
            </div>
            <button className="add-button" onClick={changeIdioms}>
                Change
            </button>
        </>
    );
};

export default ReviseIdiom;
