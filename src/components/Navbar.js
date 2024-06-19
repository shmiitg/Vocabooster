import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const navLinks = [
        { name: "Revise", address: "/revision" },
        { name: "OWS", address: "/ows" },
        { name: "Idiom", address: "/idioms" },
        { name: "Cluster", address: "/clusters" },
    ];

    return (
        <header className="App-header">
            <div className="left-header">
                <h1 className="logo">
                    <Link to="/">Vocabrain</Link>
                </h1>
            </div>
            <div className="right-header">
                {navLinks.map((navlink, index) => (
                    <div
                        key={index}
                        className={pathname === navlink.address ? "links links-active" : "links"}
                    >
                        <Link to={navlink.address}>{navlink.name}</Link>
                    </div>
                ))}
            </div>
        </header>
    );
};

export default Navbar;
