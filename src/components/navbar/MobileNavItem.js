import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const MobileNavItem = ({ navItem, isOpenDropdown, setOpenDropdown, handleMenuToggle }) => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div>
            {navItem.submenu ? (
                <>
                    <div className="hamburger-link" onClick={setOpenDropdown}>
                        <span>
                            {navItem.icon}
                            {navItem.title}
                            {isOpenDropdown ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </div>
                    {isOpenDropdown && (
                        <div className="submenu">
                            {navItem.submenu.map((item, index) => (
                                <div
                                    key={index}
                                    className={
                                        pathname === item.address
                                            ? "hamburger-link-active"
                                            : "hamburger-link"
                                    }
                                    onClick={handleMenuToggle}
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
