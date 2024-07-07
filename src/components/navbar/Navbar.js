import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import { FaSignOutAlt, FaSearch } from "react-icons/fa";
import MobileNav from "./MobileNav";
import { navMenu } from "../../utils/utils";
import NavItem from "./NavItem";
import "../../css/Navbar.css";
import "../../css/MobileNav.css";

const Navbar = () => {
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
                        {navMenu.map((navItem, index) => {
                            if (navItem.requiresAuth && !user) {
                                return null;
                            }
                            if (navItem.guestOnly && user) {
                                return null;
                            }
                            return <NavItem key={index} navItem={navItem} />;
                        })}
                        {user && (
                            <div className="link-container" onClick={logout}>
                                <span className="link logout-link">
                                    <FaSignOutAlt />
                                    Logout
                                </span>
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
