import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import Loader from "../../components/Loader";
import OWSContainer from "../ows/OWSContainer";
import { sortOws } from "../../utils/sort";

const ReviseOWS = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const [reviseOWS, setReviseOWS] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getRandomData = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/revision`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setReviseOWS(sortOws(data.ows));
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        getRandomData();
    }, [wordUpdate]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    return (
        <>
            <div className="main-container">
                <div className="main-container-list">
                    {reviseOWS.map((ows) => (
                        <OWSContainer key={ows._id} ows={ows} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ReviseOWS;
