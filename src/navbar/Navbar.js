import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import "./Navbar.css";

const Navbar = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const [isOpen, setOpen] = useState(false);

    const navLinks = [
        { name: "Revise", address: "/revision" },
        { name: "OWS", address: "/ows" },
        { name: "Idiom", address: "/idioms" },
        { name: "Spelling", address: "/spellings" },
        { name: "Cluster", address: "/clusters" },
    ];

    const handleMenuToggle = () => {
        setOpen(!isOpen);
    };

    return (
        <header>
            <div className="App-header">
                <div className="left-header">
                    <h1 className="logo">
                        <Link to="/">Vocabrain</Link>
                    </h1>
                </div>
                <div className="right-header">
                    <div className="hamburger">
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                    <div className="nav-links">
                        {navLinks.map((navlink, index) => (
                            <div
                                key={index}
                                className={
                                    pathname === navlink.address ? "link link-active" : "link"
                                }
                            >
                                <Link to={navlink.address}>{navlink.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
                <div className="hamburger-links">
                    {navLinks.map((navlink, index) => (
                        <div
                            key={index}
                            className={
                                pathname === navlink.address
                                    ? "hamburger-link-active"
                                    : "hamburger-link"
                            }
                        >
                            <Link to={navlink.address}>{navlink.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
            {isOpen && (
                <div className={`overlay ${isOpen ? "open" : ""}`} onClick={handleMenuToggle}></div>
            )}
        </header>
    );
};

export default Navbar;
