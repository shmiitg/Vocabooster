import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "hamburger-react";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import { FaSignOutAlt, FaSignInAlt, FaSearch } from "react-icons/fa";
import MobileNav from "./MobileNav";
import { navMenu, bookmarkMenu } from "../../utils/utils";
import NavItem from "./NavItem";
import "../../css/Navbar.css";
import "../../css/MobileNav.css";

const Navbar = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const { user, logout } = useContext(AuthContext);
    const { searchQuery, setSearchQuery } = useContext(SearchContext);

    const [isOpen, setOpen] = useState(false);

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
                        {navMenu.map((navItem, index) => (
                            <NavItem key={index} navItem={navItem} />
                        ))}
                        {user ? (
                            <>
                                <NavItem navItem={bookmarkMenu} />
                                <div className="link-container" onClick={logout}>
                                    <span className="link">
                                        <FaSignOutAlt />
                                        Logout
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="link-container">
                                <Link
                                    className={pathname === "/login" ? "link link-active" : "link"}
                                    to="/login"
                                >
                                    <FaSignInAlt />
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <MobileNav isOpen={isOpen} setOpen={setOpen} />
        </header>
    );
};

export default Navbar;
