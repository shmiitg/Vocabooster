import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const [isOpen, setOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

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
            <div className={`App-header ${isOpen ? "open" : ""}`}>
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
                        {user ? (
                            <>
                                <div className="link">
                                    <Link to="/dashboard">Dashboard</Link>
                                </div>
                                <div className="link" onClick={logout}>
                                    <span>Logout</span>
                                </div>
                            </>
                        ) : (
                            <div className={pathname === "/login" ? "link link-active" : "link"}>
                                <Link to="/login">Login</Link>
                            </div>
                        )}
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
                    {user ? (
                        <>
                            <div className="hamburger-link">
                                <span>Welcome, {user.username}</span>
                            </div>
                            <div className="hamburger-link" onClick={logout}>
                                <span>Logout</span>
                            </div>
                        </>
                    ) : (
                        <div
                            className={
                                pathname === "/login" ? "hamburger-link-active" : "hamburger-link"
                            }
                        >
                            <Link to="/login">Login</Link>
                        </div>
                    )}
                </div>
            </div>
            {isOpen && (
                <div className={`overlay ${isOpen ? "open" : ""}`} onClick={handleMenuToggle}></div>
            )}
        </header>
    );
};

export default Navbar;
