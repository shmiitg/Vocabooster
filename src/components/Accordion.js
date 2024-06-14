import React, { useState } from "react";
import Panel from "./Panel";

const Accordion = ({ panels }) => {
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

    return (
        <div className="accordion" role="tablist">
            {panels.map((panel, index) => (
                <>
                    <Panel
                        key={index}
                        active={activeTabs.includes(index)}
                        {...panel}
                        togglePanel={() => togglePanel(index)}
                    />
                </>
            ))}
        </div>
    );
};

export default Accordion;
