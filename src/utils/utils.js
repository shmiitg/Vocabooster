export function trimCapitalize(word) {
    const trimmedWord = word.trim();
    if (trimmedWord === "") return "";
    const finalWord = trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1).toLowerCase();
    return finalWord;
}

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
    let wordList = new Set();
    let wordInfo = new Array();
    try {
        const url = `${process.env.REACT_APP_SERVER_URL}/word`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.status === 200) {
            wordInfo = data.words;
            const allWordsList = data.words.flatMap((word) => word.word.toLowerCase());
            wordList = new Set(allWordsList);
        }
        return { wordList, wordInfo };
    } catch (err) {
        return { wordList, wordInfo };
    }
};

export const checkExistingWord = (word, allWords) => {
    const lowerCaseWord = word.toLowerCase();
    return allWords.has(lowerCaseWord);
};
