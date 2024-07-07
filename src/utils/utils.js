import { FaHome, FaBook, FaBrain, FaBookmark } from "react-icons/fa";

export const navMenu = [
    { title: "Home", address: "/", icon: <FaHome /> },
    { title: "Revise", address: "/revision", icon: <FaBook /> },
    {
        title: "Learn",
        icon: <FaBrain />,
        submenu: [
            {
                title: "OWS",
                address: "/ows",
            },
            {
                title: "Idiom",
                address: "/idioms",
            },
            {
                title: "Spelling",
                address: "/spellings",
            },
            {
                title: "Cluster",
                address: "/clusters",
            },
        ],
    },
];

export const bookmarkMenu = {
    title: "Bookmark",
    icon: <FaBookmark />,
    submenu: [
        { title: "Word", address: "/dashboard" },
        { title: "OWS", address: "/dashboard-ows" },
    ],
};

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
