export function trimCapitalize(word) {
    const trimmedWord = word.trim();
    if (trimmedWord === "") return "";
    const finalWord = trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1).toLowerCase();
    return finalWord;
}

export function underlineWord(text, word) {
    const regex = new RegExp(`(${word}(?:ing|ed|red|ly|s|d)?)`, "gi");
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

export const checkExistingWord = (word, wordList) => {
    const lowerCaseWord = word.toLowerCase();
    return wordList.has(lowerCaseWord);
};

export const getAllWords = async () => {
    try {
        let words = [];
        let wordList = new Set();
        const url = `${process.env.REACT_APP_SERVER_URL}/word`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.status === 200) {
            words = data.words;
            const allWordsList = data.words.flatMap((entry) => entry.word.toLowerCase());
            wordList = new Set(allWordsList);
        }
        return { words, wordList };
    } catch (err) {
        return { error: "Failed to load" };
    }
};

export const getAllOws = async () => {
    try {
        let ows = [];
        const url = `${process.env.REACT_APP_SERVER_URL}/ows`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.status === 200) {
            ows = data.ows;
        }
        return { ows };
    } catch (err) {
        return { error: "Failed to load" };
    }
};

export const getAllIdioms = async () => {
    try {
        let idioms = [];
        const url = `${process.env.REACT_APP_SERVER_URL}/idiom`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.status === 200) {
            idioms = data.idioms;
        }
        return { idioms };
    } catch (err) {
        return { error: "Failed to load" };
    }
};
