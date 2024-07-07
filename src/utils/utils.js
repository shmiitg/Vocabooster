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

export function underlineWord(text, word) {
    const regex = new RegExp(`(${word}(?:ing|ed|ly|s|d)?)`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
        regex.test(part) ? (
            <span key={index} className="underlined">
                {part}
            </span>
        ) : (
            part
        )
    );
}

export const getAllWords = async () => {
    try {
        const url = `${process.env.REACT_APP_SERVER_URL}/word`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.status === 200) {
            const allWordsList = data.words.flatMap((word) => word.word.toLowerCase());
            return new Set(allWordsList);
        }
        return new Set();
    } catch (err) {
        return new Set();
    }
};

export const checkExistingWord = (word, allWords) => {
    const lowerCaseWord = word.toLowerCase();
    return allWords.has(lowerCaseWord);
};
