export const sortWords = (words) => {
    return words.sort((a, b) => {
        // Determine the word to use for comparison
        const wordA = a.spelling
            ? a.spelling
            : a.word
            ? Array.isArray(a.word)
                ? a.word[0].toLowerCase()
                : a.word.toLowerCase()
            : a.idiom.toLowerCase();
        const wordB = b.spelling
            ? b.spelling
            : b.word
            ? Array.isArray(b.word)
                ? b.word[0].toLowerCase()
                : b.word.toLowerCase()
            : b.idiom.toLowerCase();

        if (wordA < wordB) {
            return -1;
        }
        if (wordA > wordB) {
            return 1;
        }
        return 0;
    });
};

export const filterWords = (words, query) => {
    if (!query) {
        return words;
    }

    return words.filter((word) => {
        if (Array.isArray(word.word)) {
            return word.word.some((w) => w.toLowerCase().includes(query.toLowerCase()));
        }
        return word.word.toLowerCase().includes(query.toLowerCase());
    });
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
