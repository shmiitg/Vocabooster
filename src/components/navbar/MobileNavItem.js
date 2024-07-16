import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const MobileNavItem = ({ navItem, handleMenuToggle }) => {
    const location = useLocation();
    const pathname = location.pathname;

    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => setDropdown((prev) => !prev);

    const handleMenuToggleMobile = () => {
        handleMenuToggle();
        toggleDropdown();
    };

    return (
        <div>
            {navItem.submenu ? (
                <>
                    <div className="hamburger-link" onClick={toggleDropdown}>
                        <span>
                            {navItem.icon}
                            {navItem.title}
                            {dropdown ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </div>
                    {dropdown && (
                        <div className="submenu">
                            {navItem.submenu.map((item, index) => (
                                <div
                                    key={index}
                                    className={
                                        pathname === item.address
                                            ? "hamburger-link-active"
                                            : "hamburger-link"
                                    }
                                    onClick={handleMenuToggleMobile}
                                >
                                    <Link to={item.address}>{item.title}</Link>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div
                    className={
                        pathname === navItem.address ? "hamburger-link-active" : "hamburger-link"
                    }
                    onClick={handleMenuToggle}
                >
                    <Link to={navItem.address}>
                        {navItem.icon}
                        {navItem.title}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MobileNavItem;
