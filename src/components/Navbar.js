import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import "../css/Navbar.css";
import {
    FaHome,
    FaBook,
    FaBrain,
    FaSignOutAlt,
    FaSignInAlt,
    FaUser,
    FaSearch,
} from "react-icons/fa";
import MobileNav from "./MobileNav";

const Navbar = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const { user, logout } = useContext(AuthContext);
    const { searchQuery, setSearchQuery } = useContext(SearchContext);

    const [isOpen, setOpen] = useState(false);

    const navLinks = [
        { name: "Home", address: "/", icon: <FaHome /> },
        { name: "Revise", address: "/revision", icon: <FaBook /> },
        { name: "OWS", address: "/ows", icon: <FaBrain /> },
        { name: "Idiom", address: "/idioms", icon: <FaBook /> },
        { name: "Spelling", address: "/spellings", icon: <FaBook /> },
        { name: "Cluster", address: "/clusters", icon: <FaBook /> },
    ];

    const userLinks = [
        { name: "Dashboard", address: "/dashboard", icon: <FaUser /> },
        { name: "Dashboard-2", address: "/dashboard-ows", icon: <FaUser /> },
    ];

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <header>
            <div className={`App-header ${isOpen ? "open" : ""}`}>
                <div className="left-header">
                    <h1 className="logo">
                        <Link to="/">Vocabrain</Link>
                    </h1>
                </div>
                <div className="mid-header">
                    <div className="search-form">
                        <FaSearch className="search-button" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
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
                                <Link to={navlink.address}>
                                    {navlink.icon}
                                    {navlink.name}
                                </Link>
                            </div>
                        ))}
                        {user ? (
                            <>
                                {userLinks.map((userlink, index) => (
                                    <div
                                        key={index}
                                        className={
                                            pathname === userlink.address
                                                ? "link link-active"
                                                : "link"
                                        }
                                    >
                                        <Link to={userlink.address}>
                                            {userlink.icon}
                                            {userlink.name}
                                        </Link>
                                    </div>
                                ))}
                                <div className="link" onClick={logout}>
                                    <span>
                                        <FaSignOutAlt />
                                        Logout
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className={pathname === "/login" ? "link link-active" : "link"}>
                                <Link to="/login">
                                    <FaSignInAlt />
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <MobileNav
                navLinks={navLinks}
                userLinks={userLinks}
                isOpen={isOpen}
                setOpen={setOpen}
            />
        </header>
    );
};

export default Navbar;
