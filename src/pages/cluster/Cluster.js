import React, { useState, useEffect } from "react";
import Accordion from "./Accordion";
import "../../css/Cluster.css";

const Cluster = () => {
    const [clusters, setClusters] = useState([]);

    const fetchClusters = async () => {
        try {
            const res = await fetch("/clusters.json");
            const data = await res.json();
            setClusters(data);
        } catch (err) {
            window.alert("Something went wrong");
        }
    };

    useEffect(() => {
        fetchClusters();
    }, []);

    return (
        <div className="main-container">
            <h2 className="main-container-heading">Common Terms</h2>
            <div className="clusters-container">
                <Accordion panels={clusters} />
            </div>
        </div>
    );
};

export default Cluster;
