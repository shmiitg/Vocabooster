import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ submenu, dropdown, setDropdown }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdown, setDropdown]);

    return (
        <div ref={dropdownRef} className={`dropdown ${dropdown ? "dropdown-show" : ""}`}>
            {submenu.map((item, index) => (
                <Link to={item.address} key={index} className="dropdown-items">
                    {item.title}
                </Link>
            ))}
        </div>
    );
};

export default Dropdown;
