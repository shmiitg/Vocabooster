import { FaHome, FaBook, FaBrain, FaBookmark, FaSignInAlt } from "react-icons/fa";

export const navMenu = [
    { title: "Home", address: "/", icon: <FaHome />, requiresAuth: false },
    {
        title: "Revise",
        icon: <FaBook />,
        requiresAuth: false,
        submenu: [
            { title: "Word", address: "/revise-word" },
            { title: "OWS", address: "/revise-ows" },
            { title: "Phrasal", address: "/revise-phrasal" },
            { title: "Idiom", address: "/revise-idiom" },
        ],
    },
    {
        title: "Learn",
        icon: <FaBrain />,
        requiresAuth: false,
        submenu: [
            { title: "Word", address: "/word" },
            { title: "OWS", address: "/ows" },
            { title: "Phrasal", address: "/phrasal" },
            { title: "Idiom", address: "/idioms" },
            { title: "Spelling", address: "/spellings" },
            { title: "Common", address: "/common" },
        ],
    },
    {
        title: "Bookmark",
        icon: <FaBookmark />,
        requiresAuth: true,
        submenu: [
            { title: "Word", address: "/bookmark-word" },
            { title: "OWS", address: "/bookmark-ows" },
            { title: "Phrasal", address: "/bookmark-phrasal" },
            { title: "Idiom", address: "/bookmark-idiom" },
        ],
    },
    {
        title: "Login",
        address: "/login",
        icon: <FaSignInAlt />,
        requiresAuth: false,
        guestOnly: true,
    },
];

export const scrollThreshold = 0;
