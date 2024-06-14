import React, { useState, useEffect } from "react";
import Accordion from "../components/Accordion";
import "../css/Clusters.css";

const Clusters = () => {
    const [clusters, setClusters] = useState([]);

    const fetchClusters = async () => {
        try {
            const res = await fetch("/clusters.json");
            const data = await res.json();
            setClusters(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchClusters();
    }, []);

    return (
        <div className="clusters-page">
            <h1>Clusters</h1>
            {clusters.map((cluster, index) => (
                <Accordion key={index} cluster={cluster}></Accordion>
            ))}
        </div>
    );
};

export default Clusters;
