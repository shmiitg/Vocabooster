import React, { useContext } from "react";
import MobileNavItem from "./MobileNavItem";
import { navMenu } from "../../utils/constant";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const MobileNav = ({ isOpen, setOpen }) => {
    const { user, logout } = useContext(AuthContext);

    const handleMenuToggle = () => {
        setOpen((prev) => !prev);
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
