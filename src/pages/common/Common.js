import React, { useState, useEffect } from "react";
import Accordion from "./Accordion";
import "../../css/Common.css";

const Common = () => {
    const [commonTerms, setCommonTerms] = useState([]);
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

    const fetchCommonTerms = async () => {
        try {
            const res = await fetch("/common.json");
            const data = await res.json();
            setCommonTerms(data);
        } catch (err) {
            window.alert("Something went wrong");
        }
    };

    useEffect(() => {
        fetchCommonTerms();
    }, []);

    return (
        <div className="main-container">
            <h2 className="main-container-heading">Common Terms</h2>
            <div className="clusters-container">
                <div className="accordion" role="tablist">
                    {commonTerms.map((terms, index) => (
                        <>
                            <Accordion
                                key={index}
                                active={activeTabs.includes(index)}
                                {...terms}
                                togglePanel={() => togglePanel(index)}
                            />
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Common;