import { FaHome, FaBook, FaBrain, FaBookmark, FaSignInAlt } from "react-icons/fa";

export const navMenu = [
    { title: "Home", address: "/", icon: <FaHome />, requiresAuth: false },
    { title: "Revise", address: "/revision", icon: <FaBook />, requiresAuth: false },
    {
        title: "Learn",
        icon: <FaBrain />,
        requiresAuth: false,
        submenu: [
            { title: "OWS", address: "/ows" },
            { title: "Idiom", address: "/idioms" },
            { title: "Spelling", address: "/spellings" },
            { title: "Cluster", address: "/clusters" },
        ],
    },
    {
        title: "Bookmark",
        icon: <FaBookmark />,
        requiresAuth: true,
        submenu: [
            { title: "Word", address: "/bookmark" },
            { title: "OWS", address: "/bookmark-ows" },
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
