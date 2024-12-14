import React, { useContext, useState } from "react";
import MobileNavItem from "./MobileNavItem";
import { navMenu } from "../../utils/constant";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const MobileNav = ({ isOpen, setOpen }) => {
    const { user, logout } = useContext(AuthContext);
    const [currentOpenDropdown, setOpenDropdown] = useState(null); // Track open dropdown

    const handleMenuToggle = () => {
        setOpen((prev) => !prev);
        setOpenDropdown(null); // Close any open dropdown when the menu is toggled
    };

    return (
        <>
            <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
                <div className="hamburger-links">
                    {navMenu.map((navItem, index) => {
                        if (navItem.requiresAuth && !user) {
                            return null;
                        }
                        if (navItem.guestOnly && user) {
                            return null;
                        }
                        return (
                            <MobileNavItem
                                key={index}
                                navItem={navItem}
                                isOpenDropdown={currentOpenDropdown === index}
                                setOpenDropdown={() =>
                                    setOpenDropdown(currentOpenDropdown === index ? null : index)
                                }
                                handleMenuToggle={handleMenuToggle}
                            />
                        );
                    })}
                    {user && (
                        <div className="hamburger-link" onClick={logout}>
                            <span>
                                <FaSignOutAlt />
                                Logout
                            </span>
                        </div>
                    )}
                </div>
            </div>
            {isOpen && (
                <div className={`overlay ${isOpen ? "open" : ""}`} onClick={handleMenuToggle}></div>
            )}
        </>
    );
};

export default MobileNav;
