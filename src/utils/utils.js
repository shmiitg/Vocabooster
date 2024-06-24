export const sortWords = (words) => {
    return words.sort((a, b) => {
        // Determine the word to use for comparison
        const wordA = a.spelling
            ? a.spelling
            : a.word
            ? a.word.toLowerCase()
            : a.idiom.toLowerCase();
        const wordB = b.spelling
            ? b.spelling
            : b.word
            ? b.word.toLowerCase()
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

export const sortOwsWords = (ows) => {
    return ows.sort((a, b) => {
        const owsA = a.ows[0].word.toLowerCase();
        const owsB = b.ows[0].word.toLowerCase();
        if (owsA < owsB) {
            return -1;
        }
        if (owsA > owsB) {
            return 1;
        }
        return 0;
    });
};

export const filterOwsWords = (ows, query) => {
    if (!query) {
        return ows;
    }
    return ows.filter((entry) => {
        return entry.ows.some((w) => w.word.toLowerCase().includes(query.toLowerCase()));
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
