export const filterWords = (words, alphabet, query) => {
    return words.filter((entry) => {
        return (
            entry.word.toLowerCase().startsWith(alphabet.toLowerCase()) &&
            entry.word.toLowerCase().includes(query.toLowerCase())
        );
    });
};

export const filterOws = (ows, alphabet, query) => {
    return ows.filter(
        (entry) =>
            entry.ows.some((w) => w.word.toLowerCase().startsWith(alphabet.toLowerCase())) &&
            entry.ows.some((w) => w.word.toLowerCase().includes(query.toLowerCase()))
    );
};

export const filterIdioms = (idioms, alphabet, query, type) => {
    return idioms.filter(
        (entry) =>
            entry.idiom.toLowerCase().includes(query.toLowerCase()) &&
            (alphabet === "All" || entry.idiom.toLowerCase().startsWith(alphabet.toLowerCase())) &&
            (type === "General" || entry.type === type)
    );
};
