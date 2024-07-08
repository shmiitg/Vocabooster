import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ submenu, dropdown, setDropdown, navItemRef }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                navItemRef.current &&
                !navItemRef.current.contains(event.target)
            ) {
                setDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdown]);

    return (
        <div ref={dropdownRef} className={`dropdown ${dropdown ? "dropdown-show" : ""}`}>
            {submenu.map((item, index) => (
                <Link
                    to={item.address}
                    key={index}
                    className="dropdown-items"
                    onClick={() => setDropdown(false)}
                >
                    {item.title}
                </Link>
            ))}
        </div>
    );
};

export default Dropdown;
