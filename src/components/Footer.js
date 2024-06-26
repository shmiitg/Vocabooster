import React, { useEffect, useState } from "react";
import "../css/Footer.css";

const Footer = () => {
    const [visitCount, setVisitCount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getVisitCount = async () => {
            try {
                const url = `${process.env.REACT_APP_SERVER_URL}/visit`;
                const res = await fetch(url);
                const data = await res.json();
                if (res.status === 200) {
                    setVisitCount(data.count);
                }
            } catch (err) {
                setError("Failed to fetch visit count");
            }
        };

        getVisitCount();
    }, []);

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="visit-count">
                    {error ? <p>{error}</p> : <p>Website Visits: {visitCount}</p>}
                </div>
                <div className="creator-info">
                    <strong>Created by:</strong> Shubham Mondal
                </div>
            </div>
        </footer>
    );
};

export default Footer;
