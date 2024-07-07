import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";

const NavItem = ({ navItem }) => {
    const location = useLocation();
    const pathname = location.pathname;

    const [dropdown, setDropdown] = useState(false);

    return (
        <>
            {navItem.submenu ? (
                <div className="link-container">
                    <button
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => setDropdown((prev) => !prev)}
                        className="link"
                    >
                        {navItem.icon}
                        {navItem.title}
                    </button>
                    <Dropdown
                        dropdown={dropdown}
                        submenu={navItem.submenu}
                        setDropdown={setDropdown}
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
