import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";

const NavItem = ({ navItem }) => {
    const location = useLocation();
    const pathname = location.pathname;

    const [dropdown, setDropdown] = useState(false);
    const navItemRef = useRef(null);

    const handleDropdownToggle = (event) => {
        event.stopPropagation();
        setDropdown((prev) => !prev);
    };

    return (
        <>
            {navItem.submenu ? (
                <div ref={navItemRef} className="link-container">
                    <button
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={handleDropdownToggle}
                        className="link"
                    >
                        {navItem.icon}
                        {navItem.title}
                    </button>
                    <Dropdown
                        dropdown={dropdown}
                        submenu={navItem.submenu}
                        setDropdown={setDropdown}
                        navItemRef={navItemRef}
                    />
                </div>
            ) : (
                <div className="link-container">
                    <Link
                        className={pathname === navItem.address ? "link link-active" : "link"}
                        to={navItem.address}
                    >
                        {navItem.icon}
                        {navItem.title}
                    </Link>
                </div>
            )}
        </>
    );
};

export default NavItem;
